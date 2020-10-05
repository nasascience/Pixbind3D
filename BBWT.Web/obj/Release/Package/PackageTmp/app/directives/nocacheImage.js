/// <reference path="../references.ts" />
var Directives;
(function (Directives) {
    var NocacheImage = (function () {
        function NocacheImage() {
            var directive = {
                link: function (scope, elem, attrs, ctrl) {
                    if (elem[0].src == null || elem[0].src.indexOf('?v=') == -1) {
                        elem[0].src = attrs["nocache"] + '?v=' + version;
                    }
                }
            };
            return directive;
        }
        return NocacheImage;
    })();
    Directives.NocacheImage = NocacheImage;
})(Directives || (Directives = {}));
angular.module('Directives', []).directive('nocache', function () {
    return new Directives.NocacheImage();
});
//# sourceMappingURL=nocacheImage.js.map