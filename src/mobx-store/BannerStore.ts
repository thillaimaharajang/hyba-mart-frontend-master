import { action, makeObservable, observable } from "mobx";
import Messages from "../constant/Messages";

export default class BannerStore {
    @observable banners: any = {};
    @observable id: any = 0;
    @observable bannerImage1: any = [];
    @observable bannerImage2: any = [];
    @observable bannerImage3: any = [];
    @observable isLoading: boolean = false;
    @observable formCreateBannerErrors: any = {};

    constructor() {
        makeObservable(this);
    }

    @action resetData() {
        this.banners = {};
        this.resetPostData();
    }

    @action resetPostData() {
        this.id = 0;
        this.bannerImage1 = [];
        this.bannerImage2 = [];
        this.bannerImage3 = [];
        this.formCreateBannerErrors = {};
    }

    @action isValidBannerCreateForm() {
        this.formCreateBannerErrors = {};
console.log("(this.bannerImage1", JSON.stringify(this.bannerImage1))
        if (this.bannerImage1?.length === 0) {
            this.formCreateBannerErrors.bannerImage1 = Messages.EmptyBannerImage;
        }

        if (this.bannerImage2?.length === 0) {
            this.formCreateBannerErrors.bannerImage2 = Messages.EmptyBannerImage;
        }

        if (this.bannerImage3?.length === 0) {
            this.formCreateBannerErrors.bannerImage3 = Messages.EmptyBannerImage;
        }
console.log("this.formCreateBannerErrors",JSON.stringify(this.formCreateBannerErrors))
        if (Object.keys(this.formCreateBannerErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }

    @action setBannerValues = (banner: any) => {
        this.id = banner?.id;
        this.bannerImage1 = banner?.bannerImage1;
        this.bannerImage2 = banner?.bannerImage2;
        this.bannerImage3 = banner?.bannerImage3;
    }
}
