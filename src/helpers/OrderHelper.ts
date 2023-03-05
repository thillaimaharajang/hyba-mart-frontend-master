import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import SecureService from "../services/SecureService";

const OrderHelper = (navigate: NavigateFunction) => {
    let { shippingStore, shopStore } = RootStore;

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

 

    return {  CreateOrder };
}

export default OrderHelper;
