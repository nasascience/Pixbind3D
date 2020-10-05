/// <reference path="../references.ts" />
var Services;
(function (Services) {
    var AuthSvc = (function () {
        function AuthSvc($http, $rootScope, $q, $route, $location, $window, $routeParams) {
            var _this = this;
            this.LoginSpin = false;
            this.LoginForm = false;
            this.RegisterForm = false;
            this.ProductView = false;
            this.CartView = false;
            this.CheckoutForm = false;
            this.SrcMenuOver = false;
            this.IsAdmin = false;
            this.dlgbck = false;
            this.VideoUrlBl = false;
            $rootScope['AuthSvc'] = this;
            this.setPermissions = function (permissions) {
                _this.permissionsList = permissions;
                $rootScope.$broadcast('auth:permissionsChanged');
            };
            this.hasPermission = function (permissionName, param) {
                if (!_.isString(permissionName)) {
                    return false;
                }
                var permission = permissionName.trim();
                if (permission == 'everybody') {
                    return true;
                }
                if (param != undefined) {
                    var permission1 = permission + "(" + param + ")";
                    var permission2 = permission + "()";
                    return _.any(_this.permissionsList, function (item) {
                        if (_.isString(item))
                            return item.trim() === permission1 || item.trim() === permission2;
                    });
                }
                return _.any(_this.permissionsList, function (item) {
                    if (_.isString(item))
                        return item.trim().indexOf(permission) >= 0;
                });
            };
            $http.get('api/Cart/GetAllCartItemsByUserId')
                .success(function (data) {
                _this.CartProducts = data;
                _this.CartTotal = 0;
                angular.forEach(data, function (value, key) {
                    _this.CartTotal += value.ProductPrice;
                });
                // $route.reload();
            });
            this.GetAllCartProductForUser = function () {
                $http.get('api/Cart/GetAllCartItemsByUserId')
                    .success(function (data) {
                    _this.ProductView = false;
                    _this.CartProducts = data;
                    _this.CartTotal = 0;
                    angular.forEach(data, function (value, key) {
                        _this.CartTotal += value.ProductPrice;
                    });
                });
            };
            this.GetCartList = function () {
                $http.get('api/Cart/GetAllCartItemsByUserId')
                    .success(function (data) {
                    _this.CartList = "";
                    angular.forEach(data, function (value, key) {
                        _this.CartList += value.ProductName + ", ";
                    });
                });
            };
            this.AddProduct = function (Prdct) {
                $http.post('api/Cart/AddCartItem', Prdct)
                    .success(function (data) {
                    $http.get('api/Cart/GetAllCartItemsByUserId')
                        .success(function (data) {
                        _this.ProductView = false;
                        _this.CartProducts = data;
                        _this.CartTotal = 0;
                        angular.forEach(data, function (value, key) {
                            _this.CartTotal += value.ProductPrice;
                        });
                        Dialogs.showInfo({ message: Prdct.Title + " has been added to your cart." });
                    });
                });
            };
            this.DeleteProduct = function (id) {
                Dialogs.showConfirmation({ message: "Do you really wat to delete this product?" }).then(function () {
                    $http.get('api/Products/DeleteProduct/' + id)
                        .success(function (data) {
                        location.reload();
                        //  $window.location.reload();
                        //    $route.reload();
                    });
                });
            };
            this.GoHome = function () {
                //alert("GoHome");
                $location.path('/');
                //$window.location.href = '/';
                //$rootScope.$apply(function () { $location.path('#/'); });
            };
            this.LoginFn = function () {
                //alert("Login");
                _this.LoginForm = true;
                _this.RegisterForm = false;
                _this.dlgbck = true;
            };
            this.RegisterFn = function () {
                //alert("Register");
                if (!_this.User || _this.User == undefined) {
                    $('#Rname').val("");
                    $('#Rpass').val("");
                    $('#RconfirmPass').val("");
                    _this.LoginForm = false;
                    _this.RegisterForm = true;
                    _this.dlgbck = true;
                    //$(document).animate({ scrollTop: "0px" });//.scrollTop(0);
                    $('html, body').animate({
                        scrollTop: 0
                    }, 200);
                }
            };
            this.Login = function (user, password, save) {
                _this.LoginSpin = true;
                ////// .ASPXAUTH cookie patch
                ////if (document.cookie.indexOf(".ASPXAUTH") != -1)
                ////    document.cookie = '.ASPXAUTH=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                // login
                return $http.post('api/auth/login', { 'User': user, 'Pass': password, 'Save': save })
                    .success(function (data) {
                    if (data == 'null') {
                        _this.User = undefined;
                        // $location.path('/');
                        $rootScope.$broadcast("auth:error");
                        Dialogs.showInfo({ message: "Email and password do not match." });
                        _this.LoginSpin = false;
                    }
                    else {
                        _this.User = data;
                        //console.log(this.User);
                        _this.IsAdmin = _this.User.IsAdmin;
                        //console.log(this.IsAdmin);
                        $http.post('api/auth/permissions', ['authorized'])
                            .success(function (data) {
                            _this.setPermissions(data);
                            _this.LoginSpin = false;
                            _this.LoginForm = false;
                            _this.dlgbck = false;
                            Dialogs.showInfo({ message: "Welcome, " + _this.User.Name });
                        })
                            .error(function (data) {
                            _this.LoginSpin = false;
                            // $location.path('/');
                            Dialogs.showInfo({ message: "Email and password do not match." });
                            // JL().warn('permission request fault ' + data);
                            //Dialogs.showError({ message: 'permission request fault ' + data });
                        })
                            .then(function () {
                            // $location.path('/');
                            if (!_this.User) {
                                $rootScope.$broadcast("auth:login", _this.User);
                                Dialogs.showInfo({ message: "Email and password do not match." });
                                _this.LoginSpin = false;
                                _this.LoginForm = true;
                                _this.dlgbck = false;
                            }
                        });
                    }
                })
                    .error(function (data) {
                    //$route.reload();
                    //$location.path('/');
                    //$rootScope.$broadcast("auth:error");
                    _this.LoginSpin = false;
                    Dialogs.showInfo({ message: "Email and password do not match." });
                });
            };
            this.Logout = function () {
                $http.post('api/auth/logout', {}).success(function (data) {
                    _this.User = undefined;
                    _this.setPermissions([]);
                    $rootScope.$broadcast("auth:logout", _this.User);
                }).error(function (data) {
                    //Dialogs.showError({ message: 'logout fault ' + data });
                    _this.User = undefined;
                    _this.setPermissions([]);
                    $rootScope.$broadcast("auth:logout", _this.User);
                });
                _this.IsAdmin = false;
            };
            this.LoginAsDemo = function () { return _this.Login('demo@bbconsult.co.uk', 'demo@bbconsult.co.uk', true); };
            this.LoginAsAdmin = function () { return _this.Login('admin@bbconsult.co.uk', 'admin@bbconsult.co.uk', true); };
            this.LoginAsManager = function () { return _this.Login('manager@bbconsult.co.uk', 'manager@bbconsult.co.uk', true); };
            this.User = window['currentUser'];
            //_.extend(this.User, window['currentUser']);
            this.setPermissions(window['currentPermissions']);
        }
        AuthSvc.$inject = ['$http', '$rootScope', '$q', '$route', '$location', '$window', '$routeParams'];
        return AuthSvc;
    })();
    Services.AuthSvc = AuthSvc;
})(Services || (Services = {}));
angular.module('Services', [])
    .factory('AuthSvc', [
    '$http', '$rootScope', '$q',
    function ($http, $rootScope, $q, $route, $location, $window, $routeParams) {
        var deferred = $q.defer();
        return new Services.AuthSvc($http, $rootScope, $q, $route, $location, $window, $routeParams);
    }
]);
//# sourceMappingURL=AuthSvc.js.map