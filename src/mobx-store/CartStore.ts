import { action, makeObservable, observable } from "mobx";

import { IProductList } from "../interface/IProduct";

export default class CartStore {
    @observable products: IProductList[] = [];
    @observable page: number = 0;
    @observable size: number = 10;
    @observable totalItems: number = 0;
    @observable searchStr: string = '';
    @observable id: any = 0;
    @observable quantity: number = 0 ;
    @observable productId: number = 0 ;
    @observable userId: number = 0 ;
    @observable storeId: number = 0 ;
    @observable filterObj: any = {};
    @observable isLoading: boolean = false;
    @observable formCreateProductErrors: any = {};

    constructor() {
        makeObservable(this);
    }

}
