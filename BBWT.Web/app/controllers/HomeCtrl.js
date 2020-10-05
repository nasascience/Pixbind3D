/// <reference path="../references.ts" />
var Controllers;
(function (Controllers) {
    var HomeCtrl = (function () {
        function HomeCtrl($scope, $sce, $location, $http, $routeParams, $route, AuthSvc, SearchSvc, dict) {
            //console.log($location.absUrl());
            var dtoString = $location.absUrl().split("&"); //.replace(new RegExp("&", "g"), '*');//$location.absUrl().replace(('&'g, '*'));
            //console.log(dtoString.length);
            if (dtoString.length >= 30) {
                //CheckOrder
                console.log($location.absUrl());
                console.log(dtoString);
                var PurchaseData = ""; //dtoString[1].split("=")[1] + "*" + dtoString[3].split("=")[1] + "*" + dtoString[5].split("=")[1] + "*" + dtoString[7].split("=")[1] + "*" + dtoString[8].split("=")[1] + "*" + dtoString[10].split("=")[1] + "*" + dtoString[12].split("=")[1] + "*" + dtoString[13].split("=")[1] + "*" + dtoString[33].split("=")[1];
                for (var i = 0; i < dtoString.length; i++) {
                    if (dtoString[i].indexOf("li_0_name") != -1) {
                        PurchaseData += dtoString[i].split("=")[1] + "*";
                    }
                    else if (dtoString[i].indexOf("key") != -1) {
                        PurchaseData += dtoString[i].split("=")[1] + "*";
                    }
                    else if (dtoString[i].indexOf("email") != -1) {
                        PurchaseData += dtoString[i].split("=")[1] + "*";
                    }
                    else if (dtoString[i].indexOf("order_number") != -1) {
                        PurchaseData += dtoString[i].split("=")[1] + "*";
                    }
                    else if (dtoString[i].indexOf("currency_code") != -1) {
                        PurchaseData += dtoString[i].split("=")[1] + "*";
                    }
                    else if (dtoString[i].indexOf("invoice_id") != -1) {
                        PurchaseData += dtoString[i].split("=")[1] + "*";
                    }
                    else if (dtoString[i].indexOf("total") != -1) {
                        PurchaseData += dtoString[i].split("=")[1] + "*";
                    }
                    else if (dtoString[i].indexOf("credit_card_processed") != -1) {
                        PurchaseData += dtoString[i].split("=")[1] + "*";
                    }
                    else if (dtoString[i].indexOf("card_holder_name") != -1) {
                        PurchaseData += dtoString[i].split("=")[1];
                    }
                }
                console.log(PurchaseData);
                $http.get('api/Products/CheckPurchase?strDto=' + PurchaseData) //$location.absUrl().toString()
                    .success(function (data) {
                    console.log("CheckOrder " + data);
                    if (data == "true") {
                        //$location.path('/myitems');
                        window.open("http://www.pixbind.com/#/myitems", "_self");
                        //window.open("http://www.pixbind.com", "_self");
                        console.log("RestartLocation");
                    }
                });
            }
            $('body').css('cssText', "overflow-y : hidden !important");
            $scope.SlideMax = 3;
            $scope.CurrentSlide = 1;
            $scope.CubeFacess = [
                "environments",
                "games",
                "animations",
                "projects"
            ];
            $scope.SelectedFaceInt = 0;
            $scope.SelectedFaceName = $scope.CubeFacess[$scope.SelectedFaceInt];
            $scope.degree = 0;
            $scope.AngleList = [];
            AuthSvc.SetImgSrc($scope.SelectedFaceName);
            var autopager;
            autopager = window.setInterval(setInterval, 1);
            $scope.$watch(function (scope) { return $location.path(); }, function () {
                // console.log($location.path());
                if ($location.path() != "/") {
                    window.clearInterval(autopager);
                }
            });
            //window.setInterval(setInterval, 1);
            function setInterval() {
                $('#b-cube-main').css("transform", "rotateX(" + $scope.degree + "deg)");
                //console.log($scope.degree);
                //AuthSvc.ImgSrc = "../../../Content/images/Pixbind/" + $scope.SelectedFaceName + ".jpg";
            }
            $(function () {
                //Enable swiping...
                $('#main-page-container').swipe({
                    //Generic swipe handler for all directions
                    swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                        if (!($(".js-sidebar").hasClass("_opened"))) {
                            if (direction == "up") {
                                $scope.degree += 90;
                                $scope.SelectedFaceInt -= 1;
                                if ($scope.SelectedFaceInt < 0) {
                                    $scope.SelectedFaceInt = 3;
                                }
                                $scope.SelectedFaceName = $scope.CubeFacess[$scope.SelectedFaceInt];
                                AuthSvc.SetImgSrc($scope.SelectedFaceName);
                                console.log("SelectedFace " + $scope.SelectedFaceInt + " " + $scope.SelectedFaceName);
                            }
                            else if (direction == "down") {
                                $scope.degree -= 90;
                                $scope.SelectedFaceInt += 1;
                                if ($scope.SelectedFaceInt > 3) {
                                    $scope.SelectedFaceInt = 0;
                                }
                                $scope.SelectedFaceName = $scope.CubeFacess[$scope.SelectedFaceInt];
                                AuthSvc.SetImgSrc($scope.SelectedFaceName);
                                console.log("SelectedFace " + $scope.SelectedFaceInt + " " + $scope.SelectedFaceName);
                            }
                        }
                        //$(this).text("You swiped " + direction);
                    },
                    //Default is 75px, set to 0 for demo so any distance triggers swipe
                    threshold: 0
                });
            });
            $scope.FormName = "";
            $scope.FormEmail = "";
            $scope.FormSubject = "";
            $scope.FormDescription = "";
            $scope.SubmitForm = function () {
                if ($scope.FormName != "" && $scope.FormEmail != "" && $scope.FormSubject != "" && $scope.FormDescription != "") {
                    var Fdata = {
                        Name: $scope.FormName,
                        Email: $scope.FormEmail,
                        Subject: $scope.FormSubject,
                        Description: $scope.FormDescription
                    };
                    console.log(Fdata);
                    $http.post('api/Products/SendForm', Fdata)
                        .success(function (dataRtrn) {
                        if (dataRtrn == "true") {
                            Dialogs.showMessage({ message: "Your form has been sent successfully. Thanks for contacted us. We will answer you as soon as possible." });
                            $scope.FormName = "";
                            $scope.FormEmail = "";
                            $scope.FormSubject = "";
                            $scope.FormDescription = "";
                        }
                        else {
                            Dialogs.showError({ message: "Sorry, an error occurred. Please try again. your query is very important for us." });
                        }
                    });
                }
                else {
                    Dialogs.showError({ message: "Ups, looks like you are missing some fields to fill." });
                }
            };
            $scope.ResetForm = function () {
                $scope.FormName = "";
                $scope.FormEmail = "";
                $scope.FormSubject = "";
                $scope.FormDescription = "";
            };
            $scope.AnimPage = function () {
                $location.path('/products');
            };
            //3D Template Code
            $scope.ScrollUp = function () {
                if (!($(".js-sidebar").hasClass("_opened"))) {
                    $scope.degree += 90;
                    $scope.SelectedFaceInt -= 1;
                    if ($scope.SelectedFaceInt < 0) {
                        $scope.SelectedFaceInt = 3;
                    }
                    $scope.SelectedFaceName = $scope.CubeFacess[$scope.SelectedFaceInt];
                    console.log("SelectedFace " + $scope.SelectedFaceInt + " " + $scope.SelectedFaceName);
                    AuthSvc.GetCartList();
                    AuthSvc.SetImgSrc($scope.SelectedFaceName);
                }
            };
            $scope.ScrollDown = function () {
                if (!($(".js-sidebar").hasClass("_opened"))) {
                    $scope.degree -= 90;
                    $scope.SelectedFaceInt += 1;
                    if ($scope.SelectedFaceInt > 3) {
                        $scope.SelectedFaceInt = 0;
                    }
                    $scope.SelectedFaceName = $scope.CubeFacess[$scope.SelectedFaceInt];
                    console.log("SelectedFace " + $scope.SelectedFaceInt + " " + $scope.SelectedFaceName);
                    AuthSvc.SetImgSrc($scope.SelectedFaceName);
                }
            };
            $scope.Home = function () {
                $location.path('/');
            };
            $scope.WhyChooseUs = function () {
                $location.path('/');
            };
            $scope.About = function () {
                $location.path('/about');
            };
            $scope.Contact = function () {
                $location.path('/');
            };
            $scope.PrivacyPolicy = function () {
                $location.path('/about/privacy');
            };
            $scope.TermsAndConditions = function () {
                alert("ters");
                $location.path('/about/terms');
            };
            $scope.Assets = function () {
                $location.path('/assets');
            };
            $scope.Environments = function () {
                $location.path('/environment');
            };
            $scope.Projects = function () {
                $location.path('/projects');
            };
            $scope.Games = function () {
                $location.path('/games');
            };
            $scope.Animations = function () {
                $location.path('/anim');
            };
            function loop() {
                $('.arrowDown')
                    .animate({ marginTop: "90px", opacity: 0 }, 1500, 'linear', function () {
                });
                $('.arrowUp')
                    .animate({ marginTop: "-90px", opacity: 0 }, 1500, 'linear', function () {
                    $('#arrowDown').animate({ opacity: 1 }, 500);
                    $('#arrowUp').animate({ opacity: 1 }, 500);
                    $('#arrowUp').css({ marginTop: "-30px" });
                    $('#arrowDown').css({ marginTop: "30px" });
                    setTimeout(loop, 3000);
                });
            }
            setTimeout(loop, 3000);
            $scope.draggableRotator = function () {
            };
            $scope.openRotator = function () {
                $('.js-rotator').toggleClass('_closed');
            };
            $scope.GetFrstYPos = function (e) {
                //$scope.yPos = e.pageY;
            };
            $scope.CatchRotation = function (e) {
            };
            $scope.halfScren = $(window).height() / 2;
            $(window).resize(function () {
                $scope.halfScren = $(window).height() / 2;
                $("#b-cube-wrap").css("transform", "translateZ(-" + $scope.halfScren + "px)");
                $("#side-front").css("transform", "translateZ(" + $scope.halfScren + "px)");
                $("#side-bottom").css("transform", "translateY(" + $scope.halfScren + "px)");
                $("#side-back").css("transform", "translateZ(-" + $scope.halfScren + "px)");
                $("#side-top").css("transform", "translateY(-" + $scope.halfScren + "px)");
            });
            //CONTACTS GRID/GANTT
            var lastScrollTop = 0;
            $(document).ready(function () {
                $(document).bind('mousewheel', function (e) {
                    if (!($(".js-sidebar").hasClass("_opened"))) {
                        if (e.originalEvent.wheelDelta / 120 > 0) {
                            $scope.degree += 90;
                            $scope.SelectedFaceInt -= 1;
                            if ($scope.SelectedFaceInt < 0) {
                                $scope.SelectedFaceInt = 3;
                            }
                            $scope.SelectedFaceName = $scope.CubeFacess[$scope.SelectedFaceInt];
                            AuthSvc.SetImgSrc($scope.SelectedFaceName);
                            console.log("SelectedFace " + $scope.SelectedFaceInt + " " + $scope.SelectedFaceName);
                        }
                        else {
                            $scope.degree -= 90;
                            $scope.SelectedFaceInt += 1;
                            if ($scope.SelectedFaceInt > 3) {
                                $scope.SelectedFaceInt = 0;
                            }
                            $scope.SelectedFaceName = $scope.CubeFacess[$scope.SelectedFaceInt];
                            AuthSvc.SetImgSrc($scope.SelectedFaceName);
                            console.log("SelectedFace " + $scope.SelectedFaceInt + " " + $scope.SelectedFaceName);
                        }
                    }
                });
            });
        }
        HomeCtrl.$inject = ['$scope', '$sce', '$location', '$http', '$routeParams', '$route', 'AuthSvc', 'DictSvc', 'SearchSvc'];
        return HomeCtrl;
    })();
    Controllers.HomeCtrl = HomeCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=HomeCtrl.js.map