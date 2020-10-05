/// <reference path="../references.ts" />
var Controllers;
(function (Controllers) {
    var PublicacionCtrl = (function () {
        function PublicacionCtrl($scope, $sce, $location, $http, $routeParams, dict) {
            $scope.videoWidth = "70%"; //screen.width / 1.7;
            $scope.TitleWidth = "26%"; //screen.width / 4.2;
            $scope.videoHeight = (screen.width / 1.7) / 1.64; //$scope.videoWidth / 1.64;
            $scope.youtubeLink = 'https://www.youtube.com/embed/';
            //dict.GetDepartmentTypes().then((data) => {
            //    $scope.DepartmentType = data;
            //});
            $http.get('api/publicaciones/GetAllPublicacion').success(function (data) {
                $scope.Videos = data;
            });
            if ($routeParams['id'] == 0) {
                alert("id 0");
                $scope.VideoData = { Id: 0, IsParameterised: false };
                $scope.Title = "Obtuvo un obsequio muy grande para él. Mira con quién decidió compartirlo"; //Length 73
                $scope.Description = "Aunque todos tenemos la capacidad y oportunidad para hacerlo, no todos somos capaces. Este chico es un ejemplo de lo que podemos hacer por los demas.";
                $scope.VideoEmbed = 'MI6fDPRz_f4';
                $scope.VideoUrl = $sce.trustAsResourceUrl($scope.youtubeLink + $scope.VideoEmbed);
            }
            else {
                //alert("other id");
                $http.get('api/publicaciones/GetPublicacionById/' + $routeParams['id'])
                    .success(function (data) {
                    $scope.VideoData = data;
                    $scope.VideoEmbed = $scope.VideoData.VideoURL;
                    $scope.Title = $scope.VideoData.VideoTitulo;
                    $scope.Description = $scope.VideoData.VideoDescripcion;
                    $scope.VideoUrl = $sce.trustAsResourceUrl($scope.youtubeLink + $scope.VideoEmbed);
                    document.title = $scope.VideoData.VideoTitulo;
                });
            }
            $scope.GotoVideoPage = function (Id) {
                $location.path('/publicaciones/' + Id);
            };
            $scope.siteUrl = document.URL;
            $scope.Twittear = function () {
                $("#TwittearID")[0].click();
            };
            $scope.FBShare = function () {
            };
            //$scope.Save = (data) => {
            //    $http.post('api/opticians/SaveOptician', data)
            //        .success(() => $location.path('/optician'));
            //}
            //$scope.Cancel = () => { $location.path('/optician'); }
        }
        PublicacionCtrl.$inject = ['$scope', '$sce', '$location', '$http', '$routeParams', 'DictSvc'];
        return PublicacionCtrl;
    })();
    Controllers.PublicacionCtrl = PublicacionCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=PublicacionCtrl.js.map