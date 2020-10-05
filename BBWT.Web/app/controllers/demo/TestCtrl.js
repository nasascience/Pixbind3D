/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var TestCtrl = (function () {
        function TestCtrl($scope, $location, $http) {
            var _this = this;
            $scope['TestCtrl'] = this;
            this.Filter = {};
            this.ProductsDS = new kendo.data.DataSource({
                type: "odata",
                transport: {
                    read: {
                        url: "odata/TestProductsOData",
                        dataType: "json"
                    }
                },
                schema: {
                    data: function (data) {
                        return data["value"];
                    },
                    total: function (data) {
                        return data["odata.count"];
                    },
                    model: {
                        fields: {
                            Id: { type: "number" },
                            Name: { type: "string" },
                            Price: { type: "number" }
                        }
                    }
                },
                //error: e => {                    
                //},
                serverPaging: true,
                serverSorting: true,
                serverFiltering: true,
                pageSize: 10
            });
            this.GridOptions =
                {
                    pageable: { refresh: true, pageSizes: true },
                    columns: [{ field: "Id", title: "#", width: "100px" },
                        { field: "Name", title: "Product Name" },
                        { field: "Price", title: "Price" },
                        { command: [{ id: "edit", name: "edit", template: "<a>Edit</a>&nbsp;&nbsp;" }, { id: "delete", name: "delete", template: "<a>Delete</a>" }], title: "", width: "120px" }],
                    sortable: true,
                    filterable: false,
                    selectable: 'row',
                    editable: 'inline'
                };
            this.GridOptions2 =
                {
                    pageable: { refresh: true, pageSizes: true },
                    columns: [
                        { field: "", type: "boolean", template: "<input ng-model=\"dataItem.selected\" type=\"checkbox\"/>", width: "31px" },
                        { field: "Id", title: "#", width: "100px" },
                        { field: "Name", title: "Product Name" },
                        { field: "Price", title: "Price" },
                        {
                            command: [{ id: "edit", name: "edit", template: "<a>Edit</a>&nbsp;&nbsp;" },
                                { id: "delete", name: "delete", template: "<a>Delete</a>" }], title: "", width: "120px"
                        }
                    ],
                    sortable: true,
                    filterable: false
                };
            this.GridOptions3 =
                {
                    pageable: { refresh: true, pageSizes: true },
                    columns: [
                        {
                            field: "", type: "boolean", template: "<input type=\"radio\" name=\"gridRadio\"></input>", width: "31px"
                        },
                        { field: "Id", title: "#", width: "100px" },
                        { field: "Name", title: "Product Name" },
                        { field: "Price", title: "Price" },
                        {
                            command: [{ id: "edit", name: "edit", template: "<a>Edit</a>&nbsp;&nbsp;" },
                                { id: "delete", name: "delete", template: "<a>Delete</a>" }], title: "", width: "120px"
                        }],
                    sortable: true,
                    filterable: false,
                    selectable: false
                };
            this.ApplyFilter = function () {
                var filterConditions = [];
                if (_this.Filter.Name) {
                    filterConditions.push({ field: 'Name', operator: 'contains', value: _this.Filter.Name });
                }
                if (_this.Filter.Price) {
                    filterConditions.push({ field: 'Price', operator: 'eq', value: _this.Filter.Price });
                }
                _this.ProductsDS.filter(filterConditions);
            };
            this.ResetFilter = function () {
                _this.Filter = {};
                _this.ProductsDS.filter([]);
            };
            //this.OnEdit = () => {
            //    alert('edit click');
            //}      
            //this.OnDelete = () => {
            //    alert('delete click');
            //}      
        }
        //OnEdit: () => void;
        //OnDelete: () => void;
        TestCtrl.$inject = ['$scope', '$location', '$http'];
        return TestCtrl;
    })();
    Controllers.TestCtrl = TestCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=TestCtrl.js.map