/// <reference path="../../references.ts" />
var Controllers;
(function (Controllers) {
    var ReportViewerCtrl = (function () {
        function ReportViewerCtrl($scope, $location, $http, $routeParams) {
            var _this = this;
            $scope['ReportViewerCtrl'] = this;
            this.ReportId = $routeParams['id'];
            this.ReportName = null;
            this.ReportDescription = '';
            this.ReportParameters = null;
            this.ExportFormat = 'PDF';
            this.SelectedParameterValue = null;
            this.ReportExecutionParameters = null;
            this.ReportExecutionBaseUrl = 'Reports/Viewer?executionParameters=';
            $http.get('api/users/GetCurrentUserId').success(function (data) {
                _this.CurrentUserId = data;
            });
            $http.get('api/reports/GetReportInfoById?id=' + encodeURIComponent(this.ReportId)).success(function (data) {
                _this.ReportDescription = data.Description;
                _this.ReportPath = data.ReportPath;
                _this.ReportName = data.ReportName;
                $http.get('api/reports/GetReportParameters?reportPath=' + encodeURIComponent(_this.ReportPath)).success(function (d) {
                    _this.ReportParameters = d == 'null' ? null : d;
                    var autoExecute = true;
                    if (_this.ReportParameters != null && _this.ReportParameters.length > 0) {
                        for (var i = 0; i < _this.ReportParameters.length; i++) {
                            if (_this.ReportParameters[i].HasPredefinedValues)
                                _this.ReportParameters[i].Value = _this.ReportParameters[0].ValidValues[0];
                            if (!_this.ReportParameters[i].IsHidden) {
                                autoExecute = false;
                            }
                        }
                    }
                    if (autoExecute) {
                        _this.Execute();
                    }
                });
            });
            this.ExecuteBtnVisible = function () {
                var visible = false;
                if (_this.ReportParameters != null && _this.ReportParameters.length > 0) {
                    for (var i = 0; i < _this.ReportParameters.length; i++) {
                        if (!_this.ReportParameters[i].IsHidden) {
                            visible = true;
                        }
                    }
                }
                return visible;
            };
            this.Execute = function () {
                _this.ReportExecutionParameters = {};
                _this.ReportExecutionParameters.Path = _this.ReportPath;
                if (_this.ReportParameters != null && _this.ReportParameters.length > 0) {
                    _this.ReportExecutionParameters.Parameters = [];
                    for (var i = 0; i < _this.ReportParameters.length; i++) {
                        if (_this.ReportParameters[i].Value != null && _this.ReportParameters[i].Value.Value != null) {
                            _this.ReportExecutionParameters.Parameters.push({
                                Name: _this.ReportParameters[i].Name,
                                Value: _this.ReportParameters[i].Value.Value
                            });
                        }
                        if (_this.ReportParameters[i].IsHidden && _this.ReportParameters[i].Name == 'UserId') {
                            _this.ReportExecutionParameters.Parameters.push({
                                Name: _this.ReportParameters[i].Name,
                                Value: _this.CurrentUserId
                            });
                        }
                    }
                }
                _this.ReportExecutionUrl = _this.ReportExecutionBaseUrl + encodeURIComponent(JSON.stringify(_this.ReportExecutionParameters)) + '&timeStamp=' + new Date().getUTCDate().toString();
            };
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
            this.Cancel = function () { $location.path('/reports/index'); };
        }
        ReportViewerCtrl.$inject = ['$scope', '$location', '$http', '$routeParams'];
        return ReportViewerCtrl;
    })();
    Controllers.ReportViewerCtrl = ReportViewerCtrl;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=ReportViewerCtrl.js.map