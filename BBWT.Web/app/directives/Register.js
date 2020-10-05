/// <reference path="../references.ts" />
var Directives;
(function (Directives) {
    var Register = (function () {
        function Register() {
            var directive = {
                restrict: "E",
                transclude: true,
                templateUrl: "app/directives/Register.html",
                controller: "RegisterCtrl"
            };
            return directive;
        }
        return Register;
    })();
    Directives.Register = Register;
})(Directives || (Directives = {}));
angular.module('Directives', []).directive('register', function () {
    return new Directives.Register();
});
//# sourceMappingURL=Register.js.map