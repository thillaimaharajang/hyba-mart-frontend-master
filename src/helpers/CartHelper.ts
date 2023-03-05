import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import SecureService from "../services/SecureService";
import Function from "../utils/Function";
import HttpClient from "../services/HttpClient";

const CartHelper = (navigate: NavigateFunction) => {
    let { cartStore, authStore } = RootStore;

    const GetCart = async () => {
        let resProducts: any;
        // let params = `?userId=14491ada-4188-404d-bf2e-94af7f25b675`;
        // authStore.accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Nzc5MzI1NDYsImV4cCI6MTY3ODAxODk0NiwiYXVkIjoidGhpbGxhaS5tYWhhcmFqYW5AZTUuYWkiLCJpc3MiOiJoeWJhbWFydC5jb20ifQ.cPjhZ4OAVTdoBTgksJTw9UG6uhW9VxdnmUXp4OtoetY'

        let params = `?userId=${authStore.userId}`;
        cartStore.isLoading = true;
        resProducts = await SecureService(navigate).GetResponse(Endpoints.Cart + params);
        // resProducts = await HttpClient(navigate).GetResponse(Endpoints.Cart + params);

        cartStore.isLoading = false;

        if (resProducts?.status === 'OK') {
            cartStore.products = resProducts?.data;
            cartStore.page = resProducts?.currentPage;
            cartStore.totalItems = resProducts?.totalItems;
        }
    }

    const addtoCart = async (cartObj:any) => {
       console.log("cartObj",cartObj)
        let resCreateCart: any;
        let cartFormData: any = new FormData();
        cartFormData.append('storeId', cartObj?.storeId);
        cartFormData.append('productId', cartObj?.productId);
        cartFormData.append('userId', cartObj?.userId);
        cartFormData.append('quantity', cartObj?.quantity);

        let body = JSON.stringify(cartObj)
        cartStore.isLoading = true;
        resCreateCart = await SecureService(navigate).PostResponse(Endpoints.Cart, 'POST', cartFormData, true);
        cartStore.isLoading = false;

        if (resCreateCart?.status === 'CREATED') {
            message.success(resCreateCart?.message, 5);
        }
    }


    const DeleteProduct = async (productId: any) => {
        let resDeleteProduct: any;
        let deleteProductObj: any = {
            id: productId
        }

        cartStore.isLoading = true;
        resDeleteProduct = await SecureService(navigate).PostResponse(Endpoints.Product, 'DELETE', deleteProductObj);
        cartStore.isLoading = false;

        if (resDeleteProduct?.status === 'OK') {
            message.success(resDeleteProduct?.message, 5);
        }
    }

    return { addtoCart ,GetCart};
}

export default CartHelper;
