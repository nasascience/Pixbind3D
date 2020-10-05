/// <reference path="../references.ts" />
module Directives {
    export class CheckoutForm {
        constructor() {
            var directive: ng.IDirective =
                {
                    restrict: "E",
                    transclude: true,
                    templateUrl: "app/directives/CheckoutForm.html",
                    controller: "ProductsCtrl"
                }
            return directive;
        }
    }
}

angular.module('Directives', []).directive('checkoutform',() => {
    return new Directives.CheckoutForm();
}); 