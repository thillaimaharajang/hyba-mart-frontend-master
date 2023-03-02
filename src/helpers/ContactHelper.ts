import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import SecureService from "../services/SecureService";

const ContactHelper = (navigate: NavigateFunction) => {
    let { contactStore, shopStore } = RootStore;

    const GetContacts = async () => {
        let resContacts: any;

        let params = `?storeId=${shopStore.id}&page=${contactStore.page}&size=${contactStore.size}`;
        if (contactStore?.searchStr) {
            params += `&name=${contactStore?.searchStr}`;
        }

        contactStore.isLoading = true;
        resContacts = await SecureService(navigate).GetResponse(Endpoints.Contact + params);
        contactStore.isLoading = false;

        if (resContacts?.status === 'OK') {
            contactStore.contacts = resContacts?.data;
            contactStore.page = resContacts?.currentPage;
            contactStore.totalItems = resContacts?.totalItems;
        }
    }

    const CreateContact = async () => {
        let resCreateContact: any;
        const contactPostObj = {
            "storeId": shopStore.id,
            "name": contactStore.name,
            "dialCode": contactStore.dialCode,
            "mobileNumber": contactStore.mobile,
            "callSupport": contactStore.isCallSupport,
            "whatsappSupport": contactStore.isWhatsappSupport,
            "status": contactStore.status
        }

        contactStore.isLoading = true;
        resCreateContact = await SecureService(navigate).PostResponse(Endpoints.Contact, 'POST', contactPostObj);
        contactStore.isLoading = false;

        if (resCreateContact?.status === 'CREATED') {
            message.success(resCreateContact?.message, 5);
            await GetContacts();
        }
    }

    const UpdateContact = async () => {
        let resUpdateContact: any;
        const contactPostObj = {
            "id": contactStore.id,
            "name": contactStore.name,
            "dialCode": contactStore.dialCode,
            "mobileNumber": contactStore.mobile,
            "callSupport": contactStore.isCallSupport,
            "whatsappSupport": contactStore.isWhatsappSupport,
            "status": contactStore.status
        }

        contactStore.isLoading = true;
        resUpdateContact = await SecureService(navigate).PostResponse(Endpoints.Contact, 'PUT', contactPostObj);
        contactStore.isLoading = false;

        if (resUpdateContact?.status === 'OK') {
            message.success(resUpdateContact?.message, 5);
            await GetContacts();
        }
    }

    const DeleteContact = async (contactId: any) => {
        let resDeleteContact: any;
        let deleteContactObj: any = {
            id: contactId
        }

        contactStore.isLoading = true;
        resDeleteContact = await SecureService(navigate).PostResponse(Endpoints.Contact, 'DELETE', deleteContactObj);
        contactStore.isLoading = false;

        if (resDeleteContact?.status === 'OK') {
            message.success(resDeleteContact?.message, 5);
            await GetContacts();
        }
    }

    return { GetContacts, CreateContact, UpdateContact, DeleteContact };
}

export default ContactHelper;
