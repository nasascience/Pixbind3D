var system = require('system');
if (system.args.length === 1) {
	console.log('Try to pass some args when invoking this script!');
} else {
	var page = require('webpage').create();

	page.open(system.args[1], function(status) {
		//console.log('status=' + status);
		if (status !== 'success') {
			console.log('Unable to access network');
		} else {
		    var delay;
		    var save = "";
		    var checker = function () {
				var html = page.evaluate(function() {
					//var body = document.getElementsByTagName('body')[0];
		          	//if(body.getAttribute('data-status') == 'ready') {
		            		return document.getElementsByTagName('html')[0].outerHTML;
		          	//}
				});
				if (html) {
				    if (html.length == save.length) {
				        clearTimeout(delay);
				        console.log(html);
				        phantom.exit();
				    } else {
				        save = html;
				    }
				}
			};
			delay = setInterval(checker, 300);
		}
	});
}
