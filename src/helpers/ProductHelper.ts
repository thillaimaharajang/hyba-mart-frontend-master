import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import SecureService from "../services/SecureService";
import Function from "../utils/Function";

const ProductHelper = (navigate: NavigateFunction) => {
    let { productStore, shopStore } = RootStore;

    const GetProducts = async () => {
        let resProducts: any;

        let params = `?storeId=${shopStore.id}&page=${productStore.page}&size=${productStore.size}`;
        if (productStore?.searchStr) {
            params += `&name=${productStore?.searchStr}`;
        }

        productStore.isLoading = true;
        resProducts = await SecureService(navigate).GetResponse(Endpoints.Pages + params);
        productStore.isLoading = false;

        if (resProducts?.status === 'OK') {
            productStore.products = resProducts?.data;
            productStore.page = resProducts?.currentPage;
            productStore.totalItems = resProducts?.totalItems;
        }
    }

    const CreateProduct = async () => {
        let resCreateProduct: any;
        let productFormData: any = new FormData();
        productFormData.append('storeId', shopStore?.id);
        productFormData.append('name', productStore?.name);
        productFormData.append('productCategoryId', productStore?.productCategoryId);
        productFormData.append('subCategory', productStore?.productSubCategoryName);
        productFormData.append('regularPrice', productStore?.regularPrice);
        productFormData.append('offerPrice', productStore?.offerPrice);
        productFormData.append('sku', productStore?.sku);
        productFormData.append('description', Function.convertEditorStateToHtml(productStore?.description));
        productFormData.append('mainImage', productStore?.mainImage);
        productFormData.append('galleryImages', productStore?.galleryImages);
        productFormData.append('measurement', productStore?.measurement);
        productFormData.append('quantity', productStore?.quantity);
        productFormData.append('badgeId', productStore?.badgeId);
        productFormData.append('badgeStatus', productStore?.badgeStatus);
        productFormData.append('attributes', productStore?.attributes);
        productFormData.append('status', productStore?.status);
        productFormData.append('outOfStockStatus', productStore?.outOfStockStatus);

        productStore.isLoading = true;
        resCreateProduct = await SecureService(navigate).PostResponse(Endpoints.Product, 'POST', productFormData, true);
        productStore.isLoading = false;

        if (resCreateProduct?.status === 'CREATED') {
            message.success(resCreateProduct?.message, 5);
        }
    }

    const UpdateProduct = async () => {
        let resUpdateProduct: any;
        let productFormData: any = new FormData();
        productFormData.append('id', productStore?.id);
        productFormData.append('name', productStore?.name);
        productFormData.append('productCategoryId', productStore?.productCategoryId);
        productFormData.append('subCategory', productStore?.productSubCategoryName);
        productFormData.append('regularPrice', productStore?.regularPrice);
        productFormData.append('offerPrice', productStore?.offerPrice);
        productFormData.append('sku', productStore?.sku);
        productFormData.append('description', Function.convertEditorStateToHtml(productStore?.description));
        productFormData.append('mainImage', productStore?.mainImage);
        productFormData.append('galleryImages', productStore?.galleryImages);
        productFormData.append('measurement', productStore?.measurement);
        productFormData.append('quantity', productStore?.quantity);
        productFormData.append('badgeId', productStore?.badgeId);
        productFormData.append('badgeStatus', productStore?.badgeStatus);
        productFormData.append('attributes', productStore?.attributes);
        productFormData.append('status', productStore?.status);
        productFormData.append('outOfStockStatus', productStore?.outOfStockStatus);

        productStore.isLoading = true;
        resUpdateProduct = await SecureService(navigate).PostResponse(Endpoints.Product, 'PUT', productFormData, true);
        productStore.isLoading = false;

        if (resUpdateProduct?.status === 'OK') {
            message.success(resUpdateProduct?.message, 5);
        }
    }

    const DeleteProduct = async (productId: any) => {
        let resDeleteProduct: any;
        let deleteProductObj: any = {
            id: productId
        }

        productStore.isLoading = true;
        resDeleteProduct = await SecureService(navigate).PostResponse(Endpoints.Product, 'DELETE', deleteProductObj);
        productStore.isLoading = false;

        if (resDeleteProduct?.status === 'OK') {
            message.success(resDeleteProduct?.message, 5);
        }
    }

    return { GetProducts, CreateProduct, UpdateProduct, DeleteProduct };
}

export default ProductHelper;
