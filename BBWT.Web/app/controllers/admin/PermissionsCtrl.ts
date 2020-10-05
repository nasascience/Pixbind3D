/// <reference path="../../references.ts" />
module Controllers {
    export class PermissionsCtrl {
        PermissionsDS: kendo.data.DataSource;
        GridOptions: kendo.ui.GridOptions;

        ViewDetails: (id: number) => void;
        DeletePermission: (id: number) => void;
        ApplyFilter: () => void;
        ResetFilter: () => void;
        Filter: any;

        static $inject: Array<string> = ['$scope', '$location', '$http'];
        constructor($scope: ng.IScope, $location: ng.ILocationService, $http: ng.IHttpService) {
            $scope['PermissionsCtrl'] = this;

            this.PermissionsDS = new kendo.data.DataSource({
                type: "odata",
                transport: {
                    read: {
                        url: "odata/PermissionsOData",
                        dataType: "json"
                    }
                },
                schema: {
                    data: function (data) {
                        return data["value"];
                    },
                    total: function (data) {
                        return data["odata.count"];
                    }
                },
                serverPaging: true,
                serverSorting: true,
                serverFiltering: true,
                pageSize: 5
            });

            this.GridOptions =
            {
                selectable: false,
                pageable: { refresh: true, pageSizes: true },
                columns: [{ field: "Id", title: "#", width: "50px" },
                    { field: "Code", title: "Permission Code" },
                    { field: "Name", title: "Permission Name" },
                    {
                        field: "Id", title: " ", width: "100px", sortable: false,
                        template: "<a ng-click=\"PermissionsCtrl.ViewDetails(#= Id #)\">Edit</a> <a ng-hide=\"#= Id<1000 #\" ng-click=\"PermissionsCtrl.DeletePermission(#= Id #)\">Delete</a>"
                    }],
                sortable: true
            }

            this.ViewDetails = (id: number) => $location.path('/admin/permissions/' + id);
            this.DeletePermission = (id: number) => {
                Dialogs.showConfirmation({ message: "Are you sure?" }).done(() => {
                    $http.get('api/permissions/DeletePermission/' + id)
                        .success(() => this.PermissionsDS.read());
                });
            }

            this.ApplyFilter = () => {
                var filterConditions = [];

                if (this.Filter.Name) {
                    filterConditions.push({ field: 'Name', operator: 'contains', value: this.Filter.Name });
                }

                this.PermissionsDS.filter(filterConditions);
            }

            this.ResetFilter = () => {
                this.Filter = {};
                this.PermissionsDS.filter([]);
            }
        }
    }
}