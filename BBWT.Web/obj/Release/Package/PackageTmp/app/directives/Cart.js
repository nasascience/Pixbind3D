/// <reference path="../references.ts" />
var Directives;
(function (Directives) {
    var Cart = (function () {
        function Cart() {
            var directive = {
                restrict: "E",
                transclude: true,
                templateUrl: "app/directives/Cart.html",
                controller: "ProductsCtrl"
            };
            return directive;
        }
        return Cart;
    })();
    Directives.Cart = Cart;
})(Directives || (Directives = {}));
angular.module('Directives', []).directive('cart', function () {
    return new Directives.Cart();
});
//# sourceMappingURL=Cart.js.map