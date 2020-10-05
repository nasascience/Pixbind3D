/// <reference path="../../references.ts" />
module Controllers {

    export interface ISpecialServicePaymentCtrlScope extends ng.IScope {
        FormData: DTO.FormDTO;
        ShowArrows: () => void;
        HideArrows: () => void;
        PrevSlide: () => void;
        NextSlide: () => void;
        CurrentSlide: number;
        GotoVideoPage: (Id: number) => void;
        SlideMax: number;

        FormName: string;
        FormEmail: string;
        FormPrice: number;
        FormSubject: string;
        FormDescription: string;
        FormCountry: string;
        FormState: string;
        FormCity: string;
        FormAddress: string;
        FormZipCode: string;
        FormPhone: string;


        AnimPage: () => void;
        CharPage: () => void;
        EnvironmentVM: any;
        CloseProductView: () => void;
        CartView: () => void;
        CloseCart: () => void;
        CloseCheckoutForm: () => void;
        Checkout: () => void;
        CartItems: any;

        EnvironmentProducts: any;
        ProducDetails: (Product: any) => void;
        AddToCart: (data: any) => void;
        DeleteCartItem: (Id: number) => void;

        OnSearchMenuOver: () => void;
        OnSearchMenuExit: () => void;
        ShowTray: () => void;
        ShowVideo: (e) => void;
        Search: (Text: string) => void;
        GoHome: () => void;
        FilterSearch: (data) => void;
        filterConditions: any;
        filterConditionsEnv: any;

        FilterCheck: (e) => void;
        Projectsfilters: any;

        DownloadDemo: (url) => void;
        GotoGames: () => void;

        SubmitForm: () => void;
        ResetForm: () => void;
    }

    export class SpecialServicePaymentCtrl {

        static $inject: Array<string> = ['$scope', '$sce', '$location', '$http', '$routeParams', '$route', 'AuthSvc', 'DictSvc', 'SearchSvc'];
        constructor(
            $scope: ISpecialServicePaymentCtrlScope,
            $sce: ng.ISCEService,
            $location: ng.ILocationService,
            $http: ng.IHttpService,
            $routeParams: ng.route.IRouteParamsService,
            $route: ng.route.IRouteService,
            AuthSvc: Services.AuthSvc,
            SearchSvc: Services.SearchSvc,
            dict: Services.DictSvc) {

            AuthSvc.SetImgSrc("slideback");

            //END FILTERS

            $scope.FormPrice = 0.00;

            var delay = 1000;
            setTimeout(function () {
                $('.kk-body').addClass('unOpacity');
                $('.HeaderContainer').addClass('UnBlur');
            }, delay);


            $('body').css('cssText', "overflow-y : scroll !important");


            $scope.GoHome = () => {
                $location.path('/');
            }

            $scope.DownloadDemo = (url) => {
                window.location.assign(url.URLDownload);
            }

            $scope.GotoGames = () => {
                $location.path('/games');
            }

            $http.get('api/Products/GetAllProducts?Type=Environment').success((data) => {
                $scope.EnvironmentProducts = data;
            });


            $http.get('api/Cart/GetAllCartItemsByUserId')
                .success((data) => {
                    AuthSvc.CartProducts = data;
                    // $route.reload();
                });

            $scope.DeleteCartItem = (Id: number) => {
                //alert("Ok delete");
                $http.get('api/Cart/RemoveCartItem/' + Id).success((data) => {
                    AuthSvc.GetAllCartProductForUser();
                    /*$http.get('api/Cart/GetAllCartItemsByUserId')
                        .success((data) => {
                        $scope.CartItems = data;
                    });*/
                    $route.reload();
                });
            }

            $scope.OnSearchMenuOver = () => {
                //alert("OnSearchMenuOver");
                AuthSvc.SrcMenuOver = true;
            }

            $scope.OnSearchMenuExit = () => {
                //alert("OnSearchMenuExit");
                AuthSvc.SrcMenuOver = false;
            }


            $scope.ShowVideo = (e) => {
                AuthSvc.VideoUrlStr = e.VideoCode;
                $("#VideoContainer").append(AuthSvc.VideoUrlStr.replace('width="', '').replace('height="', 'style="width:100%; height:100%"'));
                Dialogs.showCustom({ title: 'Video', winId: 'YoutubeDlg', width: "70%", height: "70%", actions: [] });
            }

            $scope.ShowTray = () => {
                //alert("ShowTray");
                angular.element(document).find('#SearchTrayId').addClass('SearchTrayMove');
            }

            $scope.FilterSearch = (data) => {
                $scope.filterConditionsEnv = [];
                for (var i = 0; i < data.length; i++) {
                    $scope.filterConditionsEnv.push(data[i].Name);
                }

            }

            /* $scope.Search = (Text: string) => {
                 $location.path('/products');
                 //alert(Text);
                 //angular.element(document).find('#SearchTrayId').addClass('SearchTrayMove');
             }*/

            $scope.AnimPage = () => {
                $location.path('/anim');
            }

            $scope.CharPage = () => {
                $location.path('/char');
            }

            $scope.CartView = () => {
                $scope.$apply();
                AuthSvc.CartView = true;
                AuthSvc.dlgbck = true;
            }
            $scope.CloseCart = () => {
                AuthSvc.CartView = false;
                AuthSvc.dlgbck = false;
            }

            $scope.CloseCheckoutForm = () => {
                AuthSvc.CheckoutForm = false;
            }

            $scope.Checkout = () => {
                AuthSvc.CheckoutForm = true;
            }

            $scope.ProducDetails = (Product: any) => {
                AuthSvc.SelectedProduct = Product;
                AuthSvc.ProductView = true;
            }

            $scope.CloseProductView = () => {
                AuthSvc.ProductView = false;
            }

            $scope.AddToCart = (Prdct) => {
                //alert("AddToCart");
                if (AuthSvc.User) {
                    AuthSvc.AddProduct(Prdct);
                } else {
                    AuthSvc.LoginForm = true;
                    AuthSvc.ProductView = false;
                    // Dialogs.showWarning({ message: "You are about to be automatically logged out in 30 seconds due to inactivity" });
                }
                //AuthSvc.ProductView = false;
            }


            $scope.SubmitForm = () => {
               /* if ($scope.FormName != "" && $scope.FormEmail != "" && $scope.FormSubject != "" && $scope.FormDescription != "") {
                    var Fdata = {
                        Name: $scope.FormName,
                        Email: $scope.FormEmail,
                        Subject: $scope.FormSubject,
                        Description: $scope.FormDescription
                    }
                    console.log(Fdata);
                    $http.post('api/Products/SendForm', Fdata)
                        .success((dataRtrn) => {
                            if (dataRtrn == "true") {
                                Dialogs.showMessage({ message: "Your form has been sent successfully. Thanks for contacted us. We will answer you as soon as possible." });
                                $scope.FormName = "";
                                $scope.FormEmail = "";
                                $scope.FormSubject = "";
                                $scope.FormDescription = "";
                            } else {
                                Dialogs.showError({ message: "Sorry, an error occurred. Please try again. your query is very important for us." });
                            }
                        });
                } else {
                    Dialogs.showError({ message: "Ups, looks like you are missing some fields to fill." });
                }*/
            }

            $scope.ResetForm = () => {
             /*   $('#SpecialServiceFrm').submit(function () {
                    $.ajax({
                        url: $('#SpecialServiceFrm').attr('action'),
                        type: "POST",
                        data: $('#SpecialServiceFrm').serialize(),
                        error: function (response) {
                            console.log("error");
                            console.log(response);
                        },
                        success: function (response) {
                            console.log("response");
                            console.log(response);
                        }
                    });
                    return false;
                });
                */
               /* $scope.FormName = "";
                $scope.FormEmail = "";
                $scope.FormSubject = "";
                $scope.FormDescription = "";
                $scope.FormPrice = 0;
                $scope.FormAddress = "";
                $scope.FormState = "";
                $scope.FormZipCode = "";
                $scope.FormCountry = "";
                $scope.FormPhone = "";
                $scope.FormCity = "";*/

                var Formdata = {
                    sid: $scope.FormName,
                    li_0_type: $scope.FormEmail,
                    li_0_name: $scope.FormSubject,
                    li_0_price: $scope.FormPrice,
                    card_holder_name: $scope.FormName,
                    email: $scope.FormEmail,
                    street_address: $scope.FormAddress,
                    street_address2: "",
                    city: $scope.FormCity,
                    state: $scope.FormState,
                    zip: $scope.FormZipCode,
                    country: $scope.FormCountry,
                    phone: $scope.FormPhone
                }

                /*$http.post('https://www.2checkout.com/checkout/purchase', Formdata)
                    .success((dataRtrn) => {
                        console.log(dataRtrn);
                    });*/
            }

            $scope.AnimPage = () => {
                $location.path('/products');
            }

            $(document).ready(function () {
                kendo.bind($("#EnvironmentView"), $scope.EnvironmentVM);
            });


        }
    }
}
      