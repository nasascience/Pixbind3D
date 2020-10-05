/// <reference path="../../references.ts" />
module Controllers {
    export class GroupDetailsCtrl {
        Group: any;
        Save: (data) => void;
        Cancel: () => void;
        AllPermissions: any;
        AllRoles: any;

        static $inject: Array<string> = ['$scope', '$location', '$http', '$routeParams', 'DictSvc'];
        constructor(
            $scope: ng.IScope,
            $location: ng.ILocationService,
            $http: ng.IHttpService,
            $routeParams: ng.route.IRouteParamsService,
            dict: Services.DictSvc)
        {
            $scope['GroupDetailsCtrl'] = this;

            dict.GetAllRoles().then((data) => {
                this.AllRoles = data;

                if (this.Group.Roles == null) {
                    this.Group.Roles = [];
                    angular.forEach(this.AllRoles,
                        (val, key) => this.Group.Roles.push({ Id: val.Id, IsChecked: false }));
                }
            });

            dict.GetAllPermissions().then((data) => {
                this.AllPermissions = data;

                if (this.Group.Permissions == null) {
                    this.Group.Permissions = [];
                    angular.forEach(this.AllPermissions,
                        (val, key) => this.Group.Permissions.push({ Id: val.Id, IsChecked: false }));
                }
            });

            if ($routeParams['id'] == 0) {
                this.Group = { Id: 0, IsParameterised: false };
            } else {
                $http.get('api/groups/GetGroupById/' + $routeParams['id'])
                    .success((data) => this.Group = data);
            }

            this.Save = (data) => {
                $http.post('api/groups/SaveGroup', data)
                    .success(() => $location.path('/admin/groups'));
            }
            this.Cancel = () => { $location.path('/admin/groups'); }
        }
    }
}