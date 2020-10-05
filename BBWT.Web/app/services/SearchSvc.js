/// <reference path="../references.ts" />
var Services;
(function (Services) {
    var SearchSvc = (function () {
        function SearchSvc($http, $rootScope, $q, $location, $scope) {
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
        SearchSvc.$inject = ['$http', '$rootScope', '$q', '$location', '$scope'];
        return SearchSvc;
    })();
    Services.SearchSvc = SearchSvc;
})(Services || (Services = {}));
angular.module('Services', [])
    .factory('SearchSvc', [
    '$http', '$rootScope', '$q',
    function ($http, $rootScope, $q, $location, $scope) {
        return new Services.SearchSvc($http, $rootScope, $q, $location, $scope);
    }
]);
//# sourceMappingURL=SearchSvc.js.map