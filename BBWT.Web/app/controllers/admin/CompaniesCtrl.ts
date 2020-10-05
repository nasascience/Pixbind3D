/// <reference path="../../references.ts" />
module Controllers {
    export class CompaniesCtrl {
        CompaniesDS: kendo.data.DataSource;
        GridOptions: kendo.ui.GridOptions;

        ViewDetails: (id: number) => void;
        DeleteCompany: (id: number) => void;
        ApplyFilter: () => void;
        ResetFilter: () => void;
        Filter: any;

        static $inject: Array<string> = ['$scope', '$location', '$http'];
        constructor($scope: ng.IScope, $location: ng.ILocationService, $http: ng.IHttpService) {
            $scope['CompaniesCtrl'] = this;

            this.CompaniesDS = new kendo.data.DataSource({
                type: "odata",
                transport: {
                    read:
                    {
                        url: "odata/CompaniesOData",
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
                    { field: "CompanyName", title: "Company Name" },
                    { field: "UsersNum", title: "Users" },
                    {
                        field: "Id", title: " ", width: "100px", sortable: false,
                        template: "<a ng-click=\"CompaniesCtrl.ViewDetails(#= Id #)\">Edit</a> <a ng-click=\"CompaniesCtrl.DeleteCompany(#= Id #)\">Delete</a>"
                    }],
                sortable: true
            }

            this.ViewDetails = (id: number) => $location.path('/admin/companies/' + id);
            this.DeleteCompany = (id: number) => {
                Dialogs.showConfirmation({ message: "Are you sure?" }).done(() => {
                    $http.get('api/companies/DeleteCompany/' + id)
                        .success(() => this.CompaniesDS.read());
                });
            }


            this.ApplyFilter = () => {
                var filterConditions = [];

                if (this.Filter.Name) {
                    filterConditions.push({ field: 'CompanyName', operator: 'contains', value: this.Filter.Name });
                }

                this.CompaniesDS.filter(filterConditions);
            }

            this.ResetFilter = () => {
                this.Filter = {};
                this.CompaniesDS.filter([]);
            }
        }
    }
}