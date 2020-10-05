/// <reference path="../../references.ts" />
module Controllers {
    export interface IResetRegisterTicket {
        User: IUser;        
        Ticket: string;      
    }

    export class UserRegistrationCtrl {        
        RTicker: IResetRegisterTicket;
        Save: (user: IUser) => void;
        Status: any;                

        static $inject: Array<string> = ['$scope', '$location', '$routeParams', '$http'];

        constructor($scope: ng.IScope, $location: ng.ILocationService, $routeParams: ng.route.IRouteService, $http: ng.IHttpService) {
            $scope['UserRegistrationCtrl'] = this;

            this.RTicker = {
                User: null,
                Ticket: ""
            };
            this.Status = 0;

            this.RTicker.Ticket = $routeParams['ticket'];

            $http.get('api/users/GetUserByTicket/' + $routeParams['ticket'])
                .success((data) => {
                if (data != "null") {
                    $scope['UserRegistrationCtrl'].RTicker.User = data;
                    this.Status = 1; //// successfully loaded
                } else {                    
                    this.Status = -1; //// can'try registered
                }                
            });

            this.Save = () => {                
                $http.post('api/users/ResetRegisterTicket/', this.RTicker)
                    .success(() => {                                                                    
                        this.Status = 2;  //// successfully registered
                });
            }            
        }
    }
}