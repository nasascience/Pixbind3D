/// <reference path="../references.ts" />
module Directives {
    export class Cart {
        constructor() {
            var directive: ng.IDirective =
                {
                    restrict: "E",
                    transclude: true,
                    templateUrl: "app/directives/Cart.html",
                    controller: "ProductsCtrl"
                }
            return directive;
        }
    }
}

angular.module('Directives', []).directive('cart',() => {
    return new Directives.Cart();
});  