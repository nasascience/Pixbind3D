/// <reference path="../references.ts" />
angular.module('HashBangURLs', []).config(['$locationProvider', '$provide', function ($locationProvider, $provide) {
        // See here for additional information:
        // http://stackoverflow.com/questions/16677528/location-switching-between-html5-and-hashbang-mode-link-rewriting
        $locationProvider
            .html5Mode(true);
        //.hashPrefix('');
        $provide.decorator('$sniffer', ['$delegate', function ($delegate) {
                $delegate.history = false;
                return $delegate;
            }]);
    }]);
//# sourceMappingURL=HashBangURLs.js.map