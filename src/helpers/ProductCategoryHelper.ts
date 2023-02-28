import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import SecureService from "../services/SecureService";
import HttpClient from "../services/HttpClient";

const ProductCategoryHelper = (navigate: NavigateFunction) => {
    let { productCategory, shopStore } = RootStore;

    const GetProductCategories = async () => {
        let params = `?storeId=${shopStore.id}&page=${productCategory.page}&size=${productCategory.size}`;
        let resProductCategories: any;
        if (productCategory?.searchStr) {
            params += `&name=${productCategory?.searchStr}`;
        }

        productCategory.isLoading = true;

        resProductCategories = await SecureService(navigate).GetResponse(Endpoints.ProductCategory + params);
        productCategory.isLoading = false;

        if (resProductCategories?.status === 'OK') {
            productCategory.productCategories = resProductCategories?.data;
            productCategory.page = resProductCategories?.currentPage;
            productCategory.totalItems = resProductCategories?.totalItems;
        }
    }
    const GetProductCategoriesInsecure = async () => {
        let params = `?storeId=${shopStore.id}&page=${productCategory.page}&size=${productCategory.size}`;
        let resProductCategories: any;
        if (productCategory?.searchStr) {
            params += `&name=${productCategory?.searchStr}`;
        }

        productCategory.isLoading = true;

        resProductCategories = await HttpClient(navigate).GetResponse(Endpoints.ProductCategory + params);
        productCategory.isLoading = false;

        if (resProductCategories?.status === 'OK') {
            productCategory.productCategories = resProductCategories?.data;
            productCategory.page = resProductCategories?.currentPage;
            productCategory.totalItems = resProductCategories?.totalItems;
        }
    }

    const CreateProductCategory = async () => {
        let resCreateProductCategory: any;
        let createProductCategoryObj: any = {
            name: productCategory?.name,
            subCategory: productCategory?.subCategory,
            status: productCategory?.status,
            storeId: shopStore?.id
        }

        productCategory.isLoading = true;
        resCreateProductCategory = await SecureService(navigate).PostResponse(Endpoints.ProductCategory, 'POST', createProductCategoryObj);
        productCategory.isLoading = false;

        if (resCreateProductCategory?.status === 'CREATED') {
            message.success(resCreateProductCategory?.message, 5);
            await GetProductCategories();
        }
    }

    const UpdateProductCategory = async () => {
        let resUpdateProductCategory: any;
        let updateProductCategoryObj: any = {
            id: productCategory?.id,
            name: productCategory?.name,
            subCategory: productCategory?.subCategory,
            status: productCategory?.status,
            storeId: shopStore?.id
        }

        productCategory.isLoading = true;
        resUpdateProductCategory = await SecureService(navigate).PostResponse(Endpoints.ProductCategory, 'PUT', updateProductCategoryObj);
        productCategory.isLoading = false;

        if (resUpdateProductCategory?.status === 'OK') {
            message.success(resUpdateProductCategory?.message, 5);
            await GetProductCategories();
        }
    }

    const DeleteProductCategory = async (productCategoryId: any) => {
        let resDeleteProductCategory: any;
        let deleteProductCategoryObj: any = {
            id: productCategoryId
        }

        productCategory.isLoading = true;
        resDeleteProductCategory = await SecureService(navigate).PostResponse(Endpoints.ProductCategory, 'DELETE', deleteProductCategoryObj);
        productCategory.isLoading = false;

        if (resDeleteProductCategory?.status === 'OK') {
            message.success(resDeleteProductCategory?.message, 5);
            await GetProductCategories();
        }
    }

    return { GetProductCategories, GetProductCategoriesInsecure, CreateProductCategory, UpdateProductCategory, DeleteProductCategory };
}

export default ProductCategoryHelper;
