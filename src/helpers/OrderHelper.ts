import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import SecureService from "../services/SecureService";

const OrderHelper = (navigate: NavigateFunction) => {
    let { shippingStore, shopStore , orderStore} = RootStore;

    const GetOrder = async () => {
        console.log(shopStore.storeDetails)
        let params = `?storeId=${shopStore.storeDetails.id}&page=${orderStore.page}&size=${orderStore.size}`;

        let resPaymentModes: any;
        if (orderStore?.searchStr) {
            params += `&name=${orderStore?.searchStr}`;
        }
        let resOrders: any;


        resOrders = await SecureService(navigate).GetResponse(Endpoints.Order + params);

        if (resOrders?.status === 'OK') {
            orderStore.orders = resOrders?.data;
            orderStore.page = 0;
            orderStore.totalItems = resOrders?.totalItems;
            
        }
    }

    const CreateOrder = async (Obj:any) => {
        let resCreateOrder: any;
        

        shippingStore.isLoading = true;
        resCreateOrder = await SecureService(navigate).PostResponse(Endpoints.Order, 'POST', Obj);
        shippingStore.isLoading = false;

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
