import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import SecureService from "../services/SecureService";
import Function from "../utils/Function";

const ShopHelper = (navigate: NavigateFunction) => {
    let { shopStore, authStore } = RootStore;

    const GetCountries = async () => {
        let resCountries: any;

        shopStore.isLoading = true;
        resCountries = await SecureService(navigate).GetResponse(Endpoints.GetCountries);
        shopStore.isLoading = false;

        if (resCountries?.status === 'OK') {
            shopStore.countries = resCountries?.data;
        }
    }

    const GetCategories = async () => {
        let resCategories: any;

        shopStore.isLoading = true;
        resCategories = await SecureService(navigate).GetResponse(Endpoints.GetCategories);
        shopStore.isLoading = false;

        if (resCategories?.status === 'OK') {
            shopStore.businessCategories = resCategories?.data;
        }
    }

    const GetShopDetailsByUserId = async (isNavigateToDashboard: boolean = true) => {
        let resShopDetails: any;

        shopStore.isLoading = true;
        resShopDetails = await SecureService(navigate).GetResponse(`${Endpoints.StoreDetails}?userId=${authStore?.userId}`);
        shopStore.isLoading = false;

        if (resShopDetails) {
            if (resShopDetails?.status === 'OK') {
                shopStore.storeDetails = resShopDetails?.data;
                if (!Function.isEmptyObject(shopStore?.storeDetails)) {
                    shopStore.setStoreValues();
                }
                authStore.isValidToken = true;
                if (isNavigateToDashboard) {
                    navigate('/', { replace: true });
                }
            }
        } else {
            navigate('/login');
        }
    }

    const CreateShop = async () => {
        let resShopDetails: any;
        let shopFormData: any = new FormData();
        shopFormData.append('profileImage', shopStore?.profileImage);
        shopFormData.append('coverImage', shopStore?.coverImage);
        shopFormData.append('favImage', shopStore?.favImage);
        shopFormData.append('businessName', shopStore?.businessName);
        shopFormData.append('name', shopStore?.name);
        shopFormData.append('description', Function.convertEditorStateToHtml(shopStore?.businessDescription));
        shopFormData.append('categoryId', shopStore?.selectedCategoryId);
        shopFormData.append('address', shopStore?.address);
        shopFormData.append('countryId', shopStore?.selectedCountryId);
        shopFormData.append('userId', authStore?.userId);
        shopFormData.append('invoiceNotes', shopStore?.invoiceNotes);

        shopStore.isLoading = true;
        resShopDetails = await SecureService(navigate).PostResponse(Endpoints.StoreDetails, 'POST', shopFormData, true);
        shopStore.isLoading = false;

        if (resShopDetails?.status === 'CREATED') {
            message.success(resShopDetails?.message, 5);
        }
    }

    const UpdateShop = async () => {
        let resShopDetails: any;
        let shopFormData: any = new FormData();
        shopFormData.append('id', shopStore?.id);
        shopFormData.append('profileImage', shopStore?.profileImage);
        shopFormData.append('coverImage', shopStore?.coverImage);
        shopFormData.append('favImage', shopStore?.favImage);
        shopFormData.append('businessName', shopStore?.businessName);
        shopFormData.append('name', shopStore?.name);
        shopFormData.append('description', Function.convertEditorStateToHtml(shopStore?.businessDescription));
        shopFormData.append('categoryId', shopStore?.selectedCategoryId);
        shopFormData.append('address', shopStore?.address);
        shopFormData.append('countryId', shopStore?.selectedCountryId);
        shopFormData.append('userId', authStore?.userId);
        shopFormData.append('status', shopStore?.status);
        shopFormData.append('invoiceNotes', shopStore?.invoiceNotes);

        shopStore.isLoading = true;
        resShopDetails = await SecureService(navigate).PostResponse(Endpoints.StoreDetails, 'PUT', shopFormData, true);
        shopStore.isLoading = false;

        if (resShopDetails?.status === 'OK') {
            message.success(resShopDetails?.message, 5);
        }
    }

    const UpdateAccountDetails = async () => {
        let resShopDetails: any;
        let shopFormData: any = new FormData();
        shopFormData.append('id', shopStore?.id);
        shopFormData.append('name', shopStore?.name);
        shopFormData.append('userId', authStore?.userId);

        shopStore.isLoading = true;
        resShopDetails = await SecureService(navigate).PostResponse(Endpoints.StoreDetails, 'PUT', shopFormData, true);
        shopStore.isLoading = false;

        if (resShopDetails?.status === 'OK') {
            message.success(resShopDetails?.message, 5);
        }
    }

    return {
        GetCountries, GetCategories, GetShopDetailsByUserId, CreateShop, UpdateShop,
        UpdateAccountDetails
    };
}

export default ShopHelper;
