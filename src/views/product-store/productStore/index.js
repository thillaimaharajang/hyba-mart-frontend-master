/* eslint-disable array-callback-return */
/* eslint-disable */
import React,{useEffect} from 'react';
import Advertisement from './Advertisement'
import NewArrivals from './NewArrivals'
import AllProducts from './AllProducts'
import Footer from '../../../layout/Footer'
import { useNavigate,useParams } from "react-router-dom";
import ProductHelper from "../../../helpers/ProductHelper";
import RootStore from "../../../mobx-store/RootStore";
import ShopHelper from "../../../helpers/ShopHelper";
import ProductCategoryHelper from "../../../helpers/ProductCategoryHelper";
import BannerHelper from "../../../helpers/BannerHelper";

const ProductStore = (props) => {

  const {shopStore} = RootStore

  const navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    getProductStoreDetails();
  }, []);
  
  const getProductStoreDetails = async () => {
    await ShopHelper(navigate).GetShopDetailsByName(id);

    if(shopStore.id){
      await BannerHelper(navigate).GetBannerByStoreName(); 
      await ProductHelper(navigate).GetProductsbyStoreName();
      await ProductCategoryHelper(navigate).GetProductCategoriesInsecure();
    }else{
      navigate('/main-dashboard', { replace: true });
    }
  }
  
   return (
    <div style={{overflow: 'auto', height: '100vh'}}>
    <Advertisement />
    {/* <NewArrivals /> */}
    <AllProducts />
    <Footer />
    </div>
  )
}

export default ProductStore
