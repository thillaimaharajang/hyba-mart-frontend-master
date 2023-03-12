import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import SecureService from "../services/SecureService";
import Function from "../utils/Function";
import HttpClient from "../services/HttpClient";
import { Identity } from "@mui/base";

const ProductHelper = (navigate: NavigateFunction) => {
    let { productStore, shopStore } = RootStore;

    const GetProducts = async () => {
        let resProducts: any;

        let params = `?storeId=${shopStore.id}&page=${productStore.page}&size=${productStore.size}`;
        if (productStore?.searchStr) {
            params += `&name=${productStore?.searchStr}`;
        }
        
        productStore.isLoading = true;
        resProducts = await SecureService(navigate).GetResponse(Endpoints.Product + params);
        productStore.isLoading = false;

        if (resProducts?.status === 'OK') {
            productStore.products = resProducts?.data;
            productStore.page = resProducts?.currentPage;
            productStore.totalItems = resProducts?.totalItems;
        }
    }

    const GetProductsbyStoreName = async (id:string) => {
        let resProducts: any;
        let params = `?storeId=${shopStore.id}&page=${productStore.page}&size=${productStore.size}`;
        if (productStore?.searchStr) {
            params += `&name=${productStore?.searchStr}`;
        }
        if(productStore?.filterObj && Object.keys(productStore?.filterObj).length !== 0){
            let filterObj = productStore?.filterObj;
            params += `&${Object.keys(filterObj)[0]}=${Object.values(filterObj)[0]}`
        }
        productStore.isLoading = true;
        resProducts = await HttpClient(navigate).GetResponse(Endpoints.Product + params);
        // resProducts = await SecureService(navigate).GetResponse(Endpoints.ProductStore + params);
        productStore.isLoading = false;

        if (resProducts?.status === 'OK') {
            productStore.products = resProducts?.data;
        }
    }
    
    const GetProductsbyId = async (id:string) => {
        let resProducts: any;
        productStore.isLoading = true;
        resProducts = await HttpClient(navigate).GetResponse(Endpoints.Product +'/'+ id);
        productStore.isLoading = false;
        productStore.resetData();

        if (resProducts?.status === 'OK') {
            productStore.products = resProducts?.data;
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
        if( productStore?.galleryImage.length){
            productStore?.galleryImage.map((image:any)=>{
                productFormData.append('galleryImage', image);
            })

        }else{
            console.log("nodata: ",productStore?.galleryImage.length)
        }
        // Display the key/value pairs
        // for (var pair of productFormData.entries()) {
        //     console.log("fd",pair[0]+ ', ' + pair[1]); 
        // }        
        productFormData.append('measurement', productStore?.measurement);
        productFormData.append('quantity', productStore?.quantity);
        productFormData.append('badgeId', productStore?.badgeId);
        productFormData.append('badgeStatus', productStore?.badgeStatus);
        productFormData.append('attributes', JSON.stringify(productStore?.attributes));
        productFormData.append('status', productStore?.productStatus);
        productFormData.append('outOfStock', productStore?.outOfStock);
        
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
        if( productStore?.galleryImage.length){
            productStore?.galleryImage.map((image:any)=>{
                productFormData.append('galleryImage', image);
            })

        }else{
            console.log("Nodata in Gallery Image: ",productStore?.galleryImage.length)
        }
        // Display the key/value pairs
        // for (var pair of productFormData.entries()) {
        //     console.log("fd",pair[0]+ ', ' + pair[1]); 
        // }          
        productFormData.append('measurement', productStore?.measurement);
        productFormData.append('quantity', productStore?.quantity);
        productFormData.append('badgeId', productStore?.badgeId);
        productFormData.append('badgeStatus', productStore?.badgeStatus);
        productFormData.append('attributes', JSON.stringify(productStore?.attributes));
        productFormData.append('status', productStore?.productStatus);
        productFormData.append('outOfStock', productStore?.outOfStock);

        productStore.products = [];
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

    return { GetProducts, CreateProduct, UpdateProduct, DeleteProduct, GetProductsbyStoreName, GetProductsbyId };
}

export default ProductHelper;
