/// <reference path="../references.ts" />
var Directives;
(function (Directives) {
    var SearchBar = (function () {
        function SearchBar() {
            var directive = {
                restrict: "E",
                transclude: true,
                templateUrl: "app/directives/SearchBar.html",
                controller: "ProductsCtrl"
            };
            return directive;
        }
        return SearchBar;
    })();
    Directives.SearchBar = SearchBar;
})(Directives || (Directives = {}));
angular.module('Directives', []).directive('searchbar', function () {
    return new Directives.SearchBar();
});
//# sourceMappingURL=SearchBar.js.map