import { action, makeObservable, observable } from "mobx";
import Messages from "../constant/Messages";
import Function from "../utils/Function";

export default class PagesStore {
    @observable pages: any[] = [];
    @observable page: number = 0;
    @observable size: number = 10;
    @observable totalItems: number = 0;
    @observable id: any = 0;
    @observable name: string = '';
    @observable slug: string = '';
    @observable description: any | undefined = undefined;
    @observable cover: any = [];
    @observable status: any = true;
    @observable searchStr: string = '';
    @observable isLoading: boolean = false;
    @observable formCreatePagesErrors: any = {};

    constructor() {
        makeObservable(this);
    }

    @action resetData() {
        this.pages = [];
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
        this.slug = '';
        this.description = undefined;
        this.cover = [];
        this.status = true;
        this.formCreatePagesErrors = {};
    }

    @action setPageValues = (id: any) => {
        const selectedPage = this.pages.find((page) => page.id === id);

        this.id = selectedPage?.id;
        this.name = selectedPage?.name;
        this.slug = selectedPage?.slug;
        this.description = Function.convertHtmlToEditorState(selectedPage?.description);
        this.cover = selectedPage?.cover;
        this.formCreatePagesErrors = {};
    }

    @action isValidCreatePageForm() {
        this.formCreatePagesErrors = {};

        if (!this.name) {
            this.formCreatePagesErrors.name = Messages.EmptyPageName;
        }

        if (!this.slug) {
            this.formCreatePagesErrors.slug = Messages.EmptyPageSlug;
        }

        if (this.description?.getCurrentContent()?.getPlainText()?.length > 80) {
            this.formCreatePagesErrors.description = Messages.InvalidDescription;
        }

        if (Object.keys(this.formCreatePagesErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }
}
