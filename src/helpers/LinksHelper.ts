import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import SecureService from "../services/SecureService";

const LinksHelper = (navigate: NavigateFunction) => {
    let { linksStore, shopStore } = RootStore;

    const GetLinks = async () => {
        let resLinks: any;
        let params = `?storeId=${shopStore.id}`;

        linksStore.isLoading = true;
        resLinks = await SecureService(navigate).GetResponse(Endpoints.Links + params);
        linksStore.isLoading = false;

        if (resLinks?.status === 'OK') {
            linksStore.links = resLinks?.data;
        }
    }

    const CreateLink = async () => {
        let resCreateLink: any;
        const linkPostObj = {
            "storeId": shopStore.id,
            "title": linksStore.title,
            "url": linksStore.url,
            "description": linksStore.description
        }

        linksStore.isLoading = true;
        resCreateLink = await SecureService(navigate).PostResponse(Endpoints.Links, 'POST', linkPostObj);
        linksStore.isLoading = false;

        if (resCreateLink?.status === 'CREATED') {
            message.success(resCreateLink?.message, 5);
            await GetLinks();
        }
    }

    const UpdateLink = async () => {
        let resUpdateLink: any;
        const linkPostObj = {
            "id": linksStore.id,
            "title": linksStore.title,
            "url": linksStore.url,
            "description": linksStore.description
        }

        linksStore.isLoading = true;
        resUpdateLink = await SecureService(navigate).PostResponse(Endpoints.Links, 'PUT', linkPostObj);
        linksStore.isLoading = false;

        if (resUpdateLink?.status === 'OK') {
            message.success(resUpdateLink?.message, 5);
            await GetLinks();
        }
    }

    const DeleteLink = async (linkId: any) => {
        let resDeleteLink: any;
        let deleteLinkObj: any = {
            id: linkId
        }

        linksStore.isLoading = true;
        resDeleteLink = await SecureService(navigate).PostResponse(Endpoints.Links, 'DELETE', deleteLinkObj);
        linksStore.isLoading = false;

        if (resDeleteLink?.status === 'OK') {
            message.success(resDeleteLink?.message, 5);
            await GetLinks();
        }
    }

    return { GetLinks, CreateLink, UpdateLink, DeleteLink };
}

export default LinksHelper;
