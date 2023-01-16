import { action, makeObservable, observable } from "mobx";
import Messages from "../constant/Messages";
import { IProductCategoryList } from "../interface/IProductCategory";

export default class ProductCategoryStore {
    @observable productCategories: IProductCategoryList[] = [];
    @observable page: number = 0;
    @observable size: number = 10;
    @observable totalItems: number = 0;
    @observable searchStr: string = '';
    @observable id: any = 0;
    @observable name: string | undefined = '';
    @observable subCategory: string | undefined = '';
    @observable status: boolean | undefined = true;
    @observable isLoading: boolean = false;
    @observable formCreateProductCategoryErrors: any = {};

    constructor() {
        makeObservable(this);
    }

    @action resetData() {
        this.productCategories = [];
        this.page = 0;
        this.size = 10;
        this.totalItems = 0
        this.searchStr = '';
        this.resetPostData();
    }

    @action resetPostData() {
        this.id = 0;
        this.name = '';
        this.subCategory = '';
        this.status = true;
        this.isLoading = false;
        this.formCreateProductCategoryErrors = {};
    }

    @action setProductCategoryValues = (id: any) => {
        const selectedProductCategory = this.productCategories.find((productCategory) => productCategory.id === id);

        this.id = selectedProductCategory?.id;
        this.name = selectedProductCategory?.name;
        this.subCategory = selectedProductCategory?.subCategory;
        this.status = selectedProductCategory?.status;
        this.formCreateProductCategoryErrors = {};
    }

    @action isValidCreateProductCategoryForm() {
        this.formCreateProductCategoryErrors = {};

        if (!this.name) {
            this.formCreateProductCategoryErrors.name = Messages.EmptyProductCategoryName;
        }

        if (!this.subCategory) {
            this.formCreateProductCategoryErrors.subCategory = Messages.EmptyProductSubCategoryName;
        }

        if (Object.keys(this.formCreateProductCategoryErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }
}
