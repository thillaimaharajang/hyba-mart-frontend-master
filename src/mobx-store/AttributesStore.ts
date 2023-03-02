import { action, makeObservable, observable } from "mobx";
import Messages from "../constant/Messages";

export default class AttributesStore {
    @observable attributes: any[] = [];
    @observable page: number = 0;
    @observable size: number = 10;
    @observable totalItems: number = 0;
    @observable id: any = 0;
    @observable name: string = '';
    @observable searchStr: string = '';
    @observable isLoading: boolean = false;
    @observable formCreateAttributesErrors: any = {};

    constructor() {
        makeObservable(this);
    }

    @action resetData() {
        this.attributes = [];
        this.id = 0;
        this.page = 0;
        this.size = 10;
        this.totalItems = 0
        this.searchStr = '';
        this.resetPostData();
    }

    @action resetPostData() {
        this.name = '';
        this.isLoading = false;
        this.formCreateAttributesErrors = {};
    }

    @action setAttributeValues = (id: any) => {
        const selectedAttribute = this.attributes.find((attribute) => attribute.id === id);

        this.id = selectedAttribute?.id;
        this.name = selectedAttribute?.name;
        this.formCreateAttributesErrors = {};
    }

    @action isValidCreateAttributeForm() {
        this.formCreateAttributesErrors = {};

        if (!this.name) {
            this.formCreateAttributesErrors.name = Messages.EmptyAttributeName;
        }

        if (Object.keys(this.formCreateAttributesErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }
}
