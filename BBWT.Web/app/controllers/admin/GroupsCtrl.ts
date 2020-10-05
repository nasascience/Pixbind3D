/// <reference path="../../references.ts" />
module Controllers {
    export class GroupsCtrl {
        GroupsDS: kendo.data.DataSource;
        GridOptions: kendo.ui.GridOptions;

        ViewDetails: (id: number) => void;
        DeleteGroup: (id: number) => void;
        ApplyFilter: () => void;
        ResetFilter: () => void;
        Filter: any;

        static $inject: Array<string> = ['$scope', '$location', '$http'];
        constructor($scope: ng.IScope, $location: ng.ILocationService, $http: ng.IHttpService) {
            $scope['GroupsCtrl'] = this;

            this.GroupsDS = new kendo.data.DataSource({
                type: "odata",
                transport: {
                    read:
                    {
                        url: "odata/GroupsOData",
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
                    { field: "Name", title: "Group Name" },
                    {
                        field: "Id", title: " ", width: "100px", sortable: false,
                        template: "<a ng-click=\"GroupsCtrl.ViewDetails(#= Id #)\">Edit</a> <a ng-click=\"GroupsCtrl.DeleteGroup(#= Id #)\">Delete</a>"
                    }],
                sortable: true
            }

            this.ViewDetails = (id: number) => $location.path('/admin/groups/' + id);
            this.DeleteGroup = (id: number) => {
                Dialogs.showConfirmation({ message: "Are you sure?" }).done(() => {
                    $http.get('api/groups/DeleteGroup/' + id)
                        .success(() => this.GroupsDS.read());
                });
            }

            this.ApplyFilter = () => {
                var filterConditions = [];

                if (this.Filter.Name) {
                    filterConditions.push({ field: 'Name', operator: 'contains', value: this.Filter.Name });
                }

                this.GroupsDS.filter(filterConditions);
            }

            this.ResetFilter = () => {
                this.Filter = {};
                this.GroupsDS.filter([]);
            }
        }
    }
}