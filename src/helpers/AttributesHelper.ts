import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import SecureService from "../services/SecureService";

const AttributesHelper = (navigate: NavigateFunction) => {
    let { attributesStore, shopStore } = RootStore;

    const GetAttributes = async () => {
        let resAttributes: any;

        let params = `?storeId=${shopStore.id}&page=${attributesStore.page}&size=${attributesStore.size}`;
        if (attributesStore?.searchStr) {
            params += `&name=${attributesStore?.searchStr}`;
        }

        attributesStore.isLoading = true;
        resAttributes = await SecureService(navigate).GetResponse(Endpoints.Attributes + params);
        attributesStore.isLoading = false;

        if (resAttributes?.status === 'OK') {
            attributesStore.attributes = resAttributes?.data;
            attributesStore.page = resAttributes?.currentPage;
            attributesStore.totalItems = resAttributes?.totalItems;
        }
    }

    const CreateAttribute = async () => {
        let resCreateAttribute: any;
        let attributeCreateObj = {
            'name': attributesStore?.name,
            'storeId': shopStore?.id
        }

        attributesStore.isLoading = true;
        resCreateAttribute = await SecureService(navigate).PostResponse(Endpoints.Attributes, 'POST', attributeCreateObj);
        attributesStore.isLoading = false;

        if (resCreateAttribute?.status === 'CREATED') {
            message.success(resCreateAttribute?.message, 5);
            await GetAttributes();
        }
    }

    const UpdateAttribute = async () => {
        let resUpdateAttribute: any;
        let attributeUpdateObj = {
            'id': attributesStore?.id,
            'name': attributesStore?.name,
            'storeId': shopStore?.id
        }

        attributesStore.isLoading = true;
        resUpdateAttribute = await SecureService(navigate).PostResponse(Endpoints.Attributes, 'PUT', attributeUpdateObj);
        attributesStore.isLoading = false;

        if (resUpdateAttribute?.status === 'OK') {
            message.success(resUpdateAttribute?.message, 5);
            await GetAttributes();
        }
    }

    const DeleteAttribute = async (attributeId: any) => {
        let resDeleteAttribute: any;
        let deleteAttributeObj: any = {
            id: attributeId
        }

        attributesStore.isLoading = true;
        resDeleteAttribute = await SecureService(navigate).PostResponse(Endpoints.Attributes, 'DELETE', deleteAttributeObj);
        attributesStore.isLoading = false;

        if (resDeleteAttribute?.status === 'OK') {
            message.success(resDeleteAttribute?.message, 5);
            await GetAttributes();
        }
    }

    return { GetAttributes, CreateAttribute, UpdateAttribute, DeleteAttribute };
}

export default AttributesHelper;
