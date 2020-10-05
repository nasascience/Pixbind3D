/// <reference path="../references.ts" />
module Services {
    export class AuthSvc {
        User: DTO.AccountDTO;//any; //DTO.AccountDTO;
        ReturnPath: string;

        permissionsList: Array<string>;
        setPermissions: (permissions: Array<string>) => void;
        hasPermission: (permission: string) => boolean;
        loadPermissions: () => void;

        Login: (user: string, password: string, save: boolean) => void;
        Logout: () => void;

        LoginAsDemo: () => void;
        LoginAsAdmin: () => void;
        LoginAsManager: () => void;
        LoginSpin: boolean = false;

        AddProduct: (Prdct: any) => void;
        DeleteProduct: (id) => void;
        GetAllCartProductForUser: () => void;

        CartProducts: any;
        GoHome: () => void;
        SlideToggleMenu: () => void;
        LoginFn: () => void;
        RegisterFn: () => void;
        increaseDownload: (dto) => void;
        DirectPay: (dto) => void;
        CheckOut: (dto) => void;
        LoginForm: boolean = false;
        RegisterForm: boolean = false;
        ProductView: boolean = false;
        CartView: boolean = false;
        CheckoutForm: boolean = false;
        SelectedProduct: any;
        CartTotal: number;
        SrcMenuOver: boolean = false;
        IsAdmin: boolean = false;
        dlgbck: boolean = false;
        VideoUrlBl: boolean = false;
        VideoUrlStr: string;
        GetCartList: () => void;
        CartList: string;
        ImgSrc: string;
        SetImgSrc: (CubeName: string) => void;


        Home: () => void;
        WhyChooseUs: () => void;
        About: () => void;
        Contact: () => void;
        PrivacyPolicy: () => void;
        TermsAndConditions: () => void;
        Assets: () => void;
        Environments: () => void;
        Projects: () => void;
        Games: () => void;        
        Animations: () => void;

        RemoveCartItems: () => void;

        static $inject: Array<string> = ['$http', '$rootScope', '$q', '$route', '$location', '$window', '$routeParams']
        constructor($http: ng.IHttpService, $rootScope: ng.IRootScopeService, $q: ng.IQService, $route: ng.route.IRouteService, $location: ng.ILocationService, $window: ng.IWindowService, $routeParams: ng.route.IRouteParamsService) {
            $rootScope['AuthSvc'] = this;
            
            this.setPermissions = (permissions: Array<string>) => {
                this.permissionsList = permissions;
                $rootScope.$broadcast('auth:permissionsChanged');
            }

            (<any>$(document)).tooltip();


            this.hasPermission = (permissionName: string, param?: string) => {
                if (! _.isString(permissionName)) {
                    return false;
                }

                var permission = permissionName.trim();

                if (permission == 'everybody') {
                    return true;
                }

                if (param != undefined) {
                    var permission1 = permission + "(" + param + ")";
                    var permission2 = permission + "()";

                    return _.any(this.permissionsList, (item: string) => {
                        if (_.isString(item))
                            return item.trim() === permission1 || item.trim() === permission2;
                    });
                }

                return _.any(this.permissionsList, (item: string) => {
                    if (_.isString(item))
                        return item.trim().indexOf(permission) >= 0;
                });
            }

            $http.get('api/Cart/GetAllCartItemsByUserId')
                .success((data) => {
                this.CartProducts = data;
                this.CartTotal = 0;
                console.log("CArt");
                console.log(this.CartProducts);
                angular.forEach(data, (value:any, key:any) => {
                    this.CartTotal += value.ProductPrice;
                });
                // $route.reload();
                });

            this.GetAllCartProductForUser = () => {

                    $http.get('api/Cart/GetAllCartItemsByUserId')
                        .success((data) => {
                        this.ProductView = false;
                        this.CartProducts = data;
                        this.CartTotal = 0;
                        angular.forEach(data,(value: any, key: any) => {
                            this.CartTotal += value.ProductPrice;
                        });

                    });
            }

            this.RemoveCartItems = () => {
                $http.get('api/Products/RemoveClearCart')
                    .success((data) => {
                    });
            }

            this.GetCartList = () => {
                $http.get('api/Cart/GetAllCartItemsByUserId')
                    .success((data) => {
                    this.CartList = "";
                    angular.forEach(data,(value: any, key: any) => {
                        this.CartList += value.ProductName + ", ";
                    });
                });
            }

            this.AddProduct = (Prdct: any) => {
                $http.post('api/Cart/AddCartItem', Prdct)
                    .success((data) => {

                    $http.get('api/Cart/GetAllCartItemsByUserId')
                        .success((data) => {
                        this.ProductView = false;
                        this.CartProducts = data;
                        this.CartTotal = 0;
                        angular.forEach(data,(value: any, key: any) => {
                            this.CartTotal += value.ProductPrice;
                        });

                        Dialogs.showInfo({ message: Prdct.Title + " has been added to your cart."});
                    });

                });
            }

            this.DeleteProduct = (id) => {

                Dialogs.showConfirmation({ message: "Do you really want to delete this product?" }).then(()=>{
                    $http.get('api/Products/DeleteProduct/' + id)
                        .success((data) => {
                        location.reload();
                      //  $window.location.reload();
                        //    $route.reload();
                        });
                });
            }

            this.DirectPay = (dto) => {
                if (this.User) {
                    $("#LoadingOverlay").fadeIn();
                    $("#LoadSpin").fadeIn();
                    $http.post('api/Products/DirectPay', dto)
                        .success((data) => {
                            //console.log(data);
                            if (data != null) {
                                console.log(data);

                                $("input[name='li_0_name']").val(data.RefCode);
                                $("input[name='li_0_price']").val(data.Total);
                                $("input[name='email']").val(data.Email);
                                (<HTMLFormElement>document.getElementById('PaydirectForm')).submit();
                               
                            } else {
                                console.log(data);
                            }
                        });
                } else {
                    this.LoginForm = true;
                    this.ProductView = false;
                    this.dlgbck = false;
                }

            }

            this.CheckOut = (dto) => {
                console.log(dto);
                if (this.User) {
                    $("#LoadingOverlay").fadeIn();
                    $("#LoadSpin").fadeIn();
                    $http.get('api/Products/CheckOut?totalPrice=' + dto)
                        .success((data) => {
                            //console.log(data);
                            if (data != null) {
                                console.log(data);

                                $("#CheckOutForm").find("input[name='li_0_name']").val(data.RefCode);
                                $("#CheckOutForm").find("input[name='li_0_price']").val(data.Total);
                                $("#CheckOutForm").find("input[name='email']").val(data.Email);
                                $("#CheckOutForm").find("input[name='li_0_quantity']").val(data.Qty);
                                (<HTMLFormElement>document.getElementById('CheckOutForm')).submit();
                               
                            } else {
                                console.log(data);
                            }
                        });
                } else {
                    this.LoginForm = true;
                    this.ProductView = false;
                    this.dlgbck = false;
                }

            }

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

            this.increaseDownload = (dto) => {

                if (this.User) {
                    console.log(dto);
                    dto.Downloads += 1;
                    //console.log(dto);
                    $http.post('api/Products/EditProduct', dto)
                        .success((data) => {
                            console.log("Success");
                            ///window.location.(dto.URLDownload);
                            window.open(dto.URLDownload, "_self");
                        });
                    console.log("SaveProduct");
                } else {
                    this.LoginForm = true;
                    this.ProductView = false;
                    this.dlgbck = false;
                }
            }

            //Header Fuctions
            this.Home = () => {
                //$location.path('/');
                $("#js-sidebar").removeClass("_opened");
            }
            this.WhyChooseUs = () => {
                //$location.path('/');
                $("#js-sidebar").removeClass("_opened");
            }
            this.About = () => {
                //$location.path('/about');
                $("#js-sidebar").removeClass("_opened");
            }
            this.Contact = () => {
                //$location.path('/');
                $("#js-sidebar").removeClass("_opened");
            }
            this.PrivacyPolicy = () => {
                //$location.path('/about/privacy');
                $("#js-sidebar").removeClass("_opened");
            }
            this.TermsAndConditions = () => {
                //$location.path('/about/terms');
                $("#js-sidebar").removeClass("_opened");
            }
            this.Assets = () => {
                //$location.path('/games');
                $("#js-sidebar").removeClass("_opened");
            }
            this.Environments = () => {
                //$location.path('/environment');
                $("#js-sidebar").removeClass("_opened");
            }
            this.Projects = () => {
                //$location.path('/projects');
                $("#js-sidebar").removeClass("_opened");
            }
            this.Games = () => {
                //$location.path('/games');
                $("#js-sidebar").removeClass("_opened");
            }
            this.Animations = () => {
                //$location.path('/anim');
                $("#js-sidebar").removeClass("_opened");
            }

            //Menu Slider
            this.ImgSrc = "../../../Content/images/Pixbind/environments.jpg";
            this.SetImgSrc = (CubeName) => {
                //console.log("from AuthSvc " + this.ImgSrc);
                this.ImgSrc = "../../../Content/images/Pixbind/" + CubeName + ".jpg";
                console.log("from AuthSvc " + this.ImgSrc);
            }



            this.GoHome = () => {
                //alert("GoHome");
                $location.path('/');
                //$window.location.href = '/';
                //$rootScope.$apply(function () { $location.path('#/'); });
            }

            this.SlideToggleMenu = () => {
                $('.js-sidebar').toggleClass('_opened');
                console.log(this.ImgSrc);
            }

            this.LoginFn = () => {
                //alert("Login");
                    this.LoginForm = true;
                    this.RegisterForm = false;
                    this.dlgbck = true;
            }

            this.RegisterFn = () => {
                //alert("Register");
                if (!this.User || this.User == undefined) {
                    $('#Rname').val("");
                    $('#Rpass').val("");
                    $('#RconfirmPass').val("");
                    this.LoginForm = false;
                    this.RegisterForm = true;
                    this.dlgbck = true;
                    //$(document).animate({ scrollTop: "0px" });//.scrollTop(0);
                    $('html, body').animate({
                        scrollTop: 0
                    }, 200);
                }
            }

            this.Login = (user: string, password: string, save: boolean) => {
                this.LoginSpin = true;
                ////// .ASPXAUTH cookie patch
                ////if (document.cookie.indexOf(".ASPXAUTH") != -1)
                ////    document.cookie = '.ASPXAUTH=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
           
                // login
                return $http.post('api/auth/login', { 'User': user, 'Pass': password, 'Save': save })
                    .success((data) => {
                        if (data == 'null') {
                            this.User = undefined;
                           // $location.path('/');
                            $rootScope.$broadcast("auth:error");
                            Dialogs.showInfo({ message: "Email and password do not match." });
                            this.LoginSpin = false;
                        }
                        else {
                            this.User = data;
                            //console.log(this.User);
                            this.IsAdmin = this.User.IsAdmin;
                            //console.log(this.IsAdmin);
                            $http.post('api/auth/permissions', ['authorized'])
                                .success(
                                (data) => {
                                    this.setPermissions(data)
                                    this.LoginSpin = false;
                                    this.LoginForm = false;
                                    this.dlgbck = false;
                                    Dialogs.showInfo({ message: "Welcome, " + this.User.Name });

                                    this.GetAllCartProductForUser();
                                    }
                                )
                                .error(
                                (data) => {
                                    this.LoginSpin = false;
                                   // $location.path('/');
                                    Dialogs.showInfo({ message: "Email and password do not match." });
                                    // JL().warn('permission request fault ' + data);
                                    //Dialogs.showError({ message: 'permission request fault ' + data });
                                })
                                .then(() => {
                               // $location.path('/');
                                    if (!this.User) {
                                        $rootScope.$broadcast("auth:login", this.User)
                                        Dialogs.showInfo({ message: "Email and password do not match." });
                                        this.LoginSpin = false;
                                        this.LoginForm = true;
                                        this.dlgbck = false;
                                    }
                                });
                        }
                    })
                    .error((data) => { 
                        //$route.reload();
                        //$location.path('/');
                        //$rootScope.$broadcast("auth:error");
                        this.LoginSpin = false;
                        Dialogs.showInfo({ message: "Email and password do not match." });
                    });
            }

            this.Logout = () => {
                $http.post('api/auth/logout', {}).success((data) => {
                    this.User = undefined;
                    this.setPermissions([]);
                    $rootScope.$broadcast("auth:logout", this.User);
                }).error((data) => {                      
                    //Dialogs.showError({ message: 'logout fault ' + data });
                    this.User = undefined;
                    this.setPermissions([]);
                    $rootScope.$broadcast("auth:logout", this.User);
                    });
                this.IsAdmin = false;
            }

            this.LoginAsDemo = () => this.Login('demo@bbconsult.co.uk', 'demo@bbconsult.co.uk', true); 
            this.LoginAsAdmin = () => this.Login('admin@bbconsult.co.uk', 'admin@bbconsult.co.uk', true);
            this.LoginAsManager = () => this.Login('manager@bbconsult.co.uk', 'manager@bbconsult.co.uk', true);

            this.User = window['currentUser'];
            //_.extend(this.User, window['currentUser']);
            this.setPermissions(window['currentPermissions']);
            
        }
    }
}

declare module DTO {
    interface AccountDTO {
        Id: number;
        FullName: string;
        Name: string;
        IsAdmin: boolean;
    }
}

angular.module('Services', [])
    .factory('AuthSvc',
    [
        '$http', '$rootScope', '$q',
        ($http: ng.IHttpService, $rootScope: ng.IRootScopeService, $q: ng.IQService, $route: ng.route.IRouteService, $location: ng.ILocationService, $window: ng.IWindowService, $routeParams: ng.route.IRouteParamsService) => {
            var deferred = $q.defer();
            return new Services.AuthSvc($http, $rootScope, $q, $route, $location, $window, $routeParams);
        }
    ]);