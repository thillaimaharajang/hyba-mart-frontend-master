import { action, makeObservable, observable } from "mobx";
import Messages from "../constant/Messages";

export default class BadgeStore {
    @observable badges: any[] = [];
    @observable page: number = 0;
    @observable size: number = 10;
    @observable totalItems: number = 0;
    @observable id: any = 0;
    @observable name: string = '';
    @observable image: any = []
    @observable status: any = true;
    @observable searchStr: string = '';
    @observable isLoading: boolean = false;
    @observable formCreateBadgeErrors: any = {};

    constructor() {
        makeObservable(this);
    }

    @action resetData() {
        this.badges = [];
        this.id = 0;
        this.page = 0;
        this.size = 10;
        this.totalItems = 0
        this.searchStr = '';
        this.resetPostData();
    }

    @action resetPostData() {
        this.name = '';
        this.image = [];
        this.status = true;
        this.isLoading = false;
        this.formCreateBadgeErrors = {};
    }

    @action setBadgeValues = (id: any) => {
        const selectedBadge = this.badges.find((badge) => badge.id === id);

        this.id = selectedBadge?.id;
        this.name = selectedBadge?.name;
        this.image = selectedBadge?.badgeImage;
        this.status = selectedBadge?.status;
        this.formCreateBadgeErrors = {};
    }

    @action isValidCreateBadgeForm() {
        this.formCreateBadgeErrors = {};

        if (!this.name) {
            this.formCreateBadgeErrors.name = Messages.EmptyBadgeName;
        }

        if (this.image?.length === 0) {
            this.formCreateBadgeErrors.image = Messages.EmptyBadgeImage;
        }

        if (Object.keys(this.formCreateBadgeErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }
}
