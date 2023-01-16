import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import SecureService from "../services/SecureService";

const DomainHelper = (navigate: NavigateFunction) => {
    let { domainStore, shopStore } = RootStore;

    const GetDomain = async () => {
        let resDomain: any;

        let params = `?storeId=${shopStore.id}`;

        domainStore.isLoading = true;
        resDomain = await SecureService(navigate).GetResponse(Endpoints.Domain + params);
        domainStore.isLoading = false;

        if (resDomain?.status === 'OK') {
            domainStore.domain = resDomain?.data;
            if (domainStore?.domain?.id) {
                domainStore.setDomainValues();
            }
        }
    }

    const CreateDomain = async () => {
        let resCreateDomain: any;
        const domainPostObj = {
            "storeId": shopStore.id,
            "url": domainStore.url,
            "isDefault": domainStore.domainType === 1 ? true : false
        }

        domainStore.isLoading = true;
        resCreateDomain = await SecureService(navigate).PostResponse(Endpoints.Domain, 'POST', domainPostObj);
        domainStore.isLoading = false;

        if (resCreateDomain?.status === 'CREATED') {
            message.success(resCreateDomain?.message, 5);
        }
    }

    const UpdateDomain = async () => {
        let resCreateDomain: any;
        const domainPostObj = {
            "id": domainStore.id,
            "url": domainStore.url,
            "isDefault": domainStore.domainType === 1 ? true : false
        }

        domainStore.isLoading = true;
        resCreateDomain = await SecureService(navigate).PostResponse(Endpoints.Domain, 'PUT', domainPostObj);
        domainStore.isLoading = false;

        if (resCreateDomain?.status === 'OK') {
            message.success(resCreateDomain?.message, 5);
        }
    }

    return { GetDomain, CreateDomain, UpdateDomain };
}

export default DomainHelper;
