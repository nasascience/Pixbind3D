/// <reference path="../references.ts" />
var Directives;
(function (Directives) {
    var AutoWidth = (function () {
        function AutoWidth($compile) {
            var directive = {
                restrict: "A",
                link: function (scope, element, attrs, ctrl) {
                    var inputs = element[0].getElementsByTagName('input');
                    if (inputs.length > 0) {
                        var input = angular.element(inputs[0]);
                        var placeholder = input.attr('placeholder');
                        if (placeholder && placeholder.length > 0) {
                            var htmlTag = angular.element("<span></span>");
                            htmlTag.css({
                                position: 'absolute',
                                left: -9999,
                                top: -9999,
                                border: 0,
                                margin: 0,
                                padding: 0,
                                outline: 0,
                                display: 'block',
                                'white-space': 'nowrap',
                                'font-name': input.css('font-name'),
                                'font-size': input.css('font-size'),
                                'font-weight': input.css('font-weight')
                            });
                            input.after(htmlTag);
                            htmlTag.text(placeholder);
                            var textWidth = htmlTag.width() + 30;
                            var elementWidth = element.width();
                            htmlTag.remove();
                            if (elementWidth < textWidth) {
                                element.width(textWidth);
                            }
                            htmlTag = null;
                        }
                    }
                }
            };
            return directive;
        }
        AutoWidth.$inject = ['$compile'];
        return AutoWidth;
    })();
    Directives.AutoWidth = AutoWidth;
})(Directives || (Directives = {}));
angular.module('Directives', []).directive('autoWidth', ['$compile', function ($compile) {
        return new Directives.AutoWidth($compile);
    }]);
//# sourceMappingURL=autoWidth.js.map