/// <reference path="../../references.ts" />
module Controllers {
    export class TemplatesCtrl {
        TemplatesDS: kendo.data.DataSource;
        GridOptions: kendo.ui.GridOptions;

        ViewDetails: (id: number) => void;
        Delete: (id: number) => void;
        Test: (id: number) => void;
        ApplyFilter: () => void;
        ResetFilter: () => void;
        Filter: any;

        static $inject: Array<string> = ['$scope', '$location', '$http'];
        constructor($scope: ng.IScope, $location: ng.ILocationService, $http: ng.IHttpService) {
            $scope['TemplatesCtrl'] = this;

            this.Filter = {};

            this.ApplyFilter = () => {
                var filterConditions = [];

                if (this.Filter.Code) {
                    filterConditions.push({ field: 'Code', operator: 'contains', value: this.Filter.Code });
                }

                if (this.Filter.Title) {
                    filterConditions.push({ field: 'Title', operator: 'contains', value: this.Filter.Title });
                }

                this.TemplatesDS.filter(filterConditions);
            }

            this.ResetFilter = () => {
                this.Filter = {};
                this.TemplatesDS.filter([]);
            }

            this.TemplatesDS = new kendo.data.DataSource({
                type: "odata",
                transport: {
                    read: {
                        url: "odata/TemplatesOData",
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
                pageSize: 10
            });

            this.GridOptions =
            {
                selectable: false,
                pageable: { refresh: true, pageSizes: true },
                columns: [{ field: "Code", title: "Code" },
                    { field: "Title", title: "Title" },
                    { field: "IsSystem", title: "Type", width: "100px", template: "#= IsSystem?\"System\":\"User\" #" },
                    { width: "100px", sortable: false, template: "<a ng-click=\"TemplatesCtrl.ViewDetails(#=Id#)\">Edit</a># if(!IsSystem){ # <a ng-click=\"TemplatesCtrl.Delete(#=Id#)\">Delete</a> #}#" }],
                sortable: true
            }

            this.ViewDetails = (id: number) => $location.path('/admin/templates/' + id);

            this.Delete = (id: number) => {
                Dialogs.showConfirmation({ message: "Are you sure?" }).done(() => {
                    $http.get('api/EmailTemplate/DeleteTemplate/' + id)
                        .success(() => this.TemplatesDS.read());
                });
            };
        }
    }
}