/// <reference path="../references.ts" />
var Directives;
(function (Directives) {
    var KendoGridPlus = (function () {
        function KendoGridPlus() {
            var directive = {
                restrict: 'A',
                scope: true,
                //priority: 99,       
                link: function ($scope, grid, attrs) {
                    var options = $scope.$eval(attrs['kOptions']);
                    //Uncomment if need that for every grid. options.editable = true;
                    options.dataBinding = function () {
                        kendo.ui.progress(grid, true);
                        /*hotfix. I've no idea why but buying called here progress mask
                        gets added to content element which is child of the grid.
                        When we do that in dataBound all works without the hack,
                        but we need the progress right at this moment.*/
                        $(grid).find('.k-loading-mask').prependTo(grid);
                    };
                    options.dataBound = function () {
                        /*TODO: Probably need to be smarter here. This approach leads
                        to infinite recursion.
                        if (options.dataBound) {
                            options.dataBound();
                        };*/
                        var dataSource = $scope.$eval(attrs['kDataSource']);
                        var colCount = grid.find('.k-grid-header colgroup > col').length;
                        var stub = '<td>&nbsp;</td>';
                        // If there are no results place an indicator row
                        if (dataSource._view.length == 0) {
                            grid.find('.k-grid-content tbody')
                                .append('<tr class="kendo-data-row"><td colspan="' + colCount + '" style="text-align:center"><b>No Results Found!</b></td></tr>');
                        }
                        else {
                            for (var k = 1; k < colCount; k++) {
                                stub += '<td>&nbsp;</td>';
                            }
                        }
                        // Get visible row count
                        var rowCount = grid.find('.k-grid-content tbody tr').length;
                        // If the row count is less that the page size add in the number of missing rows
                        if (rowCount < dataSource._take) {
                            var addRows = dataSource._take - rowCount;
                            for (var i = 0; i < addRows; i++) {
                                grid.find('.k-grid-content tbody').append('<tr class="kendo-data-row">' + stub + '</tr>');
                            }
                        }
                        kendo.ui.progress(grid, false);
                    };
                }
            };
            return directive;
        }
        return KendoGridPlus;
    })();
    Directives.KendoGridPlus = KendoGridPlus;
})(Directives || (Directives = {}));
// This directive runs alongside kendo-grid angular directive and redefines some options.
angular.module('Directives', []).directive('kendoGridPlus', [function () {
        return new Directives.KendoGridPlus();
    }]);
//# sourceMappingURL=kendoGridPlus.js.map