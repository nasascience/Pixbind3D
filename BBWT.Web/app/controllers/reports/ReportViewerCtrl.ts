/// <reference path="../../references.ts" />
module Controllers {
    export class ReportViewerCtrl {
        CurrentUserId: number;
        ReportPath: string;
        ReportId: string;
        ReportName: string;
        ReportDescription: string;
        ReportExecutionBaseUrl: string;
        ReportExecutionParameters: any;
        ReportExecutionUrl: string;
        ReportParameters: any[]
        ExportFormat: string
        ExportFormats: any[]
        SelectedParameterValue: any
        ExecuteBtnVisible: () => boolean;
        Execute: () => void;
        Cancel: () => void;
       
        static $inject: Array<string> = ['$scope', '$location', '$http', '$routeParams'];

        constructor(
            $scope: ng.IScope,
            $location: ng.ILocationService,
            $http: ng.IHttpService,
            $routeParams: ng.route.IRouteParamsService) {

            $scope['ReportViewerCtrl'] = this;
            this.ReportId = $routeParams['id'];
            this.ReportName = null;
            this.ReportDescription = '';
            this.ReportParameters = null;
            this.ExportFormat = 'PDF';
            this.SelectedParameterValue = null;
            this.ReportExecutionParameters = null;
            this.ReportExecutionBaseUrl = 'Reports/Viewer?executionParameters=';

            $http.get('api/users/GetCurrentUserId').success((data) => {
                this.CurrentUserId = data;
            });
            
            $http.get('api/reports/GetReportInfoById?id=' + encodeURIComponent(this.ReportId)).success((data) => {
                this.ReportDescription = data.Description;
                this.ReportPath = data.ReportPath;
                this.ReportName = data.ReportName;

                $http.get('api/reports/GetReportParameters?reportPath=' + encodeURIComponent(this.ReportPath)).success((d) => {
                    this.ReportParameters = d == 'null' ? null : d;

                    var autoExecute = true;

                    if (this.ReportParameters != null && this.ReportParameters.length > 0) {
                        for (var i = 0; i < this.ReportParameters.length; i++) {
                            if (this.ReportParameters[i].HasPredefinedValues)
                                this.ReportParameters[i].Value = this.ReportParameters[0].ValidValues[0];

                            if (!this.ReportParameters[i].IsHidden) {
                                autoExecute = false;
                            }
                        }
                    }
                    if (autoExecute) {
                        this.Execute();
                    }
                });
            });

            this.ExecuteBtnVisible = () => {
                var visible = false;

                if (this.ReportParameters != null && this.ReportParameters.length > 0) {
                    for (var i = 0; i < this.ReportParameters.length; i++) {
                        if (!this.ReportParameters[i].IsHidden) {
                            visible = true;
                        }
                    }
                }

                return visible;
            }

            this.Execute = () => {
                this.ReportExecutionParameters = {};
                this.ReportExecutionParameters.Path = this.ReportPath;

                if (this.ReportParameters != null && this.ReportParameters.length > 0) {
                    this.ReportExecutionParameters.Parameters = [];

                    for (var i = 0; i < this.ReportParameters.length; i++) {
                        if (this.ReportParameters[i].Value != null && this.ReportParameters[i].Value.Value != null) {
                            this.ReportExecutionParameters.Parameters.push({
                                Name: this.ReportParameters[i].Name,
                                Value: this.ReportParameters[i].Value.Value
                            });
                        }

                        if (this.ReportParameters[i].IsHidden && this.ReportParameters[i].Name == 'UserId') {
                            this.ReportExecutionParameters.Parameters.push({
                                Name: this.ReportParameters[i].Name,
                                Value: this.CurrentUserId
                            });
                        }
                    }
                }

                this.ReportExecutionUrl = this.ReportExecutionBaseUrl + encodeURIComponent(JSON.stringify(this.ReportExecutionParameters)) + '&timeStamp=' + new Date().getUTCDate().toString();
            }


            this.ExportFormats = [
                { title: 'PDF', format: 'PDF' },
                { title: 'XML', format: 'XML' },
                { title: 'CSV', format: 'CSV' },
                { title: 'IMAGE', format: 'IMAGE' },
                { title: 'MHTML', format: 'MHTML' },
                { title: 'HTML4.0', format: 'HTML4.0' },
                { title: 'EXCEL', format: 'EXCEL' },
                { title: 'WORD', format: 'WORD' }
            ];

            this.Cancel = () => { $location.path('/reports/index'); }
        }
    }
}
