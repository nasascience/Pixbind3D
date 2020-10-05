/// <reference path="../references.ts" />
module Directives {
    export class CookieBanner {
        constructor() {
            var directive: ng.IDirective =
                {
                    restrict: "E",
                    replace: true,
                    templateUrl: "app/directives/cookie_banner.html",
                    controller: "CookieBannerDirCtrl"
                }
            return directive;
        }
    }
}

angular.module('Directives', []).directive('cookieBanner', () => {
    return new Directives.CookieBanner();
});