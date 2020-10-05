/// <reference path="../../references.ts" />
module Controllers {
    export class SimplePageCtrl {       

        save: () => void;
        validatorCommon: kendo.ui.Validator;        
        onValidate: (e: any) => void;

        static $inject: Array<string> = ['$scope', '$location', '$http'];
        constructor($scope: ng.IScope, $location: ng.ILocationService, $http: ng.IHttpService) {
            $scope['SimplePageCtrl'] = this;            

            this.validatorCommon = $('form[name=formCommonInfo]').kendoValidator({ validate: this.onValidate }).data('kendoValidator');            

            this.onValidate = (e) => {
                if (e.valid) {
                    $("#errors").addClass('hidden');
                } else {
                    $("#errors").empty().removeClass('hidden');
                    var errors = e.sender.errors();
                    $.each(errors, (idx, str) => {
                        $("#errors").append('<div>' + str + '</div>');
                    });
                }
            }

            this.save = () => {
                if (this.validatorCommon.validate()) {
                    Dialogs.showSuccess({ message: "Congratulations! User registration was successful! (note: this is a demo, the data will not be updated!)." });    
                }                
            }
        }
    }
}
