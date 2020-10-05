/// <reference path="../references.ts" />
var Directives;
(function (Directives) {
    var HasPermission = (function () {
        function HasPermission(AuthSvc) {
            var directive = {
                restrict: "A",
                link: function ($scope, element, attrs) {
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
            };
            return directive;
        }
        HasPermission.$inject = ['AuthSvc'];
        return HasPermission;
    })();
    Directives.HasPermission = HasPermission;
})(Directives || (Directives = {}));
angular.module('Directives', []).directive('permission', ['AuthSvc', function (AuthSvc) {
        return new Directives.HasPermission(AuthSvc);
    }]);
//# sourceMappingURL=hasPermission.js.map