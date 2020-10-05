/// <reference path="../../references.ts" />
module Controllers {

    export interface IAssetsCtrlScope extends ng.IScope {
        AnimPage: () => void;
        CharPage: () => void;
        EnvironmentVM: any;
        CloseProductView: () => void;
        CartView: () => void;
        CloseCart: () => void;
        CloseCheckoutForm: () => void;
        Checkout: () => void;
        CartItems: any;

        EnvironmentProducts: any;
        ProducDetails: (Product: any) => void;
        AddToCart: (data: any) => void;
        DeleteCartItem: (Id: number) => void;

        OnSearchMenuOver: () => void;
        OnSearchMenuExit: () => void;
        ShowTray: () => void;
        Search: (Text: string) => void;
        Anim: boolean;
        GoHome: () => void;
        FilterSearch: (data) => void;
        filterConditions: any;
        filterConditionsEnv: any;


        AssetsSource: kendo.data.DataSource;
        FilterCheck: (e) => void;
        Download: (e) => void;
        Assetsfilters: any;
    }

    export class AssetsCtrl {

        static $inject: Array<string> = ['$scope', '$sce', '$location', '$http', '$routeParams', '$route', 'AuthSvc', 'DictSvc', 'SearchSvc'];
        constructor(
            $scope: IAssetsCtrlScope,
            $sce: ng.ISCEService,
            $location: ng.ILocationService,
            $http: ng.IHttpService,
            $routeParams: ng.route.IRouteParamsService,
            $route: ng.route.IRouteService,
            AuthSvc: Services.AuthSvc,
            SearchSvc: Services.SearchSvc,
            dict: Services.DictSvc) {

            var delay = 1000;
            setTimeout(function () {
                $('.kk-body').addClass('unOpacity');
                $('.HeaderContainer').addClass('UnBlur');
            }, delay);
            AuthSvc.SetImgSrc("slideback");
            $('body').css('cssText', "overflow-y : scroll !important");


            $scope.AssetsSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "api/Products/GetAllProducts?Type=Assets",
                        dataType: "json"
                    }
                },
                pageSize: 20
            });


            //FILTERS
            var filterConditions = [];
            //It has to be under the ProjectsSource Variable in order to make it work
            $http.get('api/Products/GetCategories?type=Assets')
                .success((data) => {
                    $scope.Assetsfilters = data;
                    $scope.Assetsfilters.forEach((item) => {
                        console.log(item.Name);
                        filterConditions.push({ field: 'Category', operator: 'eq', value: item.Name });
                    });

                    //It has to be under the ProjectsSource Variable in order to make it work
                    $scope.AssetsSource.filter([
                        {
                            "logic": "or",
                            "filters": filterConditions
                        }
                    ]);
                });


            $scope.FilterCheck = (e) => {
                var FilterObj = { field: 'Category', operator: 'eq', value: e.target.value };

                //If it finds it then removes it
                for (var i = 0; i < filterConditions.length; i++) {
                    if (filterConditions[i].value == e.target.value) {
                        filterConditions.splice(i, 1);
                    }
                };

                if (e.target.checked.toString() == "true") {
                    filterConditions.push({ field: 'Category', operator: 'eq', value: e.target.value });
                }

                if (filterConditions.length == 0){
                    filterConditions.push({ field: 'Category', operator: 'eq', value: "Nothingtosearch" });
                }

                $scope.AssetsSource.filter([
                    {
                        "logic": "or",
                        "filters": filterConditions
                    }
                ]);


            }
            //END FILTERS

            $scope.Download = (e) => {
                alert(e);
            }

            $scope.GoHome = () => {
                //alert("GoHome");
                $location.path('/');
                //$window.location.href = '/';
                //$rootScope.$apply(function () { $location.path('#/'); });
            }

            $http.get('api/Cart/GetAllCartItemsByUserId')
                .success((data) => {
                    AuthSvc.CartProducts = data;
                    // $route.reload();
                });

            $scope.DeleteCartItem = (Id: number) => {
                //alert("Ok delete");
                $http.get('api/Cart/RemoveCartItem/' + Id).success((data) => {
                    AuthSvc.GetAllCartProductForUser();
                    /*$http.get('api/Cart/GetAllCartItemsByUserId')
                        .success((data) => {
                        $scope.CartItems = data;
                    });*/
                    $route.reload();
                });
            }

            $scope.OnSearchMenuOver = () => {
                AuthSvc.SrcMenuOver = true;
            }

            $scope.OnSearchMenuExit = () => {
                AuthSvc.SrcMenuOver = false;
            }

            $scope.ShowTray = () => {
                //alert("ShowTray");
                angular.element(document).find('#SearchTrayId').addClass('SearchTrayMove');
            }

            $scope.FilterSearch = (data) => {
                $scope.filterConditionsEnv = [];
                for (var i = 0; i < data.length; i++) {
                    $scope.filterConditionsEnv.push(data[i].Name);
                }

            }

            /* $scope.Search = (Text: string) => {
                 $location.path('/products');
                 //alert(Text);
                 //angular.element(document).find('#SearchTrayId').addClass('SearchTrayMove');
             }*/

            $scope.AnimPage = () => {
                $location.path('/anim');
            }

            $scope.CharPage = () => {
                $location.path('/char');
            }

            $scope.CartView = () => {
                $scope.$apply();
                AuthSvc.CartView = true;
                AuthSvc.dlgbck = true;
            }
            $scope.CloseCart = () => {
                AuthSvc.CartView = false;
                AuthSvc.dlgbck = false;
            }

            $scope.CloseCheckoutForm = () => {
                AuthSvc.CheckoutForm = false;
            }

            $scope.Checkout = () => {
                AuthSvc.CheckoutForm = true;
            }

            $scope.ProducDetails = (Product: any) => {
                AuthSvc.SelectedProduct = Product;
                AuthSvc.ProductView = true;
            }

            $scope.CloseProductView = () => {
                AuthSvc.ProductView = false;
            }

            $scope.AddToCart = (Prdct) => {
                //alert("AddToCart");
                if (AuthSvc.User) {
                    AuthSvc.AddProduct(Prdct);
                } else {
                    AuthSvc.LoginForm = true;
                    AuthSvc.ProductView = false;
                    // Dialogs.showWarning({ message: "You are about to be automatically logged out in 30 seconds due to inactivity" });
                }
                //AuthSvc.ProductView = false;
            }


            // MultiSelectBox, Kendo Plugin
            // -----------------------------------------------------------
            var firstTime = 0;
            (function ($) {
                var MultiSelectBox = kendo.ui.DropDownList.extend({

                    init: function (element, options) {
                        var me = this;
                        // setup template to include a checkbox
                        options.template = kendo.template(
                            kendo.format('<input type="checkbox" id="check_#= {1} #" name="{0}" value="#= {1} #" />&nbsp;<label for="{0}">#= {2} #</label>',
                                element.id + "_option_" + options.dataValueField,
                                options.dataValueField,
                                options.dataTextField
                            )
                        );
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

                    _accessor: function (vals, idx) { // for view model changes
                        var me = this;
                        if (vals === undefined) {
                            return me.selectedIndexes;
                        }
                    },

                    value: function (vals) {
                        var me = this;
                        if (vals === undefined) { // for view model changes
                            return me._accessor();
                        } else { // for loading from view model
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
                    }, // kills highlighting behavior
                    _blur: function () { }, // kills popup-close-on-click behavior

                    _setText: function () { // set text based on selections
                        var me = this;
                        var text = me.ul.find(":checked")
                            .map(function () { return $(this).siblings("label").text(); })
                            .toArray();
                        if (text.length === 0)
                            me.text(me.optionLabel);
                        else
                            me.text(text.join(', '));
                    },
                    _setValues: function () { // set selectedIndexes based on selection
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
    }
}
   