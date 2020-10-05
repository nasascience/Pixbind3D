/// <reference path="../references.ts" />
module Services {
    export class DictSvc {
        GetAllGroups: () => ng.IPromise<any>;
        GetAllRoles: () => ng.IPromise<any>;
        GetAllPermissions: () => ng.IPromise<any>;

        static $inject: Array<string> = ['$http', '$rootScope', '$q']
        constructor($http: ng.IHttpService, $rootScope: ng.IRootScopeService, $q: ng.IQService) {
            this.GetAllGroups = () => {
                var def = $q.defer();

                $http.get('api/groups/GetAllGroups').success((data) => {
                    var GroupsList = [];
                    angular.forEach(data, (p) => GroupsList[p.Id] = p);
                    def.resolve(GroupsList);
                });
                return def.promise;
            }

            this.GetAllRoles = () => {
                var def = $q.defer();

                $http.get('api/roles/GetAllRoles').success((data) => {
                    var RolesList = [];
                    angular.forEach(data, (p) => RolesList[p.Id] = p);
                    def.resolve(RolesList);
                });
                return def.promise;
            }

            this.GetAllPermissions = () => {
                var def = $q.defer();

                $http.get('api/permissions/GetAllPermissions').success((data) => {
                    var PermissionsList = [];
                    angular.forEach(data, (p) => PermissionsList[p.Id] = p);
                    def.resolve(PermissionsList);
                });
                return def.promise;
            }
        }
    }
}

angular.module('Services', [])
    .factory('DictSvc',
    [
        '$http', '$rootScope', '$q',
        ($http: ng.IHttpService, $rootScope: ng.IRootScopeService, $q: ng.IQService) => {
            return new Services.DictSvc($http, $rootScope, $q);
        }
    ]);
