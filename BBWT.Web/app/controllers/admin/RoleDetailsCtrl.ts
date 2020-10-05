/// <reference path="../../references.ts" />
module Controllers {
    export interface IRoleDetailsCtrl extends ng.IScope {
        Save: (data: any) => void;
        Cancel: () => void;
        Role: any;
        AllPermissions: any;
        AllUsers: any;
        PermissionsGridOptions: kendo.ui.GridOptions;
        PermissionsGridDS: kendo.data.DataSource;
        UsersGridOptions: kendo.ui.GridOptions;
        UsersGridDS: kendo.data.DataSource;
        FilterPermissions: any;
        FilterPermissionsValue: any;
    }

    export class RoleDetailsCtrl {
        static $inject: Array<string> = ['$scope', '$location', '$http', '$routeParams', 'DictSvc'];
        constructor(
            $scope: IRoleDetailsCtrl,
            $location: ng.ILocationService,
            $http: ng.IHttpService,
            $routeParams: ng.route.IRouteParamsService,
            dict: Services.DictSvc) {
            $scope['RoleDetailsCtrl'] = this;

            var applyPermissionCheckBoxBehavior = () => {
                var grid = $('#permissionsGrid').data('kendoGrid');
                grid.tbody.on('change', 'input[type=checkbox]', (e) => {
                    var row = $(e.target).closest("tr");
                    var item = grid.dataItem(row);
                    angular.forEach($scope.Role.Permissions, (val, key) => {
                        if (val.Id == item['Id']) {
                            val.IsChecked = $(e.target).is(":checked") ? true : false;
                            item.set("IsChecked", $(e.target).is(":checked") ? true : false);
                        }
                    });
                    $scope.$apply();
                })
            };

            var applyUserCheckBoxBehavior = () => {
                var grid = $('#usersGrid').data('kendoGrid');
                grid.tbody.on('change', 'input[type=checkbox]', (e) => {
                    var row = $(e.target).closest("tr");
                    var item = grid.dataItem(row);
                    angular.forEach($scope.Role.Users, (val, key) => {
                        if (val.Name == item['Name']) {
                            val.IsChecked = $(e.target).is(":checked") ? true : false;
                            item.set("IsChecked", $(e.target).is(":checked") ? true : false);
                        }
                    });
                    $scope.$apply();
                })
            };

            $scope.PermissionsGridDS = new kendo.data.DataSource({});
            $scope.UsersGridDS = new kendo.data.DataSource({});

            dict.GetAllPermissions().then((data) => {
                $scope.AllPermissions = data;

                if ($scope.Role.Permissions == null) {
                    $scope.Role.Permissions = [];
                    angular.forEach($scope.AllPermissions, (val, key) => $scope.Role.Permissions.push({ Id: val.Id, IsChecked: false, Name: val.Name }));
                    $scope.PermissionsGridDS.data($scope.Role.Permissions);

                    applyPermissionCheckBoxBehavior();
                }
            });

            if ($routeParams['id'] == 0) { 
                $scope.Role = { Id: 0, IsParameterised: false };
                $http.get('api/users/GetAllUsers')
                    .success((data) => {
                        $scope.Role.Users = [];
                        angular.forEach(data, (val) => { 
                            $scope.Role.Users.push({IsChecked: false, Name: val.Name, FullName: val.FullName });
                        });
                        $scope.PermissionsGridDS.data($scope.Role.Permissions);
                        $scope.UsersGridDS.data($scope.Role.Users);

                        applyPermissionCheckBoxBehavior();
                        applyUserCheckBoxBehavior();
                    });
            } else {
                $http.get('api/roles/GetRoleById/' + $routeParams['id'])
                    .success((data) => {
                        $scope.Role = data;
                        angular.forEach($scope.Role.Permissions, (val, key) => val.Name = $scope.AllPermissions[val.Id].Name);
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
            }

            $scope.UsersGridOptions =
            {
                selectable: false,
                columns: [
                    { field: "IsChecked", title: "Checked", template: "<input type=\"checkbox\" #= IsChecked ? checked='checked' : '' # />", width: '75px' },
                    { field: "Name", title: "Email" },
                    { field: "FullName", title: "Name" }
                ]
            }

            $scope.Save = (data) => {
                $http.post('api/Roles/SaveRole', data)
                    .success(() => $location.path('/admin/roles'));
            }
            $scope.Cancel = () => { $location.path('/admin/roles'); }

            $scope.FilterPermissions = (FilterPermissionsValue) => {
                if (FilterPermissionsValue == '') {
                    $scope.PermissionsGridDS.filter([]);
                } else if (FilterPermissionsValue == 'true') {
                    $scope.PermissionsGridDS.filter([{ field: 'IsChecked', operator: 'eq', value: true }]);
                } else { 
                    $scope.PermissionsGridDS.filter([{ field: 'IsChecked', operator: 'eq', value: false }]);
                }
                //$scope.PermissionsGridDS.fetch();
            }
        }
    }
}