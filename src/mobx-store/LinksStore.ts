import { action, makeObservable, observable } from "mobx";
import Messages from "../constant/Messages";

export default class LinksStore {
    @observable links: any[] = [];
    @observable id: any = 0;
    @observable title: string = '';
    @observable url: string = '';
    @observable description: string = '';
    @observable isLoading: boolean = false;
    @observable formCreateLinksErrors: any = {};

    constructor() {
        makeObservable(this);
    }

    @action resetData() {
        this.links = [];
        this.resetPostData();
    }

    @action resetPostData() {
        this.id = 0;
        this.title = '';
        this.url = '';
        this.description = '';
        this.formCreateLinksErrors = {};
    }

    @action setLinkValues = (id: any) => {
        const selectedLink = this.links.find((link) => link.id === id);

        this.id = selectedLink?.id;
        this.title = selectedLink?.title;
        this.url = selectedLink?.url;
        this.description = selectedLink?.description;
        this.formCreateLinksErrors = {};
    }

    @action isValidCreateLinkForm() {
        this.formCreateLinksErrors = {};

        if (!this.title) {
            this.formCreateLinksErrors.title = Messages.EmptyLinkTitle;
        }

        if (!this.url) {
            this.formCreateLinksErrors.url = Messages.EmptyLinkURL;
        }

        if (!this.description) {
            this.formCreateLinksErrors.description = Messages.EmptyLinkDescription;
        }

        if (Object.keys(this.formCreateLinksErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }
}
