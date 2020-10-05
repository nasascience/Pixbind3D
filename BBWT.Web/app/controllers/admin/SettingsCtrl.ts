/// <reference path="../../references.ts" />
module Controllers {
    export class SettingsCtrl {
        private OriginalSettings: any;
        public Settings: any;

        public Load: () => void;
        public Save: () => void;
        public Reset: () => void;

        public GetCompanyRegistrationURL: () => void;       
        public ShowInfo: () => void;

        public SaveMenuChanges: () => void;

        static $inject: Array<string> = ['$scope', '$location', '$http', 'MenuSvc'];
        constructor($scope: ng.IScope, $location: ng.ILocationService, $http: ng.IHttpService,
            menuSvc: Services.MenuSvc)
        {
            $scope['SettingsCtrl'] = this;

            $http.post('api/settings/load', null)
                .success((data) => {
                    this.OriginalSettings = data;
                    this.Settings = angular.copy(this.OriginalSettings);
                });            

            this.Save = () => {
                $http.post('api/settings/save', this.Settings)
                    .success(() => {
                        this.OriginalSettings = angular.copy(this.Settings);
                    Dialogs.showSuccess({ message: 'The settings were successfully saved.' });
                });                
            }

            this.Reset = () => { this.Settings = angular.copy(this.OriginalSettings); }

            this.GetCompanyRegistrationURL = () => {
                $http.post('api/settings/GetCompanyRegistrationURL', null)
                    .success((data) => this.Settings.Company.RegistrationURL = data);
            }            

            this.ShowInfo = () => {

                $http.get('api/settings/GetServerInfo', null)
                    .success((data) => {
                    Dialogs.showInfoDialog({
                        message: '<b>Server Name</b>: ' + data.Name +
                        '<br><br><b>Local IPs:</b><br>' + data.LocalIp + '<br><b>Remote IP:</b> ' + data.PublicIp
                        });
                    }).error((err) => alert('error ' + err.Message));
            }


            //////////////////           
            this.SaveMenuChanges = () => {

                // reset menu in default state (see menuSvc.menuDefaultData)                                
                //var items = menuSvc.prepareMenuItems(menuSvc.menuDefaultData);                                        
                //var data = menuSvc.serializeTreeDataSource(items, [], null);

                Dialogs.showConfirmation({ message: "Are you sure you wish to reset of menu settings?" }).done(() => {
                    $http.post('api/menu/ResetMenu', [])
                        .success((result) => {
                            Dialogs.showSuccess({ message: "Menu settings were successfully reset. Refresh page to apply (press F5)." });
                        });         
                });                
            }            
        }
    }
}
