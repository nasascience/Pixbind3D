/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var RecoverPasswordCtrl = (function () {
        function RecoverPasswordCtrl($scope, $http, $location) {
            $scope['RecoverPasswordCtrl'] = this;
            $scope.Status = 0;
            $scope.data = {
                email: null
            };
            $scope.Send = function () {
                $http.post('api/Users/RecoverPassword', $scope.data)
                    .success(function () {
                    $scope.Status = 1;
                    $scope.$apply();
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
            }
            ;
        }
        RecoverPasswordCtrl.$inject = ['$scope', '$http', '$location'];
        return RecoverPasswordCtrl;
    })();
    Controllers.RecoverPasswordCtrl = RecoverPasswordCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=RecoverPasswordCtrl.js.map