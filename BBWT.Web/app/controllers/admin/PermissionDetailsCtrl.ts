/// <reference path="../../references.ts" />
module Controllers {
    export class PermissionDetailsCtrl {
        Permission: any;
        Save: (data) => void;
        Cancel: () => void;

        static $inject: Array<string> = ['$scope', '$location', '$http', '$routeParams'];
        constructor(
            $scope: ng.IScope,
            $location: ng.ILocationService,
            $http: ng.IHttpService,
            $routeParams: ng.route.IRouteParamsService)
        {
            $scope['PermissionDetailsCtrl'] = this;

            if ($routeParams['id'] == 0) {
                this.Permission = { Id: 0, IsParameterised: false };
            } else {
                $http.get('api/permissions/GetPermissionById/' + $routeParams['id'])
                    .success((data) => this.Permission = data);
            }

            this.Save = (data) => {
                $http.post('api/permissions/SavePermission', data)
                    .success(() => $location.path('/admin/permissions'));
            }
            this.Cancel = () => { $location.path('/admin/permissions'); }
        }
    }
}