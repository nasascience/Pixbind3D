interface AjaxAppender {
    setOptions(options: any): AjaxAppender
}

interface JSNLog {
    (loggerName?: string): Logger
    createAjaxAppender(appenderName: string): AjaxAppender
    getAllLevel(): number
    getDebugLevel(): number
    getErrorLevel(): number
    getFatalLevel(): number
    getInfoLevel(): number
    getTraceLevel(): number
    getWarnLevel(): number
    setOptions(options: any): void
}

interface Logger {
    info(message: string): void
    debug(logObject: any): Logger
    error(logObject: any): Logger
    fatal(logObject: any): Logger
    info(logObject: any): Logger
    log(level: number, logObject: any): Logger
    setOptions(options: any): Logger
    trace(logObject: any): Logger
    warn(logObject: any): Logger
}

declare var JL : JSNLog;
