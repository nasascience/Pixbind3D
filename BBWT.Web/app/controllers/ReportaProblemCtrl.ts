/// <reference path="../references.ts" />
module Controllers {
    export class ReportaProblemCtrl {
        private data: any;
        Send: () => void;

        static $inject: Array<string> = ['$rootScope', '$scope', '$http', 'AuthSvc', 'LoggerSvc'];
        constructor($rootScope: ng.IRootScopeService, $scope: ng.IScope, $http: ng.IHttpService, authSvc: Services.AuthSvc, loggerSvc: Services.LoggerSvc) {
            $scope['ReportaProblemCtrl'] = this;
            //debugger;
            this.data = $.extend(
                (() => {
                    var currentDate = new Date();

                    var twoDigitNumber = (value) =>
                        value < 10 ? '0' + value : value;

                    return {
                        ErrorLog: loggerSvc.get(),
                        PreviousPage: $rootScope['previousPage'],
                        Severity: 'SystemFailure',
                        Time: twoDigitNumber(currentDate.getHours()) + ":" + twoDigitNumber(currentDate.getMinutes()),
                        Id: -1,
                        Email: '',
                        Name: ''

                    }
                })()
                , authSvc.User);
            this.Send = () => {
                $http.post('api/reportaproblem/send', $scope['ReportaProblemCtrl'].data)
                    .success(() => Dialogs.showSuccess({ message: 'Your request was successfully sent to the support team.', width: '400px' }));
            }
        }
    }
}