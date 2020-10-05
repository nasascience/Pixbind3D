// Type definitions for Kendo Notification UI

declare module kendo {
}

declare module kendo.ui {
    class Notification extends kendo.ui.Widget {
        static fn: Notification;
        static extend(proto: Object): Notification;

        element: JQuery;
        wrapper: JQuery;
        constructor(element: Element, options?: NotificationOptions);
        options: NotificationOptions;

        show(content: any, type: string): void;
        info(content: any): void;
        success(content: any): void;
        warning(content: any): void;
        error(content: any): void;
        hide(): void;
        getNotifications(): any;
        setOptions(newOptions: NotificationOptions): void;
    }

    interface NotificationOptions {
        name?: string;
        position?: NotificationPosition;
        stacking?: string;
        hideOnClick?: boolean;
        button?: boolean;
        allowHideAfter?: number;
        autoHideAfter?: number;
        appendTo?: any;
        width?: number;
        height?: number;
        templates?: any;
        animation?: any;
        show? (e: NotificationShowEvent): void;
        hide? (e: NotificationHideEvent): void;
    }

    interface NotificationPosition {
        pinned?: boolean;
        top?: number;
        left?: number;
        bottom?: number;
        right?: number;
    }

    interface NotificationEvent {
        sender: Notification;
        isDefaultPrevented(): boolean;
        preventDefault: Function;
    }

    interface NotificationShowEvent extends NotificationEvent {
    }

    interface NotificationHideEvent extends NotificationEvent {
    }
}

interface JQuery {
    kendoNotification(): JQuery;
    kendoNotification(options: kendo.ui.NotificationOptions): JQuery;
    data(key: "kendoNotification"): kendo.ui.Notification;
}