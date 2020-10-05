/// <reference path="../../references.ts" />
module Controllers {
    export class RegisterCompanyCtrl {

        step: number;        
        totalSteps: number;
        isFirstStep: () => boolean;
        isLastStep: () => boolean;
        isCurrentStep: (step: number) => boolean;
        getNextLabel: () => string;
        handlePrevious: () => void;
        handleNext: () => void;

        data: any;
        isRegistered: boolean;

        pageIsValid: () => boolean;        
        validatorCompany: kendo.ui.Validator;        

        static $inject: Array<string> = ['$scope', '$http'];
        constructor($scope: ng.IScope, $http: ng.IHttpService) {
            $scope['RegisterCompanyCtrl'] = this;

            //// wizard
            this.step = 0;
            this.totalSteps = 3;

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

                if (this.step == 0) {
                    if (this.validatorCompany.validate() && $scope.form.$valid) {
                        this.step++;
                    }
                } else if (!this.isLastStep()) {
                    this.step++;
                } else {
                    $http.post('api/Companies/RegisterCompany', this.data)
                        .success(() => {
                            Dialogs.showSuccess({ message: this.data.companyName + ' has been registered successfully. Please log in as a company administrator' });
                            this.isRegistered = true;
                        })
                        .error(error => {
                        Dialogs.showError({ message: error.ExceptionMessage });
                    });                    
                }
            }

            //// validation
            this.pageIsValid = () => {
                return true;
            }
            
            this.validatorCompany = $('form[name=form]').kendoValidator({
                validate: (e) => {
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
            }).data('kendoValidator');
        }
    }    
}