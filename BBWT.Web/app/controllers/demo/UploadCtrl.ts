/// <reference path="../../references.ts" />
module Controllers {
    export interface IUploadScope extends ng.IScope{
        Save: (data) => void;
        Cancel: () => void;
        VideoData: any;
    }

    export class UploadCtrl {
        static $inject: Array<string> = ['$scope', '$location', '$http', '$routeParams', 'DictSvc'];
        constructor(
            $scope: IUploadScope,
            $location: ng.ILocationService,
            $http: ng.IHttpService,
            $routeParams: ng.route.IRouteParamsService,
            dict: Services.DictSvc)
        {
            $scope['UploadCtrl'] = this;
            

            $scope.Save = (data) => {
                $http.post('api/Publicaciones/SavePublicacion', data)
                    .success(() => $location.path('/publicaciones/1'));
            }
            $scope.Cancel = () => { $location.path('/publicaciones/1'); }
        }
    }
}