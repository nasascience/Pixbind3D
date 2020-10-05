/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var ErrorHandlingCtrl = (function () {
        function ErrorHandlingCtrl($scope, $location, $http) {
            var _this = this;
            $scope['ErrorHandlingCtrl'] = this;
            this.throwException = function () {
                var data = _this.exceptionValue;
                if (_this.exceptionValue == 1 || _this.exceptionValue == 2 || _this.exceptionValue == 3 || _this.exceptionValue == 5) {
                    //the exception is handled by the api controller
                    $http.post('api/ErrorHandling/ThrowException', data, { errorHandling: 'webapi' });
                }
                else {
                    if (_this.exceptionValue == 6) {
                        //try to call a api method which does not exist
                        $http.post('api/ErrorHandling/ThrowExceptio', data, { errorHandling: 'webapi' });
                    }
                    else {
                        if (_this.exceptionValue == 4) {
                            //Make a request to the ThrowException method with a character 'a' insted an int
                            $http.post('api/ErrorHandling/ThrowException', 'a', { errorHandling: 'webapi' });
                        }
                    }
                }
            };
        }
        ErrorHandlingCtrl.$inject = ['$scope', '$location', '$http'];
        return ErrorHandlingCtrl;
    })();
    Controllers.ErrorHandlingCtrl = ErrorHandlingCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=ErrorHandlingCtrl.js.map