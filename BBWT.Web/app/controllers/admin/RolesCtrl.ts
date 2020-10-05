/// <reference path="../../references.ts" />
module Controllers {
    export class RolesCtrl {
        RolesDS: kendo.data.DataSource;
        GridOptions: kendo.ui.GridOptions;

        ViewDetails: (id: number) => void;
        DeleteRole: (id: number) => void;
        ApplyFilter: () => void;
        ResetFilter: () => void;
        Filter: any;

        static $inject: Array<string> = ['$scope', '$location', '$http'];
        constructor($scope: ng.IScope, $location: ng.ILocationService, $http: ng.IHttpService) {
            $scope['RolesCtrl'] = this;

            this.RolesDS = new kendo.data.DataSource({
                type: "odata",
                transport: {
                    read: {
                        url: "odata/RolesOData",
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
                    { field: "Name", title: "Role Name" },
                    {
                        field: "Id", title: " ", width: "100px", sortable: false,
                        template: "<a ng-click=\"RolesCtrl.ViewDetails(#= Id #)\">Edit</a> <a ng-click=\"RolesCtrl.DeleteRole(#= Id #)\">Delete</a>"
                    }],
                sortable: true
            }

            this.ViewDetails = (id: number) => $location.path('/admin/roles/' + id);
            this.DeleteRole = (id: number) => {
                Dialogs.showConfirmation({ message: "Are you sure?" }).done(() => {
                    $http.get('api/roles/DeleteRole/' + id)
                        .success(() => this.RolesDS.read());
                });
            }

            this.ApplyFilter = () => {
                var filterConditions = [];

                if (this.Filter.Name) {
                    filterConditions.push({ field: 'Name', operator: 'contains', value: this.Filter.Name });
                }

                this.RolesDS.filter(filterConditions);
            }

            this.ResetFilter = () => {
                this.Filter = {};
                this.RolesDS.filter([]);
            }
        }
    }
}