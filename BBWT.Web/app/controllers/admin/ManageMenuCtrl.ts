/// <reference path="../../references.ts" />
module Controllers {
    export class ManageMenuCtrl {
        
        pageOptions: any;        
        routes: any;
        selectedItem: any;
        newMenuItem: any;
        rawMenuData: any;
        onMenuSelect: (e: any) => void;
        onMenuItemChange: () => void;
        saveAll: () => void;
        resetDef: () => void;
        addMenuItem: () => void;
        removeMenuItem: () => void;
        showAddItemDialog: () => void;
        cancel: () => void;
        isChanged: boolean;

        static $inject: Array<string> = ['$scope', '$rootScope', '$location', '$http', '$route', 'MenuSvc'];

        constructor($scope: ng.IScope,
            $rootScope: ng.IRootScopeService,
            $location: ng.ILocationService, $http: ng.IHttpService, $route: ng.route.IRouteService, menuSvc: Services.MenuSvc) {
            $scope["ManageMenuCtrl"] = this;

            this.isChanged = false;

            // routes list
            this.routes = ['(none)'];

            // selected data source
            var selectedDataSourceItem = null;

            // generate menu - create tree from webapi/get data
            var generateMenu = (arr, parentId) => {
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
            }

            var treeViewMenu;

            // find item in tree
            var findMenuItem = (items, id) => {
                if (items) {
                    for (var i = 0; i < items.length; i++) {                    
                        if (items[i].id == id) {
                            return items[i];
                        }
                        var found = findMenuItem(items[i].items, id);
                        if (found) return found;
                    }
                }
            }
           
            // save menu
            this.saveAll = () => {
                var items = treeViewMenu.dataSource.data();
                var arr = [];
                var data = menuSvc.serializeTreeDataSource(items, arr, null);

                $http.post('api/menu/SaveMenu', data)
                    .success((result) => {
                        this.isChanged = false;
                        Dialogs.showSuccess({ message: "Menu items were successfully updated. Refresh page to apply (press F5)." });
                    });
            }

            // add new item click
            this.showAddItemDialog = () => {

                this.newMenuItem = { name: '', value: '' };                
                Dialogs.showCustom({ title: 'Add Item', winId: 'bbwtAddItem' });
            };
            
            // add new item in tree
            this.addMenuItem = () => {                
                if (this.newMenuItem != null) {
                    this.isChanged = true;

                    var id = Math.floor(Math.random() * (1000000000));

                    // add with expand (require rebind ds)                    
                    var parentId = selectedDataSourceItem != null ? selectedDataSourceItem.get("id") : 0;

                    var item = {
                        Id: id,
                        Name: this.newMenuItem.name,
                        Url: this.newMenuItem.value != null ? this.newMenuItem.value : "",
                        Items: null,
                        ParentId: parentId
                    };

                    this.rawMenuData.push(item);
                    var arr = generateMenu(this.rawMenuData, 0);
                    var ds = new kendo.data.HierarchicalDataSource({ data: arr });
                    treeViewMenu.setDataSource(ds);        
                    treeViewMenu.dataSource.sync();                                                       
                }
            }

            var removeFromRawData = (delItems) => {                
                for (var i = 0; i < delItems.length; i++) {
                    for (var j = 0; j < this.rawMenuData.length; j++) {                    
                        if (this.rawMenuData[j].Id == delItems[i].id)
                            this.rawMenuData.splice(j, 1);
                    }
                }
            }

            // remove item from tree
            this.removeMenuItem = () => {
                if (selectedDataSourceItem != null) {
                    this.isChanged = true;

                    // remove items from rawData array
                    var delItems = (selectedDataSourceItem.items != null && selectedDataSourceItem.items.length > 0) ?                    
                        menuSvc.prepareMenuItems(selectedDataSourceItem.items) : [];                                                                    
                    delItems.push({ id: selectedDataSourceItem.id });
                    removeFromRawData(delItems);

                    // remove item from datasource
                    treeViewMenu.dataSource.remove(selectedDataSourceItem);
                    treeViewMenu.dataSource.sync();

                    this.selectedItem = null;
                    selectedDataSourceItem = null;
                    $scope.$apply();
                }
            }

            // change item's values
            this.onMenuItemChange = () => {
                if (selectedDataSourceItem != null) {                    
                    this.isChanged = true;                    
                    selectedDataSourceItem.set("text", this.selectedItem.text);
                    selectedDataSourceItem.set("value", this.selectedItem.value);
                    treeViewMenu.dataSource.sync();
                }
            }            
       
            // select item 
            this.onMenuSelect = (e) => {
                if (e != undefined) {

                    // bind selectedItem details                    
                    this.selectedItem = treeViewMenu.dataItem(e.node);
                    $scope.$apply();
                    
                    var route = $scope["ManageMenuCtrl"].selectedItem.value;
                    //if (route != null && route.indexOf('#!') != -1)
                    if (route != null)
                        route = route.substr(2);

                    $("#ddlRoutes").val(route);

                    var dataItems = treeViewMenu.dataSource.data();
                    selectedDataSourceItem = findMenuItem(dataItems, this.selectedItem.id);
                }
            }

                var onDragItem = (e) => {
                    this.isChanged = true;
                    $scope.$apply();
                }

            // create treeview control
            $("#tvMenu").kendoTreeView({
                select: this.onMenuSelect, loadOnDemand: false,
                dragAndDrop: true,
                dragend: onDragItem
            });
            treeViewMenu = $("#tvMenu").data("kendoTreeView");

            // bind menu    
            $http.get('api/menu/GetMenu')
                .success((data) => {
                    $scope["ManageMenuCtrl"].rawMenuData = data;
                    var arr = generateMenu(data, 0);
                    var ds = new kendo.data.HierarchicalDataSource({ data: arr });
                    treeViewMenu.setDataSource(ds);
                }).error((err) => {
                    Dialogs.showError({ message: "Menu update error " + err.message });
                });

            // return to main page            
            this.cancel = () => {                                
                Dialogs.showConfirmation({ message: "Are you sure you wish to cancel your changes?" }).done(() => {
                    $rootScope.$apply(() => {
                        $location.path('/');
                    });
                });                
            }

            // get routes
            angular.forEach($route.routes, (config, route) => {
                var routeStr = route.toString();
                if (routeStr != "/" && routeStr.slice(-1) == "/") {
                    routeStr = routeStr.slice(0, - 1);
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
    }
}