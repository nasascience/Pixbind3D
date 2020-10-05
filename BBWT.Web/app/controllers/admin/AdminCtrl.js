/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var AdminCtrl = (function () {
        function AdminCtrl($scope, $sce, $location, $http, $routeParams, $route, AuthSvc, SearchSvc, dict) {
            $scope['AdminCtrl'] = this;
            AuthSvc.SetImgSrc("slideback");
            //$scope.New.Category = "";
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
            var path = null;
            $scope.fileNameChanged = function (e) {
                //console.log(e);
                // path = e.value;
                var input = document.getElementById("fub");
                var fReader = new FileReader();
                //fReader.readAsDataURL(e.value);
                alert(URL.createObjectURL(e.target.files[0]));
                console.log(fReader.readAsDataURL(e.files));
                //fReader.readAsDataURL(input.files[0]);
            };
            $(document).ready(function () {
                $("#files").kendoUpload();
                //$(".btn").button();
                $("#btnUpload").click(function () {
                    path = $("#fub").val();
                    //path.replace('/\\', "\\");
                    // path = "C:\dscn1794.jpg";
                    console.log(path);
                    //$http.post('UploadHandler.ashx', { path: path })
                    //    .success((data) => {
                    //        console.log(data);
                    //        $scope.UploadData = data.toString();
                    //        if ($scope.UploadData == "Error" || $scope.UploadData == null) {
                    //            console.log(data);
                    //            Dialogs.showError({ message: data + "The Files were not uploaded. Please Try Again." });
                    //        } else {
                    //            console.log("success " + data);
                    //            $scope.Product.File = data;
                    //            //console.log("event :: onSuccess (" + message + ")");
                    //            //console.log($scope.Product);
                    //            $http.post('api/Products/SaveProduct', $scope.Product)
                    //                .success(() => {
                    //                    Dialogs.showMessage({ message: "Your product was added successfully" }).then(() => {
                    //                        //$location.url('/unauthorized');
                    //                        // url() here doesn't do anything until apply is called
                    //                        $route.reload();
                    //                    });
                    //                });
                    //        }
                    //    }).error((data) => {
                    //        console.log(data);
                    //        Dialogs.showError({ message: data + "The Files were not uploaded. Please Try Again." });
                    //    });
                    //$.post("UploadHandler.ashx", { path: path }, function (data) {
                    //    console.log(data);
                    //    //var d = data.split(':');
                    //    $scope.UploadData = data.toString();
                    //    if ($scope.UploadData == "Error" || $scope.UploadData == null) {
                    //        console.log("error");
                    //        Dialogs.showError({ message: data + "The Files were not uploaded. Please Try Again." });
                    //    } else {
                    //        console.log("success");
                    //        $scope.Product.File = data;
                    //        //console.log("event :: onSuccess (" + message + ")");
                    //        //console.log($scope.Product);
                    //        $http.post('api/Products/SaveProduct', $scope.Product)
                    //            .success(() => {
                    //                Dialogs.showMessage({ message: "Your product was added successfully" }).then(() => {
                    //                    //$location.url('/unauthorized');
                    //                    // url() here doesn't do anything until apply is called
                    //                    $route.reload();
                    //                });
                    //            });
                    //    }
                    //});
                    //$http.post('api/Products/SaveProduct', path)
                    //    .success(() => {
                    //        Dialogs.showMessage({ message: "Your product was added successfully" }).then(() => {
                    //            //$location.url('/unauthorized');
                    //            // url() here doesn't do anything until apply is called
                    //            $route.reload();
                    //        });
                    //    });
                });
            });
            //$(document).ready(function () {
            //    $("btnUpload").click(function (e) {
            //        var status = $(".status");
            //        var percent = $(".percent");
            //        var bar = $(".bar");
            //        $("#form1").ajaxForm({
            //            url: "UploadHandler.ashx",
            //            type: "POST",
            //            beforeSend: function () {
            //                status.fadeOut();
            //                bar.width("0%");
            //                percent.html("0%");
            //            },
            //            uploadProgress: function (event, position, total, percentComplete) {
            //                var pVel = percentComplete + '%';
            //                bar.width(pVel);
            //                percent.html(pVel);
            //            },
            //            complete: function (data) {
            //                status.html(data.resposneText).fadeIn().fadeOut(1600);
            //            }
            //        });
            //    });
            //});
            $("#productUpload").kendoUpload({
                async: {
                    saveUrl: "api/Uploads/PostFormData",
                    removeUrl: "remove"
                },
                localization: {
                    select: 'Upload Image and Save Product',
                    remove: '',
                    cancel: ''
                },
                // cancel: onCancel,
                complete: onComplete,
                error: onError,
                progress: onProgress,
                //remove: onRemove,
                //select: onSelect,
                success: onSuccess,
            });
            function onSuccess(e) {
                console.log("onSuccess");
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
            function onError(e) {
                Dialogs.showError({ message: "The Files were not uploaded. Please Try Again." });
                $route.reload();
            }
            function onProgress(e) {
                console.log(e.percentComplete);
                $('#UploadPercent').html(e.percentComplete + "%");
                $('#UploadPercent').fadeIn(100);
            }
            function onComplete(e) {
                console.log(e);
                $('#UploadPercent').fadeOut(100);
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
                console.log(data);
                data.Type = $scope.Product.Type; //$('#selectType').val(); 
                Dialogs.showConfirmation({ message: "Do you want to add this new Category?" }).then(function () {
                    $http.post('api/Products/NewCat', data)
                        .success(function () {
                        Dialogs.showInfo({ message: "Your Category was added successfully" });
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
            $scope.AddGDriveLink = function () {
                $("#DownloadLinkInput").val("https://drive.google.com/uc?export=download&id=");
            };
            $scope.AddDemoGDriveLink = function () {
                $("#DemoDownloadLinkInput").val("https://drive.google.com/uc?export=download&id=");
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