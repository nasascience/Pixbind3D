/// <reference path="../references.ts" />
module Directives {
    export class Register {
        constructor() {
            var directive: ng.IDirective =
                {
                    restrict: "E",
                    transclude: true,
                    templateUrl: "app/directives/Register.html",
                    controller: "RegisterCtrl"
                }
            return directive;
        }
    }
}

angular.module('Directives', []).directive('register',() => {
    return new Directives.Register();
}); 