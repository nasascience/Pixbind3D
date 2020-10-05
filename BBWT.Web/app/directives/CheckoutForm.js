/// <reference path="../references.ts" />
var Directives;
(function (Directives) {
    var CheckoutForm = (function () {
        function CheckoutForm() {
            var directive = {
                restrict: "E",
                transclude: true,
                templateUrl: "app/directives/CheckoutForm.html",
                controller: "ProductsCtrl"
            };
            return directive;
        }
        return CheckoutForm;
    })();
    Directives.CheckoutForm = CheckoutForm;
})(Directives || (Directives = {}));
angular.module('Directives', []).directive('checkoutform', function () {
    return new Directives.CheckoutForm();
});
//# sourceMappingURL=CheckoutForm.js.map