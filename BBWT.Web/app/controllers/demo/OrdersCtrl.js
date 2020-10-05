/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var OrdersCtrl = (function () {
        function OrdersCtrl($scope, $location, $http) {
            var _this = this;
            $scope['OrdersCtrl'] = this;
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
            this.ViewDetails = function (id) { return $location.path('/test/orders/' + id); };
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
        OrdersCtrl.$inject = ['$scope', '$location', '$http', '$route'];
        return OrdersCtrl;
    })();
    Controllers.OrdersCtrl = OrdersCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=OrdersCtrl.js.map