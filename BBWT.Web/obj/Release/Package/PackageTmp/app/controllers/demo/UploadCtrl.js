/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var UploadCtrl = (function () {
        function UploadCtrl($scope, $location, $http, $routeParams, dict) {
            $scope['UploadCtrl'] = this;
            $scope.Save = function (data) {
                $http.post('api/Publicaciones/SavePublicacion', data)
                    .success(function () { return $location.path('/publicaciones/1'); });
            };
            $scope.Cancel = function () { $location.path('/publicaciones/1'); };
        }
        UploadCtrl.$inject = ['$scope', '$location', '$http', '$routeParams', 'DictSvc'];
        return UploadCtrl;
    })();
    Controllers.UploadCtrl = UploadCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=UploadCtrl.js.map