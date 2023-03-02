import { action, makeObservable, observable } from "mobx";
import Messages from "../constant/Messages";
import { IStoreObj } from "../interface/IStore";
import Function from "../utils/Function";

export default class ShopStore {
    @observable storeDetails: IStoreObj | any = {};
    @observable countries: any = [];
    @observable businessCategories: any = [];
    @observable businessName: string = '';
    @observable storeUrl: string = '';
    @observable id: any = 0;
    @observable name: string = '';
    @observable currency: string = '';
    @observable selectedCategoryId: number = 0;
    @observable categoryName: string = '';
    @observable selectedCountryId: number = 0;
    @observable countryName: string = ''
    @observable invoiceNotes: string = '';
    @observable businessDescription: any | undefined = undefined;
    @observable address: string = '';
    @observable profileImage: any = [];
    @observable coverImage: any = [];
    @observable favImage: any = [];
    @observable status: boolean = false;
    @observable isLoading: boolean = false;
    @observable isInfoModal: boolean = false;
    @observable formShopCreateErrors: any = {};
    @observable formAccountUpdateErrors: any = {};

    constructor() {
        makeObservable(this);
        this.init();
    }

    @action async init() {

    }

    @action resetData() {
        this.storeDetails = {};
        this.countries = [];
        this.businessCategories = [];
        this.currency = '';
        this.countryName = '';
        this.categoryName = '';
        this.status = false;
        this.isLoading = false;
        this.isInfoModal = false;
        this.formShopCreateErrors = {};
        this.resetCreateShopData();
    }

    @action resetCreateShopData() {
        this.id = 0;
        this.businessName = '';
        this.name = '';
        this.selectedCategoryId = 0;
        this.selectedCountryId = 0;
        this.invoiceNotes = '';
        this.businessDescription = undefined;
        this.address = '';
        this.profileImage = [];
        this.coverImage = [];
        this.favImage = [];
    }

    @action setStoreValues = () => {
        this.id = this.storeDetails?.id;
        this.profileImage = this.storeDetails?.profileImage;
        this.coverImage = this.storeDetails?.coverImage;
        this.favImage = this.storeDetails?.favImage;
        this.businessName = this.storeDetails?.businessName;
        this.name = this.storeDetails?.name;
        this.selectedCategoryId = this.storeDetails?.categoryId;
        this.currency = this.storeDetails?.currency;
        this.countryName = this.storeDetails?.countryName;
        this.categoryName = this.storeDetails?.categoryName;
        this.businessDescription = Function.convertHtmlToEditorState(this.storeDetails?.description);
        this.address = this.storeDetails?.address;
        this.selectedCountryId = this.storeDetails?.countryId;
        this.status = this.storeDetails.status;
        this.invoiceNotes = this.storeDetails?.invoiceNotes;
    }

    @action isValidShopCreateForm() {
        this.formShopCreateErrors = {};

        if (!this.businessName) {
            this.formShopCreateErrors.businessName = Messages.EmptyBusinessName;
        }

        if (!this.selectedCategoryId) {
            this.formShopCreateErrors.businessCategory = Messages.EmptyBusinessCategory;
        }

        if (!this.businessDescription?.getCurrentContent()?.hasText()) {
            this.formShopCreateErrors.businessDescription = Messages.EmptyBusinessDescription;
        } else if (this.businessDescription?.getCurrentContent()?.getPlainText()?.length > 80) {
            this.formShopCreateErrors.businessDescription = Messages.InvalidDescription;
        }

        if (!this.address) {
            this.formShopCreateErrors.address = Messages.EmptyShopAddress;
        }

        if (!this.selectedCountryId) {
            this.formShopCreateErrors.country = Messages.EmptyCountry;
        }

        if (this.profileImage?.length === 0) {
            this.formShopCreateErrors.profileImage = Messages.EmptyProfileImage;
        }

        if (this.coverImage?.length === 0) {
            this.formShopCreateErrors.coverImage = Messages.EmptyCoverImage;
        }

        if (Object.keys(this.formShopCreateErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }

    @action isValidAccountUpdateForm() {
        this.formAccountUpdateErrors = {};

        if (!this.name) {
            this.formAccountUpdateErrors.name = Messages.EmptyCustomerName;
        }

        if (Object.keys(this.formAccountUpdateErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }
}
