/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var CompaniesCtrl = (function () {
        function CompaniesCtrl($scope, $location, $http) {
            var _this = this;
            $scope['CompaniesCtrl'] = this;
            this.CompaniesDS = new kendo.data.DataSource({
                type: "odata",
                transport: {
                    read: {
                        url: "odata/CompaniesOData",
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
                        { field: "CompanyName", title: "Company Name" },
                        { field: "UsersNum", title: "Users" },
                        {
                            field: "Id", title: " ", width: "100px", sortable: false,
                            template: "<a ng-click=\"CompaniesCtrl.ViewDetails(#= Id #)\">Edit</a> <a ng-click=\"CompaniesCtrl.DeleteCompany(#= Id #)\">Delete</a>"
                        }],
                    sortable: true
                };
            this.ViewDetails = function (id) { return $location.path('/admin/companies/' + id); };
            this.DeleteCompany = function (id) {
                Dialogs.showConfirmation({ message: "Are you sure?" }).done(function () {
                    $http.get('api/companies/DeleteCompany/' + id)
                        .success(function () { return _this.CompaniesDS.read(); });
                });
            };
            this.ApplyFilter = function () {
                var filterConditions = [];
                if (_this.Filter.Name) {
                    filterConditions.push({ field: 'CompanyName', operator: 'contains', value: _this.Filter.Name });
                }
                _this.CompaniesDS.filter(filterConditions);
            };
            this.ResetFilter = function () {
                _this.Filter = {};
                _this.CompaniesDS.filter([]);
            };
        }
        CompaniesCtrl.$inject = ['$scope', '$location', '$http'];
        return CompaniesCtrl;
    })();
    Controllers.CompaniesCtrl = CompaniesCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=CompaniesCtrl.js.map