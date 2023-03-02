import { action, makeObservable, observable } from "mobx";
import Messages from "../constant/Messages";
import Function from "../utils/Function";

export default class DeliveryStore {
    @observable delivery: any = {};
    @observable id: any = 0;
    @observable baseDistance: number = 0;
    @observable chargesAmount: number = 0;
    @observable freeOrderLimit: number = 0;
    @observable shippingNotes: any | undefined = undefined;
    @observable status: boolean = true;
    @observable searchStr: string = '';
    @observable isLoading: boolean = false;
    @observable formCreateDeliveryErrors: any = {};

    constructor() {
        makeObservable(this);
    }

    @action resetData() {
        this.delivery = {};
        this.resetPostData();
    }

    @action resetPostData() {
        this.id = 0;
        this.baseDistance = 0;
        this.chargesAmount = 0;
        this.freeOrderLimit = 0;
        this.shippingNotes = undefined;
        this.status = true;
        this.searchStr = '';
        this.isLoading = false;
        this.formCreateDeliveryErrors = {};
    }

    @action setDeliveryValues = () => {
        this.id = this.delivery?.id;
        this.baseDistance = this.delivery?.baseDistance;
        this.chargesAmount = this.delivery?.chargesAmount;
        this.freeOrderLimit = this.delivery?.freeOrderLimit;
        this.shippingNotes = Function.convertHtmlToEditorState(this.delivery?.shippingNotes);
        this.status = this.delivery?.status;
        this.formCreateDeliveryErrors = {};
    }

    @action isValidCreateDeliveryForm() {
        this.formCreateDeliveryErrors = {};

        if (!this.baseDistance) {
            this.formCreateDeliveryErrors.baseDistance = Messages.EmptyDeliveryBaseDistance;
        }

        if (!this.chargesAmount) {
            this.formCreateDeliveryErrors.chargesAmount = Messages.EmptyDeliveryChargesAmount;
        }

        if (!this.freeOrderLimit) {
            this.formCreateDeliveryErrors.freeOrderLimit = Messages.EmptyDeliveryFreeOrderLimit;
        }

        if (!this.shippingNotes?.getCurrentContent()?.hasText()) {
            this.formCreateDeliveryErrors.shippingNotes = Messages.EmptyDeliveryShippingNotes;
        } else if (this.shippingNotes?.getCurrentContent()?.getPlainText()?.length > 80) {
            this.formCreateDeliveryErrors.shippingNotes = Messages.InvalidDescription;
        }

        if (Object.keys(this.formCreateDeliveryErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }
}
