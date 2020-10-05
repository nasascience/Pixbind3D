/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var SearchBarCtrl = (function () {
        function SearchBarCtrl($scope, $sce, $location, $http, $routeParams, $route, AuthSvc, dict) {
            $http.get('api/Cart/GetAllCartItemsByUserId').success(function (data) {
                AuthSvc.CartProducts = data;
                // $route.reload();
            });
            $http.get('api/Products/GetAllProducts').success(function (data) {
                $scope.Products = data;
                //console.log(data);
            });
            $scope.Checkout = function () {
                AuthSvc.CheckoutForm = true;
            };
            $scope.CloseProductView = function () {
                AuthSvc.ProductView = false;
            };
            $scope.AddToCart = function (Prdct) {
                if (AuthSvc.User) {
                    AuthSvc.AddProduct(Prdct);
                }
                else {
                    AuthSvc.LoginForm = true;
                    AuthSvc.ProductView = false;
                }
            };
        }
        SearchBarCtrl.$inject = ['$scope', '$sce', '$location', '$http', '$routeParams', '$route', 'AuthSvc', 'DictSvc'];
        return SearchBarCtrl;
    })();
    Controllers.SearchBarCtrl = SearchBarCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=SearchBarCtrl.js.map