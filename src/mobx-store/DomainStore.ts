import { action, makeObservable, observable } from "mobx";
import Messages from "../constant/Messages";

export default class DomainStore {
    @observable domain: any = {};
    @observable id: any = 0;
    @observable url: string = '';
    @observable domainType: number = 0;
    @observable isLoading: boolean = false;
    @observable formCreateDomainErrors: any = {};

    constructor() {
        makeObservable(this);
    }

    @action resetData() {
        this.domain = {};
        this.resetPostData();
    }

    @action resetPostData() {
        this.id = 0;
        this.url = '';
        this.domainType = 0;
        this.formCreateDomainErrors = {};
    }

    @action setDomainValues = () => {
        this.id = this.domain?.id;
        this.url = this.domain?.url;
        this.domainType = this.domain?.isDefault ? 1 : 2;
        this.formCreateDomainErrors = {};
    }

    @action isValidCreateDomainForm() {
        this.formCreateDomainErrors = {};

        if (this.domainType === 0) {
            this.formCreateDomainErrors.domainType = Messages.EmptyDomainType;
        }

        if (this.domainType === 2 && !this.url) {
            this.formCreateDomainErrors.url = Messages.EmptyLinkURL;
        }

        if (Object.keys(this.formCreateDomainErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }
}
