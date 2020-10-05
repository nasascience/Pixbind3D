/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var LoginDirCtrl = (function () {
        function LoginDirCtrl($scope, $rootScope, $location, AuthSvc) {
            var _this = this;
            $scope['LoginDirCtrl'] = this;
            this.User = AuthSvc.User;
            $rootScope.$on('auth:login', function (event, user) {
                _this.User = user;
            });
            $rootScope.$on('auth:logout', function (event, user) {
                _this.User = user;
                $location.url('/login');
            });
            this.Logout = function () { return AuthSvc.Logout(); };
        }
        LoginDirCtrl.$inject = ['$scope', '$rootScope', '$location', 'AuthSvc'];
        return LoginDirCtrl;
    })();
    Controllers.LoginDirCtrl = LoginDirCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=LoginDirCtrl.js.map