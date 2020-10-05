/// <reference path="../../references.ts" />
module Controllers {
    export class LoginCtrl {
        GridVisibility: boolean;
        Login: (data) => void;
        Logout: () => void;
        LoginAsDemo: () => void;
        LoginAsAdmin: () => void; 
        LoginAsManager: () => void;
        Cancel: () => void;

        User: any;
        IsAuthError: boolean;

        IsLockOnRequest: boolean;

        static $inject: Array<string> = ['$scope', '$rootScope', '$location', 'AuthSvc', '$route'];
        constructor($scope: ng.IScope,
            $rootScope: ng.IRootScopeService,
            $location: ng.ILocationService,
            AuthSvc: Services.AuthSvc,
            $route: ng.route.IRouteService)
        {
            $scope['LoginCtrl'] = this;
            this.User = AuthSvc.User;
             
            var cleanupLoginHandler = $rootScope.$on('auth:login', (event, user) => {
                this.IsLockOnRequest = false;      

                this.User = user;
                this.IsAuthError = false;
              
                if ($location.path().indexOf('/') != -1) {
                    if (AuthSvc.ReturnPath != undefined) {
                        $location.url(AuthSvc.ReturnPath);
                    } else {
                        $location.url('/');//$location.url('/publicaciones/:0');
                    }
                    delete AuthSvc.ReturnPath;                    
                }
            });

            $scope.$on('$destroy', () => {
                cleanupLoginHandler();
            });

            $rootScope.$on('auth:error', (event) => {
                this.IsLockOnRequest = false;      
                this.IsAuthError = true;
            });            
            
            /*$scope.$watch(function (scope) { return this.User },
                function () {
                    if (this.User){
                        alert();
                        this.IsLockOnRequest = true;   
                    }
                }
                );*/

            this.Login = (data) => {        
                if (data.name != "" && data.pass != "") {
                    this.IsLockOnRequest = true;
                    AuthSvc.Login(data.name, data.pass, data.save);
                } else {
                    Dialogs.showInfo({ message: "Opps, looks like you are missing some fields."});
                }
            }
            
            this.Logout = () => {
                AuthSvc.Logout();
                this.IsLockOnRequest = false;
            };

            this.Cancel = () => {
                AuthSvc.LoginForm = false;
                AuthSvc.dlgbck = false;
            }

            this.LoginAsDemo = () => {
                this.IsLockOnRequest = true;
                AuthSvc.LoginAsDemo();
            }            

            this.LoginAsAdmin = () => {
                this.IsLockOnRequest = true;
                AuthSvc.LoginAsAdmin();
            }
            
            this.LoginAsManager = () => {
                this.IsLockOnRequest = true;
                AuthSvc.LoginAsManager();
            } 

            $scope['status'] = 'ready';           
        }
    }
}