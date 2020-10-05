/// <reference path="../../references.ts" />
module Controllers {
    export class ReportEditorCtrl {
        Report: any;
        IsNewReport: boolean;
        GetReportInfo: () => void;
        ApplyQueryClickHandler: () => void;
        RunQueryClickHandler: () => void;
        Cancel: () => void;
        SaveReport: () => void;
        
        SqlBrowser: any;
        SqlBrowserVisible: boolean;
        ShowSqlBrowser: () => void;
        ShowEditParameterDialog: () => void;
        IsEmptyQuery: () => boolean;
        GetDatabases: () => void;
        GetTables: (node, data) => void;
        GetColumns: (node, dbname, tablename) => void;
        RunQuery: (dbname, query) => void;
        DatabasesTree: any;
        DatabasesTreeControl:any;
        TreeNodeClick: (data) => void;
        OnDatabaseNodeExpand: (event) => void;
        OnDatabaseNodeChange: (event) => void;
        TreeNodeTemplate: string;

        step: number;
        totalSteps: number;
        isFirstStep: () => boolean;
        isLastStep: () => boolean;
        isCurrentStep: (step: number) => boolean;
        getNextLabel: () => string;
        getTabLabel: () => string;
        handlePrevious: () => void;
        handleNext: () => void;

        pageIsValid: () => boolean;

        static $inject: Array<string> = ['$scope', '$location', '$http', '$routeParams'];

        constructor(
            $scope: ng.IScope,
            $location: ng.ILocationService,
            $http: ng.IHttpService,
            $routeParams: ng.route.IRouteParamsService) {

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

            this.isFirstStep = function() {
                return this.step === 0;
            };

            this.isLastStep = function() {
                return this.step == this.totalSteps - 1;
            };

            this.isCurrentStep = function(step) {
                return this.step === step;
            };

            this.getNextLabel = function() {
                return (this.isLastStep()) ? 'Save' : 'Next';
            };

            this.getTabLabel = function() {
                return (this.isFirstStep()) ? 'Report Definition' : 'Report Layout';
            };

            this.handlePrevious = function() {
                this.step -= (this.isFirstStep()) ? 0 : 1;
            };

            this.handleNext = () => {
                if (!this.isLastStep()) {
                    this.step++;
                } else {
                    this.SaveReport();
                }
            }

            this.pageIsValid = () => {
                return true;
            }
                
            this.DatabasesTreeControl = null;
            this.OnDatabaseNodeExpand = (event) => {
                var dataItem = this.DatabasesTreeControl.dataItem(event.node);
                switch (dataItem.type) {
                case "Tables":
                    this.GetTables(dataItem, dataItem.databasename);
                    break;
                case "Table":
                    this.GetColumns(dataItem, dataItem.databasename, dataItem.text);
                    break;
                }
            }

            this.OnDatabaseNodeChange = (event) => {
                var dataItem = this.DatabasesTreeControl.dataItem(event.sender._current);
                this.SqlBrowser.CurrentDatabase = dataItem.databasename;
            }

            this.DatabasesTree = {
                dataSource: {}
            };

            this.ShowSqlBrowser = () => {
                this.SqlBrowser = { CurrentDatabase: null, Query: null, ExecutionResult: { Columns: null, Rows: null, Exception: null } };
                Dialogs.showCustom({ winId: 'SqlBrowserDialog', width: '70%', title: 'Sql browser' });
                this.GetDatabases();
            }

            this.ShowEditParameterDialog = () => {
                Dialogs.showCustom({ winId: 'EditParameterDialog', width: '70%', title: 'Edit parameter' });
            }

            this.IsEmptyQuery = () => {
                return this.SqlBrowser.Query == null || this.SqlBrowser.Query == '';
            }

            this.ApplyQueryClickHandler = () => {
                this.Report.Query = this.SqlBrowser.Query;
                this.Report.CurrentDatabase = this.SqlBrowser.CurrentDatabase;
            }

            this.RunQueryClickHandler = () => {
                this.RunQuery(this.SqlBrowser.CurrentDatabase, this.SqlBrowser.Query);
            }

            this.GetReportInfo = () => {
                $http.get('api/reports/GetReportInfo?name=' + encodeURIComponent(this.Report.ReportName)).success((data) => {
                    this.Report.ReportDescription = data.Description;
                    this.Report.ReportPath = data.ReportPath;

                    $http.get('api/reports/GetReportParameters?reportPath=' + encodeURIComponent(this.Report.ReportPath)).success((d) => {
                        this.Report.ReportParameters = d == 'null' ? null : d;

                        if (this.Report.ReportParameters != null && this.Report.ReportParameters.length > 0) {
                            for (var i = 0; i < this.Report.ReportParameters.length; i++) {
                                if (this.Report.ReportParameters[0].HasPredefinedValues)
                                    this.Report.ReportParameters[0].Value = this.Report.ReportParameters[0].ValidValues[0];
                            }
                        }
                    });
                });
            };

            this.SaveReport = () => {
                var data = {
                    ReportName: this.Report.ReportName,
                    ReportDescription: this.Report.ReportDescription,
                    Query: this.Report.Query,
                    DatabaseName: this.Report.CurrentDatabase
                };

                $http.post('api/reports/SaveReport', data).success(() => {
                    Dialogs.showSuccess({ message: "Congratulations! Report has been saved!" });
                });
            };

            this.Cancel = () => { $location.path('/reports/index'); }
                
            this.GetDatabases = () => {
                $http.get('api/sqlbrowser/GetDatabases').success((data) => {
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
                                    { text: 'Tables', databasename: data[i].Name, type: 'Tables', spriteCssClass: 'folder-closed',  items: [] },
                                    { text: 'Views', databasename: data[i].Name, type: 'Views', spriteCssClass: 'folder-closed',  items: [] }
                                ]
                            }
                            databasesTreeNodes.data.push(dataBaseTreeNode);
                        }
                    }

                    this.DatabasesTree.dataSource = databasesTreeNodes;
                });
            }

            this.GetTables = (node, data) => {
                node.items = [];
                $http.get('api/sqlbrowser/GetTables?dbname=' + data).success((d) => {
                    for (var i = 0; i < d.length; i++) {
                        var tableTreeNode = {
                            text: d[i],
                            type: 'Table',
                            databasename: data,
                            spriteCssClass: 'dbtable',
                            items: []
                        }
                        node.items.push(tableTreeNode);
                    }
                    node.expanded = true;
                });
            }

            this.GetColumns = (node, dbname, tablename) => {
                node.items = [];
                $http.get('api/sqlbrowser/GetColumns?dbname=' + dbname + '&tablename=' + tablename).success((d) => {
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
                        }
                        node.items.push(columnTreeNode);
                    }
                    node.expanded = true;
                });
            }

            this.RunQuery = (dbname, query) => {
                var postData = {
                    dbname: dbname,
                    query: query
                };

                $http.post('api/sqlbrowser/RunQuery', postData).success((d) => {
                    this.SqlBrowser.ExecutionResult.Columns = d.Columns;
                    this.SqlBrowser.ExecutionResult.Rows = d.Rows;
                    this.SqlBrowser.ExecutionResult.Exception = d.Exception;
                    this.SqlBrowser.ExecutionResult.Executed = true;
                });
            }

            if (!this.IsNewReport) {
                this.GetReportInfo();

            }
        }
    }
}
