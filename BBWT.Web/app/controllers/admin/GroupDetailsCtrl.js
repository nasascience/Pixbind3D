/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var GroupDetailsCtrl = (function () {
        function GroupDetailsCtrl($scope, $location, $http, $routeParams, dict) {
            var _this = this;
            $scope['GroupDetailsCtrl'] = this;
            dict.GetAllRoles().then(function (data) {
                _this.AllRoles = data;
                if (_this.Group.Roles == null) {
                    _this.Group.Roles = [];
                    angular.forEach(_this.AllRoles, function (val, key) { return _this.Group.Roles.push({ Id: val.Id, IsChecked: false }); });
                }
            });
            dict.GetAllPermissions().then(function (data) {
                _this.AllPermissions = data;
                if (_this.Group.Permissions == null) {
                    _this.Group.Permissions = [];
                    angular.forEach(_this.AllPermissions, function (val, key) { return _this.Group.Permissions.push({ Id: val.Id, IsChecked: false }); });
                }
            });
            if ($routeParams['id'] == 0) {
                this.Group = { Id: 0, IsParameterised: false };
            }
            else {
                $http.get('api/groups/GetGroupById/' + $routeParams['id'])
                    .success(function (data) { return _this.Group = data; });
            }
            this.Save = function (data) {
                $http.post('api/groups/SaveGroup', data)
                    .success(function () { return $location.path('/admin/groups'); });
            };
            this.Cancel = function () { $location.path('/admin/groups'); };
        }
        GroupDetailsCtrl.$inject = ['$scope', '$location', '$http', '$routeParams', 'DictSvc'];
        return GroupDetailsCtrl;
    })();
    Controllers.GroupDetailsCtrl = GroupDetailsCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=GroupDetailsCtrl.js.map