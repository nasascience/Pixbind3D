/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    //asc: Judging from content code this is more like directive than control. Never do like that.
    var MenuCtrl = (function () {
        // Constructor
        function MenuCtrl($scope, $route, authSvc, menuSvc, $http, $rootScope) {
            var _this = this;
            $scope.MenuCtrl = this;
            // generate menu             
            var generateMenu = function (arr, parentId) {
                var out = [];
                for (var i in arr) {
                    if (arr[i].ParentId == parentId) {
                        var items = generateMenu(arr, arr[i].Id);
                        if (items.length > 0) {
                            arr[i].Items = items;
                        }
                        var item = { id: arr[i].Id, text: arr[i].Name, url: arr[i].Url != null ? arr[i].Url : '', items: arr[i].Items, order: arr[i].Order };
                        out.push(item);
                    }
                }
                out.sort(function descending(a, b) { return a.order - b.order; });
                return out;
            };
            // build filtered menu items
            this.FilterMenuItems = function (menuItems, routes) {
                return menuItems.filter(function (item) {
                    var exclude = false;
                    if (item.items) {
                        item.items = _this.FilterMenuItems(item.items, routes);
                        if ((!item.items || _.isEmpty(item.items)) && !item.url)
                            exclude = true;
                    }
                    else {
                        routes.forEach(function (route) {
                            if (route.regexp.exec(item.url.replace('#!', '')) && !authSvc.hasPermission(route.permission)) {
                                exclude = true;
                            }
                        });
                    }
                    return !exclude;
                });
            };
            // bind menu    
            $http.get('api/menu/GetMenu')
                .success(function (data) {
                menuSvc.menuData = generateMenu(data, 0);
                $scope.$broadcast('menu:Changed');
            });
            var filteredLinks;
            var restrictedRoutes;
            // build menu
            this.buildMenu = function () {
                // We only use routes which have permissions set, since unrestricted routes won't filter any menu items
                restrictedRoutes = _.filter($route.routes, function (route) { return route['permission'] && _.isString(route['permission']); });
                // We send to filter copy of menuData so we can refilter it later, if permissions change
                filteredLinks = _this.FilterMenuItems($.extend(true, new Array(), menuSvc.menuData), restrictedRoutes);
                _this.MenuOptions = {
                    popupCollision: "",
                    dataSource: filteredLinks,
                    closeOnClick: true,
                    openOnClick: false,
                };
            };
            // refresh menu control on page
            this.refreshMenu = function () {
                if ($('#mainMenu').data('kendoMenu')) {
                    $('#mainMenu').data('kendoMenu').destroy();
                }
                var kendoMenu = $('#mainMenu').data('kendoMenu');
                //var that = kendoMenu;
                var oldFunc = kendo.ui.Menu.fn['_click'];
                //c+p from kendo menu sources. To keep it in synch.
                kendo.ui.Menu.fn['_click'] = function (e) {
                    var that = this;
                    oldFunc.call(that, e);
                    var groupSelector = ".k-group", allItemsSelector = ":not(.k-list) > .k-item", LINK = "k-link", HOVERSTATE = "k-state-hover";
                    var options = that.options, target = $(kendo['eventTarget'](e)), link = target.closest("." + LINK), element = target.closest(allItemsSelector), childGroup = element.children(groupSelector + ",.k-animation-container"), childGroupVisible = childGroup.is(":visible");
                    if ((!childGroup.length || (options.openOnClick && childGroupVisible))) {
                        element.removeClass(HOVERSTATE).css("height"); // Force refresh for Chrome
                        that._oldHoverItem = that._findRootParent(element);
                        that.close(link.parentsUntil(that.element, allItemsSelector));
                        that.clicked = false;
                        if ("MSPointerUp".indexOf(e.type) != -1) {
                            e.preventDefault();
                        }
                        return;
                    }
                };
                $('#mainMenu').kendoMenu(_this.MenuOptions);
            };
            $scope.$on('menu:Changed', function () {
                $scope.MenuCtrl.buildMenu();
                $scope.MenuCtrl.refreshMenu();
            });
            $scope.$on('auth:permissionsChanged', function () {
                $scope.MenuCtrl.buildMenu();
                $scope.MenuCtrl.refreshMenu();
            });
            $scope.$on('menu:Refresh', function () {
                $scope.MenuCtrl.refreshMenu();
            });
        }
        MenuCtrl.$inject = ['$scope', '$route', 'AuthSvc', 'MenuSvc', '$http', '$rootScope'];
        return MenuCtrl;
    })();
    Controllers.MenuCtrl = MenuCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=MenuCtrl.js.map