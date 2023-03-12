import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import SecureService from "../services/SecureService";

const OrderHelper = (navigate: NavigateFunction) => {
    let { shippingStore, shopStore , orderStore} = RootStore;

    const GetOrder = async () => {
        let params = `?storeId=${shopStore.storeDetails.id}&page=${orderStore.page}&size=${orderStore.size}`;

        if (orderStore?.searchStr) {
            params += `&name=${orderStore?.searchStr}`;
        }
        let resOrders: any;

        orderStore.isLoading = true;

        resOrders = await SecureService(navigate).GetResponse(Endpoints.Order + params);
        orderStore.isLoading = false;

        if (resOrders?.status === 'OK') {
            orderStore.orders = resOrders?.data;
            orderStore.page = 0;
            orderStore.totalItems = resOrders?.totalItems;
            
        }
    }

    const CreateOrder = async (Obj:any) => {
        let resCreateOrder: any;
        

        orderStore.isLoading = true;
        resCreateOrder = await SecureService(navigate).PostResponse(Endpoints.Order, 'POST', Obj);
        orderStore.isLoading = false;

        if (resCreateOrder?.status === 'CREATED') {
            message.success(resCreateOrder?.message, 5);
            return resCreateOrder;
        }else{
            return null;
        }
    }

 

    return { GetOrder, CreateOrder };
}

export default OrderHelper;
