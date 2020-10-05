/// <reference path="../references.ts" />
var Directives;
(function (Directives) {
    var CookieBanner = (function () {
        function CookieBanner() {
            var directive = {
                restrict: "E",
                replace: true,
                templateUrl: "app/directives/cookie_banner.html",
                controller: "CookieBannerDirCtrl"
            };
            return directive;
        }
        return CookieBanner;
    })();
    Directives.CookieBanner = CookieBanner;
})(Directives || (Directives = {}));
angular.module('Directives', []).directive('cookieBanner', function () {
    return new Directives.CookieBanner();
});
//# sourceMappingURL=cookieBanner.js.map