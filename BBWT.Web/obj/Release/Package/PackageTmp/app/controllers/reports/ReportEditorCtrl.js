/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var ReportEditorCtrl = (function () {
        function ReportEditorCtrl($scope, $location, $http, $routeParams) {
            var _this = this;
            $scope['ReportEditorCtrl'] = this;
            this.IsNewReport = $routeParams['name'] == null;
            this.SqlBrowserVisible = false;
            this.Report = { ReportName: '', ReportDescription: '', ReportParameters: null, ReportPath: '' };
            this.Report.ReportName = $routeParams['name'];
            this.Report.Query = '';
            this.Report.ReportDescription = '';
            this.Report.ReportParameters = null;
            this.Report.ReportPath = null;
            this.Report.CurrentDatabase = null;
            this.SqlBrowser = { CurrentDatabase: null, Query: null, ExecutionResult: { Columns: null, Rows: null, Exception: null } };
            this.step = 0;
            this.totalSteps = 2;
            this.isFirstStep = function () {
                return this.step === 0;
            };
            this.isLastStep = function () {
                return this.step == this.totalSteps - 1;
            };
            this.isCurrentStep = function (step) {
                return this.step === step;
            };
            this.getNextLabel = function () {
                return (this.isLastStep()) ? 'Save' : 'Next';
            };
            this.getTabLabel = function () {
                return (this.isFirstStep()) ? 'Report Definition' : 'Report Layout';
            };
            this.handlePrevious = function () {
                this.step -= (this.isFirstStep()) ? 0 : 1;
            };
            this.handleNext = function () {
                if (!_this.isLastStep()) {
                    _this.step++;
                }
                else {
                    _this.SaveReport();
                }
            };
            this.pageIsValid = function () {
                return true;
            };
            this.DatabasesTreeControl = null;
            this.OnDatabaseNodeExpand = function (event) {
                var dataItem = _this.DatabasesTreeControl.dataItem(event.node);
                switch (dataItem.type) {
                    case "Tables":
                        _this.GetTables(dataItem, dataItem.databasename);
                        break;
                    case "Table":
                        _this.GetColumns(dataItem, dataItem.databasename, dataItem.text);
                        break;
                }
            };
            this.OnDatabaseNodeChange = function (event) {
                var dataItem = _this.DatabasesTreeControl.dataItem(event.sender._current);
                _this.SqlBrowser.CurrentDatabase = dataItem.databasename;
            };
            this.DatabasesTree = {
                dataSource: {}
            };
            this.ShowSqlBrowser = function () {
                _this.SqlBrowser = { CurrentDatabase: null, Query: null, ExecutionResult: { Columns: null, Rows: null, Exception: null } };
                Dialogs.showCustom({ winId: 'SqlBrowserDialog', width: '70%', title: 'Sql browser' });
                _this.GetDatabases();
            };
            this.ShowEditParameterDialog = function () {
                Dialogs.showCustom({ winId: 'EditParameterDialog', width: '70%', title: 'Edit parameter' });
            };
            this.IsEmptyQuery = function () {
                return _this.SqlBrowser.Query == null || _this.SqlBrowser.Query == '';
            };
            this.ApplyQueryClickHandler = function () {
                _this.Report.Query = _this.SqlBrowser.Query;
                _this.Report.CurrentDatabase = _this.SqlBrowser.CurrentDatabase;
            };
            this.RunQueryClickHandler = function () {
                _this.RunQuery(_this.SqlBrowser.CurrentDatabase, _this.SqlBrowser.Query);
            };
            this.GetReportInfo = function () {
                $http.get('api/reports/GetReportInfo?name=' + encodeURIComponent(_this.Report.ReportName)).success(function (data) {
                    _this.Report.ReportDescription = data.Description;
                    _this.Report.ReportPath = data.ReportPath;
                    $http.get('api/reports/GetReportParameters?reportPath=' + encodeURIComponent(_this.Report.ReportPath)).success(function (d) {
                        _this.Report.ReportParameters = d == 'null' ? null : d;
                        if (_this.Report.ReportParameters != null && _this.Report.ReportParameters.length > 0) {
                            for (var i = 0; i < _this.Report.ReportParameters.length; i++) {
                                if (_this.Report.ReportParameters[0].HasPredefinedValues)
                                    _this.Report.ReportParameters[0].Value = _this.Report.ReportParameters[0].ValidValues[0];
                            }
                        }
                    });
                });
            };
            this.SaveReport = function () {
                var data = {
                    ReportName: _this.Report.ReportName,
                    ReportDescription: _this.Report.ReportDescription,
                    Query: _this.Report.Query,
                    DatabaseName: _this.Report.CurrentDatabase
                };
                $http.post('api/reports/SaveReport', data).success(function () {
                    Dialogs.showSuccess({ message: "Congratulations! Report has been saved!" });
                });
            };
            this.Cancel = function () { $location.path('/reports/index'); };
            this.GetDatabases = function () {
                $http.get('api/sqlbrowser/GetDatabases').success(function (data) {
                    var databasesTreeNodes = {
                        data: []
                    };
                    if (data != null) {
                        for (var i = 0; i < data.length; i++) {
                            var dataBaseTreeNode = {
                                id: data[i].Id,
                                text: data[i].Name,
                                type: 'Database',
                                spriteCssClass: 'database',
                                databasename: data[i].Name,
                                items: [
                                    { text: 'Tables', databasename: data[i].Name, type: 'Tables', spriteCssClass: 'folder-closed', items: [] },
                                    { text: 'Views', databasename: data[i].Name, type: 'Views', spriteCssClass: 'folder-closed', items: [] }
                                ]
                            };
                            databasesTreeNodes.data.push(dataBaseTreeNode);
                        }
                    }
                    _this.DatabasesTree.dataSource = databasesTreeNodes;
                });
            };
            this.GetTables = function (node, data) {
                node.items = [];
                $http.get('api/sqlbrowser/GetTables?dbname=' + data).success(function (d) {
                    for (var i = 0; i < d.length; i++) {
                        var tableTreeNode = {
                            text: d[i],
                            type: 'Table',
                            databasename: data,
                            spriteCssClass: 'dbtable',
                            items: []
                        };
                        node.items.push(tableTreeNode);
                    }
                    node.expanded = true;
                });
            };
            this.GetColumns = function (node, dbname, tablename) {
                node.items = [];
                $http.get('api/sqlbrowser/GetColumns?dbname=' + dbname + '&tablename=' + tablename).success(function (d) {
                    for (var i = 0; i < d.length; i++) {
                        var columnTreeNode = {
                            text: d[i].Name,
                            type: 'Column',
                            databasename: dbname,
                            tablename: tablename,
                            ispk: d[i].IsPrimaryKey,
                            isfk: d[i].IsForeignKey,
                            spriteCssClass: 'column',
                            items: null
                        };
                        node.items.push(columnTreeNode);
                    }
                    node.expanded = true;
                });
            };
            this.RunQuery = function (dbname, query) {
                var postData = {
                    dbname: dbname,
                    query: query
                };
                $http.post('api/sqlbrowser/RunQuery', postData).success(function (d) {
                    _this.SqlBrowser.ExecutionResult.Columns = d.Columns;
                    _this.SqlBrowser.ExecutionResult.Rows = d.Rows;
                    _this.SqlBrowser.ExecutionResult.Exception = d.Exception;
                    _this.SqlBrowser.ExecutionResult.Executed = true;
                });
            };
            if (!this.IsNewReport) {
                this.GetReportInfo();
            }
        }
        ReportEditorCtrl.$inject = ['$scope', '$location', '$http', '$routeParams'];
        return ReportEditorCtrl;
    })();
    Controllers.ReportEditorCtrl = ReportEditorCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=ReportEditorCtrl.js.map