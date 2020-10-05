/// <reference path="../references.ts" />
var Directives;
(function (Directives) {
    var ngDisabled = (function () {
        function ngDisabled() {
            var directive = {
                restrict: "A",
                priority: 99,
                link: function ($scope, element, attrs) {
                    $scope.$watch(attrs['ngDisabled'], function (value) {
                        if (value) {
                            element.addClass('k-state-disabled');
                        }
                        else {
                            element.removeClass('k-state-disabled');
                        }
                    });
                }
            };
            return directive;
        }
        return ngDisabled;
    })();
    Directives.ngDisabled = ngDisabled;
})(Directives || (Directives = {}));
// This directive runs alongside native angular 'ng-disabled' directive and adds 'k-state-disabled' class if needed.
angular.module('Directives', []).directive('ngDisabled', [function () {
        return new Directives.ngDisabled();
    }]);
//# sourceMappingURL=ngDisabled.js.map