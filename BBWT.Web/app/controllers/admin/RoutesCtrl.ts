/// <reference path="../../references.ts" />
module Controllers {
    export class RouteItem {
        Path: string;
        Title: string;
        Permission: string;
        Roles: string[];
    }

    export interface IRoutesScope {
        RoutesDS: kendo.data.DataSource;
        RoutesGrid: kendo.ui.GridOptions;
        ApplyFilter: () => void;
        ResetFilter: () => void;
        Filter: any;
    }

    export class RoutesCtrl {
        routes: RouteItem[];
        roles: string[];

        static $inject: Array<string> = ['$scope', '$route', '$http'];
        constructor($scope: IRoutesScope, $route: ng.route.IRouteService, $http: ng.IHttpService) {
            this.routes = [];
            this.roles = [];

            angular.forEach($route.routes, (config, route) => {
                if (config.redirectTo == undefined) {
                    this.routes.push({
                        Path: route,
                        Title: config.title,
                        Permission: config.permission,
                        Roles: []
                    });
                }
            });

            $http.post('/api/roles/GetRolePermissions', null).success(data => {
                angular.forEach(data, (val, key) => {
                    this.roles.push(val.Role);
                    angular.forEach(this.routes, (route, rk) => {
                        angular.forEach(val.Permissions, (perm, pk) => {
                            if (route.Permission == perm) {
                                route.Roles.push(val.Role);
                            }
                        });
                    });
                });
                $scope.RoutesGrid.dataSource = $scope.RoutesDS;
                $scope.RoutesDS.read(this.routes);
            });

            $scope.RoutesDS = new kendo.data.DataSource({
                pageSize: 15,
                transport: {
                    read: (options) => { options.success(this.routes); },
                    update: (options) => {
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
                            //template: '# if (true) { # <a class="k-button k-button-icontext k-grid-edit" href="\\#"><span class="k-icon k-edit"></span>Edit</a> # } #'
                        }]
                    }
                ],
                edit: (e) => {
                    if (e.model['Permission'] == "authorized" || e.model['Permission'] == "everybody"){
                        
                    }
                },
                sortable: true,
                editable: 'inline'
            };
     
        
        
            $scope.ApplyFilter = () => {
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
            }

            $scope.ResetFilter = () => {
                $scope.Filter = {};
                $scope.RoutesDS.filter([]);
            }  
        }

        multiSelectEditor = (container, options) => {
            $('<input data-bind="value:' + options.field + '"/>')
                .appendTo(container)
                .kendoMultiSelect({
                    suggest: true,
                    dataSource: this.roles
                });
        };
    }
}
