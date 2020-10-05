/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var SimplePageCtrl = (function () {
        function SimplePageCtrl($scope, $location, $http) {
            var _this = this;
            $scope['SimplePageCtrl'] = this;
            this.validatorCommon = $('form[name=formCommonInfo]').kendoValidator({ validate: this.onValidate }).data('kendoValidator');
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
                if (_this.validatorCommon.validate()) {
                    Dialogs.showSuccess({ message: "Congratulations! User registration was successful! (note: this is a demo, the data will not be updated!)." });
                }
            };
        }
        SimplePageCtrl.$inject = ['$scope', '$location', '$http'];
        return SimplePageCtrl;
    })();
    Controllers.SimplePageCtrl = SimplePageCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=SimplePageCtrl.js.map