import { action, makeObservable, observable } from "mobx";
import Messages from "../constant/Messages";
import { IAttribute } from "../interface/IProduct";

export default class ProductStore {
    @observable products: any[] = [];
    @observable page: number = 0;
    @observable size: number = 10;
    @observable totalItems: number = 0;
    @observable id: any = 0;
    @observable name: string = '';
    @observable productCategoryId: number = 0;
    @observable productCategoryName: string = '';
    @observable productSubCategoryName: string | undefined = '';
    @observable regularPrice: string = '';
    @observable offerPrice: string = '';
    @observable sku: string = '';
    @observable description: any | undefined = undefined;
    @observable mainImage: any = [];
    @observable galleryImages: any = [];
    @observable measurement: string = '';
    @observable quantity: string = '';
    @observable badgeId: any = '';
    @observable badgeStatus: boolean = false;
    @observable attributes: IAttribute[] = [{ id: '', description: '', status: false }];
    @observable productStatus: boolean = false;
    @observable status: any = true;
    @observable outOfStockStatus: boolean = false;
    @observable filterProductCategoryId: any = '';
    @observable searchStr: string = '';
    @observable isLoading: boolean = false;
    @observable formCreateProductErrors: any = {};

    constructor() {
        makeObservable(this);
    }

    @action resetData() {
        this.products = [];
        this.id = 0;
        this.page = 0;
        this.size = 10;
        this.totalItems = 0
        this.searchStr = '';
        this.resetPostData();
    }

    @action resetPostData() {
        this.name = '';
        this.status = true;
        this.isLoading = false;
        this.formCreateProductErrors = {};
    }

    @action setProductValues = (id: any) => {
        const selectedProduct = this.products.find((product) => product.id === id);

        this.id = selectedProduct?.id;
        this.name = selectedProduct?.name;
        this.status = selectedProduct?.status;
        this.formCreateProductErrors = {};
    }

    @action isValidCreateBadgeForm() {
        this.formCreateProductErrors = {};

        if (!this.name) {
            this.formCreateProductErrors.name = Messages.EmptyProductName;
        }

        if (!this.productCategoryId) {
            this.formCreateProductErrors.productCategory = Messages.EmptyProductCategory;
        }

        if (!this.productSubCategoryName) {
            this.formCreateProductErrors.productSubCategory = Messages.EmptyProductSubCategory;
        }

        if (!this.regularPrice) {
            this.formCreateProductErrors.regularPrice = Messages.EmptyRegularPrice;
        }

        if (!this.offerPrice) {
            this.formCreateProductErrors.offerPrice = Messages.EmptyOfferPrice;
        }

        if (!this.sku) {
            this.formCreateProductErrors.sku = Messages.EmptySKU;
        }

        if (!this.description?.getCurrentContent()?.hasText()) {
            this.formCreateProductErrors.description = Messages.EmptyProductDescription;
        } else if (this.description?.getCurrentContent()?.getPlainText()?.length > 80) {
            this.formCreateProductErrors.description = Messages.InvalidDescription;
        }

        if (!this.quantity) {
            this.formCreateProductErrors.quantity = Messages.EmptyProductQuantity;
        }

        if (!this.badgeId) {
            this.formCreateProductErrors.badge = Messages.EmptyProductBadge;
        }

        // if (!this.badgeId) {
        //     this.formCreateProductErrors.attribute = Messages.EmptyProductAttribute;
        // }

        if (Object.keys(this.formCreateProductErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }
}
