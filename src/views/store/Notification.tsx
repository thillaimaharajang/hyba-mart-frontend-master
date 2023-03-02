import { Checkbox, Switch } from "antd";
import { useEffect } from "react";
import { Loader } from "../../components";
import CustomTable from "../../components/CustomTable";
import PageTransition from "../../components/PageTransition";
import SubHeader from "../../components/SubHeader";
import { ITableColumn } from "../../interface/IComponent";
import RootStore from "../../mobx-store/RootStore";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import NotificationHelper from "../../helpers/NotificationHelper";

const Notification: React.FC = () => {
    const { notificationStore } = RootStore;
    const navigate = useNavigate();
    const columns: ITableColumn[] = [
        {
            key: "",
            title: "#",
            width: '6%'
        },
        {
            key: "name",
            title: "Name",
            width: '54%',
            isTrim: true
        },
        {
            key: "isWhatsApp",
            idKey: 'id',
            title: "Whats app",
            width: '15%',
            align: 'center',
            render: (isWhatsApp: any, id: any) => (
                <div className='d-flex align-items-center justify-content-center'>
                    <Checkbox name="isWhatsApp" checked={isWhatsApp ? true : false}
                        onChange={(e) => onToggleCheckbox(e, id, "isWhatsApp")} />
                </div>
            )
        },
        {
            key: "isEmail",
            idKey: 'id',
            title: "Email",
            width: '15%',
            align: 'center',
            render: (isEmail: any, id: any) => (
                <div className='d-flex align-items-center justify-content-center'>
                    <Checkbox name="isEmail" checked={isEmail ? true : false}
                        onChange={(e) => onToggleCheckbox(e, id, "isEmail")} />
                </div>
            )
        },
        {
            key: "status",
            idKey: 'id',
            title: "Status",
            width: '10%',
            align: 'center',
            render: (status: any, id: any) => (
                <div className='d-flex align-items-center justify-content-center py-2'>
                    <Switch className={`ms-1 ${status ? 'custom-switch-active' : 'custom-switch'}`}
                        checked={status ? true : false} onChange={(checked) => onToggleSwitch(checked, id)} />
                </div>
            )
        },
    ];

    useEffect(() => {
        getNotifications();
    }, []);

    const getNotifications = async () => {
        await NotificationHelper(navigate).GetNotification();
    }

    const onToggleCheckbox = async (e: CheckboxChangeEvent, id: any, name: any) => {
        notificationStore.setNotificationValues(id);
        if (name === 'isWhatsApp') {
            notificationStore.isWhatsApp = e?.target?.checked;
        } else if (name === 'isEmail') {
            notificationStore.isEmail = e?.target?.checked;
        }
        await NotificationHelper(navigate).UpdateNotification();
    }

    const onToggleSwitch = async (checked: boolean, id: any) => {
        notificationStore.setNotificationValues(id);
        notificationStore.status = checked;
        await NotificationHelper(navigate).UpdateNotification();
    }

    return <PageTransition>
        <div>
            <SubHeader
                title="Notification:"
                subTitle="Configure notifications sent to your customers based on the activity. You will need credits in your account to trigger the notification."
            />
            <CustomTable columns={columns} datas={notificationStore?.notifications}
                isLoading={notificationStore?.isLoading} />
            <Loader visibility={notificationStore?.isLoading} />
        </div>
    </PageTransition>
}

export default observer(Notification);
