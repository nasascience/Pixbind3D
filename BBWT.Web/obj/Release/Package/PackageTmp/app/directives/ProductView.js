/// <reference path="../references.ts" />
var Directives;
(function (Directives) {
    var ProductView = (function () {
        function ProductView() {
            var directive = {
                restrict: "E",
                transclude: true,
                templateUrl: "app/directives/Product_View.html",
                controller: "ProductsCtrl"
            };
            return directive;
        }
        return ProductView;
    })();
    Directives.ProductView = ProductView;
})(Directives || (Directives = {}));
angular.module('Directives', []).directive('productview', function () {
    return new Directives.ProductView();
});
//# sourceMappingURL=ProductView.js.map