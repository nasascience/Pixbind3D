/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var UserRegistrationCtrl = (function () {
        function UserRegistrationCtrl($scope, $location, $routeParams, $http) {
            var _this = this;
            $scope['UserRegistrationCtrl'] = this;
            this.RTicker = {
                User: null,
                Ticket: ""
            };
            this.Status = 0;
            this.RTicker.Ticket = $routeParams['ticket'];
            $http.get('api/users/GetUserByTicket/' + $routeParams['ticket'])
                .success(function (data) {
                if (data != "null") {
                    $scope['UserRegistrationCtrl'].RTicker.User = data;
                    _this.Status = 1; //// successfully loaded
                }
                else {
                    _this.Status = -1; //// can'try registered
                }
            });
            this.Save = function () {
                $http.post('api/users/ResetRegisterTicket/', _this.RTicker)
                    .success(function () {
                    _this.Status = 2; //// successfully registered
                });
            };
        }
        UserRegistrationCtrl.$inject = ['$scope', '$location', '$routeParams', '$http'];
        return UserRegistrationCtrl;
    })();
    Controllers.UserRegistrationCtrl = UserRegistrationCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=UserRegistrationCtrl.js.map