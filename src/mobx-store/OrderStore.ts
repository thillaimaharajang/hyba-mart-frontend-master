import { action, makeObservable, observable } from "mobx";

export default class OrderStore {
    @observable orders: any[] = [];
    @observable page: number = 0;
    @observable size: number = 10;
    @observable totalItems: number = 0;
    @observable searchStr: string = '';
    @observable id: any = 0;
    @observable name: string | undefined = '';
    @observable address: string = '';
    @observable orderId: string | undefined = '';
    @observable paymentStatus: string | undefined = '';
    @observable orderStatus: string | undefined = '';
    @observable price: string | undefined = '';
    @observable noOfProducts: number | undefined = 0;
    @observable isDeleted: boolean | undefined = false;
    @observable isLoading: boolean = false;
    @observable formCreatePaymentModeErrors: any = {};

    constructor() {
        makeObservable(this);
    }

    @action resetData() {
        this.resetPostData();
    }

    @action resetPostData() {
        this.id = 0;
        this.searchStr = '';
        this.isLoading = false;
    }

    // @action setBadgeValues = (id: any) => {
    //     const selectedBadge = this.badges.find((badge) => badge.id === id);

    //     this.id = selectedBadge?.id;
    //     this.name = selectedBadge?.name;
    //     this.image = selectedBadge?.badgeImage;
    //     this.status = selectedBadge?.status;
    //     this.formCreateBadgeErrors = {};
    // }

    // @action isValidCreateBadgeForm() {
    //     this.formCreateBadgeErrors = {};

    //     if (!this.name) {
    //         this.formCreateBadgeErrors.name = Messages.EmptyBadgeName;
    //     }

    //     if (this.image?.length === 0) {
    //         this.formCreateBadgeErrors.image = Messages.EmptyBadgeImage;
    //     }

    //     if (Object.keys(this.formCreateBadgeErrors).length === 0) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
}
