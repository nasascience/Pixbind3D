/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var ContactUsCtrl = (function () {
        function ContactUsCtrl($scope, $sce, $location, $http, $routeParams, $route, AuthSvc, SearchSvc, dict) {
            AuthSvc.SetImgSrc("slideback");
            //END FILTERS
            var delay = 1000;
            setTimeout(function () {
                $('.kk-body').addClass('unOpacity');
                $('.HeaderContainer').addClass('UnBlur');
            }, delay);
            $('body').css('cssText', "overflow-y : scroll !important");
            $scope.GoHome = function () {
                $location.path('/');
            };
            $scope.DownloadDemo = function (url) {
                window.location.assign(url.URLDownload);
            };
            $scope.GotoGames = function () {
                $location.path('/games');
            };
            $http.get('api/Products/GetAllProducts?Type=Environment').success(function (data) {
                $scope.EnvironmentProducts = data;
            });
            $http.get('api/Cart/GetAllCartItemsByUserId')
                .success(function (data) {
                AuthSvc.CartProducts = data;
                // $route.reload();
            });
            $scope.DeleteCartItem = function (Id) {
                //alert("Ok delete");
                $http.get('api/Cart/RemoveCartItem/' + Id).success(function (data) {
                    AuthSvc.GetAllCartProductForUser();
                    /*$http.get('api/Cart/GetAllCartItemsByUserId')
                        .success((data) => {
                        $scope.CartItems = data;
                    });*/
                    $route.reload();
                });
            };
            $scope.OnSearchMenuOver = function () {
                //alert("OnSearchMenuOver");
                AuthSvc.SrcMenuOver = true;
            };
            $scope.OnSearchMenuExit = function () {
                //alert("OnSearchMenuExit");
                AuthSvc.SrcMenuOver = false;
            };
            $scope.ShowVideo = function (e) {
                AuthSvc.VideoUrlStr = e.VideoCode;
                $("#VideoContainer").append(AuthSvc.VideoUrlStr.replace('width="', '').replace('height="', 'style="width:100%; height:100%"'));
                Dialogs.showCustom({ title: 'Video', winId: 'YoutubeDlg', width: "70%", height: "70%", actions: [] });
            };
            $scope.ShowTray = function () {
                //alert("ShowTray");
                angular.element(document).find('#SearchTrayId').addClass('SearchTrayMove');
            };
            $scope.FilterSearch = function (data) {
                $scope.filterConditionsEnv = [];
                for (var i = 0; i < data.length; i++) {
                    $scope.filterConditionsEnv.push(data[i].Name);
                }
            };
            /* $scope.Search = (Text: string) => {
                 $location.path('/products');
                 //alert(Text);
                 //angular.element(document).find('#SearchTrayId').addClass('SearchTrayMove');
             }*/
            $scope.AnimPage = function () {
                $location.path('/anim');
            };
            $scope.CharPage = function () {
                $location.path('/char');
            };
            $scope.CartView = function () {
                $scope.$apply();
                AuthSvc.CartView = true;
                AuthSvc.dlgbck = true;
            };
            $scope.CloseCart = function () {
                AuthSvc.CartView = false;
                AuthSvc.dlgbck = false;
            };
            $scope.CloseCheckoutForm = function () {
                AuthSvc.CheckoutForm = false;
            };
            $scope.Checkout = function () {
                AuthSvc.CheckoutForm = true;
            };
            $scope.ProducDetails = function (Product) {
                AuthSvc.SelectedProduct = Product;
                AuthSvc.ProductView = true;
            };
            $scope.CloseProductView = function () {
                AuthSvc.ProductView = false;
            };
            $scope.AddToCart = function (Prdct) {
                //alert("AddToCart");
                if (AuthSvc.User) {
                    AuthSvc.AddProduct(Prdct);
                }
                else {
                    AuthSvc.LoginForm = true;
                    AuthSvc.ProductView = false;
                }
                //AuthSvc.ProductView = false;
            };
            $scope.SubmitForm = function () {
                if ($scope.FormName != "" && $scope.FormEmail != "" && $scope.FormSubject != "" && $scope.FormDescription != "") {
                    var Fdata = {
                        Name: $scope.FormName,
                        Email: $scope.FormEmail,
                        Subject: $scope.FormSubject,
                        Description: $scope.FormDescription
                    };
                    console.log(Fdata);
                    $http.post('api/Products/SendForm', Fdata)
                        .success(function (dataRtrn) {
                        if (dataRtrn == "true") {
                            Dialogs.showMessage({ message: "Your form has been sent successfully. Thanks for contacted us. We will answer you as soon as possible." });
                            $scope.FormName = "";
                            $scope.FormEmail = "";
                            $scope.FormSubject = "";
                            $scope.FormDescription = "";
                        }
                        else {
                            Dialogs.showError({ message: "Sorry, an error occurred. Please try again. your query is very important for us." });
                        }
                    });
                }
                else {
                    Dialogs.showError({ message: "Ups, looks like you are missing some fields to fill." });
                }
            };
            $scope.ResetForm = function () {
                $scope.FormName = "";
                $scope.FormEmail = "";
                $scope.FormSubject = "";
                $scope.FormDescription = "";
            };
            $scope.AnimPage = function () {
                $location.path('/products');
            };
            $(document).ready(function () {
                kendo.bind($("#EnvironmentView"), $scope.EnvironmentVM);
            });
        }
        ContactUsCtrl.$inject = ['$scope', '$sce', '$location', '$http', '$routeParams', '$route', 'AuthSvc', 'DictSvc', 'SearchSvc'];
        return ContactUsCtrl;
    })();
    Controllers.ContactUsCtrl = ContactUsCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=ContactUsCtrl.js.map