/// <reference path="../references.ts" />
var Services;
(function (Services) {
    var MenuSvc = (function () {
        function MenuSvc($rootScope, $http) {
            var _this = this;
            $rootScope['MenuSvc'] = this;
            //// helpers
            // serialize tree into data for webapi/post
            this.serializeTreeDataSource = function (items, arr, rootItem) {
                if (items) {
                    for (var i = 0; i < items.length; i++) {
                        var thisItem = items[i];
                        var parentId = rootItem != null ? rootItem.id : 0;
                        var url = thisItem.value;
                        var item = {
                            Id: thisItem.id,
                            Name: thisItem.text,
                            Url: url,
                            ParentId: parentId,
                            Order: i
                        };
                        arr.push(item);
                        if (items[i].items != null) {
                            var data = thisItem.children != null ? thisItem.children.data() : thisItem.items;
                            arr = _this.serializeTreeDataSource(data, arr, thisItem);
                        }
                    }
                    return arr;
                }
                else
                    return null;
            };
            // prepare items - prepare tree items in treeview format
            this.prepareMenuItems = function (items) {
                if (items) {
                    for (var i = 0; i < items.length; i++) {
                        items[i].value = items[i].url != null ? items[i].url : '',
                            items[i].url = null;
                        _this.prepareMenuItems(items[i].items);
                    }
                    return items;
                }
            };
        }
        MenuSvc.$inject = ['$rootScope', '$http'];
        return MenuSvc;
    })();
    Services.MenuSvc = MenuSvc;
})(Services || (Services = {}));
angular.module('Services', [])
    .factory('MenuSvc', [
    '$rootScope', '$http',
    function ($rootScope, $http) {
        return new Services.MenuSvc($rootScope, $http);
    }
]);
//# sourceMappingURL=MenuSvc.js.map