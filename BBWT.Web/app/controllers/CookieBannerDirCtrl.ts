/// <reference path="../references.ts" />
module Controllers {
    export class CookieBannerDirCtrl {
        ShowCookieBanner: boolean;
        HideBanner: () => void;

        static $inject: Array<string> = ['$scope'];
        constructor($scope: ng.IScope) {
            $scope['CookieBannerDirCtrl'] = this;

            this.HideBanner = () => {
                this.ShowCookieBanner = false;
                this.SetPermanentCookie('CookieBannerShown', 'true');
            }

            this.ShowCookieBanner = this.GetCookie('CookieBannerShown') === null;
        }

        GetCookie(cookieName: string): string {
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
        }

        SetPermanentCookie(cookieName: string, value: string): void {
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
        }
    }
}