/// <reference path="../../references.ts" />
module Controllers {
    export interface IUser {
        Id: number;
        Name: string;
        Email: string;
        Permissions: any[];
    }

    export class UserDetailsCtrl {
        User: IUser;
        Save: (user: IUser) => void;
        Cancel: () => void;
        SetChecked: (selectedPermission: number) => void;

        AddPermission: (selectedValue: string) => void;
        DeletePermission: (selectedPermission: number) => void;

        AllPermissions: any;
        AllGroups: any;
        AllRoles: any;
        PermissionValues: any;

        selectedPermission: any;

        IsChecked: (item: any) => boolean;
        IsNotChecked: (item: any) => boolean;
        SendPasswordReset: (user: IUser) => void;
        PasswordResetSent: boolean;

        static $inject: Array<string> = ['$scope', '$http', '$routeParams', '$location', 'DictSvc'];
        constructor(
            $scope: ng.IScope,
            $http: ng.IHttpService,
            $routeParams: ng.route.IRouteService,
            $location: ng.ILocationService,
            dict: Services.DictSvc) {
            $scope['UserDetailsCtrl'] = this;

            dict.GetAllGroups().then((data) => this.AllGroups = data);
            dict.GetAllRoles().then((data) => this.AllRoles = data);
            dict.GetAllPermissions().then((data) => this.AllPermissions = data);

            $http.get('api/users/GetUserById/' + $routeParams['id'])
                .success((data) => {
                    this.User = data;
                });

            this.Save = (user: IUser) => {
                $http.post('api/users/SaveUser', user)
                    .success(() => $location.path('/admin/users'));
            }

            this.Cancel = () => {
                $location.path('/admin/users');
            }

            this.IsChecked = (item: any) => {
                return item.IsChecked;
            }

            this.IsNotChecked = (item: any) => {
                return !item.IsChecked;
            }

            this.SetChecked = (selectedPermission: number) => {
                this.selectedPermission = selectedPermission;

                this.PermissionValues = null;
                $scope['selectedValue'] = null;

                if (this.AllPermissions[selectedPermission].HasParameter) {
                    $http.post('api/permissions/GetParameterValues/' + selectedPermission, null).success((data) => {
                        $("#valueListWindow").data("kendoWindow").center().open();
                        this.PermissionValues = data;
                    });
                } else {
                    this.AddPermission(null);
                }
            }

            this.AddPermission = (selectedValue: string) => {
                angular.forEach(this.User.Permissions, (item, key) => {
                    if (item.Id === this.selectedPermission) {
                        item.IsChecked = true;
                        item.Param = selectedValue;
                    }
                }, this);

                $("#valueListWindow").data("kendoWindow").close();
            }

            this.DeletePermission = (selectedPermission: number) => {
                angular.forEach(this.User.Permissions, (item, key) => {
                    if (item.Id === selectedPermission) {
                        item.IsChecked = false;
                        item.Param = null;
                    }
                });
            };

                this.SendPasswordReset = (user: IUser) => {
                    $http.post('api/users/SendPasswordResetByAdmin', {Email: user.Name})
                        .success(() => {
                            this.PasswordResetSent = true;
                            $scope.$apply();
                        });
            }
        }
    }
}