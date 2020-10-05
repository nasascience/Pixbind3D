/// <reference path="../../references.ts" />
module Controllers {
    export class ReportsCtrl {
        ReportsDS: kendo.data.DataSource;
        GridOptions: kendo.ui.GridOptions;

        Filter: any;
        ApplyFilter: () => void;
        ResetFilter: () => void;     
        ViewDetails: (name: string) => void;  
        Edit: (name: string) => void;  
        CreateReport: () => void;
      
        static $inject: Array<string> = ['$scope', '$location', '$http'];
        constructor($scope: ng.IScope, $location: ng.ILocationService, $http: ng.IHttpService) {
            $scope['ReportsCtrl'] = this;
            this.Filter = {};

            this.ReportsDS = new kendo.data.DataSource({
                type: "odata",
                transport: {
                    read:
                    {
                        url: "odata/ReportsOData",
                        dataType: "json"
                    }
                },
                schema: {
                    data: data => data["value"],
                    total: data => data["odata.count"],
                    model: {
                        fields: {
                            Id: { type: "string" },
                            ReportName: { type: "string" },
                            Description: { type: "string" },
                            ReportPath: { type: "string" }
                        }
                    }
                },
                serverPaging: true,
                serverSorting: true,
                serverFiltering: true,
                pageSize: 10
            });

            this.GridOptions =
            {
                pageable: { refresh: true, pageSizes: true },
                columns: [
                    {
                        field: "Id", title: "Report Name", hidden:true
                    },
                    {
                        field: "ReportName", title: "Report Name"
                    },
                    {
                        field: "Description", title: "Description"
                    },
                    {
                        field: "ReportPath", title: "Report Path", hidden: true
                    },
                    {
                        template: "<a ng-click=\"ReportsCtrl.ViewDetails('#= Id #')\">View</a><a style='margin-left:15px;' ng-click=\"ReportsCtrl.Edit('#= ReportName #')\">Edit</a>"
                    }],
                sortable: true,
                filterable: false,
                resizable: true
            }

            this.ApplyFilter = () => {

                var filterConditions = [];

                if (this.Filter.ReportName) {
                    filterConditions.push({ field: 'ReportName', operator: 'startswith', value: this.Filter.ReportName });
                }


                this.ReportsDS.filter(filterConditions);
            }

            this.ResetFilter = () => {
                this.Filter = {};
                this.ReportsDS.filter([]);
            }

            this.ViewDetails = (id: string) => {
                var reportId = id;

                $location.path('/reports/viewer/' + encodeURIComponent(id)); 
                
            }

            this.Edit = (name: string) => $location.path('/reports/edit/' + encodeURIComponent(name));

            this.CreateReport = () => $location.path('/reports/create');

        }
    }
}
