/// <reference path="../references.ts" />
module Directives {
    export class ProductView {
        constructor() {
            var directive: ng.IDirective =
                {
                    restrict: "E",
                    transclude: true,
                    templateUrl: "app/directives/Product_View.html",
                    controller: "ProductsCtrl"
                }
            return directive;
        }
    }
}

angular.module('Directives', []).directive('productview',() => {
    return new Directives.ProductView();
}); 