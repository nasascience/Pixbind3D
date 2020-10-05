/// <reference path="../../references.ts" />
module Controllers {   
    
    export class WizardCtrl {                   
                
        step: number;                
        totalSteps: number;   
        isFirstStep: () => boolean;
        isLastStep: () => boolean;
        isCurrentStep: (step: number) => boolean;        
        getNextLabel: () => string;
        handlePrevious: () => void;
        handleNext: () => void;                

        pageIsValid: () => boolean;             
        validatorUser: kendo.ui.Validator;
        validatorCompany: kendo.ui.Validator;
        validatorPassword: kendo.ui.Validator;
        onValidate:(e: any) => void;
        
        accountType: number;  
        getAccountType: () => string;
        user: any;                
                 
        static $inject: Array<string> = ['$scope', '$http'];
        constructor($scope: ng.IScope, $http: ng.IHttpService) {
            $scope['WizardCtrl'] = this;  
            
            //// wizard
            this.step = 0;
            this.totalSteps = 4;                                    

            this.isFirstStep = function () {
                return this.step === 0;
            };

            this.isLastStep = function () {
                return this.step == this.totalSteps - 1;
            };

            this.isCurrentStep = function (step) {
                return this.step === step;
            };
          
            this.getNextLabel = function () {
                return (this.isLastStep()) ? 'Save' : 'Next';
            };

            this.handlePrevious = function () {
                this.step -= (this.isFirstStep()) ? 0 : 1;
            };
           
            this.handleNext = () => {                

                if (this.step == 1) {
                    if (this.accountType == 0) {
                        var isvalid = this.validatorUser.validate();
                        if (isvalid)
                            this.step++;
                    } else if (this.accountType == 1 && this.validatorCompany.validate() == true) {
                        this.step++;
                    }
                }
                else if (this.step == 2) {
                    if (this.validatorPassword.validate() == true) {
                        this.step++;
                    }

                } else if (!this.isLastStep()) {
                    this.step++;
                } else {
                    Dialogs.showSuccess({ message: "Congratulations! User registration was successful! (note: this is a demo, the data will not be updated!)." });
                }
            }    

            //// validation
            this.pageIsValid = () => {                
                return true;                   
            }       
            
            this.validatorUser = $('form[name=formUser]').kendoValidator({
                validate: this.onValidate
            }).data('kendoValidator');         

            this.validatorCompany = $('form[name=formCompany]').kendoValidator({
                validate: this.onValidate
            }).data('kendoValidator');        

            this.validatorPassword = $('form[name=formPasswordValidation]').kendoValidator({
                validate: this.onValidate
            }).data('kendoValidator');                                

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

            //// local fields
            this.accountType = 0; // 1 = company or 0 = individual     
            this.getAccountType = () => {
                return this.accountType == 0 ? "Individual" : "Company";
            }
        }
    }
}