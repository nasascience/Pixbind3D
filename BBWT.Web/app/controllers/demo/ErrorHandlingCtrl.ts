/// <reference path="../../references.ts" />
module Controllers {
    export class ErrorHandlingCtrl {
        exceptionValue: any;

        throwException: () => void;

        static $inject: Array<string> = ['$scope', '$location', '$http'];
        constructor(
            $scope: ng.IScope,
            $location: ng.ILocationService,
            $http: ng.IHttpService) {
            $scope['ErrorHandlingCtrl'] = this;

            this.throwException = () => {
                var data = this.exceptionValue;
                if (this.exceptionValue == 1 || this.exceptionValue == 2 || this.exceptionValue == 3 || this.exceptionValue == 5) {
                    //the exception is handled by the api controller
                    $http.post('api/ErrorHandling/ThrowException', data, { errorHandling: 'webapi' });
                } else{
                    if (this.exceptionValue == 6) {
                        //try to call a api method which does not exist
                        $http.post('api/ErrorHandling/ThrowExceptio', data, { errorHandling: 'webapi' });
                    } else {
                        if (this.exceptionValue == 4)
                        {
                            //Make a request to the ThrowException method with a character 'a' insted an int
                            $http.post('api/ErrorHandling/ThrowException', 'a', { errorHandling: 'webapi' });
                        }
                    }
                    }                
            }
        }
    }
}