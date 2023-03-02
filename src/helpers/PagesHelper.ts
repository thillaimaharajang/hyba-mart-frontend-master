import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import SecureService from "../services/SecureService";
import Function from "../utils/Function";

const PagesHelper = (navigate: NavigateFunction) => {
    let { pagesStore, shopStore } = RootStore;

    const GetPagess = async () => {
        let resPages: any;
        let params = `?storeId=${shopStore.id}&page=${pagesStore.page}&size=${pagesStore.size}`;
        if (pagesStore?.searchStr) {
            params += `&name=${pagesStore?.searchStr}`;
        }

        pagesStore.isLoading = true;
        resPages = await SecureService(navigate).GetResponse(Endpoints.Pages + params);
        pagesStore.isLoading = false;

        if (resPages?.status === 'OK') {
            pagesStore.pages = resPages?.data;
            pagesStore.page = resPages?.currentPage;
            pagesStore.totalItems = resPages?.totalItems;
        }
    }

    const CreatePage = async () => {
        let resCreatePage: any;
        let pageFormData: any = new FormData();
        pageFormData.append('storeId', shopStore?.id);
        pageFormData.append('name', pagesStore?.name);
        pageFormData.append('slug', pagesStore?.slug);
        pageFormData.append('cover', pagesStore?.cover);
        pageFormData.append('description', Function.convertEditorStateToHtml(pagesStore?.description));
        pageFormData.append('status', pagesStore?.status);

        pagesStore.isLoading = true;
        resCreatePage = await SecureService(navigate).PostResponse(Endpoints.Pages, 'POST', pageFormData, true);
        pagesStore.isLoading = false;

        if (resCreatePage?.status === 'CREATED') {
            message.success(resCreatePage?.message, 5);
        }
    }

    const UpdatePage = async () => {
        let resUpdatePage: any;
        let pageFormData: any = new FormData();
        pageFormData.append('id', pagesStore?.id);
        pageFormData.append('name', pagesStore?.name);
        pageFormData.append('slug', pagesStore?.slug);
        pageFormData.append('cover', pagesStore?.cover);
        pageFormData.append('description', Function.convertEditorStateToHtml(pagesStore?.description));
        pageFormData.append('status', pagesStore?.status);

        pagesStore.isLoading = true;
        resUpdatePage = await SecureService(navigate).PostResponse(Endpoints.Pages, 'PUT', pageFormData, true);
        pagesStore.isLoading = false;

        if (resUpdatePage?.status === 'OK') {
            message.success(resUpdatePage?.message, 5);
        }
    }

    const DeletePage = async (pageId: any) => {
        let resDeletePage: any;
        let deletePageObj: any = {
            id: pageId
        }

        pagesStore.isLoading = true;
        resDeletePage = await SecureService(navigate).PostResponse(Endpoints.Pages, 'DELETE', deletePageObj);
        pagesStore.isLoading = false;

        if (resDeletePage?.status === 'OK') {
            message.success(resDeletePage?.message, 5);
            await GetPagess();
        }
    }

    return { GetPagess, CreatePage, UpdatePage, DeletePage };
}

export default PagesHelper;
