/// <reference path="../references.ts" />
module Dialogs {
    export function showMessage(options: any): JQueryPromise<any> {
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
        dlg.find('.k-button').click(() => {
            dlg.data("kendoWindow").close();
            def.resolve({ button: "OK" });
        });
     
        dlg.parent().addClass(options.winId);
        return def.promise();
    }

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
        show: ((e) => {            
            e.element.css({ top: '-' + e.element.height().toString() + 'px', position: 'relative'});
            e.element.animate({ top: "+=" + e.element.height().toString() + "px" }, 400);
        }),
        hide: ((e) => {            
            //e.element.animate({ top: "-=" + e.element.height().toString() + "px" }, 400);
        })
};

    var appWindowNotification = null;

    export function showNotifyMessage(options: any, title: string, type: string) {                  
    
        if (appWindowNotification != null)
            appWindowNotification.hide();
            
        //windowNotificationOptions.autoHideAfter = options.autoHideAfter;
        appWindowNotification = $("<span style=\"display: none;\"></span>").kendoNotification(windowNotificationOptions).data("kendoNotification");
        $("#wrap").add(appWindowNotification.element.context);
        
        appWindowNotification.show({ title: title, message: options.message }, type);
    }    
   
    export function showError(options: any): JQueryPromise<any> {
        JL().error(options.message);        
        //showNotifyMessage(options, "Error", "error");        
        return showMessage($.extend({ title: 'Error', winId: "bbwtErrorDlg" }, options));
    }

    export function showSuccess(options: any) {
        JL().info(options.message);        
        showNotifyMessage(options, "Success", "success");        
    }

    export function showInfo(options: any) {                        
        showNotifyMessage(options, "Information", "info");        
    }

    export function showInfoDialog(options: any) : JQueryPromise<any> {
        return showMessage($.extend({ title: 'Info', winId: "bbwtInfoDlg" }, options));
    }

    export function showWarning(options: any) : JQueryPromise<any> {
        JL().warn(options.message);     
        //showNotifyMessage(options, "Warning", "warning");        
        return showMessage($.extend({ title: 'Warning', winId: "bbwtWarnDlg" }, options));
    }

    export function showHelper(options: any): JQueryPromise<any> {
        JL().info(options.message);
        return showMessage($.extend({ title: 'Helper', winId: "bbwtHelperDlg" }, options));
    }

    export function showWaiting(options: any): JQueryPromise<any> {
        JL().info(options.message);
        options.message = "<img src='/Content/kendo/bootstrap/loading_2x.gif' />";
        return showMessage($.extend({ title: 'Waiting', winId: "bbwtWaitingDlg" }, options));
    }

    export function showConfirmation(options: any): JQueryPromise<any> {
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
            "<button type='button' class='k-button button-cancel'>Cancel</button></div></div></div>",
            options.message, options.winId);

        dlg = $(src).kendoWindow(options);
        dlg.data("kendoWindow").center().open();
        dlg.find('.button-ok').click(() => {
            dlg.data("kendoWindow").close();
            def.resolve({ button: "OK" });
        });

        dlg.find('.button-cancel').click(() => {
            dlg.data("kendoWindow").close();
            def.reject({ button: "CANCEL" });
        });
      
        dlg.parent().addClass(options.winId);
        return def.promise();
    }

    export function showCustom(options: any): JQueryPromise<any> {
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
        dlg.find('.btn-ok').click(() => {
            dlg.data("kendoWindow").close();
            def.resolve({ button: "OK" });
        });

        dlg.find('.k-window-actions').click(() => {
            dlg.data("kendoWindow").close();
            def.reject({ button: "CANCEL" });
        });

        $(document).on('click', '#closedlg', function () {
            dlg.data("kendoWindow").close();
            def.reject({ button: "CANCEL" });
        });


        dlg.find('.btn-cancel').click(() => {
            dlg.data("kendoWindow").close();
            def.reject({ button: "CANCEL" });
        });
             
        $('#' + options.winId).keydown(e => {          
            if (e.keyCode === 27) {
                dlg.data("kendoWindow").close();
            }   // esc
        });                

        dlg.parent().addClass(options.winId);
        return def.promise();
    }

    /*
    // Notifications
    var appNotification = $("<span style=\"display: none;\"></span>").kendoNotification({
        button: true,
        position: {
            //pinned: true,
            top: 30,
            right: 30
        },
        //autoHideAfter: 0,
        stacking: "down",
        templates: [
            {
                type: "info",
                template: '<div class="new-mail"><img src ="../content/kendo/notification/envelope.png" /><h3>#= title #</h3><p>#= message #</p></div>'
            }, {
                type: "error",
                template: '<div class="wrong-pass"><img src ="../content/kendo/notification/error-icon.png" /><h3>#= title #</h3><p>#= message #</p></div>'
            }, {
                type: "warning",
                template: '<div class="wrong-pass"><img src ="../content/kendo/notification/warning-icon.png" /><h3>#= title #</h3><p>#= message #</p></div>'
            }, {
                type: "success",
                template: '<div class="success"><img src ="../content/kendo/notification/success-icon.png" />#= message #</div>'
            }]
    }).data("kendoNotification");
    $("#wrap").add(appNotification.element.context);

    export function showInfoNotification(options: any) {
        appNotification.show({ title: options.title, message: options.message }, 'info');
    }

    export function showSuccessNotification(options: any) {
        appNotification.show({ title: options.title, message: options.message }, 'success');
    }

    export function showWarningNotification(options: any) {
        appNotification.show({ title: options.title, message: options.message }, 'warning');
    }

    export function showErrorNotification(options: any) {
        appNotification.show({ title: options.title, message: options.message }, 'error');
    }

    export function hideAllNotifications() {
        appNotification.hide();
    }
    */
}