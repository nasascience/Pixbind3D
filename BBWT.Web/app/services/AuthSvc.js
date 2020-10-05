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
            $(document).tooltip();
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
                console.log("CArt");
                console.log(_this.CartProducts);
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
            this.RemoveCartItems = function () {
                $http.get('api/Products/RemoveClearCart')
                    .success(function (data) {
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
                Dialogs.showConfirmation({ message: "Do you really want to delete this product?" }).then(function () {
                    $http.get('api/Products/DeleteProduct/' + id)
                        .success(function (data) {
                        location.reload();
                        //  $window.location.reload();
                        //    $route.reload();
                    });
                });
            };
            this.DirectPay = function (dto) {
                if (_this.User) {
                    $("#LoadingOverlay").fadeIn();
                    $("#LoadSpin").fadeIn();
                    $http.post('api/Products/DirectPay', dto)
                        .success(function (data) {
                        //console.log(data);
                        if (data != null) {
                            console.log(data);
                            $("input[name='li_0_name']").val(data.RefCode);
                            $("input[name='li_0_price']").val(data.Total);
                            $("input[name='email']").val(data.Email);
                            document.getElementById('PaydirectForm').submit();
                        }
                        else {
                            console.log(data);
                        }
                    });
                }
                else {
                    _this.LoginForm = true;
                    _this.ProductView = false;
                    _this.dlgbck = false;
                }
            };
            this.CheckOut = function (dto) {
                console.log(dto);
                if (_this.User) {
                    $("#LoadingOverlay").fadeIn();
                    $("#LoadSpin").fadeIn();
                    $http.get('api/Products/CheckOut?totalPrice=' + dto)
                        .success(function (data) {
                        //console.log(data);
                        if (data != null) {
                            console.log(data);
                            $("#CheckOutForm").find("input[name='li_0_name']").val(data.RefCode);
                            $("#CheckOutForm").find("input[name='li_0_price']").val(data.Total);
                            $("#CheckOutForm").find("input[name='email']").val(data.Email);
                            $("#CheckOutForm").find("input[name='li_0_quantity']").val(data.Qty);
                            document.getElementById('CheckOutForm').submit();
                        }
                        else {
                            console.log(data);
                        }
                    });
                }
                else {
                    _this.LoginForm = true;
                    _this.ProductView = false;
                    _this.dlgbck = false;
                }
            };
            /* function generateUUID() {
                 var d = new Date().getTime();
                 if (window.performance && typeof window.performance.now === "function") {
                     d += performance.now(); //use high-precision timer if available
                 }
                 var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                     var r = (d + Math.random() * 16) % 16 | 0;
                     d = Math.floor(d / 16);
                     return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                 });
                 return uuid;
             }*/
            this.increaseDownload = function (dto) {
                if (_this.User) {
                    console.log(dto);
                    dto.Downloads += 1;
                    //console.log(dto);
                    $http.post('api/Products/EditProduct', dto)
                        .success(function (data) {
                        console.log("Success");
                        ///window.location.(dto.URLDownload);
                        window.open(dto.URLDownload, "_self");
                    });
                    console.log("SaveProduct");
                }
                else {
                    _this.LoginForm = true;
                    _this.ProductView = false;
                    _this.dlgbck = false;
                }
            };
            //Header Fuctions
            this.Home = function () {
                //$location.path('/');
                $("#js-sidebar").removeClass("_opened");
            };
            this.WhyChooseUs = function () {
                //$location.path('/');
                $("#js-sidebar").removeClass("_opened");
            };
            this.About = function () {
                //$location.path('/about');
                $("#js-sidebar").removeClass("_opened");
            };
            this.Contact = function () {
                //$location.path('/');
                $("#js-sidebar").removeClass("_opened");
            };
            this.PrivacyPolicy = function () {
                //$location.path('/about/privacy');
                $("#js-sidebar").removeClass("_opened");
            };
            this.TermsAndConditions = function () {
                //$location.path('/about/terms');
                $("#js-sidebar").removeClass("_opened");
            };
            this.Assets = function () {
                //$location.path('/games');
                $("#js-sidebar").removeClass("_opened");
            };
            this.Environments = function () {
                //$location.path('/environment');
                $("#js-sidebar").removeClass("_opened");
            };
            this.Projects = function () {
                //$location.path('/projects');
                $("#js-sidebar").removeClass("_opened");
            };
            this.Games = function () {
                //$location.path('/games');
                $("#js-sidebar").removeClass("_opened");
            };
            this.Animations = function () {
                //$location.path('/anim');
                $("#js-sidebar").removeClass("_opened");
            };
            //Menu Slider
            this.ImgSrc = "../../../Content/images/Pixbind/environments.jpg";
            this.SetImgSrc = function (CubeName) {
                //console.log("from AuthSvc " + this.ImgSrc);
                _this.ImgSrc = "../../../Content/images/Pixbind/" + CubeName + ".jpg";
                console.log("from AuthSvc " + _this.ImgSrc);
            };
            this.GoHome = function () {
                //alert("GoHome");
                $location.path('/');
                //$window.location.href = '/';
                //$rootScope.$apply(function () { $location.path('#/'); });
            };
            this.SlideToggleMenu = function () {
                $('.js-sidebar').toggleClass('_opened');
                console.log(_this.ImgSrc);
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
                            _this.GetAllCartProductForUser();
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