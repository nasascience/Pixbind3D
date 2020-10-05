/// <reference path="../references.ts" />
var Directives;
(function (Directives) {
    var LoginD = (function () {
        function LoginD() {
            var directive = {
                restrict: "E",
                transclude: true,
                templateUrl: "app/directives/Login_dir.html",
                controller: "LoginCtrl"
            };
            return directive;
        }
        return LoginD;
    })();
    Directives.LoginD = LoginD;
})(Directives || (Directives = {}));
angular.module('Directives', []).directive('logind', function () {
    return new Directives.LoginD();
});
//# sourceMappingURL=LoginDir.js.map