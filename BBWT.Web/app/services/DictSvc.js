/// <reference path="../references.ts" />
var Services;
(function (Services) {
    var DictSvc = (function () {
        function DictSvc($http, $rootScope, $q) {
            this.GetAllGroups = function () {
                var def = $q.defer();
                $http.get('api/groups/GetAllGroups').success(function (data) {
                    var GroupsList = [];
                    angular.forEach(data, function (p) { return GroupsList[p.Id] = p; });
                    def.resolve(GroupsList);
                });
                return def.promise;
            };
            this.GetAllRoles = function () {
                var def = $q.defer();
                $http.get('api/roles/GetAllRoles').success(function (data) {
                    var RolesList = [];
                    angular.forEach(data, function (p) { return RolesList[p.Id] = p; });
                    def.resolve(RolesList);
                });
                return def.promise;
            };
            this.GetAllPermissions = function () {
                var def = $q.defer();
                $http.get('api/permissions/GetAllPermissions').success(function (data) {
                    var PermissionsList = [];
                    angular.forEach(data, function (p) { return PermissionsList[p.Id] = p; });
                    def.resolve(PermissionsList);
                });
                return def.promise;
            };
        }
        DictSvc.$inject = ['$http', '$rootScope', '$q'];
        return DictSvc;
    })();
    Services.DictSvc = DictSvc;
})(Services || (Services = {}));
angular.module('Services', [])
    .factory('DictSvc', [
    '$http', '$rootScope', '$q',
    function ($http, $rootScope, $q) {
        return new Services.DictSvc($http, $rootScope, $q);
    }
]);
//# sourceMappingURL=DictSvc.js.map