import { action, makeObservable, observable } from "mobx";
import Messages from "../constant/Messages";

export default class ShippingStore {
    @observable page: number = 0;
    @observable size: number = 10;
    @observable totalItems: number = 0;
    @observable id: any = 0;
    @observable mobile: number = 0;
    @observable firstName: string = '';
    @observable lastName: string = '';
    @observable address: string = '';
    @observable apartment: string | undefined = '';
    @observable city: string = '';
    @observable state: string = '';
    @observable postalCode: number = 0;
    @observable paymentId: number = 0;
    @observable paymentModeId: number = 0;
    @observable orderTotal: number = 0;
    @observable isLoading: boolean = false;
    @observable formShippingErrors: any = {};

    constructor() {
        makeObservable(this);
    }

    // @action resetData() {
    //     this.products = [];
    //     this.id = 0;
    //     this.page = 0;
    //     this.size = 10;
    //     this.totalItems = 0
    //     this.searchStr = '';
    //     this.resetPostData();
    // }

    // @action resetPostData() {
    //     this.name = '';
    //     this.status = true;
    //     this.isLoading = false;
    //     this.formShippingErrors = {};
    // }

    // @action setProductValues = (id: any) => {
    //     const selectedProduct = this.products.find((product) => product.id === id);

    //     this.id = selectedProduct?.id;
    //     this.name = selectedProduct?.name;
    //     this.status = selectedProduct?.status;
    //     this.formShippingErrors = {};
    // }


    // @action isValidCreateBadgeForm() {
    //     this.formShippingErrors = {};

    //     if (!this.name) {
    //         this.formShippingErrors.name = Messages.EmptyProductName;
    //     }

    //     if (!this.productCategoryId) {
    //         this.formShippingErrors.productCategory = Messages.EmptyProductCategory;
    //     }

    //     if (!this.productSubCategoryName) {
    //         this.formShippingErrors.productSubCategory = Messages.EmptyProductSubCategory;
    //     }

    //     if (!this.regularPrice) {
    //         this.formShippingErrors.regularPrice = Messages.EmptyRegularPrice;
    //     }

    //     if (!this.offerPrice) {
    //         this.formShippingErrors.offerPrice = Messages.EmptyOfferPrice;
    //     }

    //     if (!this.sku) {
    //         this.formShippingErrors.sku = Messages.EmptySKU;
    //     }

    //     if (!this.description?.getCurrentContent()?.hasText()) {
    //         this.formShippingErrors.description = Messages.EmptyProductDescription;
    //     } else if (this.description?.getCurrentContent()?.getPlainText()?.length > 80) {
    //         this.formShippingErrors.description = Messages.InvalidDescription;
    //     }

    //     if (!this.quantity) {
    //         this.formShippingErrors.quantity = Messages.EmptyProductQuantity;
    //     }

    //     if (!this.badgeId) {
    //         this.formShippingErrors.badge = Messages.EmptyProductBadge;
    //     }

        // if (!this.badgeId) {
        //     this.formShippingErrors.attribute = Messages.EmptyProductAttribute;
        // }

        // if (Object.keys(this.formShippingErrors).length === 0) {
        //     return true;
        // } else {
        //     return false;
        // }
    // }
}
