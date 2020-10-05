/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var ProfileCtrl = (function () {
        function ProfileCtrl($scope, $http, AuthSvc) {
            var user = AuthSvc.User;
            var fullName = user.FullName.split(' ');
            $scope.data = {
                id: user.Id,
                firstName: fullName[0],
                surname: fullName[1],
                name: user.Name,
                languageId: null,
            };
            $scope.passwordData = {
                currentPassword: null,
                newPassword: null,
                confirmNewPassword: null,
            };
            $scope.save = function () {
                $http.post('api/Users/UpdateUser', $scope.data)
                    .success(function () { return Dialogs.showSuccess({ message: 'User has been successfully updated' }); })
                    .error(showError);
            };
            $scope.changePassword = function () {
                $scope.passwordData.name = $scope.data.name;
                $http.post('api/Users/ChangePassword', $scope.passwordData)
                    .success(function () { return Dialogs.showSuccess({ message: 'User password has been successfully updated' }); })
                    .error(showError);
            };
            $scope.showChangePassowrdDialog = function () {
                Dialogs.showCustom({ title: 'Change Password', winId: 'changePasswordInputDlg', width: '650px', });
            };
            $scope.loadUserSettings = function () {
                $http.get('api/Users/GetUserSettings/' + user.Id)
                    .success(function (data) {
                    $scope.data.languageId = data.Language.Id;
                });
            };
            $scope.languagesSource = {
                type: 'get',
                transport: {
                    read: {
                        url: 'api/Dictionary/GetLanguages',
                    }
                }
            };
            function showError(error) {
                Dialogs.showError({ message: error.ExceptionMessage });
            }
            ;
            $scope.loadUserSettings();
        }
        ProfileCtrl.$inject = ['$scope', '$http', 'AuthSvc'];
        return ProfileCtrl;
    })();
    Controllers.ProfileCtrl = ProfileCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=ProfileCtrl.js.map