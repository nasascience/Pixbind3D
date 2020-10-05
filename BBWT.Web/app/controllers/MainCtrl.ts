/// <reference path="../references.ts" />
module Controllers {
    export class MainCtrl {
        ShowAlert: () => void;
        VideoUrl: any = "au42M-MUi1w";
        static $inject: Array<string> = ['$scope'];

        constructor($scope: ng.IScope) {
            //alert("noo");
            $scope['MainCtrl'] = this;
            this.VideoUrl = "au42M-MUi1w";
            this.ShowAlert = () => Dialogs.showInfo({ message: 'it works!' });//.done(()=> alert('it works!'));

            $scope['status'] = 'ready';
        }
    }
} 