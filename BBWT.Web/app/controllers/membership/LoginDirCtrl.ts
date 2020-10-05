/// <reference path="../../references.ts" />
module Controllers {
    export class LoginDirCtrl {
        Logout: () => void;
        User: any;

        static $inject: Array<string> = ['$scope', '$rootScope', '$location', 'AuthSvc'];
        constructor($scope: ng.IScope,
            $rootScope: ng.IRootScopeService,
            $location: ng.ILocationService,
            AuthSvc: Services.AuthSvc)
        {
            $scope['LoginDirCtrl'] = this;
            this.User = AuthSvc.User; 
             
            $rootScope.$on('auth:login', (event, user) => {
                this.User = user;
            });

            $rootScope.$on('auth:logout', (event, user) => { 
                this.User = user;
                $location.url('/login');
            });

            this.Logout = () => AuthSvc.Logout();
        }
    }
}