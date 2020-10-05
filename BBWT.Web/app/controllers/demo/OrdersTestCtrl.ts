/// <reference path="../../references.ts" />
module Controllers {
    export class OrdersTestCtrl {
        OrdersDS: kendo.data.DataSource;
        GridOptions: kendo.ui.GridOptions;        
        Filters: any;        
        Filter: any;
        gridColumns: any;
        advFiltering: () => void;
        advSearch: () => void;
        advRemoveItem: (item: any) => void;        
        advAddItem: () => void;
        advClearAll: () => void;
        ApplyFilter: () => void;
        ResetFilter: () => void;
        changeFilterMode: () => void;         
        filterAdvMode: boolean;                     
        dsCustomers: kendo.data.DataSource;        
        getColumn: (field: string) => any;
        getColumnDataSource: (field: string) => kendo.data.DataSource;

        logicNotStringOptions: any;
        logicStringOptions: any
        
        static $inject: Array<string> = ['$scope', '$location', '$http', '$route'];
        constructor($scope: ng.IScope, $location: ng.ILocationService, $http: ng.IHttpService) {
            $scope['OrdersTestCtrl'] = this;

            this.filterAdvMode = false;
            this.changeFilterMode = () => {
                this.ResetFilter();
                this.advClearAll();
                this.filterAdvMode = !this.filterAdvMode;
            }

            this.OrdersDS = new kendo.data.DataSource({
                type: "odata",
                transport: {
                    read:
                    {
                        url: "odata/OrdersOData",
                        dataType: "json"
                    }
                    /*Since we need IE7 to support this approach doesn't work - need separate URL for every 
                    kind of request. But I still beleive that we could deal with it in REST way.*/
                    //create://this one actually works when we edit the grid in-place.
                    //{
                    //    url: "odata/OrdersOData",
                    //    dataType: "json"
                    //},
                    //update:
                    //{
                    //    url: "odata/OrdersOData",
                    //    dataType: "json"
                    //}
                },
                //autoSync: true,
                //batch: true, this option requires post server method to be able to receive collections.
                schema: {
                    data: data => data["value"],
                    total: data => data["odata.count"],
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
            
            this.getColumn = (field) => {
                var result = null;          
                for (var i = 0; i < this.gridColumns.length; i++) {
                    if (this.gridColumns[i].field == field) {
                        result = this.gridColumns[i];
                        break;
                    }
                }
                return result;
            }
            
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

            this.advFiltering = () => {
                if (this.Filters == null || this.Filters.length == 0) {
                    this.Filters = [
                        {
                            title: this.gridColumns[0].title, field: this.gridColumns[0].field, operator: "eq", type: this.gridColumns[0].type,
                            t_options: { dataTextField: "title", dataValueField: "field", dataSource: this.gridColumns, index: 0 }                            
                        }
                    ];
                    
                    $scope.$apply();                    
                }
            }

            this.advFiltering();           
            this.advRemoveItem = (item) => {
                if (this.Filters.length > 1) {
                    this.Filters = $.grep(this.Filters, function(value) {
                        return value != item;
                    });
                    $scope.$apply();
                }
            }

            this.advAddItem = () => {

                var index = 0;
                if (this.Filters.length < this.gridColumns.length)
                    index = this.Filters.length;

                var item = 
                    {
                        title: this.gridColumns[index].title, field: this.gridColumns[index].field, operator: "eq", type: this.gridColumns[index].type,
                        t_options: { dataTextField: "title", dataValueField: "field", dataSource: this.gridColumns, index: index }                        
                    };

                this.Filters.push(item);
                $scope.$apply();
            }

            this.advClearAll = () => {    
                this.Filters = [];            
                this.OrdersDS.filter(this.Filters);
                this.advFiltering();
            }
                                   
            this.advSearch = () => {                
                var advFilterConditions = [];                
                for (var i = 0; i < this.Filters.length; i++) {
                    if (this.Filters[i].value != null) {
                        var value = this.Filters[i].value;

                        // get column
                        var columnType = "string";
                        for (var j = 0; j < this.gridColumns.length; j++)
                        {
                            if (this.gridColumns[j].field == this.Filters[i].field)
                            {        
                                // get title and column type         
                                this.Filters[i].title = this.gridColumns[j].title;                                               
                                columnType = this.gridColumns[j].type;
                                break;
                            }
                        }

                        if (columnType == "int") {
                            value = Number(value);
                        }

                        if (columnType == "date") {                                                        
                            value = new Date(value.toString());
                        }

                        var item = { field: this.Filters[i].field, operator: this.Filters[i].operator, value: value };
                        advFilterConditions.push(item);
                    }
                }
                                                
                this.OrdersDS.filter({ filters: advFilterConditions });
            }

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
                //dataBound: function () {
                //    var e1 = $('div[kendo-grid]');
                //    DisplayNoResultsFound(e1);
                //}
            }            

            this.dsCustomers = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "api/demo/GetAllCustomers"
                    }
                }
            });

            this.ApplyFilter = () => {

                //if (!this.Validator.validate()) return;

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
        }
    }
}
