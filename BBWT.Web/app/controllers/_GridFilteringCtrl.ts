/// <reference path="../references.ts" />
module Controllers {
    export class GridFilteringCtrl {

        FilterMode: number;
        GridOptionsSimple: kendo.ui.GridOptions;
        GridOptionsAdv: kendo.ui.GridOptions;

        OrdersDS: kendo.data.DataSource;
        dsCustomers: kendo.data.DataSource;
        
        static $inject: Array<string> = ['$scope'];
        constructor($scope: ng.IScope) {
            $scope['GridFilteringCtrl'] = this;            
                        
            this.FilterMode = 0; // 0 - simple, 1 - advanced

            this.OrdersDS = new kendo.data.DataSource({
                type: "odata",
                transport: {
                    read:
                    {
                        url: "odata/OrdersOData",
                        dataType: "json"
                    }
                },
                schema: {
                    data: data => data["value"],
                    total: data => data["odata.count"],
                    model: {
                        fields: {
                            Id: { type: "number" },
                            CustomerCompanyName: { type: "string" },
                            OrderDate: { type: "date" },
                            RequiredDate: { type: "date" },
                            ShippedDate: { type: "date" }
                        }
                    }
                },
                serverPaging: true,
                serverSorting: true,
                serverFiltering: true,
                pageSize: 10
            });
          
            this.GridOptionsSimple = {
                selectable: false,
                pageable: { refresh: true, pageSizes: true },
                columns: [{ field: "Id", title: "Order ID" },
                    { field: "CustomerCompanyName", title: "Company Name" },
                    { field: "OrderDate", title: "Order Date", format: "{0:dd/MM/yyyy}" }
                ],
                sortable: true
            }

            this.GridOptionsAdv = {
                selectable: false,
                pageable: { refresh: true, pageSizes: true },
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            startswith: "Starts with",
                            eq: "Equal to",
                            neq: "Not equal to",
                            gte: "Is after or equal to",
                            gt: "Is after",
                            lte: "Is before or equal to",
                            lt: "Is before"
                        }
                    }
                },
                columns: [
                    {
                        field: "Id", title: "Order ID"                        
                    },
                    {
                        field: "CustomerCompanyName", title: "Company Name",
                        filterable: {
                            ui: customerCompanyFilter
                        }
                    },
                    {
                        field: "OrderDate", title: "Order Date", format: "{0:dd/MM/yyyy}", 
                        filterable: {
                            ui: "datetimepicker"
                        }
                    }
                ],
                sortable: true
            }

            this.dsCustomers = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "api/demo/GetAllCustomers"
                    }
                }
            });

            function customerCompanyFilter(element) {
                element.kendoAutoComplete({  
                    dataTextField: "CompanyName",                    
                    dataSource: $scope['GridFilteringCtrl'].dsCustomers
                });
            }            
        }
    }
}