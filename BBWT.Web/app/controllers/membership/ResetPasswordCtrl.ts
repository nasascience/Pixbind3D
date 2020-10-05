/// <reference path="../../references.ts" />
module Controllers {
    export interface IResetPasswordTicket {
        User: IUser;
        Ticket: string;
    }

    export class ResetPasswordCtrl {
        RTicket: IResetPasswordTicket;
        Save: (user: IUser) => void;
        Status: any;

        static $inject: Array<string> = ['$scope', '$location', '$routeParams', '$http'];

        constructor($scope: ng.IScope, $location: ng.ILocationService, $routeParams: ng.route.IRouteService, $http: ng.IHttpService) {
            $scope['ResetPasswordCtrl'] = this;

            this.RTicket = {
                User: null,
                Ticket: ""
            };
            this.Status = 0;

            this.RTicket.Ticket = $routeParams['ticket'];

            $http.get('api/users/GetUserByTicket/' + $routeParams['ticket'])
                .success((data) => {
                    if (data != "null") {
                        $scope['ResetPasswordCtrl'].RTicket.User = data;
                        this.Status = 1; //// successfully loaded
                    } else {
                        this.Status = -1; //// can'try registered
                    }
                });

            this.Save = () => {
                $http.post('api/users/ResetRegisterTicket/', this.RTicket)
                    .success(() => {
                        this.Status = 2;  //// successfully registered
                    });
            }
        }
    }
}