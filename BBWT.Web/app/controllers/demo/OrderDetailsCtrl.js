/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var OrderDetailsCtrl = (function () {
        function OrderDetailsCtrl($routeParams, $scope, $location, $http, $window) {
            var _this = this;
            $scope['OrderDetailsCtrl'] = this;
            $http.get('api/demo/GetOrderHeader/' + $routeParams['id']).success(function (data) { return _this.Header = data; });
            this.Back = function () {
                //$window.history.back();
                $location.path('/test/orders');
            };
            this.GridDetailsOptions =
                {
                    pageable: { refresh: true, pageSizes: true },
                    columns: [
                        {
                            field: "ProductTitle", title: "Product"
                        },
                        {
                            field: "Quantity", title: "Quantity"
                        },
                        {
                            field: "Price", title: "Unit Price", format: "{0:c}"
                        },
                        {
                            field: "Amount", title: "Amount", template: "£#= kendo.toString(Price * Quantity, '0.00') #", format: "{0:c}"
                        }
                    ],
                    sortable: true,
                    filterable: false,
                    resizable: true
                };
            this.OrdersDetailsDS = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: 'api/demo/GetOrderItems/' + $routeParams['id']
                    }
                },
                pageSize: 5
            });
            this.OrdersDetailsDS.fetch(function () {
                var datasourcedata = $scope['OrderDetailsCtrl'].OrdersDetailsDS.data();
                var total = 0;
                for (var i = 0; i < datasourcedata.length; i++) {
                    total += (datasourcedata[i].Quantity * datasourcedata[i].Price);
                }
                $scope.$apply(function () {
                    $scope['OrderDetailsCtrl'].InvoiceTotal = total;
                });
            });
        }
        OrderDetailsCtrl.$inject = ['$routeParams', '$scope', '$location', '$http', '$window'];
        return OrderDetailsCtrl;
    })();
    Controllers.OrderDetailsCtrl = OrderDetailsCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=OrderDetailsCtrl.js.map