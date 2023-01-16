import { action, makeObservable, observable } from "mobx";
import Messages from "../constant/Messages";

export default class ContactStore {
    @observable contacts: any[] = [];
    @observable page: number = 0;
    @observable size: number = 10;
    @observable totalItems: number = 0;
    @observable id: any = 0;
    @observable name: string = '';
    @observable countryCode: string = "in";
    @observable countryName: string = "India";
    @observable dialCode: string = "91";
    @observable mobile: string = '';
    @observable isCallSupport: any = true;
    @observable isWhatsappSupport: any = true;
    @observable status: any = true;
    @observable searchStr: string = '';
    @observable isLoading: boolean = false;
    @observable formCreateContactErrors: any = {};

    constructor() {
        makeObservable(this);
    }

    @action resetData() {
        this.contacts = [];
        this.id = 0;
        this.page = 0;
        this.size = 10;
        this.totalItems = 0
        this.searchStr = '';
        this.resetPostData();
    }

    @action resetPostData() {
        this.id = '';
        this.name = '';
        this.countryCode = "in";
        this.countryName = "India";
        this.dialCode = "91";
        this.mobile = "";
        this.isCallSupport = true;
        this.isWhatsappSupport = true;
        this.status = true;
        this.formCreateContactErrors = {};
    }

    @action setContactValues = (id: any) => {
        const selectedContact = this.contacts.find((contact) => contact.id === id);

        this.id = selectedContact?.id;
        this.name = selectedContact?.name;
        this.countryCode = selectedContact?.countryCode;
        this.countryName = selectedContact?.countryName;
        this.dialCode = selectedContact?.dialCode;
        this.mobile = selectedContact?.mobileNumber;
        this.isCallSupport = selectedContact?.callSupport;
        this.isWhatsappSupport = selectedContact?.whatsappSupport;
        this.status = selectedContact?.status;
        this.formCreateContactErrors = {};
    }

    @action isValidCreateContactForm() {
        this.formCreateContactErrors = {};

        if (!this.name) {
            this.formCreateContactErrors.name = Messages.EmptyContactName;
        }

        if (!this.mobile) {
            this.formCreateContactErrors.mobile = Messages.EmptyContactMobile;
        }

        if (Object.keys(this.formCreateContactErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }
}
