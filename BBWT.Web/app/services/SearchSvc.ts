/// <reference path="../references.ts" />
module Services {
    export class SearchSvc {
        IdleCheck: boolean;
        BoxingCheck: boolean;
        MoveCheck: boolean;
        TalkCheck: boolean;
        DanceCheck: boolean;
        MoodCheck: boolean;
        StrikeCheck: boolean;
        OtherCheck: boolean;
        texttoSearch: string;
        SiteSearch: string;

        static $inject: Array<string> = ['$http', '$rootScope', '$q', '$location', '$scope']
        constructor($http: ng.IHttpService, $rootScope: ng.IRootScopeService, $q: ng.IQService, $location: ng.ILocationService, $scope: ng.IScope) {
            $rootScope['SearchSvc'] = this;

         /* $scope.$watch(function () { return $location.path() },
                function () {
                    alert($location.path());
                }
                );
*/
           /* $scope.$watch(function () { return $location.search() }, function (params) {
                console.log(params);
            });*/

           /* $scope.$watch('$location.path()', function () {
                alert($location.path());

            });*/
            this.texttoSearch = "";
            this.IdleCheck = true;
            this.BoxingCheck = true; 
            this.MoveCheck = true;
            this.TalkCheck = true;
            this.DanceCheck = true;
            this.MoodCheck = true;
            this.StrikeCheck = true;
            this.OtherCheck = false;

            

        }
    }
}

angular.module('Services', [])
    .factory('SearchSvc',
    [
        '$http', '$rootScope', '$q',
        ($http: ng.IHttpService, $rootScope: ng.IRootScopeService, $q: ng.IQService, $location: ng.ILocationService, $scope: ng.IScope) => {
            return new Services.SearchSvc($http, $rootScope, $q, $location, $scope);
        }
    ]);
 