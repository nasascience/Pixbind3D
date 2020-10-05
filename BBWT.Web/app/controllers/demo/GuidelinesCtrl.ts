/// <reference path="../../references.ts" />
module Controllers {
    export class GuidelinesCtrl {
        SearchData: kendo.data.DataSource;
        TreeData: any;
        ShowInput: () => void;
        ShowInfo: () => void;
        ShowError: () => void;
        ShowSuccess: () => void;
        ShowWarning: () => void;
        ShowConfirmation: () => void;
        ShowHelper: () => void;
        ShowWaiting: () => void;
        ShowSelectedIds: () => void;
        ShowAddProduct: () => void;
        ScrollTo: (hash: string) => void;

        static $inject: Array<string> = ['$scope', '$location', '$anchorScroll'];
        constructor($scope: ng.IScope, $location: ng.ILocationService, $anchorScroll: ng.IAnchorScrollService) {
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
                    read:
                    {
                        url: "odata/TestProductsOData",
                        dataType: "json"
                    }
                },
                schema: {
                    data: data => data["value"],
                    total: data => data["odata.count"],
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

            this.ShowInput = () => Dialogs.showCustom({ winId: 'bbwtInputDlg', width: '500px', title: 'Input Box' });
            this.ShowInfo = () => Dialogs.showInfo({ message: 'There remain 14 items in your work queue.' });
            this.ShowError = () => Dialogs.showError({ message: 'Date of birth is expected to be earlier than date of death. Please check and re-enter' });
            this.ShowSuccess = () => Dialogs.showSuccess({ message: 'Form Saved' });
            this.ShowWarning = () => Dialogs.showWarning({
                message: 'The recipient of your message  is currently  on holiday. He will not recieve your message before 10th July 201'
            });
            this.ShowHelper = () => Dialogs.showHelper({
                message: "The daily plan 'Weekend' is applied to the following virtual machines: AMM_TEST_SRV-4, AMM_TEST_SRV-5" });
            this.ShowWaiting = () => Dialogs.showWaiting({});
            this.ShowConfirmation = () => Dialogs.showConfirmation({ message: 'Are you sure you wish to delete this employment record?' });

            this.ShowAddProduct = () => {                
                Dialogs.showCustom({ title: 'Add Product', winId: 'bbwtAddProduct' });
            };

            this.ShowSelectedIds = () => {
                var selectedIds = (<any>$scope).GuidelinesCtrl.checkboxGrid.dataSource.data()
                    .filter(item => item.selected).map(item => item.Id);
                Dialogs.showInfo({ message: "Selected Ids: " + selectedIds });
            };

            this.ScrollTo = (hash: string) => {
                $location.hash(hash);
                $anchorScroll();
            };
        }
    }
}