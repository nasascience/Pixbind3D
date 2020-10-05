/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var AdminCtrl = (function () {
        function AdminCtrl($scope, $sce, $location, $http, $routeParams, $route, AuthSvc, SearchSvc, dict) {
            $scope['AdminCtrl'] = this;
            /* $scope.CategoriesList = {
                 //type: "odata",
                 serverFiltering: true,
                 transport: {
                     read: {
                         url: "api/Products/GetAllProductCategories",
                     }
                 }
             };
 
             $scope.TypeList = {
                 //type: "odata",
                 serverFiltering: true,
                 transport: {
                     read: {
                         url: "api/Products/GetAllProductTypes",
                     }
                 }
             };*/
            $scope.GoHome = function () {
                //alert("GoHome");
                $location.path('/');
                //$window.location.href = '/';
                //$rootScope.$apply(function () { $location.path('#/'); });
            };
            $("#productUpload").kendoUpload({
                async: {
                    saveUrl: "/upload/save",
                    removeUrl: "/upload/remove"
                },
                localization: {
                    select: 'Upload Preview and Save Product',
                    remove: '',
                    cancel: ''
                },
                // cancel: onCancel,
                //complete: onComplete,
                //error: onError,
                //progress: onProgress,
                //remove: onRemove,
                //select: onSelect,
                success: onSuccess,
            });
            function onSuccess(e) {
                var message = $.map(e.files, function (file) { return file.name; }).join(", ");
                $scope.Product.File = message;
                //console.log("event :: onSuccess (" + message + ")");
                //console.log($scope.Product);
                $http.post('api/Products/SaveProduct', $scope.Product)
                    .success(function () {
                    Dialogs.showMessage({ message: "Your product was added successfully" }).then(function () {
                        //$location.url('/unauthorized');
                        // url() here doesn't do anything until apply is called
                        $route.reload();
                    });
                });
            }
            $scope.FilterCategory = function (cattype) {
                console.log("cattype:" + cattype);
                $http.get('api/Products/GetCategories?type=' + cattype)
                    .success(function (data) {
                    $scope.CategoriesList = data;
                    // $route.reload();
                });
            };
            $scope.onSelect = function (e) {
            };
            $scope.NewType = function (data) {
                Dialogs.showConfirmation({ message: "Do you want to add this new type?" }).then(function () {
                    $http.post('api/Products/NewType', data)
                        .success(function () {
                        Dialogs.showInfo({ message: "Your product was added successfully" });
                        $http.get('api/Products/GetCategories?type=' + "Char")
                            .success(function (data) {
                            $scope.CategoriesList = data;
                            // $route.reload();
                        });
                        $http.get('api/Products/GetAllProductTypes')
                            .success(function (data) {
                            $scope.TypeList = data;
                            // $route.reload();
                        });
                    });
                });
            };
            $scope.NewCategory = function (data) {
                data.Type = $scope.Product.Type; //$('#selectType').val(); 
                Dialogs.showConfirmation({ message: "Do you want to add this new Category?" }).then(function () {
                    $http.post('api/Products/NewCat', data)
                        .success(function () {
                        Dialogs.showInfo({ message: "Your product was added successfully" });
                        $http.get('api/Products/GetCategories?type=' + data.Type)
                            .success(function (data) {
                            $scope.CategoriesList = data;
                            // $route.reload();
                        });
                        $http.get('api/Products/GetAllProductTypes')
                            .success(function (data) {
                            $scope.TypeList = data;
                            // $route.reload();
                        });
                    });
                });
            };
            $http.get('api/Products/GetCategories?type=' + "Char")
                .success(function (data) {
                $scope.CategoriesList = data;
                // $route.reload();
            });
            $http.get('api/Products/GetAllProductTypes')
                .success(function (data) {
                $scope.TypeList = data;
                // $route.reload();
            });
            $scope.Save = function () {
            };
            $scope.Cancel = function () { $location.path('/publicaciones/1'); };
        }
        AdminCtrl.$inject = ['$scope', '$sce', '$location', '$http', '$routeParams', '$route', 'AuthSvc', 'DictSvc', 'SearchSvc'];
        return AdminCtrl;
    })();
    Controllers.AdminCtrl = AdminCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=AdminCtrl.js.map