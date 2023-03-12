import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import SecureService from "../services/SecureService";

const BadgeHelper = (navigate: NavigateFunction) => {
    let { badgeStore, shopStore } = RootStore;

    const GetBadges = async () => {
        let resBadges: any;

        let params = `?storeId=${shopStore.id}&page=${badgeStore.page}&size=${badgeStore.size}`;
        if (badgeStore?.searchStr) {
            params += `&name=${badgeStore?.searchStr}`;
        }

        badgeStore.isLoading = true;
        resBadges = await SecureService(navigate).GetResponse(Endpoints.Badge + params);
        badgeStore.isLoading = false;

        if (resBadges?.status === 'OK') {
            badgeStore.badges = resBadges?.data;
            badgeStore.page = resBadges?.currentPage;
            badgeStore.totalItems = resBadges?.totalItems;
        }
    }

    const CreateBadge = async () => {
        let resCreatebadgeStore: any;
        let badgeFormData = new FormData();
        badgeFormData.append('name', badgeStore?.name);
        badgeFormData.append('badgeImage', badgeStore?.image)
        badgeFormData.append('status', badgeStore?.status)
        badgeFormData.append('storeId', shopStore?.id)

        badgeStore.isLoading = true;
        resCreatebadgeStore = await SecureService(navigate).PostResponse(Endpoints.Badge, 'POST', badgeFormData, true);
        badgeStore.isLoading = false;

        if (resCreatebadgeStore?.status === 'CREATED') {
            message.success(resCreatebadgeStore?.message, 5);
            await GetBadges();
            return true;
        }else{
            return false;
        }
    }

    const UpdateBadge = async () => {
        let resUpdateBadge: any;
        let badgeFormData = new FormData();
        badgeFormData.append('id', badgeStore?.id);
        badgeFormData.append('name', badgeStore?.name);
        badgeFormData.append('badgeImage', badgeStore?.image);
        badgeFormData.append('status', badgeStore?.status);
        badgeFormData.append('storeId', shopStore?.id);
        badgeStore.isLoading = true;
        resUpdateBadge = await SecureService(navigate).PostResponse(Endpoints.Badge, 'PUT', badgeFormData, true);
        badgeStore.isLoading = false;

        if (resUpdateBadge?.status === 'OK') {
            message.success(resUpdateBadge?.message, 5);
            await GetBadges();
            return true;
        }else{
            return false;
        }
    }

    const DeleteBadge = async (badgeId: any) => {
        let resDeleteBadge: any;
        let deleteBadgeObj: any = {
            id: badgeId
        }

        badgeStore.isLoading = true;
        resDeleteBadge = await SecureService(navigate).PostResponse(Endpoints.Badge, 'DELETE', deleteBadgeObj);
        badgeStore.isLoading = false;

        if (resDeleteBadge?.status === 'OK') {
            message.success(resDeleteBadge?.message, 5);
            await GetBadges();
            return true;
        }else{
            return false;
        }
    }

    return { GetBadges, CreateBadge, UpdateBadge, DeleteBadge };
}

export default BadgeHelper;
