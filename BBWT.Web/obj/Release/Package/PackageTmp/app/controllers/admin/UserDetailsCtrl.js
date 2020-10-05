/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var UserDetailsCtrl = (function () {
        function UserDetailsCtrl($scope, $http, $routeParams, $location, dict) {
            var _this = this;
            $scope['UserDetailsCtrl'] = this;
            dict.GetAllGroups().then(function (data) { return _this.AllGroups = data; });
            dict.GetAllRoles().then(function (data) { return _this.AllRoles = data; });
            dict.GetAllPermissions().then(function (data) { return _this.AllPermissions = data; });
            $http.get('api/users/GetUserById/' + $routeParams['id'])
                .success(function (data) {
                _this.User = data;
            });
            this.Save = function (user) {
                $http.post('api/users/SaveUser', user)
                    .success(function () { return $location.path('/admin/users'); });
            };
            this.Cancel = function () {
                $location.path('/admin/users');
            };
            this.IsChecked = function (item) {
                return item.IsChecked;
            };
            this.IsNotChecked = function (item) {
                return !item.IsChecked;
            };
            this.SetChecked = function (selectedPermission) {
                _this.selectedPermission = selectedPermission;
                _this.PermissionValues = null;
                $scope['selectedValue'] = null;
                if (_this.AllPermissions[selectedPermission].HasParameter) {
                    $http.post('api/permissions/GetParameterValues/' + selectedPermission, null).success(function (data) {
                        $("#valueListWindow").data("kendoWindow").center().open();
                        _this.PermissionValues = data;
                    });
                }
                else {
                    _this.AddPermission(null);
                }
            };
            this.AddPermission = function (selectedValue) {
                angular.forEach(_this.User.Permissions, function (item, key) {
                    if (item.Id === _this.selectedPermission) {
                        item.IsChecked = true;
                        item.Param = selectedValue;
                    }
                }, _this);
                $("#valueListWindow").data("kendoWindow").close();
            };
            this.DeletePermission = function (selectedPermission) {
                angular.forEach(_this.User.Permissions, function (item, key) {
                    if (item.Id === selectedPermission) {
                        item.IsChecked = false;
                        item.Param = null;
                    }
                });
            };
            this.SendPasswordReset = function (user) {
                $http.post('api/users/SendPasswordResetByAdmin', { Email: user.Name })
                    .success(function () {
                    _this.PasswordResetSent = true;
                    $scope.$apply();
                });
            };
        }
        UserDetailsCtrl.$inject = ['$scope', '$http', '$routeParams', '$location', 'DictSvc'];
        return UserDetailsCtrl;
    })();
    Controllers.UserDetailsCtrl = UserDetailsCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=UserDetailsCtrl.js.map