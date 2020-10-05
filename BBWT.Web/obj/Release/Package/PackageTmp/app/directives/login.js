/// <reference path="../references.ts" />
var Directives;
(function (Directives) {
    var Login = (function () {
        function Login() {
            var directive = {
                restrict: "E",
                transclude: true,
                templateUrl: "app/directives/login_control.html",
                controller: "LoginDirCtrl"
            };
            return directive;
        }
        return Login;
    })();
    Directives.Login = Login;
})(Directives || (Directives = {}));
angular.module('Directives', []).directive('login', function () {
    return new Directives.Login();
});
//# sourceMappingURL=login.js.map