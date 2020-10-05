/// <reference path="../references.ts" />
var Services;
(function (Services) {
    var LoggerSvc = (function () {
        function LoggerSvc() {
            var errorLogs = [];
            this.add = function (exception, cause) {
                if (errorLogs.indexOf(exception.stack) === -1) {
                    errorLogs.push(exception.stack);
                    JL().error(exception);
                }
            };
            this.get = function () { return errorLogs; };
        }
        return LoggerSvc;
    })();
    Services.LoggerSvc = LoggerSvc;
})(Services || (Services = {}));
angular.module('Services', [])
    .factory('LoggerSvc', [function () { return new Services.LoggerSvc(); }]);
//# sourceMappingURL=LoggerSvc.js.map