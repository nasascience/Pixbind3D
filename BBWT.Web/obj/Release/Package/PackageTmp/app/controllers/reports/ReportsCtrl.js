/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var ReportsCtrl = (function () {
        function ReportsCtrl($scope, $location, $http) {
            var _this = this;
            $scope['ReportsCtrl'] = this;
            this.Filter = {};
            this.ReportsDS = new kendo.data.DataSource({
                type: "odata",
                transport: {
                    read: {
                        url: "odata/ReportsOData",
                        dataType: "json"
                    }
                },
                schema: {
                    data: function (data) { return data["value"]; },
                    total: function (data) { return data["odata.count"]; },
                    model: {
                        fields: {
                            Id: { type: "string" },
                            ReportName: { type: "string" },
                            Description: { type: "string" },
                            ReportPath: { type: "string" }
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
                            field: "Id", title: "Report Name", hidden: true
                        },
                        {
                            field: "ReportName", title: "Report Name"
                        },
                        {
                            field: "Description", title: "Description"
                        },
                        {
                            field: "ReportPath", title: "Report Path", hidden: true
                        },
                        {
                            template: "<a ng-click=\"ReportsCtrl.ViewDetails('#= Id #')\">View</a><a style='margin-left:15px;' ng-click=\"ReportsCtrl.Edit('#= ReportName #')\">Edit</a>"
                        }],
                    sortable: true,
                    filterable: false,
                    resizable: true
                };
            this.ApplyFilter = function () {
                var filterConditions = [];
                if (_this.Filter.ReportName) {
                    filterConditions.push({ field: 'ReportName', operator: 'startswith', value: _this.Filter.ReportName });
                }
                _this.ReportsDS.filter(filterConditions);
            };
            this.ResetFilter = function () {
                _this.Filter = {};
                _this.ReportsDS.filter([]);
            };
            this.ViewDetails = function (id) {
                var reportId = id;
                $location.path('/reports/viewer/' + encodeURIComponent(id));
            };
            this.Edit = function (name) { return $location.path('/reports/edit/' + encodeURIComponent(name)); };
            this.CreateReport = function () { return $location.path('/reports/create'); };
        }
        ReportsCtrl.$inject = ['$scope', '$location', '$http'];
        return ReportsCtrl;
    })();
    Controllers.ReportsCtrl = ReportsCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=ReportsCtrl.js.map