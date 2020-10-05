/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var PermissionsCtrl = (function () {
        function PermissionsCtrl($scope, $location, $http) {
            var _this = this;
            $scope['PermissionsCtrl'] = this;
            this.PermissionsDS = new kendo.data.DataSource({
                type: "odata",
                transport: {
                    read: {
                        url: "odata/PermissionsOData",
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
                pageSize: 5
            });
            this.GridOptions =
                {
                    selectable: false,
                    pageable: { refresh: true, pageSizes: true },
                    columns: [{ field: "Id", title: "#", width: "50px" },
                        { field: "Code", title: "Permission Code" },
                        { field: "Name", title: "Permission Name" },
                        {
                            field: "Id", title: " ", width: "100px", sortable: false,
                            template: "<a ng-click=\"PermissionsCtrl.ViewDetails(#= Id #)\">Edit</a> <a ng-hide=\"#= Id<1000 #\" ng-click=\"PermissionsCtrl.DeletePermission(#= Id #)\">Delete</a>"
                        }],
                    sortable: true
                };
            this.ViewDetails = function (id) { return $location.path('/admin/permissions/' + id); };
            this.DeletePermission = function (id) {
                Dialogs.showConfirmation({ message: "Are you sure?" }).done(function () {
                    $http.get('api/permissions/DeletePermission/' + id)
                        .success(function () { return _this.PermissionsDS.read(); });
                });
            };
            this.ApplyFilter = function () {
                var filterConditions = [];
                if (_this.Filter.Name) {
                    filterConditions.push({ field: 'Name', operator: 'contains', value: _this.Filter.Name });
                }
                _this.PermissionsDS.filter(filterConditions);
            };
            this.ResetFilter = function () {
                _this.Filter = {};
                _this.PermissionsDS.filter([]);
            };
        }
        PermissionsCtrl.$inject = ['$scope', '$location', '$http'];
        return PermissionsCtrl;
    })();
    Controllers.PermissionsCtrl = PermissionsCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=PermissionsCtrl.js.map