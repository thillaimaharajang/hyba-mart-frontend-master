import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import SecureService from "../services/SecureService";
import Function from "../utils/Function";

const DeliveryHelper = (navigate: NavigateFunction) => {
    let { deliveryStore, shopStore } = RootStore;

    const GetDelivery = async () => {
        let resDeliveries: any;
        let params = `?storeId=${shopStore.id}`;

        deliveryStore.isLoading = true;
        resDeliveries = await SecureService(navigate).GetResponse(Endpoints.Delivery + params);
        deliveryStore.isLoading = false;

        if (resDeliveries?.status === 'OK') {
            deliveryStore.delivery = resDeliveries?.data;
            deliveryStore.setDeliveryValues();
        }
    }

    const CreateDelivery = async () => {
        let resCreateDelivery: any;
        let deliveryCreateObj = {
            'storeId': shopStore?.id,
            'countryId': shopStore?.selectedCountryId,
            'baseDistance': deliveryStore?.baseDistance,
            'chargesAmount': deliveryStore?.chargesAmount,
            'freeOrderLimit': deliveryStore?.freeOrderLimit,
            'shippingNotes': Function.convertEditorStateToHtml(deliveryStore?.shippingNotes),
            'status': deliveryStore?.status
        }

        deliveryStore.isLoading = true;
        resCreateDelivery = await SecureService(navigate).PostResponse(Endpoints.Delivery, 'POST', deliveryCreateObj);
        deliveryStore.isLoading = false;

        if (resCreateDelivery?.status === 'CREATED') {
            message.success(resCreateDelivery?.message, 5);
        }
    }

    const UpdateDelivery = async () => {
        let resUpdateDelivery: any;
        let deliveryUpdateObj = {
            'id': deliveryStore?.id,
            'countryId': shopStore?.selectedCountryId,
            'baseDistance': deliveryStore?.baseDistance,
            'chargesAmount': deliveryStore?.chargesAmount,
            'freeOrderLimit': deliveryStore?.freeOrderLimit,
            'shippingNotes': Function.convertEditorStateToHtml(deliveryStore?.shippingNotes),
            'status': deliveryStore?.status
        }

        deliveryStore.isLoading = true;
        resUpdateDelivery = await SecureService(navigate).PostResponse(Endpoints.Delivery, 'PUT', deliveryUpdateObj);
        deliveryStore.isLoading = false;

        if (resUpdateDelivery?.status === 'OK') {
            message.success(resUpdateDelivery?.message, 5);
        }
    }

    const DeleteDelivery = async (deliveryId: any) => {
        let resDeleteDelivery: any;
        let deleteDeliveryObj: any = {
            id: deliveryId
        }

        deliveryStore.isLoading = true;
        resDeleteDelivery = await SecureService(navigate).PostResponse(Endpoints.Delivery, 'DELETE', deleteDeliveryObj);
        deliveryStore.isLoading = false;

        if (resDeleteDelivery?.status === 'OK') {
            message.success(resDeleteDelivery?.message, 5);
            await GetDelivery();
        }
    }

    return { GetDelivery, CreateDelivery, UpdateDelivery, DeleteDelivery };
}

export default DeliveryHelper;
