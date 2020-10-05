/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var GuidelinesCtrl = (function () {
        function GuidelinesCtrl($scope, $location, $anchorScroll) {
            $scope['GuidelinesCtrl'] = this;
            $scope.$on('$includeContentLoaded', function (newRoute, oldRoute) {
                // We emit this event so our hash links could be processed
                $scope.$emit('$viewContentLoaded');
            });
            var treeItems = {
                data: [
                    { text: 'Tree Item1', imageUrl: '/Content/images/image_html.png' },
                    {
                        text: 'Tree Item2', imageUrl: '/Content/images/image_folder.png', items: [
                            { text: 'Sub-item 2.1', imageUrl: '/Content/images/image_html.png' },
                            { text: "Sub-item 2.2", imageUrl: '/Content/images/image_html.png' }
                        ]
                    },
                    { text: 'Tree Item3', imageUrl: '/Content/images/image_html.png' },
                    { text: 'Tree Item4', imageUrl: '/Content/images/image_html.png' },
                    { text: 'Tree Item5', imageUrl: '/Content/images/image_html.png' },
                    { text: 'Tree Item6', imageUrl: '/Content/images/image_html.png' }
                ]
            };
            this.TreeData = { dataSource: treeItems };
            this.SearchData = new kendo.data.DataSource({
                type: "odata",
                transport: {
                    read: {
                        url: "odata/TestProductsOData",
                        dataType: "json"
                    }
                },
                schema: {
                    data: function (data) { return data["value"]; },
                    total: function (data) { return data["odata.count"]; },
                    model: {
                        fields: {
                            Name: { type: "string" },
                        }
                    }
                },
                serverPaging: true,
                serverFiltering: true,
                pageSize: 20
            });
            this.ShowInput = function () { return Dialogs.showCustom({ winId: 'bbwtInputDlg', width: '500px', title: 'Input Box' }); };
            this.ShowInfo = function () { return Dialogs.showInfo({ message: 'There remain 14 items in your work queue.' }); };
            this.ShowError = function () { return Dialogs.showError({ message: 'Date of birth is expected to be earlier than date of death. Please check and re-enter' }); };
            this.ShowSuccess = function () { return Dialogs.showSuccess({ message: 'Form Saved' }); };
            this.ShowWarning = function () { return Dialogs.showWarning({
                message: 'The recipient of your message  is currently  on holiday. He will not recieve your message before 10th July 201'
            }); };
            this.ShowHelper = function () { return Dialogs.showHelper({
                message: "The daily plan 'Weekend' is applied to the following virtual machines: AMM_TEST_SRV-4, AMM_TEST_SRV-5" }); };
            this.ShowWaiting = function () { return Dialogs.showWaiting({}); };
            this.ShowConfirmation = function () { return Dialogs.showConfirmation({ message: 'Are you sure you wish to delete this employment record?' }); };
            this.ShowAddProduct = function () {
                Dialogs.showCustom({ title: 'Add Product', winId: 'bbwtAddProduct' });
            };
            this.ShowSelectedIds = function () {
                var selectedIds = $scope.GuidelinesCtrl.checkboxGrid.dataSource.data()
                    .filter(function (item) { return item.selected; }).map(function (item) { return item.Id; });
                Dialogs.showInfo({ message: "Selected Ids: " + selectedIds });
            };
            this.ScrollTo = function (hash) {
                $location.hash(hash);
                $anchorScroll();
            };
        }
        GuidelinesCtrl.$inject = ['$scope', '$location', '$anchorScroll'];
        return GuidelinesCtrl;
    })();
    Controllers.GuidelinesCtrl = GuidelinesCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=GuidelinesCtrl.js.map