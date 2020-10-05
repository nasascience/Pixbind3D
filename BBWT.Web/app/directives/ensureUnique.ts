/// <reference path="../references.ts" />
module Directives {
    export class ensureUnique {
        static $inject = ['$http'];
        constructor($http: ng.IHttpService){
            var directive: ng.IDirective =
                {
                    require: 'ngModel',
                    link: (scope, ele, attrs, c) => {
                        scope.$watch(attrs['ngModel'], () => {
                            $http({
                                method: 'POST',
                                url: '/api/check/IsUnique' + attrs['ensureUnique'],
                                data: { 'field': attrs['ensureUnique'], 'val': ele.value}
                            }).success(function (data, status, headers, cfg) {
                                    c.$setValidity('unique', data.isUnique);
                                }).error(function (data, status, headers, cfg) {
                                    c.$setValidity('unique', false);
                                });
                        });
                    }
                }
            return directive;
        }
    }
}

angular.module('Directives', []).directive('ensureUnique', ['$http', ($http) => {
    return new Directives.ensureUnique($http);
}]);
