/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var RolesCtrl = (function () {
        function RolesCtrl($scope, $location, $http) {
            var _this = this;
            $scope['RolesCtrl'] = this;
            this.RolesDS = new kendo.data.DataSource({
                type: "odata",
                transport: {
                    read: {
                        url: "odata/RolesOData",
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
                        { field: "Name", title: "Role Name" },
                        {
                            field: "Id", title: " ", width: "100px", sortable: false,
                            template: "<a ng-click=\"RolesCtrl.ViewDetails(#= Id #)\">Edit</a> <a ng-click=\"RolesCtrl.DeleteRole(#= Id #)\">Delete</a>"
                        }],
                    sortable: true
                };
            this.ViewDetails = function (id) { return $location.path('/admin/roles/' + id); };
            this.DeleteRole = function (id) {
                Dialogs.showConfirmation({ message: "Are you sure?" }).done(function () {
                    $http.get('api/roles/DeleteRole/' + id)
                        .success(function () { return _this.RolesDS.read(); });
                });
            };
            this.ApplyFilter = function () {
                var filterConditions = [];
                if (_this.Filter.Name) {
                    filterConditions.push({ field: 'Name', operator: 'contains', value: _this.Filter.Name });
                }
                _this.RolesDS.filter(filterConditions);
            };
            this.ResetFilter = function () {
                _this.Filter = {};
                _this.RolesDS.filter([]);
            };
        }
        RolesCtrl.$inject = ['$scope', '$location', '$http'];
        return RolesCtrl;
    })();
    Controllers.RolesCtrl = RolesCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=RolesCtrl.js.map