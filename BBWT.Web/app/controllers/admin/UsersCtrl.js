/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var UsersCtrl = (function () {
        function UsersCtrl($scope, $location, $http) {
            var _this = this;
            $scope['UsersCtrl'] = this;
            this.UsersDS = new kendo.data.DataSource({
                type: "odata",
                transport: {
                    read: {
                        url: "odata/UsersOData",
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
            this.FilterMode = 0; // 0 - simple, 1 - advanced
            this.GridOptionsSimple = {
                selectable: false,
                pageable: { refresh: true, pageSizes: true },
                columns: [{ field: "Name", title: "User Name", },
                    { field: "FullName", title: "Full Name" },
                    {
                        field: "Id", title: " ", width: "100px", sortable: false,
                        template: "<a ng-click=\"UsersCtrl.ViewDetails(#= Id #)\">Edit</a>  <a ng-click=\"UsersCtrl.DeleteUser(#= Id #)\">Delete</a>"
                    }],
                sortable: true
            };
            this.GridOptionsAdv = {
                selectable: false,
                pageable: { refresh: true, pageSizes: true },
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            startswith: "Starts with",
                            eq: "Is equal to",
                            neq: "Is not equal to"
                        }
                    }
                },
                columns: [{ field: "Name", title: "User Name" },
                    { field: "FullName", title: "Full Name" },
                    {
                        field: "Id", title: " ", width: "100px", sortable: false, filterable: false,
                        template: "<a ng-click=\"UsersCtrl.ViewDetails(#= Id #)\">Edit</a>  <a ng-click=\"UsersCtrl.DeleteUser(#= Id #)\">Delete</a>"
                    }],
                sortable: true
            };
            this.Save = function (user) {
                $http.post('api/users/SaveUser', user)
                    .success(function () { return _this.UsersDS.read(); });
            };
            this.ViewDetails = function (id) { return $location.path('/admin/users/' + id); };
            this.DeleteUser = function (id) {
                Dialogs.showConfirmation({ message: "Are you sure?" }).done(function () {
                    $http.get('api/users/DeleteUser/' + id)
                        .success(function () { return _this.UsersDS.read(); });
                });
            };
            this.ApplyFilter = function () {
                var filterConditions = [];
                if (_this.Filter.Name) {
                    filterConditions.push({ field: 'Name', operator: 'contains', value: _this.Filter.Name });
                }
                if (_this.Filter.FullName) {
                    filterConditions.push({ field: 'FullName', operator: 'contains', value: _this.Filter.FullName });
                }
                _this.UsersDS.filter(filterConditions);
            };
            this.ResetFilter = function () {
                _this.Filter = {};
                _this.UsersDS.filter([]);
            };
            this.ShowAddUser = function () {
                Dialogs.showCustom({ title: 'Add User', winId: 'dlgAddUser' });
            };
        }
        UsersCtrl.$inject = ['$scope', '$location', '$http'];
        return UsersCtrl;
    })();
    Controllers.UsersCtrl = UsersCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=UsersCtrl.js.map