/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var GridFilteringCtrl = (function () {
        function GridFilteringCtrl($scope, $location, $http) {
            var _this = this;
            $scope['GridFilteringCtrl'] = this;
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
            this.FilterMode = 0; // 0 - simple, 1 - advanced
            this.gridColumns = [
                {
                    field: "Id",
                    title: "Order ID",
                    type: "int",
                    filterable: {
                        extra: false,
                        operators: {
                            string: {
                                startswith: "Start with",
                                eq: "Is equal to",
                                neq: "Is not equal to"
                            }
                        }
                    }
                },
                {
                    field: "CustomerCompanyName",
                    title: "Company Name",
                    type: "string",
                    filterable: {
                        extra: false,
                        operators: {
                            string: {
                                startswith: "Start with",
                                eq: "Is equal to",
                                neq: "Is not equal to"
                            }
                        }
                    }
                },
                {
                    field: "OrderDate",
                    title: "Ordered Date",
                    format: "{0:dd/MM/yyyy}",
                    type: "date",
                    filterable: {
                        operators: {
                            date: {
                                gte: "greater than or equal",
                                lte: "less than or equal",
                            }
                        }
                    }
                },
                {
                    field: "RequiredDate",
                    title: "Required Date",
                    format: "{0:dd/MM/yyyy}",
                    type: "date",
                    filterable: {
                        operators: {
                            date: {
                                gte: "greater than or equal",
                                lte: "less than or equal",
                            }
                        }
                    }
                },
                {
                    field: "ShippedDate",
                    title: "Shipped Date",
                    format: "{0:dd/MM/yyyy}",
                    type: "date",
                    filterable: {
                        operators: {
                            date: {
                                gte: "greater than or equal",
                                lte: "less than or equal",
                            }
                        }
                    }
                }
            ];
            this.GridOptionsAdv = {
                selectable: false,
                pageable: { refresh: true, pageSizes: true },
                columns: this.gridColumns,
                sortable: true,
                resizable: true,
                filterable: true
            };
            this.GridOptions =
                {
                    selectable: false,
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
                        }
                    ],
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
        GridFilteringCtrl.$inject = ['$scope', '$location', '$http', '$route'];
        return GridFilteringCtrl;
    })();
    Controllers.GridFilteringCtrl = GridFilteringCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=GridFilteringCtrl.js.map