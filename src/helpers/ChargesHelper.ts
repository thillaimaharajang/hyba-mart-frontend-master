import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import SecureService from "../services/SecureService";

const ChargesHelper = (navigate: NavigateFunction) => {
    let { chargesStore, shopStore } = RootStore;

    const GetCharges = async () => {
        let resCharges: any;
        let params = `?storeId=${shopStore.id}&page=${chargesStore.page}&size=${chargesStore.size}`;
        if (chargesStore?.searchStr) {
            params += `&name=${chargesStore?.searchStr}`;
        }

        chargesStore.isLoading = true;
        resCharges = await SecureService(navigate).GetResponse(Endpoints.Charges + params);
        chargesStore.isLoading = false;

        if (resCharges?.status === 'OK') {
            chargesStore.charges = resCharges?.data;
            chargesStore.page = resCharges?.currentPage;
            chargesStore.totalItems = resCharges?.totalItems;
        }
    }

    const CreateCharges = async () => {
        let resCreateCharges: any;
        let chargesCreateObj = {
            'storeId': shopStore?.id,
            'name': chargesStore?.name,
            'amount': chargesStore?.amount,
            'isPercentage': chargesStore?.isPercentage,
        }

        chargesStore.isLoading = true;
        resCreateCharges = await SecureService(navigate).PostResponse(Endpoints.Charges, 'POST', chargesCreateObj);
        chargesStore.isLoading = false;

        if (resCreateCharges?.status === 'CREATED') {
            message.success(resCreateCharges?.message, 5);
        }
    }

    const UpdateCharges = async () => {
        let resUpdateCharges: any;
        let chargesUpdateObj = {
            'id': chargesStore?.id,
            'name': chargesStore?.name,
            'amount': chargesStore?.amount,
            'isPercentage': chargesStore?.isPercentage
        }

        chargesStore.isLoading = true;
        resUpdateCharges = await SecureService(navigate).PostResponse(Endpoints.Charges, 'PUT', chargesUpdateObj);
        chargesStore.isLoading = false;

        if (resUpdateCharges?.status === 'OK') {
            message.success(resUpdateCharges?.message, 5);
        }
    }

    const DeleteCharges = async (chargeId: any) => {
        let resDeleteCharge: any;
        let deleteChargeObj: any = {
            id: chargeId
        }

        chargesStore.isLoading = true;
        resDeleteCharge = await SecureService(navigate).PostResponse(Endpoints.Charges, 'DELETE', deleteChargeObj);
        chargesStore.isLoading = false;

        if (resDeleteCharge?.status === 'OK') {
            message.success(resDeleteCharge?.message, 5);
            await GetCharges();
        }
    }

    return { GetCharges, CreateCharges, UpdateCharges, DeleteCharges };
}

export default ChargesHelper;
