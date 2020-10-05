/// <reference path="../../references.ts" />
module Controllers {
    export class UsersCtrl {
        ViewDetails: (id: number) => void;
        DeleteUser: (id: number) => void;
        ApplyFilter: () => void;
        ResetFilter: () => void;
        Filter: any;
        FilterMode: number;

        UsersDS: kendo.data.DataSource;        
        GridOptionsSimple: kendo.ui.GridOptions;
        GridOptionsAdv: kendo.ui.GridOptions;

        User: IUser;
        Save: (user: IUser) => void;
        ShowAddUser: () => void;        

        static $inject: Array<string> = ['$scope', '$location', '$http'];
        constructor($scope: ng.IScope, $location: ng.ILocationService, $http: ng.IHttpService) {
            $scope['UsersCtrl'] = this;

             this.UsersDS = new kendo.data.DataSource({
                type: "odata",
                transport: {
                    read: {
                        url: "odata/UsersOData",
                        dataType: "json"
                    }
                },
                schema: {
                    data: function (data) {
                        return data["value"];
                    },
                    total: function (data) {
                        return data["odata.count"];
                    }
                },
                serverPaging: true,
                serverSorting: true,
                serverFiltering: true,
                pageSize: 5
            });

            this.FilterMode = 0; // 0 - simple, 1 - advanced
                                   
            this.GridOptionsSimple = {
                selectable: false,
                pageable: { refresh: true, pageSizes: true },
                columns: [{ field: "Name", title: "User Name", },
                    { field: "FullName", title: "Full Name" },
                    {
                        field: "Id", title: " ", width: "100px", sortable: false,
                        template: "<a ng-click=\"UsersCtrl.ViewDetails(#= Id #)\">Edit</a>  <a ng-click=\"UsersCtrl.DeleteUser(#= Id #)\">Delete</a>"
                    }],
                sortable: true
            }            

            this.GridOptionsAdv = {
                selectable: false,
                pageable: { refresh: true, pageSizes: true },
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            startswith: "Starts with",
                            eq: "Is equal to",
                            neq: "Is not equal to"
                        }
                    }
                },
                columns: [{ field: "Name", title: "User Name" },
                    { field: "FullName", title: "Full Name" },
                    {
                        field: "Id", title: " ", width: "100px", sortable: false, filterable: false,
                        template: "<a ng-click=\"UsersCtrl.ViewDetails(#= Id #)\">Edit</a>  <a ng-click=\"UsersCtrl.DeleteUser(#= Id #)\">Delete</a>"
                    }],
                sortable: true
            }
            
            this.Save = (user: IUser) => {
                $http.post('api/users/SaveUser', user)
                    .success(() => this.UsersDS.read());
            }

            this.ViewDetails = (id: number) => $location.path('/admin/users/' + id);

            this.DeleteUser = (id: number) => {
                Dialogs.showConfirmation({ message: "Are you sure?" }).done(() => {
                    $http.get('api/users/DeleteUser/' + id)
                        .success(() => this.UsersDS.read());
                });
            }

            this.ApplyFilter = () => {
                var filterConditions = [];

                if (this.Filter.Name) {
                    filterConditions.push({ field: 'Name', operator: 'contains', value: this.Filter.Name });
                }

                if (this.Filter.FullName) {
                    filterConditions.push({ field: 'FullName', operator: 'contains', value: this.Filter.FullName });
                }

                this.UsersDS.filter(filterConditions);
            }

            this.ResetFilter = () => {
                this.Filter = {};
                this.UsersDS.filter([]);
            }

            this.ShowAddUser = () => {
                Dialogs.showCustom({ title: 'Add User', winId: 'dlgAddUser' });
            };
        }
    }
}