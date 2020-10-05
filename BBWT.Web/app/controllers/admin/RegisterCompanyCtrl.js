/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var RegisterCompanyCtrl = (function () {
        function RegisterCompanyCtrl($scope, $http) {
            var _this = this;
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
            this.handleNext = function () {
                if (_this.step == 0) {
                    if (_this.validatorCompany.validate() && $scope.form.$valid) {
                        _this.step++;
                    }
                }
                else if (!_this.isLastStep()) {
                    _this.step++;
                }
                else {
                    $http.post('api/Companies/RegisterCompany', _this.data)
                        .success(function () {
                        Dialogs.showSuccess({ message: _this.data.companyName + ' has been registered successfully. Please log in as a company administrator' });
                        _this.isRegistered = true;
                    })
                        .error(function (error) {
                        Dialogs.showError({ message: error.ExceptionMessage });
                    });
                }
            };
            //// validation
            this.pageIsValid = function () {
                return true;
            };
            this.validatorCompany = $('form[name=form]').kendoValidator({
                validate: function (e) {
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
                }
            }).data('kendoValidator');
        }
        RegisterCompanyCtrl.$inject = ['$scope', '$http'];
        return RegisterCompanyCtrl;
    })();
    Controllers.RegisterCompanyCtrl = RegisterCompanyCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=RegisterCompanyCtrl.js.map