/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var RoleDetailsCtrl = (function () {
        function RoleDetailsCtrl($scope, $location, $http, $routeParams, dict) {
            $scope['RoleDetailsCtrl'] = this;
            var applyPermissionCheckBoxBehavior = function () {
                var grid = $('#permissionsGrid').data('kendoGrid');
                grid.tbody.on('change', 'input[type=checkbox]', function (e) {
                    var row = $(e.target).closest("tr");
                    var item = grid.dataItem(row);
                    angular.forEach($scope.Role.Permissions, function (val, key) {
                        if (val.Id == item['Id']) {
                            val.IsChecked = $(e.target).is(":checked") ? true : false;
                            item.set("IsChecked", $(e.target).is(":checked") ? true : false);
                        }
                    });
                    $scope.$apply();
                });
            };
            var applyUserCheckBoxBehavior = function () {
                var grid = $('#usersGrid').data('kendoGrid');
                grid.tbody.on('change', 'input[type=checkbox]', function (e) {
                    var row = $(e.target).closest("tr");
                    var item = grid.dataItem(row);
                    angular.forEach($scope.Role.Users, function (val, key) {
                        if (val.Name == item['Name']) {
                            val.IsChecked = $(e.target).is(":checked") ? true : false;
                            item.set("IsChecked", $(e.target).is(":checked") ? true : false);
                        }
                    });
                    $scope.$apply();
                });
            };
            $scope.PermissionsGridDS = new kendo.data.DataSource({});
            $scope.UsersGridDS = new kendo.data.DataSource({});
            dict.GetAllPermissions().then(function (data) {
                $scope.AllPermissions = data;
                if ($scope.Role.Permissions == null) {
                    $scope.Role.Permissions = [];
                    angular.forEach($scope.AllPermissions, function (val, key) { return $scope.Role.Permissions.push({ Id: val.Id, IsChecked: false, Name: val.Name }); });
                    $scope.PermissionsGridDS.data($scope.Role.Permissions);
                    applyPermissionCheckBoxBehavior();
                }
            });
            if ($routeParams['id'] == 0) {
                $scope.Role = { Id: 0, IsParameterised: false };
                $http.get('api/users/GetAllUsers')
                    .success(function (data) {
                    $scope.Role.Users = [];
                    angular.forEach(data, function (val) {
                        $scope.Role.Users.push({ IsChecked: false, Name: val.Name, FullName: val.FullName });
                    });
                    $scope.PermissionsGridDS.data($scope.Role.Permissions);
                    $scope.UsersGridDS.data($scope.Role.Users);
                    applyPermissionCheckBoxBehavior();
                    applyUserCheckBoxBehavior();
                });
            }
            else {
                $http.get('api/roles/GetRoleById/' + $routeParams['id'])
                    .success(function (data) {
                    $scope.Role = data;
                    angular.forEach($scope.Role.Permissions, function (val, key) { return val.Name = $scope.AllPermissions[val.Id].Name; });
                    $scope.PermissionsGridDS.data($scope.Role.Permissions);
                    $scope.UsersGridDS.data($scope.Role.Users);
                    applyPermissionCheckBoxBehavior();
                    applyUserCheckBoxBehavior();
                });
            }
            $scope.PermissionsGridOptions =
                {
                    selectable: false,
                    columns: [
                        { field: "IsChecked", title: "Checked", template: "<input type=\"checkbox\" #= IsChecked ? checked='checked' : '' # />", width: '75px' },
                        { field: "Name", title: "Permission" }
                    ]
                };
            $scope.UsersGridOptions =
                {
                    selectable: false,
                    columns: [
                        { field: "IsChecked", title: "Checked", template: "<input type=\"checkbox\" #= IsChecked ? checked='checked' : '' # />", width: '75px' },
                        { field: "Name", title: "Email" },
                        { field: "FullName", title: "Name" }
                    ]
                };
            $scope.Save = function (data) {
                $http.post('api/Roles/SaveRole', data)
                    .success(function () { return $location.path('/admin/roles'); });
            };
            $scope.Cancel = function () { $location.path('/admin/roles'); };
            $scope.FilterPermissions = function (FilterPermissionsValue) {
                if (FilterPermissionsValue == '') {
                    $scope.PermissionsGridDS.filter([]);
                }
                else if (FilterPermissionsValue == 'true') {
                    $scope.PermissionsGridDS.filter([{ field: 'IsChecked', operator: 'eq', value: true }]);
                }
                else {
                    $scope.PermissionsGridDS.filter([{ field: 'IsChecked', operator: 'eq', value: false }]);
                }
                //$scope.PermissionsGridDS.fetch();
            };
        }
        RoleDetailsCtrl.$inject = ['$scope', '$location', '$http', '$routeParams', 'DictSvc'];
        return RoleDetailsCtrl;
    })();
    Controllers.RoleDetailsCtrl = RoleDetailsCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=RoleDetailsCtrl.js.map