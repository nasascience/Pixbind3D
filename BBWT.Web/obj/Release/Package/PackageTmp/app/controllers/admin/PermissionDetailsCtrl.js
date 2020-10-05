/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var PermissionDetailsCtrl = (function () {
        function PermissionDetailsCtrl($scope, $location, $http, $routeParams) {
            var _this = this;
            $scope['PermissionDetailsCtrl'] = this;
            if ($routeParams['id'] == 0) {
                this.Permission = { Id: 0, IsParameterised: false };
            }
            else {
                $http.get('api/permissions/GetPermissionById/' + $routeParams['id'])
                    .success(function (data) { return _this.Permission = data; });
            }
            this.Save = function (data) {
                $http.post('api/permissions/SavePermission', data)
                    .success(function () { return $location.path('/admin/permissions'); });
            };
            this.Cancel = function () { $location.path('/admin/permissions'); };
        }
        PermissionDetailsCtrl.$inject = ['$scope', '$location', '$http', '$routeParams'];
        return PermissionDetailsCtrl;
    })();
    Controllers.PermissionDetailsCtrl = PermissionDetailsCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=PermissionDetailsCtrl.js.map