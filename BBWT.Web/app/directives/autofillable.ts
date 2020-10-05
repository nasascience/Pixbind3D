/// <reference path="../references.ts" />
module Directives {
    export class autofillable {
        static $inject = ['$timeout']
        constructor($timeout: ng.ITimeoutService) {
            var directive: ng.IDirective =
                {
                    scope: true,
                    require: 'ngModel',
                    link: function (scope, elem, attrs, ctrl) {
                        scope['check'] = function () {
                            var val = elem.val();
                            if (ctrl.$viewValue !== val) {
                                ctrl.$setViewValue(val);
                            }
                            $timeout(scope['check'], 300);
                        };
                        scope['check']();
                    }
                }
            return directive;
        }
    }
}

angular.module('Directives', []).directive('autofillable', ['$timeout', ($timeout) => {
    return new Directives.autofillable($timeout);
}]);