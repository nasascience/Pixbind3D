/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var LoginCtrl = (function () {
        function LoginCtrl($scope, $rootScope, $location, AuthSvc, $route) {
            var _this = this;
            $scope['LoginCtrl'] = this;
            this.User = AuthSvc.User;
            var cleanupLoginHandler = $rootScope.$on('auth:login', function (event, user) {
                _this.IsLockOnRequest = false;
                _this.User = user;
                _this.IsAuthError = false;
                if ($location.path().indexOf('/') != -1) {
                    if (AuthSvc.ReturnPath != undefined) {
                        $location.url(AuthSvc.ReturnPath);
                    }
                    else {
                        $location.url('/'); //$location.url('/publicaciones/:0');
                    }
                    delete AuthSvc.ReturnPath;
                }
            });
            $scope.$on('$destroy', function () {
                cleanupLoginHandler();
            });
            $rootScope.$on('auth:error', function (event) {
                _this.IsLockOnRequest = false;
                _this.IsAuthError = true;
            });
            /*$scope.$watch(function (scope) { return this.User },
                function () {
                    if (this.User){
                        alert();
                        this.IsLockOnRequest = true;
                    }
                }
                );*/
            this.Login = function (data) {
                if (data.name != "" && data.pass != "") {
                    _this.IsLockOnRequest = true;
                    AuthSvc.Login(data.name, data.pass, data.save);
                }
                else {
                    Dialogs.showInfo({ message: "Opps, looks like you are missing some fields." });
                }
            };
            this.Logout = function () {
                AuthSvc.Logout();
                _this.IsLockOnRequest = false;
            };
            this.Cancel = function () {
                AuthSvc.LoginForm = false;
                AuthSvc.dlgbck = false;
            };
            this.LoginAsDemo = function () {
                _this.IsLockOnRequest = true;
                AuthSvc.LoginAsDemo();
            };
            this.LoginAsAdmin = function () {
                _this.IsLockOnRequest = true;
                AuthSvc.LoginAsAdmin();
            };
            this.LoginAsManager = function () {
                _this.IsLockOnRequest = true;
                AuthSvc.LoginAsManager();
            };
            $scope['status'] = 'ready';
        }
        LoginCtrl.$inject = ['$scope', '$rootScope', '$location', 'AuthSvc', '$route'];
        return LoginCtrl;
    })();
    Controllers.LoginCtrl = LoginCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=LoginCtrl.js.map