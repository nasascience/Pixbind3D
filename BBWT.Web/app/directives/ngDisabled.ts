/// <reference path="../references.ts" />
module Directives {
    export class ngDisabled {
        constructor() {
            var directive: ng.IDirective =
                {
                    restrict: "A",
                    priority: 99,
                    link: ($scope, element, attrs) => {
                        $scope.$watch(attrs['ngDisabled'], (value) => {
                            if (value) {
                                element.addClass('k-state-disabled');
                            }
                            else {
                                element.removeClass('k-state-disabled');
                            }
                        });
                    }
                }
            return directive;
        }
    }
}

// This directive runs alongside native angular 'ng-disabled' directive and adds 'k-state-disabled' class if needed.
angular.module('Directives', []).directive('ngDisabled', [() => {
    return new Directives.ngDisabled();
}]);
