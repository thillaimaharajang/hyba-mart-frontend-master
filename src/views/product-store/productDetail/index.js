/* eslint-disable array-callback-return */
/* eslint-disable */
import React,{useEffect} from 'react';
import {Grid, Box, Container, Typography, Link } from '@mui/material';
import SecondHeader from '../../../layout/StoreHeader';
import SubHeader from '../../../layout/SubHeader';
import SecondFooter from '../../../layout/StoreFooter';
import TwitterRoundICon from '../../../assets/images/twitterRound.svg';
import FbRoundICon from '../../../assets/images/fbRound.svg';
import InstaRoundICon from '../../../assets/images/instaRound.svg';
import ProductDetails from './ProductDetails';
import ProductDescription from './ProductDescription';
import RelatedProducts from './RelatedProducts';
import Breadcrumb from '../../../components/BreadCrumb';
import { useNavigate,useParams } from "react-router-dom";
import RootStore from "../../../mobx-store/RootStore";
import ProductHelper from "../../../helpers/ProductHelper";
import ShopHelper from "../../../helpers/ShopHelper";
import { observer } from 'mobx-react-lite';

const ProductDetail = (props) => {   
    const navigate = useNavigate(); 
    const {productStore} = RootStore
    let { id } = useParams();

    useEffect(() => {
      getProductDetails();
    }, []);
    
    const getProductDetails = async () => {
        await ProductHelper(navigate).GetProductsbyId(id);
  
      if(productStore.products[0].id){
        console.log("Product Id available");
        await ShopHelper(navigate).GetShopDetailsByName(productStore.products[0].storeId);


      }else{
        navigate('/main-dashboard', { replace: true });
      }
    }
    const breadcrumbs = [
        <Link underline="hover" variant="caption" key="1" color="inherit" href="/">
          Home
        </Link>,
        <Link
          underline="hover"
          key="2"
          color="inherit"
          variant="caption"
          href="/material-ui/getting-started/installation/"
        >
          Pages
        </Link>,
        <Typography key="3" variant="caption" color="#FB2E86">
          Product Details
        </Typography>,
      ];
      
   return (
    <div style={{overflow: 'auto', height: '100vh', fontSize: 13}}>
        <Box>
            <Grid container>
                <Grid item xs={12}>
                    <div style={{backgroundColor: '#7E33E0', padding: '10px 170px'}}>
                        <SecondHeader />
                    </div>
                    <div style={{padding: '20px 170px'}}>
                        <SubHeader />
                    </div>
                    <div className='flexStart' style={{padding: '10px 170px', backgroundColor: '#F6F5FF', height: 200}}>
                    <Container >
                        <Typography style={{marginBottom: 0}} gutterBottom variant="h4" component="div" color="#000000">
                            Product Details
                        </Typography>
                        <Breadcrumb breadcrumbs={breadcrumbs} separator="." />
                    </Container>
                    </div>
                    <div style={{padding: '5% 170px'}}>
                        <ProductDetails />
                    </div>
                    <div style={{padding: '40px 170px', backgroundColor: '#F9F8FE'}}>
                        <ProductDescription />
                    </div>
                    <div style={{padding: '30px 170px'}}>
                        <RelatedProducts />
                    </div>
                    <div style={{backgroundColor: '#EEEFFB', padding: '30px 170px'}}>
                        <SecondFooter></SecondFooter>
                    </div>
                    <div style={{backgroundColor: '#E7E4F8', padding: '20px 170px 10px 170px'}}>
                        <Container>
                            <Grid container spacing={2}>
                                <Grid item xs={9}>
                                    <Typography gutterBottom variant="caption" component="div" color="#8A8FB9">
                                        ??HybaMart - All Rights Reserved
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} className='flexEnd'>
                                    <img src={FbRoundICon} width="20px" style={{marginRight: 10}}/>
                                    <img src={InstaRoundICon} width="20px" style={{marginRight: 10}} />
                                    <img src={TwitterRoundICon} width="20px" />
                                </Grid>
                            </Grid>
                        </Container>
                    </div>
                </Grid>
            </Grid>
        </Box>
    </div>
  )
}

export default observer(ProductDetail)
