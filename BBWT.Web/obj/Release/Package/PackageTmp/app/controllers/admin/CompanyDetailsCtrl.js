/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var CompanyDetailsCtrl = (function () {
        function CompanyDetailsCtrl($scope, $location, $http, $routeParams, dict) {
            var _this = this;
            $scope['CompanyDetailsCtrl'] = this;
            dict.GetAllGroups().then(function (data) {
                _this.AllGroups = data;
                if (_this.Company.Groups == null) {
                    _this.Company.Groups = [];
                    angular.forEach(_this.AllGroups, function (val, key) { return _this.Company.Groups.push({ Id: val.Id, IsChecked: false }); });
                }
            });
            dict.GetAllPermissions().then(function (data) {
                _this.AllPermissions = data;
                if (_this.Company.Permissions == null) {
                    _this.Company.Permissions = [];
                    angular.forEach(_this.AllPermissions, function (val, key) { return _this.Company.Permissions.push({ Id: val.Id, IsChecked: false }); });
                }
            });
            if ($routeParams['id'] == 0) {
                this.Company = { Id: 0, IsParameterised: false };
            }
            else {
                $http.get('api/companies/GetCompanyById/' + $routeParams['id'])
                    .success(function (data) { return _this.Company = data; });
            }
            this.Save = function (data) {
                $http.post('api/companies/SaveCompany', data)
                    .success(function () { return $location.path('/admin/companies'); });
            };
            this.Cancel = function () { $location.path('/admin/companies'); };
        }
        CompanyDetailsCtrl.$inject = ['$scope', '$location', '$http', '$routeParams', 'DictSvc'];
        return CompanyDetailsCtrl;
    })();
    Controllers.CompanyDetailsCtrl = CompanyDetailsCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=CompanyDetailsCtrl.js.map