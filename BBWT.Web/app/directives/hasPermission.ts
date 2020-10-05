/// <reference path="../references.ts" />
module Directives {
    export class HasPermission {
        static $inject = ['AuthSvc'];
        constructor(AuthSvc: Services.AuthSvc) {
            var directive: ng.IDirective =
                {
                    restrict: "A", 
                    link: ($scope, element, attrs) => {
                        if (!_.isString(attrs['permission'])) {
                            throw "hasPermission value must be a string";
                        }

                        var value = attrs['permission'].trim();
                        var notPermissionFlag = value[0] === '!';
                        if (notPermissionFlag) {
                            value = value.slice(1).trim();
                        }

                        function toggleVisibilityBasedOnPermission() {
                            var hasPermission = AuthSvc.hasPermission(value);

                            if (hasPermission && !notPermissionFlag || !hasPermission && notPermissionFlag)
                                element.show();
                            else
                                element.hide();
                        }
                        toggleVisibilityBasedOnPermission();
                        $scope.$on('auth:permissionsChanged', toggleVisibilityBasedOnPermission);
                    }
                }
            return directive;
        } 
    }
}

angular.module('Directives', []).directive('permission', ['AuthSvc', (AuthSvc) => {
    return new Directives.HasPermission(AuthSvc);
}]);
