import { action, makeObservable, observable } from "mobx";

export default class NotificationStore {
    @observable notifications: any[] = [];
    @observable selectedNotification: any = {};
    @observable id: any = 0;
    @observable name: string = '';
    @observable status: boolean = true;
    @observable isWhatsApp: boolean = false;
    @observable isEmail: boolean = false;
    @observable isLoading: boolean = false;

    constructor() {
        makeObservable(this);
    }

    @action resetData() {
        this.notifications = [];
        this.resetPostData();
    }

    @action resetPostData() {
        this.id = 0;
        this.name = '';
        this.isWhatsApp = false;
        this.isEmail = false;
        this.status = true;
        this.isLoading = false;
        this.selectedNotification = {};
    }

    @action setNotificationValues = (id: any) => {
        const selectedNotification = this.notifications.find((notification) => notification?.id === id);

        this.id = selectedNotification?.id;
        this.name = selectedNotification?.name;
        this.isWhatsApp = selectedNotification?.isWhatsApp;
        this.isEmail = selectedNotification?.isEmail;
        this.status = selectedNotification?.status;
    }
}
