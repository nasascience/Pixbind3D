/// <reference path="../../references.ts" />
module Controllers {
    export class TestCtrl {
        ProductsDS: kendo.data.DataSource;
        GridOptions: kendo.ui.GridOptions;
        GridOptions2: kendo.ui.GridOptions;
        GridOptions3: kendo.ui.GridOptions;

        Filter: any;
        ApplyFilter: () => void;
        ResetFilter: () => void;
        //OnEdit: () => void;
        //OnDelete: () => void;

        static $inject: Array<string> = ['$scope', '$location', '$http'];
        constructor($scope: ng.IScope, $location: ng.ILocationService, $http: ng.IHttpService) {
            $scope['TestCtrl'] = this;
            this.Filter = {};

            this.ProductsDS = new kendo.data.DataSource({
                type: "odata",
                transport: {
                    read:
                    {
                        url: "odata/TestProductsOData",
                        dataType: "json"
                    }
                    //update: {
                    //    url: data => "odata/TestUpdateProductsOData/Update",
                    //    dataType: "json"
                    //},
                    //destroy: {
                    //    url: data => "odata/TestDeleteProductsOData/Delete",
                    //    dataType: "json"
                    //}                    
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
                    { command: [{ id: "edit", name: "edit", template: "<a>Edit</a>&nbsp;&nbsp;" }, { id: "delete", name: "delete", template: "<a>Delete</a>" }], title: "", width: "120px"}],
                sortable: true,
                filterable: false,
                selectable : 'row',
                editable: 'inline'
            };
         
            this.GridOptions2 =
            {
                pageable: { refresh: true, pageSizes: true },
                columns: [
                    { field: "", type: "boolean", template: "<input ng-model=\"dataItem.selected\" type=\"checkbox\"/>", width: "31px" },
                    { field: "Id", title: "#", width: "100px" },
                    { field: "Name", title: "Product Name" },
                    { field: "Price", title: "Price" }
                    ,
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

            this.ApplyFilter = () => {
                var filterConditions = [];

                if (this.Filter.Name) {
                    filterConditions.push({ field: 'Name', operator: 'contains', value: this.Filter.Name });
                }

                if (this.Filter.Price) {
                    filterConditions.push({ field: 'Price', operator: 'eq', value: this.Filter.Price });
                }

                this.ProductsDS.filter(filterConditions);
            }

            this.ResetFilter = () => {
                this.Filter = {};
                this.ProductsDS.filter([]);
            }

            //this.OnEdit = () => {
            //    alert('edit click');
            //}      

            //this.OnDelete = () => {
            //    alert('delete click');
            //}      
        }
    }
}
