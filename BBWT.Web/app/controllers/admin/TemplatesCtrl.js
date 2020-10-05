/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var TemplatesCtrl = (function () {
        function TemplatesCtrl($scope, $location, $http) {
            var _this = this;
            $scope['TemplatesCtrl'] = this;
            this.Filter = {};
            this.ApplyFilter = function () {
                var filterConditions = [];
                if (_this.Filter.Code) {
                    filterConditions.push({ field: 'Code', operator: 'contains', value: _this.Filter.Code });
                }
                if (_this.Filter.Title) {
                    filterConditions.push({ field: 'Title', operator: 'contains', value: _this.Filter.Title });
                }
                _this.TemplatesDS.filter(filterConditions);
            };
            this.ResetFilter = function () {
                _this.Filter = {};
                _this.TemplatesDS.filter([]);
            };
            this.TemplatesDS = new kendo.data.DataSource({
                type: "odata",
                transport: {
                    read: {
                        url: "odata/TemplatesOData",
                        dataType: "json"
                    }
                },
                schema: {
                    data: function (data) {
                        return data["value"];
                    },
                    total: function (data) {
                        return data["odata.count"];
                    }
                },
                serverPaging: true,
                serverSorting: true,
                serverFiltering: true,
                pageSize: 10
            });
            this.GridOptions =
                {
                    selectable: false,
                    pageable: { refresh: true, pageSizes: true },
                    columns: [{ field: "Code", title: "Code" },
                        { field: "Title", title: "Title" },
                        { field: "IsSystem", title: "Type", width: "100px", template: "#= IsSystem?\"System\":\"User\" #" },
                        { width: "100px", sortable: false, template: "<a ng-click=\"TemplatesCtrl.ViewDetails(#=Id#)\">Edit</a># if(!IsSystem){ # <a ng-click=\"TemplatesCtrl.Delete(#=Id#)\">Delete</a> #}#" }],
                    sortable: true
                };
            this.ViewDetails = function (id) { return $location.path('/admin/templates/' + id); };
            this.Delete = function (id) {
                Dialogs.showConfirmation({ message: "Are you sure?" }).done(function () {
                    $http.get('api/EmailTemplate/DeleteTemplate/' + id)
                        .success(function () { return _this.TemplatesDS.read(); });
                });
            };
        }
        TemplatesCtrl.$inject = ['$scope', '$location', '$http'];
        return TemplatesCtrl;
    })();
    Controllers.TemplatesCtrl = TemplatesCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=TemplatesCtrl.js.map