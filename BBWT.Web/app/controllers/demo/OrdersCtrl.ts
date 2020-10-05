/// <reference path="../../references.ts" />
module Controllers {
    export class OrdersCtrl {
        OrdersDS: kendo.data.DataSource;
        GridOptions: kendo.ui.GridOptions;

        Filter: any;
        ApplyFilter: () => void;
        ResetFilter: () => void;
        BindCompanies: () => void;
        ViewDetails: (id: number) => void;

        Validator: kendo.ui.Validator;
        
        dsCustomers: kendo.data.DataSource;
        
        static $inject: Array<string> = ['$scope', '$location', '$http', '$route'];
        constructor($scope: ng.IScope, $location: ng.ILocationService, $http: ng.IHttpService) {
            $scope['OrdersCtrl'] = this;
            this.Filter = {};
                    
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

            this.GridOptions =
            {                
                pageable: { refresh: true, pageSizes: true },
                columns: [
                {
                    field: "Id", title: "Order ID"
                },
                {
                    field: "CustomerCompanyName", title: "Company Name"
                },                     
                {
                    field: "OrderDate", title: "Order Date", format: "{0:dd/MM/yyyy}"
                },
                {
                    field: "RequiredDate", title: "Required Date", format: "{0:dd/MM/yyyy}"
                },
                {
                    field: "ShippedDate", title: "Shipped Date", format: "{0:dd/MM/yyyy}"
                },
                {
                    template: "<a ng-click=\"OrdersCtrl.ViewDetails(#= Id #)\">Details</a>"
                }],
                sortable: true,
                filterable: false,                
                resizable: true
            }

            this.dsCustomers = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "api/demo/GetAllCustomers"
                    }
                }
            });
           
            this.ApplyFilter = () => {

                if (!this.Validator.validate()) return;

                var filterConditions = [];

                if (this.Filter.Customer) {
                    filterConditions.push({ field: 'CustomerCode', operator: 'eq', value: this.Filter.Customer });
                }

                if (this.Filter.ID) {
                    filterConditions.push({ field: 'Id', operator: 'eq', value: Number(this.Filter.ID) });
                }

                if (this.Filter.CompanyName) {
                    filterConditions.push({ field: 'CustomerCompanyName', operator: 'eq', value: this.Filter.CompanyName });
                }

                if (this.Filter.OrderDate) {
                    filterConditions.push({ field: 'OrderDate', operator: 'eq', value: this.Filter.OrderDate });
                }

                if (this.Filter.RequiredDate) {
                    filterConditions.push({ field: 'RequiredDate', operator: 'eq', value: this.Filter.RequiredDate });
                }

                if (this.Filter.ShippedDate) {
                    filterConditions.push({ field: 'ShippedDate', operator: 'eq', value: this.Filter.ShippedDate });
                }

                this.OrdersDS.filter(filterConditions);
            }

            this.ResetFilter = () => {
                this.Filter = {};
                this.OrdersDS.filter([]);
            }

            this.ViewDetails = (id: number) => $location.path('/test/orders/' + id);

            this.Validator = $('#validator').kendoValidator({
                validate: (e) => {
                    if (e.valid) {
                        $("#errors").addClass('hidden');
                    } else {
                        $("#errors").empty().removeClass('hidden');
                        var errors = e.sender.errors();
                        $.each(errors, (idx, str) => {
                            $("#errors").append('<div>' + str + '</div>');
                        });
                    }
                }
            }).data('kendoValidator');
        }
    }
}
