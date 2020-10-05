/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var OrdersTestCtrl = (function () {
        function OrdersTestCtrl($scope, $location, $http) {
            var _this = this;
            $scope['OrdersTestCtrl'] = this;
            this.filterAdvMode = false;
            this.changeFilterMode = function () {
                _this.ResetFilter();
                _this.advClearAll();
                _this.filterAdvMode = !_this.filterAdvMode;
            };
            this.OrdersDS = new kendo.data.DataSource({
                type: "odata",
                transport: {
                    read: {
                        url: "odata/OrdersOData",
                        dataType: "json"
                    }
                },
                //autoSync: true,
                //batch: true, this option requires post server method to be able to receive collections.
                schema: {
                    data: function (data) { return data["value"]; },
                    total: function (data) { return data["odata.count"]; },
                    model: {
                        fields: {
                            Id: { type: "number", editable: false },
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
            //// Anvanced Filtering
            this.gridColumns = [
                {
                    field: "Id",
                    title: "Order ID",
                    type: "int"
                },
                {
                    field: "CustomerCompanyName",
                    title: "Company Name",
                    type: "string",
                    datasource: new kendo.data.DataSource({
                        transport: {
                            read: {
                                url: "api/demo/GetAllCustomers"
                            }
                        }
                    }),
                    dsSearchFieldName: "CompanyName"
                },
                {
                    field: "OrderDate",
                    title: "Ordered Date",
                    format: "{0:dd/MM/yyyy}",
                    type: "date"
                },
                {
                    field: "RequiredDate",
                    title: "Required Date",
                    format: "{0:dd/MM/yyyy}",
                    type: "date"
                },
                {
                    field: "ShippedDate",
                    title: "Shipped Date",
                    format: "{0:dd/MM/yyyy}",
                    type: "date"
                }
            ];
            this.getColumn = function (field) {
                var result = null;
                for (var i = 0; i < _this.gridColumns.length; i++) {
                    if (_this.gridColumns[i].field == field) {
                        result = _this.gridColumns[i];
                        break;
                    }
                }
                return result;
            };
            this.Filters = [];
            this.logicNotStringOptions = [
                { name: 'Equal to', value: 'eq' },
                { name: 'Not equal to', value: 'neq' },
                { name: 'Greater than', value: 'gt' },
                { name: 'Less than', value: 'lt' },
                { name: 'Less than or equal to', value: 'lte' },
                { name: 'Greater than or equal to', value: 'gte' }
            ];
            this.logicStringOptions = [
                { name: 'Equal to', value: 'eq' },
                { name: 'Not equal to', value: 'neq' },
                { name: 'Contains', value: 'contains' },
                { name: 'Start with', value: 'startswith' },
                { name: 'Ends with', value: 'endswith' }
            ];
            this.advFiltering = function () {
                if (_this.Filters == null || _this.Filters.length == 0) {
                    _this.Filters = [
                        {
                            title: _this.gridColumns[0].title, field: _this.gridColumns[0].field, operator: "eq", type: _this.gridColumns[0].type,
                            t_options: { dataTextField: "title", dataValueField: "field", dataSource: _this.gridColumns, index: 0 }
                        }
                    ];
                    $scope.$apply();
                }
            };
            this.advFiltering();
            this.advRemoveItem = function (item) {
                if (_this.Filters.length > 1) {
                    _this.Filters = $.grep(_this.Filters, function (value) {
                        return value != item;
                    });
                    $scope.$apply();
                }
            };
            this.advAddItem = function () {
                var index = 0;
                if (_this.Filters.length < _this.gridColumns.length)
                    index = _this.Filters.length;
                var item = {
                    title: _this.gridColumns[index].title, field: _this.gridColumns[index].field, operator: "eq", type: _this.gridColumns[index].type,
                    t_options: { dataTextField: "title", dataValueField: "field", dataSource: _this.gridColumns, index: index }
                };
                _this.Filters.push(item);
                $scope.$apply();
            };
            this.advClearAll = function () {
                _this.Filters = [];
                _this.OrdersDS.filter(_this.Filters);
                _this.advFiltering();
            };
            this.advSearch = function () {
                var advFilterConditions = [];
                for (var i = 0; i < _this.Filters.length; i++) {
                    if (_this.Filters[i].value != null) {
                        var value = _this.Filters[i].value;
                        // get column
                        var columnType = "string";
                        for (var j = 0; j < _this.gridColumns.length; j++) {
                            if (_this.gridColumns[j].field == _this.Filters[i].field) {
                                // get title and column type         
                                _this.Filters[i].title = _this.gridColumns[j].title;
                                columnType = _this.gridColumns[j].type;
                                break;
                            }
                        }
                        if (columnType == "int") {
                            value = Number(value);
                        }
                        if (columnType == "date") {
                            value = new Date(value.toString());
                        }
                        var item = { field: _this.Filters[i].field, operator: _this.Filters[i].operator, value: value };
                        advFilterConditions.push(item);
                    }
                }
                _this.OrdersDS.filter({ filters: advFilterConditions });
            };
            //////////////////////
            //var DisplayNoResultsFound = function (grid) {
            //    // Get the number of Columns in the grid
            //    var dataSource = grid.data("kendoGrid").dataSource;
            //    var colCount = grid.find('.k-grid-header colgroup > col').length;
            //    // If there are no results place an indicator row
            //    if (dataSource._view.length == 0) {
            //        grid.find('.k-grid-content tbody')
            //            .append('<tr class="kendo-data-row"><td colspan="' + colCount + '" style="text-align:center"><b>No Results Found!</b></td></tr>');
            //    }
            //    // Get visible row count
            //    var rowCount = grid.find('.k-grid-content tbody tr').length;
            //    // If the row count is less that the page size add in the number of missing rows
            //    if (rowCount < dataSource._take) {
            //        var addRows = dataSource._take - rowCount;
            //        for (var i = 0; i < addRows; i++) {
            //            grid.find('.k-grid-content tbody').append('<tr class="kendo-data-row"><td>&nbsp;</td></tr>');
            //        }
            //    }
            //}
            this.GridOptions =
                {
                    selectable: false,
                    pageable: { refresh: true, pageSizes: true },
                    columns: this.gridColumns,
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
                //if (!this.Validator.validate()) return;
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
        }
        OrdersTestCtrl.$inject = ['$scope', '$location', '$http', '$route'];
        return OrdersTestCtrl;
    })();
    Controllers.OrdersTestCtrl = OrdersTestCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=OrdersTestCtrl.js.map