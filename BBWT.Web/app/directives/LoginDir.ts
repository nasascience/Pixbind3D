/// <reference path="../references.ts" />
module Directives {
    export class LoginD {
        constructor() {
            var directive: ng.IDirective =
                {
                    restrict: "E",
                    transclude: true,
                    templateUrl: "app/directives/Login_dir.html",
                    controller: "LoginCtrl"
                }
            return directive;
        }
    }
}

angular.module('Directives', []).directive('logind',() => {
    return new Directives.LoginD();
});