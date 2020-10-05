/// <reference path="../../references.ts" />
module Controllers {
    export class OrderDetailsCtrl {
        Header: any;
        Items: any[];
        //InvoiceTotal: any;

        Back: () => void;
        OrdersDetailsDS: kendo.data.DataSource;
        GridDetailsOptions: kendo.ui.GridOptions;        
        
        static $inject: Array<string> = ['$routeParams', '$scope', '$location', '$http', '$window'];
        constructor(
            $routeParams: ng.route.IRouteParamsService,
            $scope: ng.IScope,
            $location: ng.ILocationService,
            $http: ng.IHttpService,
            $window: ng.IWindowService)
        {
            $scope['OrderDetailsCtrl'] = this;            

            $http.get('api/demo/GetOrderHeader/' + $routeParams['id']).success((data) => this.Header = data);
            
            this.Back = () => {
                //$window.history.back();
                $location.path('/test/orders');
            }                     
            
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
            }      
            
            this.OrdersDetailsDS = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: 'api/demo/GetOrderItems/' + $routeParams['id']
                    }
                },
                pageSize: 5
            });                          

            this.OrdersDetailsDS.fetch(() => {                
                var datasourcedata = $scope['OrderDetailsCtrl'].OrdersDetailsDS.data();
                var total = 0;
                for (var i = 0; i < datasourcedata.length; i++) {
                    total += (datasourcedata[i].Quantity * datasourcedata[i].Price);
                }                
                $scope.$apply(() => {
                    $scope['OrderDetailsCtrl'].InvoiceTotal = total;
                });
            });                        
        }
    }
}
