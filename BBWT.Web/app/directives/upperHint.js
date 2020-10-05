/// <reference path="../references.ts" />
var Directives;
(function (Directives) {
    var UpperHint = (function () {
        function UpperHint($compile) {
            var directive = {
                restrict: "A",
                link: function (scope, element, attrs, ctrl) {
                    function buildUpperHintTag(element, attributes) {
                        var htmlTag = null;
                        if (attributes.placeholder && attributes.placeholder != '') {
                            var tag = '<label class="label-upper-hint ng-hide"></label>';
                            htmlTag = angular.element(tag);
                            htmlTag.text(attributes.placeholder);
                            if (attributes.name) {
                                htmlTag.attr('for', attributes.name);
                            }
                            var upperHintBehaviour = attributes.upperHint;
                            if (upperHintBehaviour == 'always') {
                                htmlTag.attr('ng-show', true);
                                element.attr('placeholder', '');
                            }
                            else {
                                if (attributes.ngModel && attributes.ngModel != '') {
                                    htmlTag.attr('ng-show', attributes.ngModel + " != null && " + attributes.ngModel + " != ''");
                                }
                                else {
                                    htmlTag.attr('ng-show', true);
                                    element.attr('placeholder', '');
                                }
                            }
                        }
                        return htmlTag;
                    }
                    var tag = buildUpperHintTag(element, attrs);
                    if (tag != null) {
                        var linkTag = $compile(tag);
                        linkTag(scope);
                        $(element).before(tag);
                    }
                }
            };
            return directive;
        }
        UpperHint.$inject = ['$compile'];
        return UpperHint;
    })();
    Directives.UpperHint = UpperHint;
})(Directives || (Directives = {}));
angular.module('Directives', []).directive('upperHint', ['$compile', function ($compile) {
        return new Directives.UpperHint($compile);
    }]);
//# sourceMappingURL=upperHint.js.map