import React from 'react';
import {Grid, Link, Container, Typography } from '@mui/material';
import Premium from '../../../assets/images/premium.png';
import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TwitterRoundICon from '../../../assets/images/twitterRound.svg';
import FbRoundICon from '../../../assets/images/fbRound.svg';
import InstaRoundICon from '../../../assets/images/instaRound.svg';
import { useNavigate } from "react-router-dom";
import RootStore from "../../../mobx-store/RootStore";
import CartHelper from "../../../helpers/CartHelper";
import { message } from 'antd';
import Function from "../../../utils/Function";

const ProductDetails = (props) => {
    const navigate = useNavigate();
    let { productStore ,authStore, shopStore} = RootStore;
    console.log("authStore",authStore)

    const productDetail = productStore.products[0];
    console.log("ProductDetails:",productDetail)
    const gallery = productDetail?.galleryImage ? productDetail?.galleryImage : [];
    const productImage = productDetail?.mainImage ? Function.loadImagePath(productDetail?.mainImage) : Premium
   
    const addProducttoCart = async(id) => {
        let getMsg = null;
        if(authStore?.userId){
            let cartObj = {
                productId: productDetail?.id,
                storeId: shopStore?.id,
                userId: authStore?.userId,
                quantity: 1
            }
            await CartHelper(navigate).addtoCart(cartObj);
        }else{
            message.warning(getMsg ? getMsg : "Please Login to Add to Cart", 5);
            navigate('/store-login');
        }
    }

    return (
    <Container style={{background: 'white', boxShadow: '0px 0px 25px 10px #F6F4FD'}}>
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"></link>
        <Grid container>
            <Grid item xs={2}>
                {
                    gallery.map((image)=>{
                        return <div key={image.id.toString()}><img alt="complex" src={Function.loadImagePath(image.productImage)} width="100px"/></div>
                    })
                }

            </Grid>
            <Grid item xs={3} style={{display: 'flex', alignItems: 'center'}}>
                <div><img alt="complex" src={productImage} width="200px"/></div>
            </Grid>
            <Grid item xs={6} style={{marginTop: 30}}>
                <Typography gutterBottom variant="h4" component="div">
                { productDetail?.name }
                </Typography>
                <Typography variant="caption" gutterBottom component="div" style={{marginBottom: 10}}>
                    <StarIcon fontSize='small' className='rating-yellow' /> <StarIcon className='rating-yellow' fontSize='small'/><StarIcon className='rating-yellow' fontSize='small' /><StarIcon className='rating-yellow' fontSize='small' /><StarIcon className='rating-yellow' fontSize='small' /> (22)
                </Typography>
                <Typography variant="caption" gutterBottom component="div" style={{marginBottom: 10}}>
                    <b ><span style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}><i className="fa fa-inr"></i>{ productDetail?.regularPrice }</span> 
                    <span> <i className="fa fa-inr"></i>{ productDetail?.offerPrice }</span></b>
                </Typography>
                <Typography variant="caption" gutterBottom component="div" style={{marginBottom: 10}}>
                    <b>Color</b>
                </Typography>
                <Typography variant="caption" gutterBottom color="#A9ACC6" component="div" style={{marginBottom: 10}}>
                        <div dangerouslySetInnerHTML={{ __html: productDetail?.description}} />
                </Typography>
                <Typography variant="caption" gutterBottom component="div" style={{marginBottom: 10}}>
                    <b>Add To Cart</b> <FavoriteBorderIcon onClick={()=>{addProducttoCart(productDetail?.id)}} style={{marginLeft: 20}} fontSize='small'/>
                </Typography>
                <Typography variant="caption" gutterBottom component="div" style={{marginBottom: 10}}>
                    <b>Categories:</b>
                </Typography>
                <Typography variant="caption" gutterBottom component="div" style={{marginBottom: 10}}>
                    <b>Tags</b>
                </Typography>
                <Typography variant="caption" gutterBottom component="div" style={{marginBottom: 10}}>
                    <b>Share</b> 
                    <Link style={{marginLeft: 20}}><img alt='fb' src={FbRoundICon} width="15px" style={{marginRight: 10}}/></Link>
                    <Link><img alt='insta' src={InstaRoundICon} width="15px" style={{marginRight: 10}}/></Link>
                    <Link><img alt='twitter' src={TwitterRoundICon} width="15px" style={{marginRight: 10}}/></Link>
                </Typography>
            </Grid>
        </Grid>
    </Container>
   )
 }
 
 export default ProductDetails