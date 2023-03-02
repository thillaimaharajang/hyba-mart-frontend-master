import { action, makeObservable, observable } from "mobx";
import Messages from "../constant/Messages";
import Function from "../utils/Function";

export default class CheckoutStore {
    @observable minOrderId: any = 0;
    @observable amount: string = '';
    @observable minOrderNotes: any | undefined = undefined;
    @observable formMinOrderCreateErrors: any = {};
    @observable addressId: any = 0;
    @observable isName: boolean = false;
    @observable isNumber: boolean = false;
    @observable isEmail: boolean = false;
    @observable isAddress1: boolean = false;
    @observable isAddress2: boolean = false;
    @observable isLandmark: boolean = false;
    @observable isState: boolean = false;
    @observable isCountry: boolean = false;
    @observable isZipcode: boolean = false;
    @observable noteId: any = 0;
    @observable notes: any | undefined = undefined;
    @observable formNotesCreateErrors: any = {};
    @observable userDetailsId: any = 0;
    @observable isMobileNumberStatus: boolean = false;
    @observable isWhatsappCheckoutStatus: boolean = false;
    @observable formUserDetailsCreateErrors: any = {};
    @observable isLoading: boolean = false;

    constructor() {
        makeObservable(this);
    }

    @action resetData() {
        this.addressId = 0;
        this.userDetailsId = 0;
        this.resetMinOrderPostData();
    }

    @action resetMinOrderPostData() {
        this.minOrderId = 0;
        this.amount = '';
        this.minOrderNotes = undefined;
        this.formMinOrderCreateErrors = {};
    }

    @action resetNotePostData() {
        this.noteId = 0;
        this.notes = undefined;
        this.formNotesCreateErrors = {};
    }

    @action setMinOrderValues = (minOrder: any) => {
        this.minOrderId = minOrder?.id;
        this.amount = minOrder?.amount;
        this.minOrderNotes = Function.convertHtmlToEditorState(minOrder?.description);
        this.formMinOrderCreateErrors = {};
    }

    @action setAddressValues = (address: any) => {
        this.addressId = address?.id;
        this.isName = address?.isName;
        this.isNumber = address?.isNumber;
        this.isEmail = address?.isEmail;
        this.isAddress1 = address?.isAddress1;
        this.isAddress2 = address?.isAddress2;
        this.isLandmark = address?.isLandmark;
        this.isState = address?.isState;
        this.isCountry = address?.isCountry;
        this.isZipcode = address?.isZipcode;
    }

    @action setNoteValues = (note: any) => {
        this.noteId = note?.id;
        this.notes = Function.convertHtmlToEditorState(note?.notes);
    }

    @action setUserDetails = (userDetails: any) => {
        this.userDetailsId = userDetails?.id;
        this.isMobileNumberStatus = userDetails?.isMobileNumber;
        this.isWhatsappCheckoutStatus = userDetails?.isWhatsApp;
    }

    @action isValidMinOrderCreateForm() {
        this.formMinOrderCreateErrors = {};

        if (!this.amount) {
            this.formMinOrderCreateErrors.amount = Messages.EmptyMinOrderAmount;
        }

        if (!this.minOrderNotes?.getCurrentContent()?.hasText()) {
            this.formMinOrderCreateErrors.minOrderNotes = Messages.EmptyMinOrderNotes;
        } else if (this.minOrderNotes?.getCurrentContent()?.getPlainText()?.length > 80) {
            this.formMinOrderCreateErrors.minOrderNotes = Messages.InvalidDescription;
        }

        if (Object.keys(this.formMinOrderCreateErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }

    @action isValidNoteCreateForm() {
        this.formNotesCreateErrors = {};

        if (!this.notes?.getCurrentContent()?.hasText()) {
            this.formNotesCreateErrors.notes = Messages.EmptyMinOrderNotes;
        } else if (this.notes?.getCurrentContent()?.getPlainText()?.length > 80) {
            this.formNotesCreateErrors.notes = Messages.InvalidDescription;
        }

        if (Object.keys(this.formNotesCreateErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }

    @action isValidUserDetailsCreateForm() {
        this.formUserDetailsCreateErrors = {};

        if (this.isMobileNumberStatus && this.isWhatsappCheckoutStatus) {
            this.formUserDetailsCreateErrors.isMobileNumberStatus = Messages.InvalidUserDetails;
            this.formUserDetailsCreateErrors.isWhatsappCheckoutStatus = Messages.InvalidUserDetails;
        }

        if (Object.keys(this.formUserDetailsCreateErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }
}
