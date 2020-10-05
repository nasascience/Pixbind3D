/// <reference path="../../references.ts" />
module Controllers {
    export class CompanyDetailsCtrl {
        Company: any;
        Save: (data) => void;
        Cancel: () => void;
        AllPermissions: any;
        AllGroups: any;

        static $inject: Array<string> = ['$scope', '$location', '$http', '$routeParams', 'DictSvc'];
        constructor(
            $scope: ng.IScope,
            $location: ng.ILocationService,
            $http: ng.IHttpService,
            $routeParams: ng.route.IRouteParamsService,
            dict: Services.DictSvc)
        {
            $scope['CompanyDetailsCtrl'] = this;

            dict.GetAllGroups().then((data) => {
                this.AllGroups = data;

                if (this.Company.Groups == null) {
                    this.Company.Groups = [];
                    angular.forEach(this.AllGroups,
                        (val, key) => this.Company.Groups.push({ Id: val.Id, IsChecked: false }));
                }
            });

            dict.GetAllPermissions().then((data) => {
                this.AllPermissions = data;

                if (this.Company.Permissions == null) {
                    this.Company.Permissions = [];
                    angular.forEach(this.AllPermissions,
                        (val, key) => this.Company.Permissions.push({ Id: val.Id, IsChecked: false }));
                }
            });

            if ($routeParams['id'] == 0) {
                this.Company = { Id: 0, IsParameterised: false };
            } else {
                $http.get('api/companies/GetCompanyById/' + $routeParams['id'])
                    .success((data) => this.Company = data);
            }

            this.Save = (data) => {
                $http.post('api/companies/SaveCompany', data)
                    .success(() => $location.path('/admin/companies'));
            }
            this.Cancel = () => { $location.path('/admin/companies'); }
        }
    }
}