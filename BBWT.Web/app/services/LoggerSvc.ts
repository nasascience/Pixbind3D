/// <reference path="../references.ts" />
module Services {
    export class LoggerSvc {
        add: (exception, cause) => void;
        get: () => Array<string>;

        constructor() {
            var errorLogs = [];
            this.add = (exception, cause) => {
                if (errorLogs.indexOf(exception.stack) === -1) {
                    errorLogs.push(exception.stack);
                    JL().error(exception);
                }
            };
            this.get = () => errorLogs;
        }
    }
}

angular.module('Services', [])
    .factory('LoggerSvc',
    [() => new Services.LoggerSvc()]);