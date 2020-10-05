/// <reference path="../references.ts" />
var Dialogs;
(function (Dialogs) {
    function showMessage(options) {
        var dlg = null;
        var def = $.Deferred();
        options = $.extend({
            winId: "bbwtMessageDlg",
            width: "430px",
            minHeight: "150px",
            actions: ["Close"],
            modal: true,
            visible: false,
            title: "Message",
            draggable: false,
            message: ""
        }, options);
        if ($(options.winId).length > 0) {
            $(options.winId).parent().remove();
        }
        var src = kendo.format("<div id='{1}' class='modal-dialog'>" +
            "<div class='modal-content'>" +
            "<div class='modal-body'>{0}</div><div class='modal-footer'>" +
            "<button type='button' class='k-button'>OK</button></div></div></div>", options.message, options.winId);
        dlg = $(src).kendoWindow(options);
        dlg.data("kendoWindow").center().open();
        dlg.find('.k-button').click(function () {
            dlg.data("kendoWindow").close();
            def.resolve({ button: "OK" });
        });
        dlg.parent().addClass(options.winId);
        return def.promise();
    }
    Dialogs.showMessage = showMessage;
    // windows-notifications
    var windowNotificationOptions = {
        button: true,
        position: {
            top: 1,
        },
        stacking: "down",
        hideOnClick: false,
        autoHideAfter: 3000,
        allowHideAfter: 1000,
        animation: false,
        templates: [
            {
                type: "info",
                template: '<div class="k-notify-window"><div class="k-notify-window-title-info">#= title #</div><div class="k-notify-window-content">#= message #</div></div>'
            },
            {
                type: "success",
                template: '<div class="k-notify-window"><div class="k-notify-window-title-success">#= title #</div><div class="k-notify-window-content">#= message #</div></div>'
            }
        ],
        show: (function (e) {
            e.element.css({ top: '-' + e.element.height().toString() + 'px', position: 'relative' });
            e.element.animate({ top: "+=" + e.element.height().toString() + "px" }, 400);
        }),
        hide: (function (e) {
            //e.element.animate({ top: "-=" + e.element.height().toString() + "px" }, 400);
        })
    };
    var appWindowNotification = null;
    function showNotifyMessage(options, title, type) {
        if (appWindowNotification != null)
            appWindowNotification.hide();
        //windowNotificationOptions.autoHideAfter = options.autoHideAfter;
        appWindowNotification = $("<span style=\"display: none;\"></span>").kendoNotification(windowNotificationOptions).data("kendoNotification");
        $("#wrap").add(appWindowNotification.element.context);
        appWindowNotification.show({ title: title, message: options.message }, type);
    }
    Dialogs.showNotifyMessage = showNotifyMessage;
    function showError(options) {
        JL().error(options.message);
        //showNotifyMessage(options, "Error", "error");        
        return showMessage($.extend({ title: 'Error', winId: "bbwtErrorDlg" }, options));
    }
    Dialogs.showError = showError;
    function showSuccess(options) {
        JL().info(options.message);
        showNotifyMessage(options, "Success", "success");
    }
    Dialogs.showSuccess = showSuccess;
    function showInfo(options) {
        showNotifyMessage(options, "Information", "info");
    }
    Dialogs.showInfo = showInfo;
    function showInfoDialog(options) {
        return showMessage($.extend({ title: 'Info', winId: "bbwtInfoDlg" }, options));
    }
    Dialogs.showInfoDialog = showInfoDialog;
    function showWarning(options) {
        JL().warn(options.message);
        //showNotifyMessage(options, "Warning", "warning");        
        return showMessage($.extend({ title: 'Warning', winId: "bbwtWarnDlg" }, options));
    }
    Dialogs.showWarning = showWarning;
    function showHelper(options) {
        JL().info(options.message);
        return showMessage($.extend({ title: 'Helper', winId: "bbwtHelperDlg" }, options));
    }
    Dialogs.showHelper = showHelper;
    function showWaiting(options) {
        JL().info(options.message);
        options.message = "<img src='/Content/kendo/bootstrap/loading_2x.gif' />";
        return showMessage($.extend({ title: 'Waiting', winId: "bbwtWaitingDlg" }, options));
    }
    Dialogs.showWaiting = showWaiting;
    function showConfirmation(options) {
        var dlg = null;
        var def = $.Deferred();
        options = $.extend({
            winId: "bbwtConfirmationDlg",
            width: "430px",
            minHeight: "150px",
            actions: ["Close"],
            modal: true,
            visible: false,
            title: "Confirmation",
            draggable: false,
            message: ""
        }, options);
        if ($(options.winId).length > 0) {
            $(options.winId).parent().remove();
        }
        var src = kendo.format("<div id='{1}' class='modal-dialog'><div class='modal-content'>" +
            "<div class='modal-body'>{0}</div><div class='modal-footer'>" +
            "<button type='button' class='k-button button-ok'>Ok</button>&nbsp;&nbsp;" +
            "<button type='button' class='k-button button-cancel'>Cancel</button></div></div></div>", options.message, options.winId);
        dlg = $(src).kendoWindow(options);
        dlg.data("kendoWindow").center().open();
        dlg.find('.button-ok').click(function () {
            dlg.data("kendoWindow").close();
            def.resolve({ button: "OK" });
        });
        dlg.find('.button-cancel').click(function () {
            dlg.data("kendoWindow").close();
            def.reject({ button: "CANCEL" });
        });
        dlg.parent().addClass(options.winId);
        return def.promise();
    }
    Dialogs.showConfirmation = showConfirmation;
    function showCustom(options) {
        var dlg = null;
        var def = $.Deferred();
        options = $.extend({
            winId: "bbwtCustomDlg",
            width: "500px",
            actions: ["Close"],
            modal: true,
            visible: false,
            title: "Dialog Box",
            draggable: false,
            message: ""
        }, options);
        if ($(options.winId).length > 0) {
            $(options.winId).parent().remove();
        }
        dlg = $('#' + options.winId).kendoWindow(options);
        dlg.data("kendoWindow").center().open();
        dlg.find('.btn-ok').click(function () {
            dlg.data("kendoWindow").close();
            def.resolve({ button: "OK" });
        });
        dlg.find('.k-window-actions').click(function () {
            dlg.data("kendoWindow").close();
            def.reject({ button: "CANCEL" });
        });
        $(document).on('click', '#closedlg', function () {
            dlg.data("kendoWindow").close();
            def.reject({ button: "CANCEL" });
        });
        dlg.find('.btn-cancel').click(function () {
            dlg.data("kendoWindow").close();
            def.reject({ button: "CANCEL" });
        });
        $('#' + options.winId).keydown(function (e) {
            if (e.keyCode === 27) {
                dlg.data("kendoWindow").close();
            } // esc
        });
        dlg.parent().addClass(options.winId);
        return def.promise();
    }
    Dialogs.showCustom = showCustom;
})(Dialogs || (Dialogs = {}));
//# sourceMappingURL=dialogs.js.map