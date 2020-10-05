/// <reference path="../references.ts" />
var Directives;
(function (Directives) {
    var autofillable = (function () {
        function autofillable($timeout) {
            var directive = {
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
            };
            return directive;
        }
        autofillable.$inject = ['$timeout'];
        return autofillable;
    })();
    Directives.autofillable = autofillable;
})(Directives || (Directives = {}));
angular.module('Directives', []).directive('autofillable', ['$timeout', function ($timeout) {
        return new Directives.autofillable($timeout);
    }]);
//# sourceMappingURL=autofillable.js.map