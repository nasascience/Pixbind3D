/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var ResetPasswordCtrl = (function () {
        function ResetPasswordCtrl($scope, $location, $routeParams, $http) {
            var _this = this;
            $scope['ResetPasswordCtrl'] = this;
            this.RTicket = {
                User: null,
                Ticket: ""
            };
            this.Status = 0;
            this.RTicket.Ticket = $routeParams['ticket'];
            $http.get('api/users/GetUserByTicket/' + $routeParams['ticket'])
                .success(function (data) {
                if (data != "null") {
                    $scope['ResetPasswordCtrl'].RTicket.User = data;
                    _this.Status = 1; //// successfully loaded
                }
                else {
                    _this.Status = -1; //// can'try registered
                }
            });
            this.Save = function () {
                $http.post('api/users/ResetRegisterTicket/', _this.RTicket)
                    .success(function () {
                    _this.Status = 2; //// successfully registered
                });
            };
        }
        ResetPasswordCtrl.$inject = ['$scope', '$location', '$routeParams', '$http'];
        return ResetPasswordCtrl;
    })();
    Controllers.ResetPasswordCtrl = ResetPasswordCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=ResetPasswordCtrl.js.map