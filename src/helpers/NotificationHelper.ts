import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import SecureService from "../services/SecureService";

const NotificationHelper = (navigate: NavigateFunction) => {
    let { notificationStore, shopStore } = RootStore;

    const GetNotification = async () => {
        let params = `?storeId=${shopStore.id}`;
        let resNotifications: any;

        notificationStore.isLoading = true;
        resNotifications = await SecureService(navigate).GetResponse(Endpoints.Notification + params);
        notificationStore.isLoading = false;

        if (resNotifications?.status === 'OK') {
            notificationStore.notifications = resNotifications?.data;
        }
    }

    const UpdateNotification = async () => {
        let resUpdateNotification: any;
        let updateNotificationObj: any = {
            id: notificationStore?.id,
            name: notificationStore?.name,
            isWhatsApp: notificationStore?.isWhatsApp,
            isEmail: notificationStore?.isEmail,
            status: notificationStore?.status
        }

        notificationStore.isLoading = true;
        resUpdateNotification = await SecureService(navigate).PostResponse(Endpoints.Notification, 'PUT', updateNotificationObj);
        notificationStore.isLoading = false;

        if (resUpdateNotification?.status === 'OK') {
            message.success(resUpdateNotification?.message, 5);
            await GetNotification();
        }
    }

    return { GetNotification, UpdateNotification };
}

export default NotificationHelper;
