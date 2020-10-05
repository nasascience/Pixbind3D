/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var EnvironmentCtrl = (function () {
        function EnvironmentCtrl($scope, $sce, $location, $http, $routeParams, $route, AuthSvc, SearchSvc, dict) {
            $scope.filterConditions = ["War"];
            $scope.filterConditionsEnv = ["War"];
            console.log($scope.filterConditions);
            $scope.EnvironmentVM = kendo.observable({
                testItems: [],
                testItemSource: new kendo.data.DataSource({
                    transport: {
                        read: {
                            url: "api/Products/GetCategories?type=Environment",
                            dataType: "json"
                        },
                        parameterMap: function (options, operation) {
                            $('.k-dropdown-wrap').css({ "height": "25px", "padding-bottom": "3px" });
                            $('.k-select').css({ "margin-top": "-1px", "margin-right": "-2px" });
                            // if (operation !== "read" && operation !== "update") {
                            // console.log("Other Called");
                            return { models: kendo.stringify(options.models || [options]) };
                            //}
                        }
                    }
                }),
            });
            $scope.GoHome = function () {
                //alert("GoHome");
                $location.path('/');
                //$window.location.href = '/';
                //$rootScope.$apply(function () { $location.path('#/'); });
            };
            $http.get('api/Products/GetAllProducts?Type=Environment').success(function (data) {
                $scope.EnvironmentProducts = data;
                //console.log(data);
            });
            $http.get('api/Cart/GetAllCartItemsByUserId')
                .success(function (data) {
                AuthSvc.CartProducts = data;
                // $route.reload();
            });
            $scope.DeleteCartItem = function (Id) {
                //alert("Ok delete");
                $http.get('api/Cart/RemoveCartItem/' + Id).success(function (data) {
                    AuthSvc.GetAllCartProductForUser();
                    /*$http.get('api/Cart/GetAllCartItemsByUserId')
                        .success((data) => {
                        $scope.CartItems = data;
                    });*/
                    $route.reload();
                });
            };
            $scope.Anim = true;
            $scope.OnSearchMenuOver = function () {
                //alert("OnSearchMenuOver");
                AuthSvc.SrcMenuOver = true;
            };
            $scope.OnSearchMenuExit = function () {
                //alert("OnSearchMenuExit");
                AuthSvc.SrcMenuOver = false;
            };
            $scope.ShowTray = function () {
                //alert("ShowTray");
                angular.element(document).find('#SearchTrayId').addClass('SearchTrayMove');
            };
            $scope.FilterSearch = function (data) {
                $scope.filterConditionsEnv = [];
                for (var i = 0; i < data.length; i++) {
                    $scope.filterConditionsEnv.push(data[i].Name);
                }
            };
            /* $scope.Search = (Text: string) => {
                 $location.path('/products');
                 //alert(Text);
                 //angular.element(document).find('#SearchTrayId').addClass('SearchTrayMove');
             }*/
            $scope.AnimPage = function () {
                $location.path('/anim');
            };
            $scope.CharPage = function () {
                $location.path('/char');
            };
            $scope.CartView = function () {
                $scope.$apply();
                AuthSvc.CartView = true;
                AuthSvc.dlgbck = true;
            };
            $scope.CloseCart = function () {
                AuthSvc.CartView = false;
                AuthSvc.dlgbck = false;
            };
            $scope.CloseCheckoutForm = function () {
                AuthSvc.CheckoutForm = false;
            };
            $scope.Checkout = function () {
                AuthSvc.CheckoutForm = true;
            };
            $scope.ProducDetails = function (Product) {
                AuthSvc.SelectedProduct = Product;
                AuthSvc.ProductView = true;
            };
            $scope.CloseProductView = function () {
                AuthSvc.ProductView = false;
            };
            $scope.AddToCart = function (Prdct) {
                //alert("AddToCart");
                if (AuthSvc.User) {
                    AuthSvc.AddProduct(Prdct);
                }
                else {
                    AuthSvc.LoginForm = true;
                    AuthSvc.ProductView = false;
                }
                //AuthSvc.ProductView = false;
            };
            // MultiSelectBox, Kendo Plugin
            // -----------------------------------------------------------
            var firstTime = 0;
            (function ($) {
                var MultiSelectBox = kendo.ui.DropDownList.extend({
                    init: function (element, options) {
                        var me = this;
                        // setup template to include a checkbox
                        options.template = kendo.template(kendo.format('<input type="checkbox" id="check_#= {1} #" name="{0}" value="#= {1} #" />&nbsp;<label for="{0}">#= {2} #</label>', element.id + "_option_" + options.dataValueField, options.dataValueField, options.dataTextField));
                        // remove option label from options, b/c DDL will create an item for it
                        if (options.optionLabel !== undefined && options.optionLabel !== null && options.optionLabel !== "") {
                            me.optionLabel = options.optionLabel;
                            options.optionLabel = undefined;
                        }
                        // create drop down UI
                        kendo.ui.DropDownList.fn.init.call(me, element, options);
                        // setup change trigger when popup closes
                        me.popup.bind('close', function () {
                            /*var values = me.ul.find(":checked")
                                .map(function () { return this.value; }).toArray();
                            // check for array inequality
                            if (values < me.selectedIndexes || values > me.selectedIndexes) {
                                me._setText();
                                me._setValues();
                                me.trigger('change', {});
                            }*/
                        });
                        $(document).on('change', 'input[name=EnvItems_option_Id]', function () {
                            //alert("changed");
                            var values = me.ul.find(":checked")
                                .map(function () { return this.value; }).toArray();
                            // check for array inequality
                            if (values < me.selectedIndexes || values > me.selectedIndexes) {
                                me._setText();
                                me._setValues();
                                me.trigger('change', {});
                            }
                            // console.log($scope.testVM.testItems);
                            //Click and Change
                            var filtros = [];
                            $scope.filterConditionsEnv = [];
                            console.log($scope.EnvironmentVM.testItems.length);
                            for (var i = 0; i < $scope.EnvironmentVM.testItems.length; i++) {
                                filtros.push($scope.EnvironmentVM.testItems[i].Name);
                                console.log($scope.EnvironmentVM.testItems[i].Name);
                            }
                            $scope.$apply(function () {
                                $scope.filterConditionsEnv = filtros;
                            });
                            console.log($scope.filterConditionsEnv);
                        });
                        me._setText();
                    },
                    options: {
                        name: "MultiSelectBox"
                    },
                    optionLabel: "",
                    selectedIndexes: [],
                    _accessor: function (vals, idx) {
                        var me = this;
                        if (vals === undefined) {
                            return me.selectedIndexes;
                        }
                    },
                    value: function (vals) {
                        var me = this;
                        if (vals === undefined) {
                            return me._accessor();
                        }
                        else {
                            var checkboxes = me.ul.find("input[type='checkbox']");
                            if (vals.length > 0) {
                                // convert to array of strings
                                var valArray = $(vals.toJSON())
                                    .map(function () { return this + ''; })
                                    .toArray();
                                checkboxes.each(function () {
                                    this.checked = $.inArray(this.value, valArray) !== -1;
                                });
                                me._setText();
                                me._setValues();
                            }
                        }
                    },
                    _select: function (li) {
                        //console.log(firstTime);
                        if (firstTime <= 1) {
                            $('#check_7').prop('checked', true);
                            //console.log("added=" + firstTime);
                            firstTime += 1;
                        }
                    },
                    _blur: function () { },
                    _setText: function () {
                        var me = this;
                        var text = me.ul.find(":checked")
                            .map(function () { return $(this).siblings("label").text(); })
                            .toArray();
                        if (text.length === 0)
                            me.text(me.optionLabel);
                        else
                            me.text(text.join(', '));
                    },
                    _setValues: function () {
                        var me = this;
                        var values = me.ul.find(":checked")
                            .map(function () { return this.value; })
                            .toArray();
                        me.selectedIndexes = values;
                    }
                });
                kendo.ui.plugin(MultiSelectBox);
            })(jQuery);
            $(document).ready(function () {
                kendo.bind($("#EnvironmentView"), $scope.EnvironmentVM);
            });
        }
        EnvironmentCtrl.$inject = ['$scope', '$sce', '$location', '$http', '$routeParams', '$route', 'AuthSvc', 'DictSvc', 'SearchSvc'];
        return EnvironmentCtrl;
    })();
    Controllers.EnvironmentCtrl = EnvironmentCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=EnvironmentCtrl.js.map