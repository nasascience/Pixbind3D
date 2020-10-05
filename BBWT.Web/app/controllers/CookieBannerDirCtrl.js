/// <reference path="../references.ts" />
var Controllers;
(function (Controllers) {
    var CookieBannerDirCtrl = (function () {
        function CookieBannerDirCtrl($scope) {
            var _this = this;
            $scope['CookieBannerDirCtrl'] = this;
            this.HideBanner = function () {
                _this.ShowCookieBanner = false;
                _this.SetPermanentCookie('CookieBannerShown', 'true');
            };
            this.ShowCookieBanner = this.GetCookie('CookieBannerShown') === null;
        }
        CookieBannerDirCtrl.prototype.GetCookie = function (cookieName) {
            if (document.cookie && document.cookie != '') {
                var i, c = document.cookie.split(';');
                cookieName += '=';
                for (i = 0; i < c.length; i++) {
                    c[i] = $.trim(c[i]);
                    if (c[i].substring(0, cookieName.length) == cookieName) {
                        return decodeURIComponent(c[i].substring(cookieName.length));
                    }
                }
            }
            return null;
        };
        CookieBannerDirCtrl.prototype.SetPermanentCookie = function (cookieName, value) {
            var o = {
                expires: new Date(),
                domain: '',
                path: '/',
                secure: false
            };
            // We set cookie expiration date 3 years from now.
            o.expires.setTime(o.expires.getTime() + (3 * 24 * 60 * 60 * 1000 * 365));
            document.cookie = cookieName + '=' + encodeURIComponent(value) + '; expires='
                + o.expires.toUTCString() + (o.path ? '; path=' + o.path : '')
                + (o.domain ? '; domain=' + o.domain : '') + (o.secure ? '; secure' : '');
        };
        CookieBannerDirCtrl.$inject = ['$scope'];
        return CookieBannerDirCtrl;
    })();
    Controllers.CookieBannerDirCtrl = CookieBannerDirCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=CookieBannerDirCtrl.js.map