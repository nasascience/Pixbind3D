/* Copyright (c) 2010 Jordan Kasper
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * Copyright notice and license must remain intact for legal use
 * Requires: jQuery 1.2+
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF 
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS 
 * BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN 
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN 
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 
 * Fore more usage documentation and examples, visit:
 *          http://jkdesign.org/faq/
 * 
 * Basic usage:
 *   
 *   <input type='password' id='myPassword' name='myPassword' />
 *   
 *   $('#myPassword').simplePassMeter(); // Most simple form (all default options)
 * 
 *   // ----- OR ----- //
 * 
 *   ALL OPTIONS:
 *   $('#myPassword').simplePassMeter({
 *     'showOnFocus': ...,      // BOOLEAN If true, only shows the password strength meter UI when the field is focused
 *     'showOnValue': ...,      // BOOLEAN If true, only shows the password strength meter UI when the field has some value (in other words, once the user has typed something), this is regardless of any focus
 *     'location': '...',       // STRING  Location of the meter UI, one of 't'op, 'b'ottom, 'l'eft, or 'r'ight. NOTE" 't'op is not very reliably placed, and could overflow into your field.
 *     'offset': ...,           // NUMBER  Pixels that the meter UI is offset from the password field.
 *     'container': ...,        // STRING  jQuery selector for the containing element you want the UI to be in. NOTE: this disables absolute positioning and thus makes the 'location' and 'offset' fields obsolete.
 *     'defaultText': ...,      // STRING  Text to show in password strength meter when no password is typed (i.e. user hasn't started typing yet)
 * 
 *     'requirements': {        // OBJECT  All requirements that the password must fulfill. Each requirement should have a unique key, and be itself an object with various members (see below). You can specify only some of the members in order to use the other default members; for example, specify the "minLength" requirement, but only the "value" member thus using the default "callback" function.
 *       'requirementName': {   // STRING  The name of the requirement used as the key for the "requirements" option object.
 *         'value': ...,        // VARIOUS The value for any requirement must evaluate to true (no zero, no false, no null), but can be requirement-specific as in the "minLength" case where the number of characters is used. In others where the value is not specific, a simple boolean _true_ can be used
 *         'regex': '...',      // STRING  If the user's input matches the regex, the requirement is considered passed.
 *                              //         *** NOTE: Use "regex" OR "callback", not both.
 *         'callback': ...,     // FUNCTON If a requirement specifies a "callback" then this function will be called with two arguments - the input from the user and value for this requirement - to test whether the current input fulfills the requirement. The function should return the boolean true if it does, false otherwise.
 *         'message': '...'     // STRING  The message to display to the user if they do not meet the requirement. It can contain the special sequence %V which will be replaced by the value parameter for this requirement.
 *       },
 *       ...
 *     },
 *     
 *     'ratings': [             // ARRAY   The categories for the ratings. When an input hits the "minScore" for a given rating, its values will be used. NOTE THAT THESE MUST BE IN ORDER BY THE "minScore" ATTRIBUTE.
 *       {
 *         'minScore': ...,     // NUMBER  The minimum score to hit to trigger this rating.
 *         'className': '...',  // STRING  The CSS class to place on the "simplePassMeter" div when this rating is used.
 *         'text': '...'        // STRING  The text to place in the meter UI when this rating is triggered.
 *       },
 *       ...
 *     ]
 *   });
 *   
 *   $('#myPassword').bind("score.simplePassMeter", function(jQEvent, score) {
 *     // do something with "score"
 *   });
 *   
 * 
 * REVISIONS:
 *   0.1 Initial release
 *   0.2 Added ability to capture the score of the password entered using binding (to the "score.simplePassMeter" event on the password node)
 *   0.3 Bug fix on bad requirement
 *       Added option to only show UI on field focus
 *       Added option to only show UI on field value (regardless of focus)
 *       Fixed matchField requirement to check for activity on verification field before stating the passwords don't match
 *       Reduce file size
 *   0.4 Fixed issues with strength checks not being done
 *       Changed values for some strength checks to be more appropriate
 *       Fixed bug in sequentialAndConsecutive check due to invalid string concatenation
 *       Fix to matchField active check
 *       Added option to set initial text on strength meter
 *   0.5 Fixed bug with matchField requirement
 *       Added jQuery chaining (ugh, should have been in v0.1, sorry)
 *   0.6 Fixed issue with noMatch option when the matching field has no value (thanks to Sathish)
 *       Work around to selecting the meter node by ID which messes up in certain cases (thanks to Jason M)
 */
; (function ($) {

  $.fn.simplePassMeter = function (o) {
    var n = this;
    if (n.length < 1) { return n; }

    o = (o) ? o : {};
    o = audit($.extend({}, $.fn.simplePassMeter.defaults, o));

    n.each(function () {
      if (this.tagName.toLowerCase() == 'input' &&
          this.type == 'password') {
        setup(this, o);
      }
    });

    return n;
  };

  // ---------------- Private Helpers --------------- //

  function audit(o) {
    var d = $.fn.simplePassMeter.defaults;
    o.showOnFocus = !!o.showOnFocus;
    o.showOnValue = !!o.showOnValue;

    o.location = ($.inArray(o.location, ['t', 'r', 'b', 'l']) < 0) ? d.location : o.location;
    o.offset = (Number(o.offset)) ? Number(o.offset) : d.offset;

    var c = o.container;
    c = (c) ? $(c) : null;
    o.container = (c && c.length) ? c : null;

    // requirements
    var rq = o.requirements;
    if (!rq) {
      rq = d.requirements;
    } else {
      for (var k in rq) {
        if (!d.requirements[k]) {
          // not in our defaults, does it have everything we need?
          if (typeof rq[k].value == 'undefined' ||
              typeof rq[k].message != 'string' ||
              (typeof rq[k].regex != 'string' &&
               !$.isFunction(rq[k].callback))) {
            rq[k] = null;
            continue;
          } else {
            continue; // we can use it, but we can't audit it any more
          }
        }

        // Audit specific requirements
        if (typeof rq[k].value == 'undefined') {
          rq[k].value = d.requirements[k].value;
        }
        if (typeof rq[k].message != 'string') {
          rq[k].message = d.requirements[k].message;
        }
        if (typeof rq[k].regex != 'string' &&
            d.requirements[k].regex) {
          rq[k].regex = d.requirements[k].regex;
        }
        if (!$.isFunction(rq[k].callback) &&
            d.requirements[k].callback) {
          rq[k].callback = d.requirements[k].callback;
        }

        // key-specific checks
        if (k == 'minLength') {
          if (!Number(rq[k].value) || rq[k].value < 1) {
            rq[k].value = d.requirements[k].value;
          }
        }
      }
    }
    // Special setup for matchField
    if (rq['matchField']) {
      $(rq['matchField'].value).bind('keyup.simplePassMeterMatch', function () {
        $(this)
          .attr('active', 'true')
          .unbind('keyup.simplePassMeterMatch');
      });
    }

    // ratings
    if (!o.ratings || !o.ratings.length) {
      o.ratings = d.ratings;
    } else {
      var ps = 0;
      // they need to be increasing in score
      for (var i = 0, l = o.ratings.length; i < l; ++i) {
        if ((!Number(o.ratings[i].minScore) && o.ratings[i].minScore !== 0) || o.ratings[i].minScore < ps) {
          o.ratings = d.ratings;
          break;
        }
        ps = o.ratings[i].minScore;
        if (!o.ratings[i].className) { o.ratings[i].className = 'good'; }
        if (!o.ratings[i].text) { o.ratings[i].text = 'Good'; }
      }
    }
    return o;
  }

  function setup(n, o) {
    n = $(n);

    if (n.attr('id').length < 1) {
      n.attr('id', 'simplePassMeter_' + (++$.fn.simplePassMeter.uid));
    }
    n.addClass('simplePassMeterInput');

    var mId = n.attr('id') + '_simplePassMeter';
    var b = $("<div id='" + mId + "' class='simplePassMeter' aria-controlled>")
      .append("<p><span class='simplePassMeterIcon'></span><span class='simplePassMeterText'></span></p>" +
              "<div class='simplePassMeterBar'><div class='simplePassMeterProgress'></div></div>")
      .appendTo('body')
      .css('padding-bottom', '8px');
    n.attr('aria-controls', mId);

    if (o.container) {
        o.container.append(b);
        //b.css('position', 'relative');
        b.css('position', 'absolute');
        //b.css('left', '15px');
        //b.css('top', '0px');
        b.css('width', '100%');
    } else {
        //b.css('position', 'absolute');
        //reposition(n, b, o);

        b.css('position', 'absolute');
        reposition(n, b, o);
    }
    b.css('z-index', '500');

    var m = b.find('.simplePassMeterBar')
        .css({
            'position': 'absolute',
            'bottom': '0.15em',
            'left': '5px',
            'height': '5px',
            'width': '95%'
        });
    var mp = m.find('.simplePassMeterProgress')
        .css({
            'height': '5px',
            'width': '0%'
        });

    n.bind('keyup.simplePassMeter', function () {
        n.attr('active', 'true');
        if (o.container) {
            o.container.height('100%');
        }
        testPass(n, b, o);
    });

    if (o.showOnFocus) {
      b.hide();
      n
        .bind('focus.simplePassMeter', function () {
            if (o.showOnValue) {
                if (this.value.length >= 1) {
                    b.show();
                }
            } else {
                b.show();
            }
        })
        .bind('blur.simplePassMeter', function () {
            b.hide();
        });
    }

    if (o.showOnValue) {
      n.bind('keyup.simplePassMeter', function () {
        if (this.value.length < 1) {
            b.hide();
        } else {
            b.show();
        }
      });
      n.trigger('keyup.simplePassMeter');
    }

    // Look through reqs to see if there are other fields to watch
    $.each(o.requirements, function (key, req) {
      if (/.+Field$/.test(key)) {
        var f = $(req.value);
        if (f.length == 1) {
          f.bind('keyup.simplePassMeter', function () {
            testPass(n, b, o);
          });
        }
      }
    });

    if (!o.container) {
      $(window).resize(function () {
        reposition(n, b, o);
      });
    }

    reset(b, o);
  }

  function reposition(n, box, o) {
    var t, b, r, l, ielr;
    t = b = l = r = 'auto';
    ielr = (document.all) ? 2 : 0;

    var pos = n.offset();
    var pl = pos.left;
    var pt = pos.top;

    if (o.location == 't') {
      l = pl + 'px';
      t = (pt - box.height() - 10 - o.offset) + 'px';

    } else if (o.location == 'b') {
      l = pl + 'px';
      t = (pt + n.height() + 7 + o.offset) + 'px';

    } else if (o.location == 'l') {
      r = ($('body').width() - pl + o.offset) + 'px';
      t = pt + 'px';

    } else { // 'r'ight (and the default)
      l = (pl + n.width() + 4 + ielr + o.offset) + 'px';
      t = pt + 'px';
    }

    box.css({
      'top': t,
      'right': r,
      'bottom': b,
      'left': l
    });
  }

  function calcPos(nearBox, Box) {
    var t, b, r, l;
    t = b = l = r = 'auto';
    var pos = nearBox.offset();
    var pl = pos.left;
    var pt = pos.top;
    l = (pl + nearBox.width() + 4) + 'px';
    t = pt + 'px';

    Box.css({
      'top': t,
      'right': r,
      'bottom': b,
      'left': l
    });
  }

  function testPass(n, b, o) {
    //var p = o.requirements['matchField'].value;  
    // n = $(":focus")
    //alert($(":focus").next('span').attr("class"));


    if ($("div.ValidationSummary").css("display") != "none") // Valid window in top
    {
      if ($(":focus").attr("id") == "ctl00_MainContent_password" || $(":focus").attr("id") == "ctl00_MainContent_confirmPassword" || $(":focus").attr("id") == "ctl00_MainContent_txtBxUserPassword" || $(":focus").attr("id") == "ctl00_MainContent_txtBxConfirmPassword") // if password fields
      {
        if ($(":focus").val() != "") {
          if ($(":focus").next('span').attr("class") == "excl-error") {
            $(":focus").next('span').remove();
          }
          if ($("span[id='err_" + $(":focus").attr("id") + "']").size() != 0) {
            $("span[id='err_" + $(":focus").attr("id") + "']").remove();
          }
        }
        else {
          if ($("span[id='err_" + $(":focus").attr("id") + "']").size() == 0 && $(":focus").next('span').attr("class") != "excl-error") // if next span is "!"
          {
            $(":focus").after('<span id="err_' + $(":focus").attr("id") + '" class="excl-error" >!</span>'); // add !.
          }
        }
      }
    }

    if (!o.container) {
        calcPos(n, b);
    } else {
        o.container.height(b.height());
    }
    //$("div.tip-error-tooltip").css("visibility","hidden");
    var p = n.val();
    if (p.length < 1) {
      reset(b, o);
      n.trigger('scope.simplePassMeter', [0]);
      return;
    }

    // go through reqs
    var m = '';
    var re, rm;
    var rq = o.requirements;
    for (var k in rq) {
      if (rq[k] && rq[k].value) {
        if (rq[k].regex && rq[k].regex.length > 0) {
          re = new RegExp(rq[k].regex);
          if (!re.test(p)) {
            if (m.length > 0) { m += '<br />'; }
            // use %V in message for value of requirement
            m += rq[k].message.replace('%V', rq[k].value);
          }
        } else if (rq[k].callback && $.isFunction(rq[k].callback)) {
          if (!rq[k].callback(p, rq[k].value)) {
            if (m.length > 0) { m += '<br />'; }
            // use %V in message for value of requirement
            m += rq[k].message.replace('%V', rq[k].value);
          }
        }
      }
    }

    // go through strength checks if passed reqs
    var s = 0;
    for (var t in strength) {
      s += strength[t](p);
    }

    // round score and cap it at 100
    s = Math.min(Math.round(s), 100);

    setMeterUI(b, s, o, (m.length > 0) ? m : null);
    n.trigger('scope.simplePassMeter', [s]);
  }

  var letters = "abcdefghijklmnopqrstuvwxyz";
  var strength = {
    'testNumChars': function (p) {
      return (p.length * 4);
    },

    'testUpper': function (p) {
      var m = p.match(/[A-Z]/g);
      if (m) {
        return ((m.length - 1) * 3);
      }
      return 0;
    },

    'testLower': function (p) {
      var m = p.match(/[a-z]/g);
      if (m) {
        return ((m.length - 1) * 3);
      }
      return 0;
    },

    'testLettersOnly': function (p) {
      if (/^[a-zA-Z]+$/.test(p)) {
        return p.length * -1;
      }
      return 0;
    },

    'testNumbers': function (p) {
      var m = p.match(/[0-9]/g);
      if (m) {
        return ((m.length - 1) * 3);
      }
      return 0;
    },

    'testNumbersOnly': function (p) {
      if (/^[0-9]+$/.test(p)) {
        return p.length * -1;
      }
      return 0;
    },

    'testSpecial': function (p) {
      var m = p.match(/[^a-zA-Z0-9]/g);
      if (m) {
        return (m.length * 6.5);
      }
      return 0;
    },

    'testSequentialAndConsecutive': function (p) {
      var m = [];
      var ch = p.split('');
      var hl = '', hn = '', hsl = '', hsn = '';
      var cn, ln, lli, cli;
      for (var i = 0, l = ch.length; i < l; ++i) {
        cn = Number(ch[i]);

        // We have a number
        if (cn) {
          if (hl.length > 0) { m.push(hl); } // store letter match
          if (hsl.length > 2) { m.push(hsl); } // store seq letter match
          hl = hsl = ''; // reset letter strings
          hn += '' + cn;

          if (hsn.length == 0) {
            hsn += '' + cn;
          } else {
            ln = Number(hsn.substr(hsn.length - 1));
            if (cn == (ln + 1) || cn == (ln - 1)) {
              // we have a sequence
              hsn += '' + cn;
            }
          }

          // We have a letter
        } else if (letters.indexOf(ch[i]) > -1) {
          if (hn.length > 0) { m.push(hn); } // store number match
          if (hsn.length > 2) { m.push(hsn); } // store seq number match
          hn = hsn = ''; // reset number strings

          hl += ch[i];

          if (hsl.length == 0) {
            hsl += ch[i];
          } else {
            lli = letters.indexOf(hsn.substr(hsn.length - 1));
            cli = letters.indexOf(ch[i]);
            if (cli == (lli + 1)) {
              // we have a sequence
              hsl += ch[i];
            }
          }
        }
      }
      if (hn.length > 0) { m.push(hn); } // store last number match
      if (hl.length > 0) { m.push(hl); } // store last letter match

      var c = 0;
      for (var i = 0, l = m.length; i < l; ++i) {
        c -= ((m[i].length - 1) * 2);
      }
      return c;
    },

    'testRepeat': function (p) {
      var c = 0;
      var m = p.match(/(.)\1+/g);
      if (m) {
        for (var i = 0, l = m.length; i < l; ++i) {
          c -= ((m[i].length - 1) * 2);
        }
      }
      return c;
    }
  };

  function reset(b, o) {
    var c = '';
    for (var i = 0, l = o.ratings.length; i < l; ++i) {
      c += o.ratings[i].className + ' ';
    }
    b.removeClass(c)
     .find('.simplePassMeterProgress')
       .css('width', '0%')
       .end()
     .find('.simplePassMeterText')
       .text(o.defaultText);
  }

  function setMeterUI(b, pct, o, m) {
    pct = (Number(pct)) ? pct : 0;
    pct = Math.min(Math.max(pct, 0), 100);
    m = (typeof m == 'string') ? m : null;

    b.find('.simplePassMeterProgress')
      .css('width', pct + '%');

    // Determine all classes and score class
    var c = '';
    var r = 0;
    for (var i = 0, l = o.ratings.length; i < l; ++i) {
      c += o.ratings[i].className + ' ';
      if (pct >= o.ratings[i].minScore) {
        r = i;
      }
    }
    b.removeClass(c);

    // Only use score class if message not set (which means we failed reqs)
    if (!m) {
      b.addClass(o.ratings[r].className);
    } else {
      // Didn't pass reqs, always lowest score class
      b.addClass(o.ratings[0].className);
    }

    b.find('.simplePassMeterText')
      .html(((m) ? m : o.ratings[r].text));
  }


  // ----------- Static properties ----------- //

  $.fn.simplePassMeter.uid = 0;
  $.fn.simplePassMeter.defaults = {
    'showOnFocus': false,               // BOOLEAN If true, only shows the password strength meter UI when the field is focused
    'showOnValue': false,               // BOOLEAN If true, only shows the password strength meter UI when the field has some value (in other words, once the user has typed something), this is regardless of any focus
    'location': 'r',                    // STRING  Location of the meter UI, one of 't'op, 'b'ottom, 'l'eft, or 'r'ight. NOTE that 't'op is not very reliably placed, and could overflow into your field.
    'offset': 3,                        // NUMBER  Pixels that the meter UI is offset from the password field.
    'container': null,                  // STRING  jQuery selector for the containing element you want the UI to be in. NOTE: this disables absolute positioning and thus makes the 'location' and 'offset' fields obsolete.
    'defaultText': 'Password Strength', // STRING  Text to show in password strength meter when no password is typed (i.e. user hasn't started typing yet)

    'requirements': {                   // OBJECT  All requirements that the password must fulfill.
      //         Each requirement should have a unique key, and be itself an object with various members (see below). You can specify only some of the members in order to use the other default members; for example, specify the "minLength" requirement, but only the "value" member thus using the default "callback" function.
      'minLength': {
        'value': 8,                     // VARIOUS  The value for any requirement must evaluate to true (hence no zeros, no false, no null), but can be requirement-specific as in the "minLength" case.
        'callback': function (p, v) {    // FUNCTON  If a requirement specifies a "callback" then this function will be called with two arguments - the input from the user and value for this requirement option - to test whether the current input fulfills the requirement. The function should return the boolean true if it does, false otherwise.
          p = '' + p;
          if (p.length >= v) {
            return true;
          }
          return false;
        },
        'message': 'Passwords need to be %V characters or more' // STRING  The message to display to the user if they do not meet the requirement. It can contain the special sequence %V which will be replaced by the value parameter for this requirement.
      },
      'noMatchField': {
        'value': null,                // STRING  The jQuery search string for the node to restrict on
        'callback': function (p, v) {
          v = $(v).val();
          if (v && v.length && p.indexOf(v) > -1) {
            return false;
          }
          return true;
        },
        'message': 'Your password cannot contain your username'
      },
      'matchField': {
        'value': null,                // STRING  The jQuery search string for the node to restrict on
        'callback': function (p, v) {
          v = $(v);
          var m = v.val();
          var d = (v.attr('active') && (m && m.length > 0)) ? 1 : 0;
          if (d && m != p) {
            return false;
          }
          return true;
        },
        'message': 'The two passwords you entered don\'t match'
      },

      // Note the remainder of the requirements use a "regex" option versus a "callback" option. If the user's input matches the regex, the requirement is considered passed.
      'letters': { 'value': true, 'regex': '[a-zA-Z]+', 'message': 'You must have at least one letter' },
      'numbers': { 'value': true, 'regex': '[0-9]+', 'message': 'You must have at least one number' },

      // These requirements are turned off by default
      'lower': { 'value': false, 'regex': '[a-z]+', 'message': 'You must have at least one lower case letter' },
      'upper': { 'value': false, 'regex': '[A-Z]+', 'message': 'You must have at least one upper case letter' },
      'special': { 'value': false, 'regex': '[^a-zA-Z0-9]+', 'message': 'You must have at least one special character' }
    },

    'ratings': [                              // ARRAY   The categories for the ratings. When an input hits the "minScore" for a given rating, its values will be used. NOTE THAT THESE MUST BE IN ORDER BY THE "minScore" ATTRIBUTE.
      {
        'minScore': 0,                         // NUMBER  The minimum score to hit to trigger this rating.
        'className': 'meterFail',              // STRING  The CSS class to place on the "simplePassMeter" div when this rating is used.
        'text': 'You need a stronger password' // STRING  The text to place in the meter UI when this rating is triggered.
      },
      {
        'minScore': 25,
        'className': 'meterWarn',
        'text': 'Your password is a bit weak'
      },
      {
        'minScore': 50,
        'className': 'meterGood',
        'text': 'Your password is good'
      },
      {
        'minScore': 75,
        'className': 'meterExcel',
        'text': 'Great password!'
      }
    ]
  };


})(jQuery);