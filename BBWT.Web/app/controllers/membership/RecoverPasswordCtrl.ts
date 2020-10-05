/// <reference path="../../references.ts" />
module Controllers {
    export interface IRecoverPasswordScope extends ng.IScope {
        data: any;
        Send: () => void;
        Cancel: () => void;
        Status: number;    
    }

    export class RecoverPasswordCtrl {

        static $inject: Array<string> = ['$scope', '$http', '$location'];
        constructor($scope: IRecoverPasswordScope, $http: ng.IHttpService,
            $location: ng.ILocationService) {
            $scope['RecoverPasswordCtrl'] = this;
            $scope.Status = 0;           

            $scope.data = {
                email: null                
            };           

            $scope.Send = function () {                
                $http.post('api/Users/RecoverPassword', $scope.data)
                    .success(() => {
                        $scope.Status = 1;
                        $scope.$apply()
                        })
                    .error(showError);
            };           

            $scope.Cancel = function () {
                $location.path('/');
                ///*Delay as workaround for Angular bug.
                //http://stackoverflow.com/questions/14070285/how-to-implement-history-back-in-angular-js
                //https://github.com/angular/angular.js/issues/1417
                //The suggested delay = 100 doesn't help, but 500 helps J*/
                //setTimeout(function () {
                //    window.history.back();
                //}, 500);                
            };
            function showError(error) {
                Dialogs.showError({ message: error.Message });
            };

        }
    }
}