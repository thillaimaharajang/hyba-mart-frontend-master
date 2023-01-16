import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import SecureService from "../services/SecureService";
import Function from "../utils/Function";

const BannerHelper = (navigate: NavigateFunction) => {
    let { bannerStore, shopStore } = RootStore;

    const GetBanner = async () => {
        let resBannerDetails: any;
        let params = `?storeId=${shopStore.id}`;

        bannerStore.isLoading = true;
        resBannerDetails = await SecureService(navigate).GetResponse(Endpoints.Banner + params);
        bannerStore.isLoading = false;

        if (resBannerDetails?.status === 'OK' && !Function.isEmptyObject(resBannerDetails?.data)) {
            bannerStore.setBannerValues(resBannerDetails?.data);
        }
    }

    const CreateBanner = async () => {
        let resCreateBanner: any;
        let bannerFormData: any = new FormData();
        bannerFormData.append('storeId', shopStore?.id);
        bannerFormData.append('bannerImage1', bannerStore?.bannerImage1);
        bannerFormData.append('bannerImage2', bannerStore?.bannerImage2);
        bannerFormData.append('bannerImage3', bannerStore?.bannerImage3);

        bannerStore.isLoading = true;
        resCreateBanner = await SecureService(navigate).PostResponse(Endpoints.Banner, 'POST', bannerFormData, true);
        bannerStore.isLoading = false;

        if (resCreateBanner?.status === 'CREATED') {
            message.success(resCreateBanner?.message, 5);
            await GetBanner();
        }
    }

    const UpdateBanner = async () => {
        let resCreateBanner: any;
        let bannerFormData: any = new FormData();
        bannerFormData.append('id', bannerStore?.id);
        bannerFormData.append('storeId', shopStore?.id);
        bannerFormData.append('bannerImage1', bannerStore?.bannerImage1);
        bannerFormData.append('bannerImage2', bannerStore?.bannerImage2);
        bannerFormData.append('bannerImage3', bannerStore?.bannerImage3);

        bannerStore.isLoading = true;
        resCreateBanner = await SecureService(navigate).PostResponse(Endpoints.Banner, 'PUT', bannerFormData, true);
        bannerStore.isLoading = false;

        if (resCreateBanner?.status === 'OK') {
            message.success(resCreateBanner?.message, 5);
            await GetBanner();
        }
    }

    return { GetBanner, CreateBanner, UpdateBanner };
}

export default BannerHelper;
