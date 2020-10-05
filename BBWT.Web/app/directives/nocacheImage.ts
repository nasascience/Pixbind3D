/// <reference path="../references.ts" />
module Directives {
    export class NocacheImage {        
        constructor() {
            var directive: ng.IDirective =
                {
                    link: (scope, elem, attrs, ctrl) => {
                        if (elem[0].src == null || elem[0].src.indexOf('?v=') == -1) {
                            elem[0].src = attrs["nocache"] + '?v=' + version;
                        }                        
                    }
                }
            return directive;
        }
    }
}

angular.module('Directives', []).directive('nocache', () => {
    return new Directives.NocacheImage();
});