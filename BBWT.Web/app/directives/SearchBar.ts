/// <reference path="../references.ts" />
module Directives {
    export class SearchBar {
        constructor() {
            var directive: ng.IDirective =
                {
                    restrict: "E",
                    transclude: true,
                    templateUrl: "app/directives/SearchBar.html",
                    controller: "ProductsCtrl"
                }
            return directive;
        }
    }
}

angular.module('Directives', []).directive('searchbar',() => {
    return new Directives.SearchBar();
});   