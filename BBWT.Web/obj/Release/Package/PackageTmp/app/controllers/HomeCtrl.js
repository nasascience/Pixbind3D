/// <reference path="../references.ts" />
var Controllers;
(function (Controllers) {
    var HomeCtrl = (function () {
        function HomeCtrl($scope, $sce, $location, $http, $routeParams, dict) {
            $scope.SlideMax = 2;
            $scope.CurrentSlide = 1;
            //alert("hola");
            //$http.get('api/Products/GetAllProducts').success((data) => {
            //    $scope.Products = data;
            //});
            $scope.$watch('CurrentSlide', function () {
                $(document).ready(function () {
                    $("a:contains(Characters)").css("background-color", "yellow");
                });
                //alert('CurrentSlide Changed:' + $scope.CurrentSlide);
                if ($scope.CurrentSlide == 1) {
                    $('.kk-slide1').fadeIn();
                    $('.kk-slide2').fadeOut();
                    $('.kk-slide1').addClass('kk-slide1-enter');
                    $('.kk-slide2').removeClass('kk-slide2-enter');
                    $('.kk-slide1-video1').get(0).currentTime = 0;
                    $('.kk-slide1-video1').get(0).play();
                    $('.kk-slide2-tag1').removeClass('kk-slide2-tag1-enter');
                    $('.kk-slide2-tag2').removeClass('kk-slide2-tag2-enter');
                }
                else if ($scope.CurrentSlide == 2) {
                    $('.kk-slide2').fadeIn();
                    $('.kk-slide1').fadeOut();
                    $('.kk-slide1-video1').get(0).pause();
                    $('.kk-slide1').removeClass('kk-slide1-enter');
                    $('.kk-slide2').addClass('kk-slide2-enter');
                    $('.kk-slide2-tag1').addClass('kk-slide2-tag1-enter');
                    $('.kk-slide2-tag2').addClass('kk-slide2-tag2-enter');
                }
                else {
                }
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
            $scope.PrevSlide = function () {
                $scope.CurrentSlide -= 1;
                if ($scope.CurrentSlide < 1) {
                    $scope.CurrentSlide = $scope.SlideMax;
                }
            };
            $scope.NextSlide = function () {
                $scope.CurrentSlide += 1;
                if ($scope.CurrentSlide > $scope.SlideMax) {
                    $scope.CurrentSlide = 1;
                }
            };
            $scope.ShowArrows = function () {
                $('.kk-left-arrow').addClass('kk-left-visible');
                $('.kk-right-arrow').addClass('kk-right-visible');
            };
            $scope.HideArrows = function () {
                $('.kk-left-arrow').removeClass('kk-left-visible');
                $('.kk-right-arrow').removeClass('kk-right-visible');
            };
            $scope.AnimPage = function () {
                $location.path('/products');
            };
            $scope.CharPage = function () {
                $location.path('/products');
            };
        }
        HomeCtrl.$inject = ['$scope', '$sce', '$location', '$http', '$routeParams', 'DictSvc'];
        return HomeCtrl;
    })();
    Controllers.HomeCtrl = HomeCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=HomeCtrl.js.map