/// <reference path="../../references.ts" />
module Controllers {
    export class TerritoriesCtrl {
        TerritoriesDS: kendo.data.DataSource;
        GridOptions: kendo.ui.GridOptions;

        Filter: any;
        ApplyFilter: () => void;
        ResetFilter: () => void;

        Add: () => void;
        Save: () => void;
        Cancel: () => void;

        DeleteItem: (e: any) => void;

        RegionDropDown: (container: any, options: any) => void;

        static $inject: Array<string> = ['$scope', '$location', '$http'];
        constructor($scope: ng.IScope, $location: ng.ILocationService, $http: ng.IHttpService) {
            $scope['TerritoriesCtrl'] = this;
            this.Filter = {};

            this.RegionDropDown = (container, options) =>

                $('<input name="RegionName" data-bind="value:' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        dataSource: ["Eastern", "Western", "Northern", "Southern"]
                    });


            this.ApplyFilter = () => {
                var filterConditions = [];

                if (this.Filter.Territory) {
                    filterConditions.push({ field: 'Title', operator: 'contains', value: this.Filter.Territory });
                }
                this.TerritoriesDS.filter(filterConditions);
            }

            this.ResetFilter = () => {
                this.Filter = {};
                this.TerritoriesDS.filter([]);
            }

            this.Add = () => {
                $("#grid").data("kendoGrid").addRow();
            }

            this.Save = () => {
                $("#grid").data("kendoGrid").saveChanges();
            }

            this.Cancel = () => {
                $("#grid").data("kendoGrid").cancelChanges();
            }

            this.DeleteItem = (e: any) => {
                e.preventDefault();

                Dialogs.showConfirmation({ message: "Are you sure?" }).done(() => {
                    var grid = $("#grid").data("kendoGrid");
                    var row = $(e.target).closest("tr");
                    grid.removeRow(row);
                });
            }

            this.TerritoriesDS = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: 'api/demo/GetAllTerritories',
                        dataType: "json"
                    },
                    update: {
                        url: 'api/demo/UpdateTerritories',
                        dataType: "json",
                        contentType: "application/json",
                        complete: function (jqXhr, textStatus) {
                            if (textStatus == 'success') {
                                Dialogs.showSuccess({ message: 'Territories updated' });
                            } else {
                                Dialogs.showError({ message: 'Update failed' });
                            }
                        },
                        type: 'post'
                    },
                    create: {
                        url: 'api/demo/CreateTerritories',
                        dataType: "json",
                        contentType: "application/json",
                        complete: function (jqXhr, textStatus) {
                            if (textStatus == 'success') {
                                Dialogs.showSuccess({ message: 'New territories added' });
                            } else {
                                Dialogs.showError({ message: 'Create failed' });
                            }
                        },
                        type: 'post'
                    },
                    destroy: {
                        url: 'api/demo/RemoveTerritory',
                        dataType: "json",
                        contentType: "application/json",
                        complete: function (jqXhr, textStatus) {
                            if (textStatus == 'success') {
                                Dialogs.showSuccess({ message: 'Deleted' });
                            } else {
                                Dialogs.showError({ message: 'Delete failed' });
                            }
                        },
                        type: 'post'
                    },
                    parameterMap: function (options, operation) {
                        if (operation !== "read" && options.models) {
                            return kendo.stringify(options.models);
                        }
                    }
                },

                batch: true,
                pageSize: 10,
                schema: {
                    model: {
                        id: "Id",
                        fields: {
                            Id: { type: "number", defaultValue: 0 },
                            Title: { validation: { required: true } },
                            Region: { defaultValue: "Eastern" },
                            Delete: { validation: { required: false }, editable: false, encoded: false }
                        }
                    }
                }
            });

            this.GridOptions = 
            {
                pageable: { refresh: true, pageSizes: true },
                columns: [{ field: "Title", title: "Territory" },
                    { field: "Region", title: "Region", editor: this.RegionDropDown, width: "300px" },
                    { command:  [{ name: "deleteRow", click: this.DeleteItem, template: "<a class=k-grid-deleteRow>Delete</a>" }], width: "90px" }],
                sortable: true,
                filterable: false,
                editable: { confirmation: false }
            }
        }
    }
}
