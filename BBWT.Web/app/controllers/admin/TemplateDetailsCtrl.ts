/// <reference path="../../references.ts" />
module Controllers {
    export interface ITemplate {
        Id: number;
        Code: string;
        Title: string;
        IsSystem: boolean;
        From: string;
        Subject: string;
        Message: string;
        Notes: string;
    }

    export class TemplateDetailsCtrl {
        Template: ITemplate;
        Save: (template: ITemplate) => void;
        Cancel: () => void;
        GridOptions: kendo.ui.GridOptions;

        static $inject: Array<string> = ['$scope', '$http', '$routeParams', '$location'];
        constructor(
            $scope: ng.IScope,
            $http: ng.IHttpService,
            $routeParams: ng.route.IRouteService,
            $location: ng.ILocationService) {
            $scope['TemplateDetailsCtrl'] = this;


            this.Save = (template: ITemplate) => {
                $http.post('api/EmailTemplate/SaveTemplate', template)
                    .success(() => $location.path('/admin/templates'))
                    .error((data) => Dialogs.showError({ message: data.ExceptionMessage }));
            }

            this.Cancel = () => {
                $location.path('/admin/templates');
            }

            this.GridOptions = {
                dataSource: new kendo.data.DataSource({
                    data: {},
                    error: function (e) {
                        console.log(e.errors);
                    }
                }),
                selectable: false,
                sortable: false,
                pageable: false,
                columns: [
                    { field: "Title", title: "Name" },
                    { field: "Notes", title: "Description" }]
            };

            $http.get('api/EmailTemplate/GetTemplateById/' + $routeParams['id'])
                .success((data) => {
                    var templateDetailsCtrl = $scope['TemplateDetailsCtrl'];
                    templateDetailsCtrl.Template = data;
                    templateDetailsCtrl.GridOptions.dataSource.data(data.Parameters);
                    templateDetailsCtrl.GridOptions.dataSource.read();
                });

        }
    }
}