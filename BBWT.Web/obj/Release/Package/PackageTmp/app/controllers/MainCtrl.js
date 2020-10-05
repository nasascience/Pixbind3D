/// <reference path="../references.ts" />
var Controllers;
(function (Controllers) {
    var MainCtrl = (function () {
        function MainCtrl($scope) {
            this.VideoUrl = "au42M-MUi1w";
            //alert("noo");
            $scope['MainCtrl'] = this;
            this.VideoUrl = "au42M-MUi1w";
            this.ShowAlert = function () { return Dialogs.showInfo({ message: 'it works!' }); }; //.done(()=> alert('it works!'));
            $scope['status'] = 'ready';
        }
        MainCtrl.$inject = ['$scope'];
        return MainCtrl;
    })();
    Controllers.MainCtrl = MainCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=MainCtrl.js.map