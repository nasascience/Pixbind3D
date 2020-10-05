/// <reference path="../../references.ts" />
module Controllers {
    export class TabCtrl {       

        save: () => void;
        validatorCommon: kendo.ui.Validator;
        validatorSecurity: kendo.ui.Validator;        
        onValidate: (e: any) => void;
        tabcontrol: kendo.ui.TabStrip;

        static $inject: Array<string> = ['$scope', '$location', '$http'];
        constructor($scope: ng.IScope, $location: ng.ILocationService, $http: ng.IHttpService) {
            $scope['TabCtrl'] = this;                        

            this.tabcontrol = $("#tabstrip").kendoTabStrip({ animation: false }).data("kendoTabStrip");

            //// validation            
            this.validatorCommon = $('form[name=formCommonInfo]').kendoValidator({ validate: this.onValidate }).data('kendoValidator');
            this.validatorSecurity = $('form[name=formSecurityInfo]').kendoValidator({ validate: this.onValidate }).data('kendoValidator');
                        
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
                if (!this.validatorCommon.validate())
                {                                        
                    this.tabcontrol.select("#tab1");
                }                
                else if (!this.validatorSecurity.validate())
                {                                        
                    this.tabcontrol.select("#tab2");
                }
                else Dialogs.showSuccess({ message: "Congratulations! User registration was successful! (note: this is a demo, the data will not be updated!)." });
            }
        }
    }
}
