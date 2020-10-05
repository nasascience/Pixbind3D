/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var OrdersVariantCtrl = (function () {
        function OrdersVariantCtrl($scope, $location, $http) {
            var _this = this;
            $scope['OrdersVariantCtrl'] = this;
            this.Filter = {};
            this.OrdersDS = new kendo.data.DataSource({
                type: "odata",
                transport: {
                    read: {
                        url: "odata/OrdersOData",
                        dataType: "json"
                    }
                },
                schema: {
                    data: function (data) { return data["value"]; },
                    total: function (data) { return data["odata.count"]; },
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
                };
            this.dsCustomers = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "api/demo/GetAllCustomers"
                    }
                }
            });
            this.ApplyFilter = function () {
                if (!_this.Validator.validate())
                    return;
                var filterConditions = [];
                if (_this.Filter.Customer) {
                    filterConditions.push({ field: 'CustomerCode', operator: 'eq', value: _this.Filter.Customer });
                }
                if (_this.Filter.ID) {
                    filterConditions.push({ field: 'Id', operator: 'eq', value: Number(_this.Filter.ID) });
                }
                if (_this.Filter.CompanyName) {
                    filterConditions.push({ field: 'CustomerCompanyName', operator: 'eq', value: _this.Filter.CompanyName });
                }
                if (_this.Filter.OrderDate) {
                    filterConditions.push({ field: 'OrderDate', operator: 'eq', value: _this.Filter.OrderDate });
                }
                if (_this.Filter.RequiredDate) {
                    filterConditions.push({ field: 'RequiredDate', operator: 'eq', value: _this.Filter.RequiredDate });
                }
                if (_this.Filter.ShippedDate) {
                    filterConditions.push({ field: 'ShippedDate', operator: 'eq', value: _this.Filter.ShippedDate });
                }
                _this.OrdersDS.filter(filterConditions);
            };
            this.ResetFilter = function () {
                _this.Filter = {};
                _this.OrdersDS.filter([]);
            };
            this.ViewDetails = function (id) {
                $http.get('api/demo/GetOrderHeader/' + id).success(function (data) { return _this.Header = data; });
                _this.OrdersDetailsDS = new kendo.data.DataSource({
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
                    dataSource: _this.OrdersDetailsDS,
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
                _this.OrdersDetailsDS.fetch(function () {
                    var datasourcedata = $scope['OrdersVariantCtrl'].OrdersDetailsDS.data();
                    var total = 0;
                    for (var i = 0; i < datasourcedata.length; i++) {
                        total += (datasourcedata[i].Quantity * datasourcedata[i].Price);
                    }
                    $scope.$apply(function () {
                        $scope['OrdersVariantCtrl'].InvoiceTotal = total;
                    });
                });
            };
            this.ViewExtDetails = function (id) { return $location.path('/test/orders/' + id); };
            this.Validator = $('#validator').kendoValidator({
                validate: function (e) {
                    if (e.valid) {
                        $("#errors").addClass('hidden');
                    }
                    else {
                        $("#errors").empty().removeClass('hidden');
                        var errors = e.sender.errors();
                        $.each(errors, function (idx, str) {
                            $("#errors").append('<div>' + str + '</div>');
                        });
                    }
                }
            }).data('kendoValidator');
        }
        //Items: any[];                
        //Columns: any[];        
        OrdersVariantCtrl.$inject = ['$scope', '$location', '$http'];
        return OrdersVariantCtrl;
    })();
    Controllers.OrdersVariantCtrl = OrdersVariantCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=OrdersVariantCtrl.js.map