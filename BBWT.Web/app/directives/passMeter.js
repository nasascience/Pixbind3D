var Directives;
(function (Directives) {
    var PassMeter = (function () {
        function PassMeter() {
            var emailId = '#name';
            var userFirstnameId = '#firstName';
            var passwordId = '#pass';
            var confirmPasswordId = '#confirmPass';
            var directive = {
                restrict: 'EA',
                scope: true,
                require: 'ngModel',
                link: function (scope, elem, attrs, ngModelCtrl) {
                    elem.simplePassMeter({
                        'container': attrs["passMeter"],
                        //showOnFocus: true,
                        //showOnValue: true,
                        'requirements': {
                            'matchField': {
                                'value': (confirmPasswordId ? confirmPasswordId : null),
                                'message': 'The two passwords you entered do not match',
                                'callback': function (password, value) {
                                    if (!value)
                                        return true;
                                    value = $(value);
                                    var confirmPass = value.val();
                                    if (confirmPass == undefined)
                                        return true;
                                    return (confirmPass.length == 0 || password == confirmPass);
                                }
                            },
                            'noMatchField': {
                                'value': (userFirstnameId ? userFirstnameId : null)
                            },
                            'noMatchEmailField': {
                                'value': emailId ? emailId : null,
                                'message': 'Do not use any part of your email',
                                'callback': function (password, value) {
                                    if (!value)
                                        return true;
                                    value = $(value);
                                    var email = value.val();
                                    if (email == undefined)
                                        return true;
                                    email = email.match(/(.+)@(.+)\.(.{2,3})/);
                                    if (!email || email.length != 4)
                                        return true; // invalid email, so son't worry about it
                                    // If the password doesn't match the first or last part of the email address we're okay
                                    if (password.indexOf(email[0]) < 0 && password.indexOf(email[1]) < 0)
                                        return true;
                                    return false;
                                }
                            },
                            'minLength': {
                                'value': 6,
                                'callback': function (password, value) {
                                    return password.length >= value;
                                }
                            }
                        },
                        'ratings': [
                            {
                                'minScore': 0,
                                'className': 'meterFail',
                                'text': 'You need a stronger password'
                            },
                            {
                                'minScore': 10,
                                'className': 'meterWarn',
                                'text': 'You can do better than that...'
                            },
                            {
                                'minScore': 25,
                                'className': 'meterWarn',
                                'text': 'Your password is a bit weak'
                            },
                            {
                                'minScore': 40,
                                'className': 'meterGood',
                                'text': 'Good password, could be better'
                            },
                            {
                                'minScore': 60,
                                'className': 'meterGood',
                                'text': 'Good password!'
                            },
                            {
                                'minScore': 80,
                                'className': 'meterExcel',
                                'text': 'Awesome password!'
                            }
                        ],
                        css: { 'left': '15px' }
                    });
                    scope.$on('$destroy', function () {
                        var passmeters = $('.simplePassMeter');
                        $('.simplePassMeter').remove();
                    });
                    elem.bind('scope.simplePassMeter', function () {
                        scope.$apply(function () {
                            var valid = !$('.simplePassMeter').hasClass('meterFail');
                            ngModelCtrl.$setValidity('passMeter', valid);
                        });
                    });
                }
            };
            return directive;
        }
        return PassMeter;
    })();
    Directives.PassMeter = PassMeter;
})(Directives || (Directives = {}));
angular.module('Directives', []).directive('passMeter', [function () {
        return new Directives.PassMeter();
    }]);
//# sourceMappingURL=passMeter.js.map