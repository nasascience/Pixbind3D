/// <reference path="../references.ts" />
var Controllers;
(function (Controllers) {
    var ReportaProblemCtrl = (function () {
        function ReportaProblemCtrl($rootScope, $scope, $http, authSvc, loggerSvc) {
            $scope['ReportaProblemCtrl'] = this;
            //debugger;
            this.data = $.extend((function () {
                var currentDate = new Date();
                var twoDigitNumber = function (value) {
                    return value < 10 ? '0' + value : value;
                };
                return {
                    ErrorLog: loggerSvc.get(),
                    PreviousPage: $rootScope['previousPage'],
                    Severity: 'SystemFailure',
                    Time: twoDigitNumber(currentDate.getHours()) + ":" + twoDigitNumber(currentDate.getMinutes()),
                    Id: -1,
                    Email: '',
                    Name: ''
                };
            })(), authSvc.User);
            this.Send = function () {
                $http.post('api/reportaproblem/send', $scope['ReportaProblemCtrl'].data)
                    .success(function () { return Dialogs.showSuccess({ message: 'Your request was successfully sent to the support team.', width: '400px' }); });
            };
        }
        ReportaProblemCtrl.$inject = ['$rootScope', '$scope', '$http', 'AuthSvc', 'LoggerSvc'];
        return ReportaProblemCtrl;
    })();
    Controllers.ReportaProblemCtrl = ReportaProblemCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=ReportaProblemCtrl.js.map