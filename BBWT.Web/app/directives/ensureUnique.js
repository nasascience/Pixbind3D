/// <reference path="../references.ts" />
var Directives;
(function (Directives) {
    var ensureUnique = (function () {
        function ensureUnique($http) {
            var directive = {
                require: 'ngModel',
                link: function (scope, ele, attrs, c) {
                    scope.$watch(attrs['ngModel'], function () {
                        $http({
                            method: 'POST',
                            url: '/api/check/IsUnique' + attrs['ensureUnique'],
                            data: { 'field': attrs['ensureUnique'], 'val': ele.value }
                        }).success(function (data, status, headers, cfg) {
                            c.$setValidity('unique', data.isUnique);
                        }).error(function (data, status, headers, cfg) {
                            c.$setValidity('unique', false);
                        });
                    });
                }
            };
            return directive;
        }
        ensureUnique.$inject = ['$http'];
        return ensureUnique;
    })();
    Directives.ensureUnique = ensureUnique;
})(Directives || (Directives = {}));
angular.module('Directives', []).directive('ensureUnique', ['$http', function ($http) {
        return new Directives.ensureUnique($http);
    }]);
//# sourceMappingURL=ensureUnique.js.map