/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var GroupsCtrl = (function () {
        function GroupsCtrl($scope, $location, $http) {
            var _this = this;
            $scope['GroupsCtrl'] = this;
            this.GroupsDS = new kendo.data.DataSource({
                type: "odata",
                transport: {
                    read: {
                        url: "odata/GroupsOData",
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
                        { field: "Name", title: "Group Name" },
                        {
                            field: "Id", title: " ", width: "100px", sortable: false,
                            template: "<a ng-click=\"GroupsCtrl.ViewDetails(#= Id #)\">Edit</a> <a ng-click=\"GroupsCtrl.DeleteGroup(#= Id #)\">Delete</a>"
                        }],
                    sortable: true
                };
            this.ViewDetails = function (id) { return $location.path('/admin/groups/' + id); };
            this.DeleteGroup = function (id) {
                Dialogs.showConfirmation({ message: "Are you sure?" }).done(function () {
                    $http.get('api/groups/DeleteGroup/' + id)
                        .success(function () { return _this.GroupsDS.read(); });
                });
            };
            this.ApplyFilter = function () {
                var filterConditions = [];
                if (_this.Filter.Name) {
                    filterConditions.push({ field: 'Name', operator: 'contains', value: _this.Filter.Name });
                }
                _this.GroupsDS.filter(filterConditions);
            };
            this.ResetFilter = function () {
                _this.Filter = {};
                _this.GroupsDS.filter([]);
            };
        }
        GroupsCtrl.$inject = ['$scope', '$location', '$http'];
        return GroupsCtrl;
    })();
    Controllers.GroupsCtrl = GroupsCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=GroupsCtrl.js.map