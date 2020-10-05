/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var TabCtrl = (function () {
        function TabCtrl($scope, $location, $http) {
            var _this = this;
            $scope['TabCtrl'] = this;
            this.tabcontrol = $("#tabstrip").kendoTabStrip({ animation: false }).data("kendoTabStrip");
            //// validation            
            this.validatorCommon = $('form[name=formCommonInfo]').kendoValidator({ validate: this.onValidate }).data('kendoValidator');
            this.validatorSecurity = $('form[name=formSecurityInfo]').kendoValidator({ validate: this.onValidate }).data('kendoValidator');
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
            this.save = function () {
                if (!_this.validatorCommon.validate()) {
                    _this.tabcontrol.select("#tab1");
                }
                else if (!_this.validatorSecurity.validate()) {
                    _this.tabcontrol.select("#tab2");
                }
                else
                    Dialogs.showSuccess({ message: "Congratulations! User registration was successful! (note: this is a demo, the data will not be updated!)." });
            };
        }
        TabCtrl.$inject = ['$scope', '$location', '$http'];
        return TabCtrl;
    })();
    Controllers.TabCtrl = TabCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=TabCtrl.js.map