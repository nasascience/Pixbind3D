/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var SettingsCtrl = (function () {
        function SettingsCtrl($scope, $location, $http, menuSvc) {
            var _this = this;
            $scope['SettingsCtrl'] = this;
            $http.post('api/settings/load', null)
                .success(function (data) {
                _this.OriginalSettings = data;
                _this.Settings = angular.copy(_this.OriginalSettings);
            });
            this.Save = function () {
                $http.post('api/settings/save', _this.Settings)
                    .success(function () {
                    _this.OriginalSettings = angular.copy(_this.Settings);
                    Dialogs.showSuccess({ message: 'The settings were successfully saved.' });
                });
            };
            this.Reset = function () { _this.Settings = angular.copy(_this.OriginalSettings); };
            this.GetCompanyRegistrationURL = function () {
                $http.post('api/settings/GetCompanyRegistrationURL', null)
                    .success(function (data) { return _this.Settings.Company.RegistrationURL = data; });
            };
            this.ShowInfo = function () {
                $http.get('api/settings/GetServerInfo', null)
                    .success(function (data) {
                    Dialogs.showInfoDialog({
                        message: '<b>Server Name</b>: ' + data.Name +
                            '<br><br><b>Local IPs:</b><br>' + data.LocalIp + '<br><b>Remote IP:</b> ' + data.PublicIp
                    });
                }).error(function (err) { return alert('error ' + err.Message); });
            };
            //////////////////           
            this.SaveMenuChanges = function () {
                // reset menu in default state (see menuSvc.menuDefaultData)                                
                //var items = menuSvc.prepareMenuItems(menuSvc.menuDefaultData);                                        
                //var data = menuSvc.serializeTreeDataSource(items, [], null);
                Dialogs.showConfirmation({ message: "Are you sure you wish to reset of menu settings?" }).done(function () {
                    $http.post('api/menu/ResetMenu', [])
                        .success(function (result) {
                        Dialogs.showSuccess({ message: "Menu settings were successfully reset. Refresh page to apply (press F5)." });
                    });
                });
            };
        }
        SettingsCtrl.$inject = ['$scope', '$location', '$http', 'MenuSvc'];
        return SettingsCtrl;
    })();
    Controllers.SettingsCtrl = SettingsCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=SettingsCtrl.js.map