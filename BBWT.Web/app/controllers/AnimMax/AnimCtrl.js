/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var AnimCtrl = (function () {
        function AnimCtrl($scope, $sce, $location, $http, $routeParams, dict) {
            //alert("hola");
            $http.get('api/Products/GetAllProducts').success(function (data) {
                $scope.Products = data;
                console.log(data);
            });
            $scope.AnimPage = function () {
                $location.path('/anim');
            };
            $scope.CharPage = function () {
                $location.path('/char');
            };
            $scope.ProducDetails = function (Id) {
                $location.path('/publicaciones/' + Id);
            };
            $scope.AddToCart = function (Id) {
                //$location.path('/publicaciones/' + Id);
                alert("Add to Cart");
            };
        }
        AnimCtrl.$inject = ['$scope', '$sce', '$location', '$http', '$routeParams', 'DictSvc'];
        return AnimCtrl;
    })();
    Controllers.AnimCtrl = AnimCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=AnimCtrl.js.map