/// <reference path="../references.ts" />
module Directives {
    export class videoobj {
        static $inject = ['$compile']
        constructor($compile: ng.ICompileService) {
            var directive: ng.IDirective =
                {
                    link: function ($scope, iElement, iAttrs) {
                        var videoobj = angular.element('<iframe width = "auto" height = "auto" src = "https://www.youtube.com/embed/MI6fDPRz_f4" allowfullscreen frameborder = "0" >< / iframe >');
                        iElement.append(videoobj);

                    }
                }
            return directive;
        }
    }
}

angular.module('Directives', []).directive('videoobj', ['$compile', ($compile) => {
    return new Directives.AutoWidth($compile);
}]);