/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var ManageMenuCtrl = (function () {
        function ManageMenuCtrl($scope, $rootScope, $location, $http, $route, menuSvc) {
            var _this = this;
            $scope["ManageMenuCtrl"] = this;
            this.isChanged = false;
            // routes list
            this.routes = ['(none)'];
            // selected data source
            var selectedDataSourceItem = null;
            // generate menu - create tree from webapi/get data
            var generateMenu = function (arr, parentId) {
                var out = [];
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].ParentId == parentId) {
                        var items = generateMenu(arr, arr[i].Id);
                        if (items.length > 0) {
                            arr[i].Items = items;
                        }
                        // set previous nodes as expanded
                        if (selectedDataSourceItem != null && selectedDataSourceItem.get("id") == arr[i].Id) {
                            var _parentId = parentId;
                            while (_parentId != 0) {
                                for (var j = 0; j < arr.length; j++) {
                                    if (arr[j].Id == _parentId) {
                                        arr[j].IsExpanded = true;
                                        _parentId = arr[j].ParentId;
                                        break;
                                    }
                                }
                            }
                            arr[i].IsExpanded = true;
                        }
                        var item = {
                            id: arr[i].Id,
                            text: arr[i].Name,
                            value: arr[i].Url,
                            items: arr[i].Items,
                            expanded: arr[i].IsExpanded == null ? false : arr[i].IsExpanded,
                            order: arr[i].Order
                        };
                        out.push(item);
                    }
                }
                out.sort(function descending(a, b) { return a.order - b.order; });
                return out;
            };
            var treeViewMenu;
            // find item in tree
            var findMenuItem = function (items, id) {
                if (items) {
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].id == id) {
                            return items[i];
                        }
                        var found = findMenuItem(items[i].items, id);
                        if (found)
                            return found;
                    }
                }
            };
            // save menu
            this.saveAll = function () {
                var items = treeViewMenu.dataSource.data();
                var arr = [];
                var data = menuSvc.serializeTreeDataSource(items, arr, null);
                $http.post('api/menu/SaveMenu', data)
                    .success(function (result) {
                    _this.isChanged = false;
                    Dialogs.showSuccess({ message: "Menu items were successfully updated. Refresh page to apply (press F5)." });
                });
            };
            // add new item click
            this.showAddItemDialog = function () {
                _this.newMenuItem = { name: '', value: '' };
                Dialogs.showCustom({ title: 'Add Item', winId: 'bbwtAddItem' });
            };
            // add new item in tree
            this.addMenuItem = function () {
                if (_this.newMenuItem != null) {
                    _this.isChanged = true;
                    var id = Math.floor(Math.random() * (1000000000));
                    // add with expand (require rebind ds)                    
                    var parentId = selectedDataSourceItem != null ? selectedDataSourceItem.get("id") : 0;
                    var item = {
                        Id: id,
                        Name: _this.newMenuItem.name,
                        Url: _this.newMenuItem.value != null ? _this.newMenuItem.value : "",
                        Items: null,
                        ParentId: parentId
                    };
                    _this.rawMenuData.push(item);
                    var arr = generateMenu(_this.rawMenuData, 0);
                    var ds = new kendo.data.HierarchicalDataSource({ data: arr });
                    treeViewMenu.setDataSource(ds);
                    treeViewMenu.dataSource.sync();
                }
            };
            var removeFromRawData = function (delItems) {
                for (var i = 0; i < delItems.length; i++) {
                    for (var j = 0; j < _this.rawMenuData.length; j++) {
                        if (_this.rawMenuData[j].Id == delItems[i].id)
                            _this.rawMenuData.splice(j, 1);
                    }
                }
            };
            // remove item from tree
            this.removeMenuItem = function () {
                if (selectedDataSourceItem != null) {
                    _this.isChanged = true;
                    // remove items from rawData array
                    var delItems = (selectedDataSourceItem.items != null && selectedDataSourceItem.items.length > 0) ?
                        menuSvc.prepareMenuItems(selectedDataSourceItem.items) : [];
                    delItems.push({ id: selectedDataSourceItem.id });
                    removeFromRawData(delItems);
                    // remove item from datasource
                    treeViewMenu.dataSource.remove(selectedDataSourceItem);
                    treeViewMenu.dataSource.sync();
                    _this.selectedItem = null;
                    selectedDataSourceItem = null;
                    $scope.$apply();
                }
            };
            // change item's values
            this.onMenuItemChange = function () {
                if (selectedDataSourceItem != null) {
                    _this.isChanged = true;
                    selectedDataSourceItem.set("text", _this.selectedItem.text);
                    selectedDataSourceItem.set("value", _this.selectedItem.value);
                    treeViewMenu.dataSource.sync();
                }
            };
            // select item 
            this.onMenuSelect = function (e) {
                if (e != undefined) {
                    // bind selectedItem details                    
                    _this.selectedItem = treeViewMenu.dataItem(e.node);
                    $scope.$apply();
                    var route = $scope["ManageMenuCtrl"].selectedItem.value;
                    //if (route != null && route.indexOf('#!') != -1)
                    if (route != null)
                        route = route.substr(2);
                    $("#ddlRoutes").val(route);
                    var dataItems = treeViewMenu.dataSource.data();
                    selectedDataSourceItem = findMenuItem(dataItems, _this.selectedItem.id);
                }
            };
            var onDragItem = function (e) {
                _this.isChanged = true;
                $scope.$apply();
            };
            // create treeview control
            $("#tvMenu").kendoTreeView({
                select: this.onMenuSelect, loadOnDemand: false,
                dragAndDrop: true,
                dragend: onDragItem
            });
            treeViewMenu = $("#tvMenu").data("kendoTreeView");
            // bind menu    
            $http.get('api/menu/GetMenu')
                .success(function (data) {
                $scope["ManageMenuCtrl"].rawMenuData = data;
                var arr = generateMenu(data, 0);
                var ds = new kendo.data.HierarchicalDataSource({ data: arr });
                treeViewMenu.setDataSource(ds);
            }).error(function (err) {
                Dialogs.showError({ message: "Menu update error " + err.message });
            });
            // return to main page            
            this.cancel = function () {
                Dialogs.showConfirmation({ message: "Are you sure you wish to cancel your changes?" }).done(function () {
                    $rootScope.$apply(function () {
                        $location.path('/');
                    });
                });
            };
            // get routes
            angular.forEach($route.routes, function (config, route) {
                var routeStr = route.toString();
                if (routeStr != "/" && routeStr.slice(-1) == "/") {
                    routeStr = routeStr.slice(0, -1);
                }
                if ($scope['ManageMenuCtrl'].routes.indexOf(routeStr) == -1 && routeStr != "" && routeStr != "null") {
                    $scope['ManageMenuCtrl'].routes.push(routeStr);
                }
            });
            // search control options            
            this.pageOptions = {
                dataSource: this.routes, animation: false, filter: "contains",
                ignoreCase: true, minLength: 1
            };
        }
        ManageMenuCtrl.$inject = ['$scope', '$rootScope', '$location', '$http', '$route', 'MenuSvc'];
        return ManageMenuCtrl;
    })();
    Controllers.ManageMenuCtrl = ManageMenuCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=ManageMenuCtrl.js.map