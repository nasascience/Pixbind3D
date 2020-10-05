/// <reference path="../references.ts" />
var Directives;
(function (Directives) {
    var videoobj = (function () {
        function videoobj($compile) {
            var directive = {
                link: function ($scope, iElement, iAttrs) {
                    var videoobj = angular.element('<iframe width = "auto" height = "auto" src = "https://www.youtube.com/embed/MI6fDPRz_f4" allowfullscreen frameborder = "0" >< / iframe >');
                    iElement.append(videoobj);
                }
            };
            return directive;
        }
        videoobj.$inject = ['$compile'];
        return videoobj;
    })();
    Directives.videoobj = videoobj;
})(Directives || (Directives = {}));
angular.module('Directives', []).directive('videoobj', ['$compile', function ($compile) {
        return new Directives.AutoWidth($compile);
    }]);
//# sourceMappingURL=VideoObj.js.map