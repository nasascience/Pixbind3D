/// <reference path="../../references.ts" />
module Controllers {
    export class RegisterCtrl {
        Save: (data) => void;
        Cancel: () => void;
        ErrorMessage: string;
        Validator: kendo.ui.Validator;

        static $inject: Array<string> = ['$scope', '$location', '$http', 'AuthSvc', '$routeParams'];
        constructor(
            $scope: ng.IScope,
            $location: ng.ILocationService,
            $http: ng.IHttpService,
            AuthSvc: Services.AuthSvc,
            $routeParams:  ng.route.IRouteParamsService) {
            $scope['RegisterCtrl'] = this;

            /*this.Validator = $('form[name=form]').kendoValidator({
                validate: (e) => {
                    if (e.valid) {
                        $("#errors").addClass('hidden');
                    } else {
                        //$("#errors").addClass('hidden');
                        $("#errors").empty().removeClass('hidden');
                        var errors = e.sender.errors();
                        $.each(errors, (idx, str) => {
                            $("#errors").append('<div>' + str + '</div>');
                        });
                    }
                }
            }).data('kendoValidator');*/
            this.Save = (data) => {
                this.ErrorMessage = "";
                data.firstName = data.name;
                data.surname = data.name;

                //if (this.Validator.validate() && $scope.form.$valid) {
                try{
                    if ($scope.form.$valid) {
                        $http.post('api/Users/RegisterUser', data)
                            .success((status) => {
                            console.log(status);
                            //$location.path('/login');
                            if (status == "true") {
                                AuthSvc.RegisterForm = false;
                                AuthSvc.Login(data.name, data.pass, data.save);
                                Dialogs.showInfo({ message: "User created successfully." });
                            } else {
                                Dialogs.showInfo({ message: "User already exists." });
                            }
                        })
                            .error((error) => this.ErrorMessage = error.ExceptionMessage);
                    } else {
                        Dialogs.showInfo({ message: "Please check the form. Looks like you are missing some information." });
                    }
                }
                catch (err) {
                    Dialogs.showInfo({ message: err.message });
               }

                if (data.confirmPass != data.pass) {
                    Dialogs.showInfo({ message: "Please check the form. Looks like your passwords don't match." });
                }
            }
            this.Cancel = () => {
                //$location.path('/login');
                AuthSvc.RegisterForm = false;
                AuthSvc.dlgbck = false;
            }
        }
    }
}