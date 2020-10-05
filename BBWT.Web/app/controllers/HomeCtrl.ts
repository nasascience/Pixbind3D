/// <reference path="../references.ts" />
module Controllers {

    export interface IHomeCtrlScope extends ng.IScope {
        FormData: DTO.FormDTO;
        AnimPage: () => void;
        CharPage: () => void;
        ShowArrows: () => void;
        HideArrows: () => void;
        PrevSlide: () => void;
        NextSlide: () => void;
        CurrentSlide: number;
        GotoVideoPage: (Id: number) => void;
        SlideMax: number;
        SubmitForm: () => void;
        ResetForm: () => void;
        FormName: string;
        FormEmail: string;
        FormSubject: string;
        FormDescription: string;

        SlideToggleMenu: () => void;
        openRotator: () => void;
        draggableRotator: () => void;
        CatchRotation: (e) => void;
        GetFrstYPos: (e) => void;
        yPos: number;
        halfScren: number;
        degree: number;
        quadrant: number;
        FixAngle: () => void;
        AngleList: number[];
        //ImgSrc: string;

        Home: () => void;
        WhyChooseUs: () => void;
        About: () => void;
        Contact: () => void;
        PrivacyPolicy: () => void;   
        TermsAndConditions: () => void;
        Assets: () => void;
        Environments: () => void;
        Projects: () => void;
        Games: () => void;
        Animations: () => void;

        ScrollUp: () => void;
        ScrollDown: () => void;

        CubeFacess: string[];
        SelectedFaceName: string;
        SelectedFaceInt: number;
    }


    export class HomeCtrl {


        static $inject: Array<string> = ['$scope', '$sce', '$location', '$http', '$routeParams', '$route', 'AuthSvc', 'DictSvc', 'SearchSvc'];
        constructor(
            $scope: IHomeCtrlScope,
            $sce: ng.ISCEService,
            $location: ng.ILocationService,
            $http: ng.IHttpService,
            $routeParams: ng.route.IRouteParamsService,
            $route: ng.route.IRouteService,
            AuthSvc: Services.AuthSvc,
            SearchSvc: Services.SearchSvc,
            dict: Services.DictSvc) {


            //console.log($location.absUrl());
            var dtoString = $location.absUrl().split("&");//.replace(new RegExp("&", "g"), '*');//$location.absUrl().replace(('&'g, '*'));
            //console.log(dtoString.length);
            if (dtoString.length >= 30) {
                //CheckOrder
                console.log($location.absUrl());
                console.log(dtoString);
                var PurchaseData = ""; //dtoString[1].split("=")[1] + "*" + dtoString[3].split("=")[1] + "*" + dtoString[5].split("=")[1] + "*" + dtoString[7].split("=")[1] + "*" + dtoString[8].split("=")[1] + "*" + dtoString[10].split("=")[1] + "*" + dtoString[12].split("=")[1] + "*" + dtoString[13].split("=")[1] + "*" + dtoString[33].split("=")[1];
                for (var i = 0; i < dtoString.length; i++){

                    if (dtoString[i].indexOf("li_0_name") != -1) {
                        PurchaseData += dtoString[i].split("=")[1] + "*";
                    } else if (dtoString[i].indexOf("key") != -1){
                        PurchaseData += dtoString[i].split("=")[1] + "*";
                    } else if (dtoString[i].indexOf("email") != -1) {
                        PurchaseData += dtoString[i].split("=")[1] + "*";
                    } else if (dtoString[i].indexOf("order_number") != -1) {
                        PurchaseData += dtoString[i].split("=")[1] + "*";
                    } else if (dtoString[i].indexOf("currency_code") != -1) {
                        PurchaseData += dtoString[i].split("=")[1] + "*";
                    } else if (dtoString[i].indexOf("invoice_id") != -1) {
                        PurchaseData += dtoString[i].split("=")[1] + "*";
                    } else if (dtoString[i].indexOf("total") != -1) {
                        PurchaseData += dtoString[i].split("=")[1] + "*";
                    } else if (dtoString[i].indexOf("credit_card_processed") != -1) {
                        PurchaseData += dtoString[i].split("=")[1] + "*";
                    } else if (dtoString[i].indexOf("card_holder_name") != -1) {
                        PurchaseData += dtoString[i].split("=")[1];
                    }

                }
                console.log(PurchaseData);
                $http.get('api/Products/CheckPurchase?strDto=' + PurchaseData) //$location.absUrl().toString()
                .success((data) => {
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
            $scope.$watch(function (scope) { return $location.path() },
                function () {
                   // console.log($location.path());
                    if ($location.path() != "/") {
                        window.clearInterval(autopager);
                    }
                }
            );

            //window.setInterval(setInterval, 1);
            function setInterval() {
                $('#b-cube-main').css("transform", "rotateX(" + $scope.degree + "deg)"); 
                //console.log($scope.degree);
                //AuthSvc.ImgSrc = "../../../Content/images/Pixbind/" + $scope.SelectedFaceName + ".jpg";
            }      

            $(function () {
                //Enable swiping...
                (<any>$('#main-page-container')).swipe({
                    //Generic swipe handler for all directions
                    swipe: function (event, direction, distance, duration, fingerCount, fingerData) {

                        if (!($(".js-sidebar").hasClass("_opened"))){
                            if (direction == "up") {
                                $scope.degree += 90;

                                $scope.SelectedFaceInt -= 1;
                                if ($scope.SelectedFaceInt < 0) {
                                    $scope.SelectedFaceInt = 3;
                                }

                                $scope.SelectedFaceName = $scope.CubeFacess[$scope.SelectedFaceInt];
                                AuthSvc.SetImgSrc($scope.SelectedFaceName);
                                console.log("SelectedFace " + $scope.SelectedFaceInt + " " + $scope.SelectedFaceName);
                            } else if (direction == "down") {
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
            
            $scope.SubmitForm = () => {
                if ($scope.FormName != "" && $scope.FormEmail != "" && $scope.FormSubject != "" && $scope.FormDescription != "") {         
                    var Fdata = {
                        Name: $scope.FormName,
                        Email: $scope.FormEmail,
                        Subject: $scope.FormSubject,
                        Description: $scope.FormDescription
                    }
                    console.log(Fdata);
                    $http.post('api/Products/SendForm', Fdata)
                        .success((dataRtrn) => {
                        if (dataRtrn == "true") {
                            Dialogs.showMessage({ message: "Your form has been sent successfully. Thanks for contacted us. We will answer you as soon as possible." });
                            $scope.FormName = "";
                            $scope.FormEmail = "";
                            $scope.FormSubject = "";
                            $scope.FormDescription = "";
                        } else {
                            Dialogs.showError({ message: "Sorry, an error occurred. Please try again. your query is very important for us." });
                        }
                    });
                } else {
                    Dialogs.showError({ message: "Ups, looks like you are missing some fields to fill." });
                }
            }

            $scope.ResetForm = () => {
                $scope.FormName = "";
                $scope.FormEmail = "";
                $scope.FormSubject = "";
                $scope.FormDescription = "";
            }

            $scope.AnimPage = () => {
                $location.path('/products');
            }

            

            //3D Template Code

            $scope.ScrollUp = () => {
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
            }
            $scope.ScrollDown = () => {
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
            }

            $scope.Home = () => {
                $location.path('/');
            }
            $scope.WhyChooseUs = () => {
                $location.path('/');
            }
            $scope.About = () => {
                $location.path('/about');
            }
            $scope.Contact = () => {
                $location.path('/');
            }
            $scope.PrivacyPolicy = () => {
                $location.path('/about/privacy');
            }
            $scope.TermsAndConditions = () => {
                alert("ters");
                $location.path('/about/terms');
            }
            $scope.Assets = () => {
                $location.path('/assets');
            }
            $scope.Environments = () => {
                $location.path('/environment');
            }
            $scope.Projects = () => {
                $location.path('/projects');
            }
            $scope.Games = () => {
                $location.path('/games');
            }
            $scope.Animations = () => {
                $location.path('/anim');
            }

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

            $scope.draggableRotator = () => {

            }
            $scope.openRotator = () => {

                $('.js-rotator').toggleClass('_closed');
            }

            $scope.GetFrstYPos = (e) => {
                //$scope.yPos = e.pageY;
            }

            $scope.CatchRotation = (e) => {

            }


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
    }
}


declare module DTO {
    interface FormDTO {
        Name: string;
        Email: string;
        Subject: string;
        Description: string;
    }
}