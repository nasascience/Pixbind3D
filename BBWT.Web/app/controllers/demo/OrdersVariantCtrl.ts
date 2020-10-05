/// <reference path="../../references.ts" />
module Controllers {
    export class OrdersVariantCtrl {
        OrdersDS: kendo.data.DataSource;
        GridOptions: kendo.ui.GridOptions;

        Filter: any;
        ApplyFilter: () => void;
        ResetFilter: () => void;
        BindCompanies: () => void;
        ViewDetails: (id: number) => void;
        ViewExtDetails: (id: number) => void;

        Validator: kendo.ui.Validator;
        
        dsCustomers: kendo.data.DataSource;

        OrdersDetailsDS: kendo.data.DataSource;
        GridDetailsOptions: kendo.ui.GridOptions;        

        Header: any;
        //Items: any[];                
        //Columns: any[];        

        static $inject: Array<string> = ['$scope', '$location', '$http'];
        constructor($scope: ng.IScope, $location: ng.ILocationService, $http: ng.IHttpService) {
            $scope['OrdersVariantCtrl'] = this;
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
                pageSize: 5
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
                    template: "<a class=\"m-details-cur-link-xs\" ng-click=\"OrdersVariantCtrl.ViewDetails(#= Id #)\">Details</a> <a class=\"m-details-ext-link-xs\" ng-click=\"OrdersVariantCtrl.ViewExtDetails(#= Id #)\">Details</a>"
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
            
            this.ViewDetails = (id: number) => {
                $http.get('api/demo/GetOrderHeader/' + id).success((data) => this.Header = data);
                
                this.OrdersDetailsDS = new kendo.data.DataSource({
                    transport: {
                        read: {
                            url: 'api/demo/GetOrderItems/' + id
                        }
                    },
                    schema: {
                        model: {
                            Id: "Id",
                            ProductTitle: "ProductTitle",
                            Quantity: "Quantity",
                            Price: "Price"                            
                        }
                    }
                });                

                $("#kgDetails").kendoGrid({
                    dataSource: this.OrdersDetailsDS,
                    pageable: { refresh: true, pageSizes: true },
                    columns: [
                        {
                            field: "Id", title: "Id"
                        },
                        {
                            field: "ProductTitle", title: "Product"
                        },
                        {
                            field: "Quantity", title: "Quantity"
                        },
                        {
                            field: "Price", title: "Price", format: "{0:c}"
                        },
                        {
                            field: "Amount", title: "Amount", template: "£#= Price * Quantity #", format: "{0:c}"
                        }
                    ],
                    sortable: true,
                    filterable: false,
                    resizable: true
                });

                this.OrdersDetailsDS.fetch(() => {
                    var datasourcedata = $scope['OrdersVariantCtrl'].OrdersDetailsDS.data();
                    var total = 0;
                    for (var i = 0; i < datasourcedata.length; i++) {
                        total += (datasourcedata[i].Quantity * datasourcedata[i].Price);
                    }
                    $scope.$apply(() => {
                        $scope['OrdersVariantCtrl'].InvoiceTotal = total;                                                                     
                    });                    
                });     
            }                                 
            
            this.ViewExtDetails = (id: number) => $location.path('/test/orders/' + id);

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
