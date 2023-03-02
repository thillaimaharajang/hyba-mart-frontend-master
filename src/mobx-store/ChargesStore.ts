import { action, makeObservable, observable } from "mobx";
import Messages from "../constant/Messages";

export default class ChargesStore {
    @observable charges: any[] = [];
    @observable page: number = 0;
    @observable size: number = 10;
    @observable totalItems: number = 0;
    @observable id: any = 0;
    @observable name: string = '';
    @observable amount: any = '';
    @observable isPercentage: boolean = false;
    @observable searchStr: string = '';
    @observable isLoading: boolean = false;
    @observable formCreateChargesErrors: any = {};

    constructor() {
        makeObservable(this);
    }

    @action resetData() {
        this.charges = [];
        this.resetPostData();
    }

    @action resetPostData() {
        this.id = 0;
        this.page = 0;
        this.size = 10;
        this.totalItems = 0;
        this.name = '';
        this.amount = '';
        this.isPercentage = false;
        this.searchStr = '';
        this.isLoading = false;
        this.formCreateChargesErrors = {};
    }

    @action setChargesValues = (id: any) => {
        const selectedCharge = this.charges.find((charge) => charge.id === id);

        this.id = selectedCharge?.id;
        this.name = selectedCharge?.name;
        this.amount = selectedCharge?.amount;
        this.isPercentage = selectedCharge?.isPercentage;
        this.formCreateChargesErrors = {};
    }

    @action isValidCreateChargesForm() {
        this.formCreateChargesErrors = {};

        if (!this.name) {
            this.formCreateChargesErrors.name = Messages.EmptyChargesName;
        }

        if (!this.amount) {
            this.formCreateChargesErrors.amount = Messages.EmptyChargesAmount;
        } else if (this.isPercentage && parseInt(this.amount) > 100) {
            this.formCreateChargesErrors.amount = Messages.InvalidChargesAmount;
        }

        if (Object.keys(this.formCreateChargesErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }
}
