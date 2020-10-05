/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var WizardCtrl = (function () {
        function WizardCtrl($scope, $http) {
            var _this = this;
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
            this.handleNext = function () {
                if (_this.step == 1) {
                    if (_this.accountType == 0) {
                        var isvalid = _this.validatorUser.validate();
                        if (isvalid)
                            _this.step++;
                    }
                    else if (_this.accountType == 1 && _this.validatorCompany.validate() == true) {
                        _this.step++;
                    }
                }
                else if (_this.step == 2) {
                    if (_this.validatorPassword.validate() == true) {
                        _this.step++;
                    }
                }
                else if (!_this.isLastStep()) {
                    _this.step++;
                }
                else {
                    Dialogs.showSuccess({ message: "Congratulations! User registration was successful! (note: this is a demo, the data will not be updated!)." });
                }
            };
            //// validation
            this.pageIsValid = function () {
                return true;
            };
            this.validatorUser = $('form[name=formUser]').kendoValidator({
                validate: this.onValidate
            }).data('kendoValidator');
            this.validatorCompany = $('form[name=formCompany]').kendoValidator({
                validate: this.onValidate
            }).data('kendoValidator');
            this.validatorPassword = $('form[name=formPasswordValidation]').kendoValidator({
                validate: this.onValidate
            }).data('kendoValidator');
            this.onValidate = function (e) {
                if (e.valid) {
                    $("#errors").addClass('hidden');
                }
                else {
                    $("#errors").empty().removeClass('hidden');
                    var errors = e.sender.errors();
                    $.each(errors, function (idx, str) {
                        $("#errors").append('<div>' + str + '</div>');
                    });
                }
            };
            //// local fields
            this.accountType = 0; // 1 = company or 0 = individual     
            this.getAccountType = function () {
                return _this.accountType == 0 ? "Individual" : "Company";
            };
        }
        WizardCtrl.$inject = ['$scope', '$http'];
        return WizardCtrl;
    })();
    Controllers.WizardCtrl = WizardCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=WizardCtrl.js.map