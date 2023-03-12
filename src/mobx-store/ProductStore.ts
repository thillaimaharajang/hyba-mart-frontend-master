import { action, makeObservable, observable } from "mobx";
import Messages from "../constant/Messages";
import { IAttribute } from "../interface/IProduct";
import Function from "../utils/Function";

export default class ProductStore {
    @observable products: any[] = [];
    @observable page: number = 0;
    @observable size: number = 10;
    @observable totalItems: number = 0;
    @observable id: any = 0;
    @observable name: string = '';
    @observable productCategoryId: number = 0;
    @observable productCategoryName: string | undefined = '';
    @observable productSubCategoryName: string | undefined = '';
    @observable regularPrice: string = '';
    @observable offerPrice: string = '';
    @observable sku: number = 0;
    @observable description: any | undefined = undefined;
    @observable mainImage: any = [];
    @observable galleryImage: any = [];
    @observable measurement: string = '';
    @observable quantity: string = '';
    @observable badgeId: any = '';
    @observable badgeStatus: boolean = false;
    @observable attributes: IAttribute[] = [];
    @observable productStatus: boolean = false;
    @observable status: any = true;
    @observable outOfStock: boolean = false;
    @observable filterProductCategoryId: any = '';
    @observable searchStr: string = '';
    @observable filterObj: any = {};
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
        this.productStatus = selectedProduct?.status;
        this.sku =  selectedProduct?.sku;
        this.badgeId =  selectedProduct?.badgeId;
        this.badgeStatus =  selectedProduct?.badgeStatus;
        this.attributes =  selectedProduct?.attributes;
        this.mainImage =  selectedProduct?.mainImage;
        this.measurement =  selectedProduct?.measurement;
        this.galleryImage =  selectedProduct?.galleryImage;
        this.offerPrice =  selectedProduct?.offerPrice;
        this.outOfStock =  selectedProduct?.outOfStock;
        this.productCategoryId =  selectedProduct?.productCategoryId;
        this.description = Function.convertHtmlToEditorState(selectedProduct?.description);;

        this.quantity =  selectedProduct?.quantity;
        this.regularPrice =  selectedProduct?.regularPrice;
        this.formCreateProductErrors = {};
    }

    
    @action setProductDetails = (product: any) => {
        this.sku =  product?.sku;
        this.badgeId =  product?.badgeId;
        this.badgeStatus =  product?.badgeStatus;
        this.description =  product?.description;
        this.id =  product?.id;
        this.mainImage =  product?.mainImage;
        this.measurement =  product?.measurement;
        this.name =  product?.name;
        this.offerPrice =  product?.offerPrice;
        this.outOfStock =  product?.outOfStock;
        this.productCategoryId =  product?.productCategoryId;
        this.quantity =  product?.quantity;
        this.regularPrice =  product?.regularPrice;
        this.status =  product?.status;
        this.productStatus =  product?.status;
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
