import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import SecureService from "../services/SecureService";

const PaymentModeHelper = (navigate: NavigateFunction) => {
    let { paymentStore, shopStore } = RootStore;

    const GetPaymentModes = async () => {
        let params = `?storeId=${shopStore?.storeDetails?.id}
         &page=${paymentStore.page}&size=${paymentStore.size}}`;
        let resPaymentModes: any;
        if (paymentStore?.searchStr) {
            params += `&name=${paymentStore?.searchStr}`;
        }

        paymentStore.isLoading = true;

        resPaymentModes = await SecureService(navigate).GetResponse(Endpoints.PaymentMode + params);
        paymentStore.isLoading = false;

        if (resPaymentModes?.status === 'OK') {
            paymentStore.paymentModes = resPaymentModes?.data;
            paymentStore.page = 0;
            paymentStore.totalItems = resPaymentModes?.totalItems;
            
        }
    }

    const GetPaymentModesById = async () => {
        let params = `?storeId=${shopStore.id}
         &page=${paymentStore.page}&size=${paymentStore.size}&id=${paymentStore.id}`;
        let resPaymentModes: any;
        if (paymentStore?.searchStr) {
            params += `&name=${paymentStore?.searchStr}`;
        }

        paymentStore.isLoading = true;

        resPaymentModes = await SecureService(navigate).GetResponse(Endpoints.PaymentMode + params);
        paymentStore.isLoading = false;
        if (resPaymentModes?.status === 'OK') {
            paymentStore.name=resPaymentModes?.data?.name;
            paymentStore.about=resPaymentModes?.data?.about;
            paymentStore.publishKey= resPaymentModes?.data?.publishKey;
            paymentStore.secretKey=resPaymentModes?.data?.secretKey;
            paymentStore.webHookUrl= resPaymentModes?.data?.webHookUrl;
        }
    }

    const CreatePayment = async () => {
        let resCreatePaymentMode: any;
        let createPaymentModeObj: any = {
            name: paymentStore?.name,
            isEnabled: paymentStore?.isEnabled,
            storeId: shopStore?.id
        }

        paymentStore.isLoading = true;
        resCreatePaymentMode = await SecureService(navigate).PostResponse(Endpoints.PaymentMode, 'POST', createPaymentModeObj);
        paymentStore.isLoading = false;

        if (resCreatePaymentMode?.status === 'CREATED') {
            message.success(resCreatePaymentMode?.message, 5);
            await GetPaymentModes();
        }
    }

    const UpdatePayment = async () => {
        let resUpdatePaymentMode: any;
        let updatePaymentModeObj: any = {
            id: paymentStore?.id,
            isEnabled: paymentStore?.isEnabled,
            publishKey: paymentStore?.publishKey,
            secretKey: paymentStore?.secretKey,
            webHookUrl: paymentStore?.webHookUrl
        }

        paymentStore.isLoading = true;
        resUpdatePaymentMode = await SecureService(navigate).PostResponse(Endpoints.PaymentMode, 'PUT', updatePaymentModeObj);
        paymentStore.isLoading = false;

        if (resUpdatePaymentMode?.status === 'OK') {
            message.success(resUpdatePaymentMode?.message, 5);
            await GetPaymentModes();
        }
    }

    const DeletePaymentMode = async (paymentStoreId: any) => {
        let resDeletePaymentMode: any;
        let deletePaymentModeObj: any = {
            id: paymentStoreId
        }

        paymentStore.isLoading = true;
        resDeletePaymentMode = await SecureService(navigate).PostResponse(Endpoints.PaymentMode, 'DELETE', deletePaymentModeObj);
        paymentStore.isLoading = false;

        if (resDeletePaymentMode?.status === 'OK') {
            message.success(resDeletePaymentMode?.message, 5);
            await GetPaymentModes();
        }
    }

    return { GetPaymentModes, GetPaymentModesById, CreatePayment, UpdatePayment, DeletePaymentMode };
}

export default PaymentModeHelper;
