/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var TerritoriesCtrl = (function () {
        function TerritoriesCtrl($scope, $location, $http) {
            var _this = this;
            $scope['TerritoriesCtrl'] = this;
            this.Filter = {};
            this.RegionDropDown = function (container, options) {
                return $('<input name="RegionName" data-bind="value:' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                    dataSource: ["Eastern", "Western", "Northern", "Southern"]
                });
            };
            this.ApplyFilter = function () {
                var filterConditions = [];
                if (_this.Filter.Territory) {
                    filterConditions.push({ field: 'Title', operator: 'contains', value: _this.Filter.Territory });
                }
                _this.TerritoriesDS.filter(filterConditions);
            };
            this.ResetFilter = function () {
                _this.Filter = {};
                _this.TerritoriesDS.filter([]);
            };
            this.Add = function () {
                $("#grid").data("kendoGrid").addRow();
            };
            this.Save = function () {
                $("#grid").data("kendoGrid").saveChanges();
            };
            this.Cancel = function () {
                $("#grid").data("kendoGrid").cancelChanges();
            };
            this.DeleteItem = function (e) {
                e.preventDefault();
                Dialogs.showConfirmation({ message: "Are you sure?" }).done(function () {
                    var grid = $("#grid").data("kendoGrid");
                    var row = $(e.target).closest("tr");
                    grid.removeRow(row);
                });
            };
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
                            }
                            else {
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
                            }
                            else {
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
                            }
                            else {
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
                        { command: [{ name: "deleteRow", click: this.DeleteItem, template: "<a class=k-grid-deleteRow>Delete</a>" }], width: "90px" }],
                    sortable: true,
                    filterable: false,
                    editable: { confirmation: false }
                };
        }
        TerritoriesCtrl.$inject = ['$scope', '$location', '$http'];
        return TerritoriesCtrl;
    })();
    Controllers.TerritoriesCtrl = TerritoriesCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=TerritoriesCtrl.js.map