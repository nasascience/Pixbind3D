/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var TemplateDetailsCtrl = (function () {
        function TemplateDetailsCtrl($scope, $http, $routeParams, $location) {
            $scope['TemplateDetailsCtrl'] = this;
            this.Save = function (template) {
                $http.post('api/EmailTemplate/SaveTemplate', template)
                    .success(function () { return $location.path('/admin/templates'); })
                    .error(function (data) { return Dialogs.showError({ message: data.ExceptionMessage }); });
            };
            this.Cancel = function () {
                $location.path('/admin/templates');
            };
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
                .success(function (data) {
                var templateDetailsCtrl = $scope['TemplateDetailsCtrl'];
                templateDetailsCtrl.Template = data;
                templateDetailsCtrl.GridOptions.dataSource.data(data.Parameters);
                templateDetailsCtrl.GridOptions.dataSource.read();
            });
        }
        TemplateDetailsCtrl.$inject = ['$scope', '$http', '$routeParams', '$location'];
        return TemplateDetailsCtrl;
    })();
    Controllers.TemplateDetailsCtrl = TemplateDetailsCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=TemplateDetailsCtrl.js.map