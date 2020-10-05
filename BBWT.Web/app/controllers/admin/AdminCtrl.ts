/// <reference path="../../references.ts" />
module Controllers {

    export interface IAdminCtrlScope extends ng.IScope { 
        Product: DTO.Product;
        Save: () => void;
        onSelect: (e) => void;
        GoHome: () => void;
        //onComplete: (e) => void;
        Cancel: () => void;
        FilterCategory: (cattype) => void;
        CategoriesList: any;
        TypeList: any;
        NewType: (data) => void;
        NewCategory: (data) => void;
        AddGDriveLink: () => void;
        AddDemoGDriveLink: () => void;
        New: DTO.New;
        fileNameChanged: (e) => void;
        UploadData: string;
    }

    export class AdminCtrl {

        static $inject: Array<string> = ['$scope', '$sce', '$location', '$http', '$routeParams', '$route', 'AuthSvc', 'DictSvc', 'SearchSvc'];
        constructor(
            $scope: IAdminCtrlScope,
            $sce: ng.ISCEService,
            $location: ng.ILocationService,
            $http: ng.IHttpService,
            $routeParams: ng.route.IRouteParamsService,
            $route: ng.route.IRouteService,
            AuthSvc: Services.AuthSvc,
            SearchSvc: Services.SearchSvc,
            dict: Services.DictSvc) {

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


            $scope.GoHome = () => {
                //alert("GoHome");
                $location.path('/');
                //$window.location.href = '/';
                //$rootScope.$apply(function () { $location.path('#/'); });
            }
            var path = null;
            
            $scope.fileNameChanged = (e) =>  {
                //console.log(e);
               // path = e.value;

                var input = document.getElementById("fub");
                var fReader = new FileReader();
                //fReader.readAsDataURL(e.value);
                alert(URL.createObjectURL(e.target.files[0]));
                console.log(fReader.readAsDataURL(e.files));

                //fReader.readAsDataURL(input.files[0]);
            }


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
                    saveUrl: "api/Uploads/PostFormData",//"api/Uploads/PostFormData", //"UploadHandler.ashx"
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
                //upload: onUpload
            }); 



            function onSuccess(e) {
                console.log("onSuccess");
                var message = $.map(e.files, function (file) { return file.name; }).join(", ");
                $scope.Product.File = message;
                //console.log("event :: onSuccess (" + message + ")");
                //console.log($scope.Product);
                    $http.post('api/Products/SaveProduct', $scope.Product)
                        .success(() => {
                        Dialogs.showMessage({ message: "Your product was added successfully" }).then(() => {
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
            $scope.FilterCategory = (cattype) => {
                console.log("cattype:" + cattype);
                $http.get('api/Products/GetCategories?type=' + cattype)
                    .success((data) => {
                    $scope.CategoriesList = data;
                    // $route.reload();
                });
            }

            $scope.onSelect =  (e) => {

            }

            $scope.NewType = (data) => {
               Dialogs.showConfirmation({ message: "Do you want to add this new type?" }).then(() => {
                $http.post('api/Products/NewType', data)
                    .success(() => {
                    Dialogs.showInfo({ message: "Your product was added successfully" });
                        $http.get('api/Products/GetCategories?type=' + "Char")
                            .success((data) => {
                            $scope.CategoriesList = data;
                            // $route.reload();
                        });

                        $http.get('api/Products/GetAllProductTypes')
                            .success((data) => {
                            $scope.TypeList = data;
                            // $route.reload();
                        });
                    });
                });
            }

            $scope.NewCategory = (data) => {
                console.log(data);
                data.Type = $scope.Product.Type;//$('#selectType').val(); 
                Dialogs.showConfirmation({ message: "Do you want to add this new Category?" }).then(() => {
                    $http.post('api/Products/NewCat', data)
                        .success(() => {
                        Dialogs.showInfo({ message: "Your Category was added successfully" });
                        $http.get('api/Products/GetCategories?type=' + data.Type)
                                .success((data) => {
                                $scope.CategoriesList = data;
                                // $route.reload();
                            });

                            $http.get('api/Products/GetAllProductTypes')
                                .success((data) => {
                                $scope.TypeList = data;
                                // $route.reload();
                            });
                    });
                });
            }

            $scope.AddGDriveLink = () => {
                $("#DownloadLinkInput").val("https://drive.google.com/uc?export=download&id=");
            }

            $scope.AddDemoGDriveLink = () => {
                $("#DemoDownloadLinkInput").val("https://drive.google.com/uc?export=download&id=");
            }

            $http.get('api/Products/GetCategories?type=' + "Char")
                .success((data) => {
                $scope.CategoriesList = data;
                // $route.reload();
              });

            $http.get('api/Products/GetAllProductTypes')
                .success((data) => {
                $scope.TypeList = data;
                // $route.reload();
            });

            $scope.Save = () => {
            }
            $scope.Cancel = () => { $location.path('/publicaciones/1'); }
        }
    }
}
  
declare module DTO {
    interface Product {
        Title: string;
        Type: string;
        Price: number;
        Category: string;
        File: string;
        Description: string;
        VideoCode: string;
    }
}

declare module DTO {
    interface New {
        Type: string;
        Category: string;
    }
}