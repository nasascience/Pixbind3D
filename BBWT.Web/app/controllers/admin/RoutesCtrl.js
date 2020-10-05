/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var RouteItem = (function () {
        function RouteItem() {
        }
        return RouteItem;
    })();
    Controllers.RouteItem = RouteItem;
    var RoutesCtrl = (function () {
        function RoutesCtrl($scope, $route, $http) {
            var _this = this;
            this.multiSelectEditor = function (container, options) {
                $('<input data-bind="value:' + options.field + '"/>')
                    .appendTo(container)
                    .kendoMultiSelect({
                    suggest: true,
                    dataSource: _this.roles
                });
            };
            this.routes = [];
            this.roles = [];
            angular.forEach($route.routes, function (config, route) {
                if (config.redirectTo == undefined) {
                    _this.routes.push({
                        Path: route,
                        Title: config.title,
                        Permission: config.permission,
                        Roles: []
                    });
                }
            });
            $http.post('/api/roles/GetRolePermissions', null).success(function (data) {
                angular.forEach(data, function (val, key) {
                    _this.roles.push(val.Role);
                    angular.forEach(_this.routes, function (route, rk) {
                        angular.forEach(val.Permissions, function (perm, pk) {
                            if (route.Permission == perm) {
                                route.Roles.push(val.Role);
                            }
                        });
                    });
                });
                $scope.RoutesGrid.dataSource = $scope.RoutesDS;
                $scope.RoutesDS.read(_this.routes);
            });
            $scope.RoutesDS = new kendo.data.DataSource({
                pageSize: 15,
                transport: {
                    read: function (options) { options.success(_this.routes); },
                    update: function (options) {
                        $http.post('/api/roles/UpdatePermissionRoles?code=' + options.data.Permission, options.data.Roles);
                        options.success(options.data);
                    }
                },
                schema: {
                    model: {
                        id: "Path",
                        fields: {
                            Path: {
                                editable: false,
                                type: 'string'
                            },
                            Title: {
                                editable: false,
                                type: 'string'
                            },
                            Permission: {
                                editable: false,
                                type: 'string'
                            }
                        }
                    }
                }
            });
            $scope.RoutesGrid = {
                selectable: false,
                pageable: { refresh: true, pageSizes: true },
                columns: [
                    { field: "Path" },
                    { field: "Title" },
                    { field: "Permission" },
                    {
                        field: "Roles",
                        editor: this.multiSelectEditor,
                        values: this.roles,
                        template: "#=Roles.join(', ')#"
                    },
                    {
                        width: '120px',
                        title: " ",
                        command: [{
                                name: 'edit'
                            }]
                    }
                ],
                edit: function (e) {
                    if (e.model['Permission'] == "authorized" || e.model['Permission'] == "everybody") {
                    }
                },
                sortable: true,
                editable: 'inline'
            };
            $scope.ApplyFilter = function () {
                var filterConditions = [];
                if ($scope.Filter.Path) {
                    filterConditions.push({ field: 'Path', operator: 'contains', value: $scope.Filter.Path });
                }
                if ($scope.Filter.Title) {
                    filterConditions.push({ field: 'Title', operator: 'contains', value: $scope.Filter.Title });
                }
                if ($scope.Filter.Permission) {
                    filterConditions.push({ field: 'Permission', operator: 'contains', value: $scope.Filter.Permission });
                }
                $scope.RoutesDS.filter(filterConditions);
            };
            $scope.ResetFilter = function () {
                $scope.Filter = {};
                $scope.RoutesDS.filter([]);
            };
        }
        RoutesCtrl.$inject = ['$scope', '$route', '$http'];
        return RoutesCtrl;
    })();
    Controllers.RoutesCtrl = RoutesCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=RoutesCtrl.js.map