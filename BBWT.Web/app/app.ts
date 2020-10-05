/// <reference path="references.ts" />
var version = new Date().getTime(); // Will be changed by jenkins to use build number as cache version key
kendo.culture("en-US");

angular.module('bbwt', ['HashBangURLs', 'ngRoute', 'kendo.directives', 'Services', 'Directives', 'ngAnimate', 'ngSanitize'])
    .controller(Controllers)
    .config(
    ['$routeProvider', '$httpProvider', ($routeProvider: ng.route.IRouteProvider, $httpProvider: ng.IHttpProvider) => {
        "use strict";

        $routeProvider
            .when('/', { templateUrl: 'app/views/home/index.html', controller: 'HomeCtrl', title: 'Home', permission: 'everybody' })
            //AnimMax
            .when('/about/specialservice', { templateUrl: 'app/views/AnimMax/SpecialServicePayment.html', controller: 'SpecialServicePaymentCtrl', title: 'Special Service Payment', permission: 'everybody' })
            .when('/anim', { templateUrl: 'app/views/AnimMax/Anim.html', controller: 'ProductsCtrl', title: 'Animations', permission: 'everybody' })
            //.when('/products', { templateUrl: 'app/views/AnimMax/Products.html', controller: 'ProductsCtrl', title: 'Animations', permission: 'everybody' })
            .when('/bubblelanguage', { templateUrl: 'app/views/AnimMax/bubblelanguage.html', controller: 'BubblelanguageCtrl', title: 'Bubble Language', permission: 'everybody' })
            .when('/games', { templateUrl: 'app/views/AnimMax/Games.html', controller: 'GamesCtrl', title: 'Games', permission: 'everybody' })
            .when('/projects', { templateUrl: 'app/views/AnimMax/Projects.html', controller: 'ProjectsCtrl', title: 'Projects', permission: 'everybody' })
            .when('/environment', { templateUrl: 'app/views/AnimMax/Environment.html', controller: 'EnvironmentCtrl', title: 'Environment', permission: 'everybody' })
            .when('/admin', { templateUrl: 'app/views/admin/Admin.html', controller: 'AdminCtrl', title: 'Admin', permission: 'CompanyAdmin' })
            .when('/assets', { templateUrl: 'app/views/AnimMax/Assets.html', controller: 'AssetsCtrl', title: 'Assets', permission: 'everybody' })
            .when('/myitems', { templateUrl: 'app/views/AnimMax/MyItems.html', controller: 'MyItemsCtrl', title: 'My Items', permission: 'everybody' })

            .when('/publicaciones/:id', { templateUrl: 'app/views/publicaciones/index.html', controller: 'PublicacionCtrl', title: 'Home', permission: 'everybody' })
            .when('/newpub/new', { templateUrl: 'app/views/newpub/new.html', controller: 'UploadCtrl', title: 'New', permission: 'authorized' })
            .when('/admin/settings', { templateUrl: 'app/views/admin/settings.html', controller: 'SettingsCtrl', permission: 'ManageCompanies', title: 'System Configuration' })
            .when('/admin/companies/:id', { templateUrl: 'app/views/admin/companies/details.html', controller: 'CompanyDetailsCtrl', permission: 'ManageCompanies', title: 'Manage Company' })
            .when('/admin/users', { templateUrl: 'app/views/admin/users/index.html', controller: 'UsersCtrl', permission: 'ManageUsers', title: 'Manage Users' })
            .when('/admin/users/:id', { templateUrl: 'app/views/admin/users/details.html', controller: 'UserDetailsCtrl', permission: 'ManageUsers', title: 'Manage User' })
            .when('/admin/groups', { templateUrl: 'app/views/admin/groups/index.html', controller: 'GroupsCtrl', permission: 'ManageGroups', title: 'Manage Groups' })
            .when('/admin/groups/:id', { templateUrl: 'app/views/admin/groups/details.html', controller: 'GroupDetailsCtrl', permission: 'ManageGroups', title: 'Manage Group' })
            .when('/admin/roles', { templateUrl: 'app/views/admin/roles/index.html', controller: 'RolesCtrl', permission: 'ManageRoles', title: 'Manage Roles' })
            .when('/admin/roles/:id', { templateUrl: 'app/views/admin/roles/details.html', controller: 'RoleDetailsCtrl', permission: 'ManageRoles', title: 'Manage Role' })
            .when('/admin/permissions', { templateUrl: 'app/views/admin/permissions/index.html', controller: 'PermissionsCtrl', permission: 'ManagePermissions', title: 'Manage Permissions' })
            .when('/admin/permissions/:id', { templateUrl: 'app/views/admin/permissions/details.html', controller: 'PermissionDetailsCtrl', permission: 'ManagePermissions', title: 'Manage Permission' })
            .when('/admin/templates', { templateUrl: 'app/views/admin/templates/index.html', controller: 'TemplatesCtrl', permission: 'ManageTemplates', title: 'Manage Email Templates' })
            .when('/admin/templates/:id', { templateUrl: 'app/views/admin/templates/details.html', controller: 'TemplateDetailsCtrl', permission: 'ManageTemplates', title: 'Manage Templates' })

            .when('/admin/menu', { templateUrl: 'app/views/admin/menu/index.html', controller: 'ManageMenuCtrl', permission: 'ManageMenu', title: 'Manage Menu' })            
            .when('/admin/routes', { templateUrl: 'app/views/admin/routes.html', controller: 'RoutesCtrl', title: 'Manage Route Access', permission: 'ManagePermissions' })

            .when('/login', { templateUrl: 'app/views/home/index.html', controller: 'LoginCtrl', title: 'Log In', permission: 'everybody' }) //app/views/login.html
            .when('/register', { templateUrl: 'app/views/register.html', controller: 'RegisterCtrl', title: 'Register', permission: 'everybody' })
            .when('/recoverpassword', { templateUrl: 'app/views/recoverpassword.html', controller: 'RecoverPasswordCtrl', title: 'Recover Password', permission: 'everybody' })
            .when('/resetpassword', { templateUrl: 'app/views/resetpassword.html', controller: 'ResetPasswordCtrl', title: 'Reset Password', permission: 'everybody' })
            .when('/registercompany', { templateUrl: 'app/views/registercompany.html', controller: 'RegisterCompanyCtrl', title: 'Register Company', permission: 'everybody' })
            .when('/profile', { templateUrl: 'app/views/profile.html', permission: 'authorized', controller: 'ProfileCtrl', title: 'Profile' })
            .when('/userregistration', { templateUrl: 'app/views/userregistration.html', controller: 'UserRegistrationCtrl', title: 'User Registration', permission: 'everybody' })
            .when('/unauthorized', { templateUrl: 'app/views/unauthorized.html', title: 'Unauthorized', permission: 'everybody' })
            .when('/error', { templateUrl: 'app/views/error.html', title: 'Error', permission: 'everybody' })
            .when('/about/terms', { templateUrl: 'app/views/about/terms.html', controller: 'ProductsCtrl', title: 'Terms & Conditions', permission: 'everybody' })
            .when('/about/privacy', { templateUrl: 'app/views/about/privacy.html', controller: 'ProductsCtrl', title: 'Privacy Policy', permission: 'everybody' })
            .when('/about/cookie', { templateUrl: 'app/views/about/cookie.html', title: 'Cookie Policy', permission: 'everybody' })
            .when('/about/contact', { templateUrl: 'app/views/about/contact.html', controller: 'ContactUsCtrl', title: 'Contact Us', permission: 'everybody' })
            .when('/about/reportaproblem', { templateUrl: 'app/views/about/reportaproblem.html', controller: 'ReportaProblemCtrl', title: 'Report a Problem', permission: 'everybody' })
            .when('/example/guidelines', { templateUrl: 'app/views/example/guidelines.html', permission: 'authorized', controller: 'GuidelinesCtrl', title: 'Guidelines', reloadOnSearch: false })
            .when('/example/gridfiltering', { templateUrl: 'app/views/example/gridfiltering.html', permission: 'authorized', controller: 'GridFilteringCtrl', title: 'Grid Filtering' })
            .when('/example/wizard', { templateUrl: 'app/views/example/wizard.html', permission: 'authorized', controller: 'WizardCtrl', title: 'Wizard' })
            .when('/example/disabled', { templateUrl: 'app/views/example/disabled.html', permission: 'authorized', title: 'Disabled Controls Testing' })
            .when('/example/techniques', { templateUrl: 'app/views/example/techniques.html', permission: 'authorized', controller: 'GuidelinesCtrl', title: 'Techniques', reloadOnSearch: false })
            .when('/example/upload', { templateUrl: 'app/views/example/upload.html', permission: 'authorized', controller: 'UploadCtrl', title: 'Upload' })
            .when('/example/errorhandling', { templateUrl: 'app/views/example/errorhandling.html', permission: 'authorized', controller: 'ErrorHandlingCtrl', title: 'Error Handling' })

            // List of custom pages
            .when('/test', { templateUrl: 'app/views/test/index.html', controller: 'TestCtrl', title: 'Test Page', permission: 'authorized' })
            .when('/test/orderstest', { templateUrl: 'app/views/test/orderstest.html', controller: 'OrdersTestCtrl', title: 'Manage Orders', permission: 'authorized' })
            .when('/test/orders', { templateUrl: 'app/views/test/orders.html', controller: 'OrdersCtrl', title: 'Manage Orders', permission: 'authorized' })
            .when('/test/ordersvariant', { templateUrl: 'app/views/test/ordersvariant.html', controller: 'OrdersVariantCtrl', title: 'Manage Orders (Variant)', permission: 'authorized' })
            .when('/test/orders/:id', { templateUrl: 'app/views/test/orderdetails.html', controller: 'OrderDetailsCtrl', title: 'Order Details', permission: 'authorized' })                        
            .when('/test/territories', { templateUrl: 'app/views/test/territories.html', controller: 'TerritoriesCtrl', title: 'Manage Territories', permission: 'CompanyAdmin' })
              /*It looks that there is a delay before ng-show="AuthSvc.User" gets applyed, that's why we need to set permissions for all children, so that they work uniformally with other
             * siblings. Without it, specifically, when we logout, permissions get checked and applyed earlier and we could see Reports section appearing before others,
             * which looks awkward.*/
            .when('/reports/index', { templateUrl: 'app/views/reports/index.html', controller: 'ReportsCtrl', title: 'List of Reports', permission: 'authorized' })
            .when('/reports/viewer/:id', { templateUrl: 'app/views/reports/viewer.html', controller: 'ReportViewerCtrl', title: 'View report', permission: 'authorized' })
            .when('/reports/edit/:name', { templateUrl: 'app/views/reports/editor.html', controller: 'ReportEditorCtrl', title: 'Edit report', permission: 'authorized' })
            .when('/reports/create', { templateUrl: 'app/views/reports/editor.html', controller: 'ReportEditorCtrl', title: 'Create report', permission: 'authorized' })

            // List of demo pages            
            .when('/demo/simple', { templateUrl: 'app/views/demo/simple.html', controller: 'SimplePageCtrl', title: 'Simple Page', permission: 'authorized' })
            .when('/demo/tab', { templateUrl: 'app/views/demo/tab.html', controller: 'TabCtrl', title: 'Tab', permission: 'authorized' })
            .when('/demo/wizard', { templateUrl: 'app/views/example/wizard.html', controller: 'WizardCtrl', title: 'Wizard', permission: 'authorized' })                        

            .otherwise({
                redirectTo: () => {
                    return '/';
                }
        });

        $httpProvider.interceptors.push('requestInterceptor');
    }])
    .factory('$exceptionHandler', ['LoggerSvc', (loggerSvc: Services.LoggerSvc) => {
        return (exception, cause) => {
            loggerSvc.add(exception, cause);
        };
    }])
    .factory('requestInterceptor', ['$location', '$q', '$rootScope', ($location: ng.ILocationService, $q: ng.IQService, $rootScope) => {
        ;
        return {
            'request': (config: ng.IRequestConfig) => {
                if (config.url.indexOf('.html') > 0) {
                    config.url = config.url + '?v=' + version;
                }
                return config || $q.when(config);
            },
            'response': (response) => {
                if (response.status === 403 || response.status === 401) {
                    $location.url('/unauthorized');
                    return $q.reject(response);
                }
                return response || $q.when(response);
            },
            'responseError': (response) => { //Intercept all http errors
                var status = response.status;
                if (response.config.errorHandling === 'webapi') { //Set this key in the invoker
                    JL().warn('WebAPI handled error' + response.status + ' returned from ' + 
                        response.config.url + '. Sent from ' + $location.url()
                        );
                    switch (status) {

                        case 401: //Unauthorized
                            Dialogs.showConfirmation({
                                title: 'An Error Occurred',
                                message: "You don't have permission to do that. Try logging in."
                            }).then(() => {
                                $location.url('/login');
                                    // url() here doesn't do anything until apply is called
                                    $rootScope.$apply();
                            });
                            break;

                        case 403: //Forbidden
                            Dialogs.showConfirmation({
                                title: 'An Error Occurred',
                                message: "You don't have permission to do that."
                            }).then(() => {
                                $location.url('/unauthorized');
                                    // url() here doesn't do anything until apply is called
                                    $rootScope.$apply();
                            });
                            break;

                        case 404: //Not found
                            Dialogs.showConfirmation({
                                title: 'An Error Occurred',
                                message: "Resource not found. If you would like to inform us about this error please click Ok."
                            }).then(() => {
                                $location.url('/about/reportaproblem');
                                    // url() here doesn't do anything until apply is called
                                    $rootScope.$apply();
                                });
                            break;

                        case 408: //Timeout
                            Dialogs.showConfirmation({
                                title: 'An Error Occurred',
                                message: "Request timeout. Please, try again later."
                            });
                            break;

                        case 400: //Bad request
                            Dialogs.showConfirmation({
                                title: 'An Error Occurred',
                                message: "Bad request. If you would like to inform us about this error please click Ok."
                            }).then(() => {
                                    $location.url('/about/reportaproblem');
                                    // url() here doesn't do anything until apply is called
                                    $rootScope.$apply();
                                });
                            break;

                        default: //All other errors including 500
                            Dialogs.showConfirmation({
                                title: 'An Error Occurred',
                                message: "Something went wrong. If you would like to inform us about this error please click Ok."
                            }).then(() => {
                                $location.url('/about/reportaproblem');
                                    // url() here doesn't do anything until apply is called
                                    $rootScope.$apply();
                                });
                    }
                    return $q.reject(response);
                }
                else {
                if (response.status === 403 || response.status === 401) {
                    $location.url('/unauthorized');
                    return $q.reject(response);
                } else {
                    $location.url('/about/reportaproblem');
                    return $q.reject(response);
                }
                    return response || $q.when(response);
                }
            }
        }
    }])
    .controller('mainAppCtrl', ['$scope', '$http', '$rootScope', '$location', 'AuthSvc', 'SearchSvc','$routeParams',
    ($scope: ng.IScope, $http: ng.IHttpService, $rootScope: ng.IScope, $location: ng.ILocationService, AuthSvc: Services.AuthSvc, SearchSvc: Services.SearchSvc, $routeParams: ng.route.IRouteParamsService) => {
            $scope.$on('$routeChangeStart', (scope, next, current) => {
                var permission = next.$$route.permission;

                $http.get('api/auth/GetCurrentUser').success((userdata) => {
                    AuthSvc.IsAdmin = userdata.IsAdmin;

                    //console.log(userdata);
                    //console.log(userdata.IsAdmin);
                });


                if (permission && _.isString(permission) && !AuthSvc.hasPermission(permission)) {
                    AuthSvc.ReturnPath = $location.url();                        
                    $location.url('/login'); 
                }                
            });

            $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
                $rootScope['title'] = current.$$route.title;
            });

            $scope.$on('BodyClicked', function () {
                if (!AuthSvc.SrcMenuOver){
                    angular.element(document).find('#SearchTrayId').removeClass('SearchTrayMove');
                }
            });


            $scope.$on('GoHome', function () {           
                //alert("ResetIdleState");
                $location.path('/');
            });

        }
    ])
    .filter('filterWithOr', function ($filter) {
    var comparator = function (actual, expected) {
        if (angular.isUndefined(actual)) {
            // No substring matching against `undefined`
            return false;
        }
        if ((actual === null) || (expected === null)) {
            // No substring matching against `null`; only match against `null`
            return actual === expected;
        }
        if ((angular.isObject(expected) && !angular.isArray(expected)) || (angular.isObject(actual))) {//&& !hasCustomToString(actual))) {
            // Should not compare primitives against objects, unless they have custom `toString` method
            return false;
        }

        actual = angular.lowercase('' + actual);
        if (angular.isArray(expected)) {
            var match = false;
            expected.forEach(function (e) {
                e = angular.lowercase('' + e);
                if (actual.indexOf(e) !== -1) {
                    match = true;
                }
            });
            return match;
        } else {
            expected = angular.lowercase('' + expected);
            return actual.indexOf(expected) !== -1;
        }
    };
    return function (campaigns, filters) {
        return $filter('filter')(campaigns, filters, comparator);
    };
})
//Filter to Decimals 
    .filter('setDecimal', function ($filter) {
        return function (input, places) {
            if (isNaN(input)) return input;
            // If we want 1 decimal place, we want to mult/div by 10
            // If we want 2 decimal places, we want to mult/div by 100, etc
            // So use the following to create that factor
            var factor = "1" + Array(+(places > 0 && places + 1)).join("0");
            var factor2 = parseFloat(factor);
            return Math.round(input * factor2) / factor2;
        };
    })
    // This function helps inpage hash links to work.
    .run(['$rootScope', '$location', '$anchorScroll',
        function ($rootScope: ng.IScope, $location: ng.ILocationService, $anchorScroll: ng.IAnchorScrollService) {
            $rootScope.$on('$viewContentLoaded', function (newRoute, oldRoute) {
                //var body = angular.element('body');
                //if (body) {
                //    body.css('height', '100%');
                //    body.css('min-height', '100%');

                //}
                if ($location.hash())
                    $anchorScroll();
            });
        }]);
