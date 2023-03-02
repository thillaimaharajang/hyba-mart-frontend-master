import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import SecureService from "../services/SecureService";
import Function from "../utils/Function";

const CheckoutHelper = (navigate: NavigateFunction) => {
    let { checkoutStore, shopStore } = RootStore;

    const GetMinOrder = async () => {
        let resMinOrder: any;
        let params = `?storeId=${shopStore.id}`;

        checkoutStore.isLoading = true;
        resMinOrder = await SecureService(navigate).GetResponse(Endpoints.CheckoutOrder + params);
        checkoutStore.isLoading = false;

        if (resMinOrder?.status === 'OK') {
            checkoutStore.setMinOrderValues(resMinOrder?.data);
        }
    }

    const CreateMinOrder = async () => {
        let resCreateMinOrder: any;
        const minOrderPostObj = {
            "storeId": shopStore?.id,
            'amount': checkoutStore?.amount,
            'description': Function.convertEditorStateToHtml(checkoutStore?.minOrderNotes)
        }

        checkoutStore.isLoading = true;
        resCreateMinOrder = await SecureService(navigate).PostResponse(Endpoints.CheckoutOrder, 'POST', minOrderPostObj);
        checkoutStore.isLoading = false;

        if (resCreateMinOrder?.status === 'CREATED') {
            message.success(resCreateMinOrder?.message, 5);
        }
    }

    const UpdateMinOrder = async () => {
        let resUpdateMinOrder: any;
        const minOrderPostObj = {
            "id": checkoutStore?.minOrderId,
            'amount': checkoutStore?.amount,
            'description': Function.convertEditorStateToHtml(checkoutStore?.minOrderNotes)
        }

        checkoutStore.isLoading = true;
        resUpdateMinOrder = await SecureService(navigate).PostResponse(Endpoints.CheckoutOrder, 'PUT', minOrderPostObj);
        checkoutStore.isLoading = false;

        if (resUpdateMinOrder?.status === 'OK') {
            message.success(resUpdateMinOrder?.message, 5);
        }
    }

    const GetAddress = async () => {
        let resAddress: any;
        let params = `?storeId=${shopStore.id}`;

        checkoutStore.isLoading = true;
        resAddress = await SecureService(navigate).GetResponse(Endpoints.CheckoutAddress + params);
        checkoutStore.isLoading = false;

        if (resAddress?.status === 'OK') {
            checkoutStore.setAddressValues(resAddress?.data);
        }
    }

    const CreateAddress = async () => {
        let resCreateAddress: any;
        const addressPostObj = {
            "storeId": shopStore?.id,
            'isName': checkoutStore?.isName,
            'isNumber': checkoutStore?.isNumber,
            'isEmail': checkoutStore?.isEmail,
            'isAddress1': checkoutStore?.isAddress1,
            'isAddress2': checkoutStore?.isAddress2,
            'isLandmark': checkoutStore?.isLandmark,
            'isState': checkoutStore?.isState,
            'isCountry': checkoutStore?.isCountry,
            'isZipcode': checkoutStore?.isZipcode
        }

        checkoutStore.isLoading = true;
        resCreateAddress = await SecureService(navigate).PostResponse(Endpoints.CheckoutAddress, 'POST', addressPostObj);
        checkoutStore.isLoading = false;

        if (resCreateAddress?.status === 'CREATED') {
            message.success(resCreateAddress?.message, 5);
            await GetAddress();
        }
    }

    const UpdateAddress = async () => {
        let resUpdateAddress: any;
        const addressPostObj = {
            "id": checkoutStore?.addressId,
            'isName': checkoutStore?.isName,
            'isNumber': checkoutStore?.isNumber,
            'isEmail': checkoutStore?.isEmail,
            'isAddress1': checkoutStore?.isAddress1,
            'isAddress2': checkoutStore?.isAddress2,
            'isLandmark': checkoutStore?.isLandmark,
            'isState': checkoutStore?.isState,
            'isCountry': checkoutStore?.isCountry,
            'isZipcode': checkoutStore?.isZipcode
        }

        checkoutStore.isLoading = true;
        resUpdateAddress = await SecureService(navigate).PostResponse(Endpoints.CheckoutAddress, 'PUT', addressPostObj);
        checkoutStore.isLoading = false;

        if (resUpdateAddress?.status === 'OK') {
            message.success(resUpdateAddress?.message, 5);
            await GetAddress();
        }
    }

    const GetNotes = async () => {
        let resNotes: any;
        let params = `?storeId=${shopStore.id}`;

        checkoutStore.isLoading = true;
        resNotes = await SecureService(navigate).GetResponse(Endpoints.CheckoutNotes + params);
        checkoutStore.isLoading = false;

        if (resNotes?.status === 'OK') {
            checkoutStore.setNoteValues(resNotes?.data);
        }
    }

    const CreateNotes = async () => {
        let resCreateNote: any;
        const notePostObj = {
            "storeId": shopStore?.id,
            'notes': Function.convertEditorStateToHtml(checkoutStore?.notes)
        }

        checkoutStore.isLoading = true;
        resCreateNote = await SecureService(navigate).PostResponse(Endpoints.CheckoutNotes, 'POST', notePostObj);
        checkoutStore.isLoading = false;

        if (resCreateNote?.status === 'CREATED') {
            message.success(resCreateNote?.message, 5);
            await GetNotes();
        }
    }

    const UpdateNotes = async () => {
        let resUpdateNotes: any;
        const notePostObj = {
            "id": checkoutStore?.noteId,
            'notes': Function.convertEditorStateToHtml(checkoutStore?.notes)
        }

        checkoutStore.isLoading = true;
        resUpdateNotes = await SecureService(navigate).PostResponse(Endpoints.CheckoutNotes, 'PUT', notePostObj);
        checkoutStore.isLoading = false;

        if (resUpdateNotes?.status === 'OK') {
            message.success(resUpdateNotes?.message, 5);
            await GetNotes();
        }
    }

    const GetUserDetails = async () => {
        let resUserDetails: any;
        let params = `?storeId=${shopStore.id}`;

        checkoutStore.isLoading = true;
        resUserDetails = await SecureService(navigate).GetResponse(Endpoints.CheckoutUserDetails + params);
        checkoutStore.isLoading = false;

        if (resUserDetails?.status === 'OK' && resUserDetails?.data) {
            checkoutStore.setUserDetails(resUserDetails?.data);
        }
    }

    const CreateUserDetails = async () => {
        let resCreateUserDetails: any;
        const userDetailsPostObj = {
            "storeId": shopStore?.id,
            'isMobileNumber': checkoutStore?.isMobileNumberStatus,
            'isWhatsApp': checkoutStore?.isWhatsappCheckoutStatus
        }

        checkoutStore.isLoading = true;
        resCreateUserDetails = await SecureService(navigate).PostResponse(Endpoints.CheckoutUserDetails, 'POST', userDetailsPostObj);
        checkoutStore.isLoading = false;

        if (resCreateUserDetails?.status === 'CREATED') {
            message.success(resCreateUserDetails?.message, 5);
            await GetUserDetails();
        }
    }

    const UpdateUserDetails = async () => {
        let resUpdateUserDetails: any;
        const userDetailsPostObj = {
            "id": checkoutStore?.userDetailsId,
            'isMobileNumber': checkoutStore?.isMobileNumberStatus,
            'isWhatsApp': checkoutStore?.isWhatsappCheckoutStatus
        }

        checkoutStore.isLoading = true;
        resUpdateUserDetails = await SecureService(navigate).PostResponse(Endpoints.CheckoutUserDetails, 'PUT', userDetailsPostObj);
        checkoutStore.isLoading = false;

        if (resUpdateUserDetails?.status === 'OK') {
            message.success(resUpdateUserDetails?.message, 5);
            await GetUserDetails();
        }
    }

    return {
        GetMinOrder, CreateMinOrder, UpdateMinOrder, GetAddress, CreateAddress, UpdateAddress,
        GetNotes, CreateNotes, UpdateNotes, GetUserDetails, CreateUserDetails, UpdateUserDetails
    };
}

export default CheckoutHelper;
