/// <reference path="../references.ts" />
module Controllers {

    export interface IPublicacionCtrlScope extends ng.IScope {
        ShowAlert: () => void;
        Twittear: () => void;
        FBShare: () => void;
        GotoVideoPage: (Id: number) => void;
        youtubeLink: any;
        VideoEmbed: any;
        VideoUrl: any;
        videoWidth: any;
        videoHeight: any;
        Title: string;
        Description: string;
        TitleWidth: any;

        siteUrl: any;
        VideoData: any;
        Videos: any;
    }

    export class PublicacionCtrl {

        static $inject: Array<string> = ['$scope', '$sce', '$location', '$http', '$routeParams', 'DictSvc'];
        constructor(
            $scope: IPublicacionCtrlScope,
            $sce: ng.ISCEService,
            $location: ng.ILocationService,
            $http: ng.IHttpService,
            $routeParams: ng.route.IRouteParamsService,
            dict: Services.DictSvc)
        {

            $scope.videoWidth = "70%";//screen.width / 1.7;
            $scope.TitleWidth = "26%";//screen.width / 4.2;
            $scope.videoHeight = (screen.width / 1.7) / 1.64; //$scope.videoWidth / 1.64;
            $scope.youtubeLink = 'https://www.youtube.com/embed/';
            //dict.GetDepartmentTypes().then((data) => {
            //    $scope.DepartmentType = data;
            //});
            $http.get('api/publicaciones/GetAllPublicacion').success((data) => {
                $scope.Videos = data;
            });

            if ($routeParams['id'] == 0) {
                alert("id 0");
                $scope.VideoData = { Id: 0, IsParameterised: false };
                $scope.Title = "Obtuvo un obsequio muy grande para él. Mira con quién decidió compartirlo"; //Length 73
                $scope.Description = "Aunque todos tenemos la capacidad y oportunidad para hacerlo, no todos somos capaces. Este chico es un ejemplo de lo que podemos hacer por los demas.";
                $scope.VideoEmbed = 'MI6fDPRz_f4';
                $scope.VideoUrl = $sce.trustAsResourceUrl($scope.youtubeLink + $scope.VideoEmbed);
            } else {
                //alert("other id");
                $http.get('api/publicaciones/GetPublicacionById/' + $routeParams['id'])
                    .success((data) => {
                        $scope.VideoData = data;
                        $scope.VideoEmbed = $scope.VideoData.VideoURL;
                        $scope.Title = $scope.VideoData.VideoTitulo;
                        $scope.Description = $scope.VideoData.VideoDescripcion;
                        $scope.VideoUrl = $sce.trustAsResourceUrl($scope.youtubeLink + $scope.VideoEmbed);
                        document.title = $scope.VideoData.VideoTitulo;
                    });
                
            }

            $scope.GotoVideoPage = (Id: number) => {
                $location.path('/publicaciones/' + Id); 
            }


            $scope.siteUrl = document.URL;

            $scope.Twittear = () => {
                $("#TwittearID")[0].click();
            }

            $scope.FBShare = () => {

            }

            //$scope.Save = (data) => {
            //    $http.post('api/opticians/SaveOptician', data)
            //        .success(() => $location.path('/optician'));
            //}
            //$scope.Cancel = () => { $location.path('/optician'); }
        }
    }
}
