import { action, makeObservable, observable } from "mobx";
import Messages from "../constant/Messages";

export default class SocialLinksStore {
    @observable socialLinks: any = {};
    @observable id: any = 0;
    @observable facebookUrl: string = '';
    @observable skypeUrl: string = '';
    @observable twitterUrl: string = '';
    @observable whatsappUrl: string = '';
    @observable instagramUrl: string = '';
    @observable youtubeUrl: string = '';
    @observable linkedInUrl: string = '';
    @observable pinterestUrl: string = '';
    @observable isLoading: boolean = false;
    @observable formCreateSocialLinksErrors: any = {};

    constructor() {
        makeObservable(this);
    }

    @action resetData() {
        this.socialLinks = {};
        this.resetPostData();
    }

    @action resetPostData() {
        this.id = 0;
        this.facebookUrl = '';
        this.skypeUrl = '';
        this.twitterUrl = '';
        this.whatsappUrl = '';
        this.instagramUrl = '';
        this.youtubeUrl = '';
        this.linkedInUrl = '';
        this.pinterestUrl = '';
        this.isLoading = false;
        this.formCreateSocialLinksErrors = {};
    }

    @action setSocialLinksValues = () => {
        this.id = this.socialLinks?.id;
        this.facebookUrl = this.socialLinks?.facebookUrl;
        this.skypeUrl = this.socialLinks?.skypeUrl;
        this.twitterUrl = this.socialLinks?.twitterUrl;
        this.whatsappUrl = this.socialLinks?.whatsappUrl;
        this.instagramUrl = this.socialLinks?.instagramUrl;
        this.youtubeUrl = this.socialLinks?.youtubeUrl;
        this.linkedInUrl = this.socialLinks?.linkedInUrl;
        this.pinterestUrl = this.socialLinks?.pinterestUrl;
        this.isLoading = false;
        this.formCreateSocialLinksErrors = {};
    }

    @action isValidCreateSocialLinkForm() {
        this.formCreateSocialLinksErrors = {};

        if (!this.facebookUrl) {
            this.formCreateSocialLinksErrors.facebookUrl = Messages.EmptyFaceBookUrl;
        }

        if (!this.whatsappUrl) {
            this.formCreateSocialLinksErrors.whatsappUrl = Messages.EmptyWhatsappUrl;
        }

        if (Object.keys(this.formCreateSocialLinksErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }
}
