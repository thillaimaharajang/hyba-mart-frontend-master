/* eslint-disable array-callback-return */
/* eslint-disable */
import React, { useState ,useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Button, Grid, Box, Typography,List, ListItem, Stack } from '@mui/material'
import Logo from '../../../assets/images/logo.svg'
import LetsConnect from '../../../assets/images/letsConnect.svg'
import HandMBrand from '../../../assets/images/brands/hm.svg'
import ObeyBrand from '../../../assets/images/brands/obey.svg'
import ArrowBrand from '../../../assets/images/brands/arrow.svg'
import LactoseBrand from '../../../assets/images/brands/lactose.svg'
import LevisBrand from '../../../assets/images/brands/levis.svg'
import LouisBrand from '../../../assets/images/brands/louis.svg'
import Tops from '../../../assets/images/top.svg'
import WomenTop from '../../../assets/images/women-top.svg'
import Skirt from '../../../assets/images/skirt.svg'
import Shirt from '../../../assets/images/shirt.svg'
import PersonIcon from '@mui/icons-material/Person';
import Carousel from '../../../components/Carousel';
import RootStore from "../../../mobx-store/RootStore";
import Function from "../../../utils/Function"
import ProductHelper from "../../../helpers/ProductHelper";
import LocalStorage from '../../../storage/LocalStorage';
import { message } from "antd";
import { observer } from "mobx-react-lite";

const Advertisement = (props) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const brandUrl = [HandMBrand, ObeyBrand, ArrowBrand, LactoseBrand, LevisBrand, LouisBrand];
  const { bannerStore , productCategory , productStore, shopStore} = RootStore;
  const navigate = useNavigate();
  const profileImage = Function.loadImagePath(shopStore?.storeDetails?.profileImage);
 
  let bannerImage1,bannerImage2,bannerImage3;
  console.log("bannerStore",bannerStore)

  bannerImage1 = Function.loadImagePath(bannerStore?.bannerImage1);
  console.log("bannerImage1",bannerImage1)

  bannerImage2 = Function.loadImagePath(bannerStore?.bannerImage2);
  bannerImage3 = Function.loadImagePath(bannerStore?.bannerImage3);
  let getMsg = null;
  
   const navigateToLogin = async() =>{
    let isLoggedIn = LocalStorage.get('isLoggedIn');
    if(isLoggedIn){
        message.warning(getMsg ? getMsg : "You were already logged in", 5);

    }else{
        navigate('/store-login');

    }  }


  const filterProducts = async(value) =>{

    console.log("Clicked something ", value)
    if(value===0){
      productStore.filterObj = null;
    }else{
      productStore.filterObj = {'productCategoryId':value}
    }
    await ProductHelper(navigate).GetProductsbyStoreName();
  }
  const images = [
    {
      key: 0,
      imgPath: bannerImage1,
      label: "bannerImage1"
    },
    {
      key: 1,
      imgPath: bannerImage2,
      label: "bannerImage2"
    },
    {
      key: 2,
      imgPath: bannerImage3,
      label: "bannerImage3"
    }
  ];
  return (
    <Box>
      <Grid container spacing={2} style={{padding: '20px 100px',backgroundColor: '#ECECEC'}}>
          <Grid item xs={3} style={{backgroundColor: '#FFFFFF', padding: '10px 10px', marginTop: 10, display: 'flex', alignItems: 'center'}}>
            <div style={{display: 'flex'}}>
                <img src={profileImage} width="40%" style={{padding: "0 20px", borderRight: '2px solid #23254B'}} />
                <h4 className='ad-white-box'>{shopStore.businessName.toUpperCase()}</h4>
            </div>
            </Grid>
            <Grid item xs={9} style={{backgroundColor: '#FFFFFF', padding: '10px 10px', marginTop: 10, display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
              <Typography gutterBottom variant="subtitle1" onClick={()=>{
                setShowDropdown(!showDropdown)
              }} component="span" style={{marginRight: 15, marginBottom: 0, cursor: 'pointer-'}}>
                <b>Categories</b>
              </Typography>
              <Button onClick={navigateToLogin} style={{backgroundColor: '#FC9F66', boxShadow: 'none'}} variant="contained" startIcon={<PersonIcon />}>
                Sign In
              </Button>
            </Grid>
        </Grid>
        
        <Grid container spacing={2} style={{padding: '20px 100px',backgroundColor: '#ECECEC'}}>
          {showDropdown && (
            <div className='category-dropdown'>
            <Grid container spacing={2}>
              <Grid item xs={6} style={{ display: 'flex', alignItems: 'self-start'}}>
                <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-around'}}>
                    <img src={Shirt} width="28%" />
                    
                    <List direction="row" className='category-list'>
                    <ListItem  onClick = {()=>{ filterProducts(0)}}>All</ListItem>
                        {productCategory.productCategories.map((item, i)=> (
                          <ListItem key={i} onClick = {()=>{ filterProducts(item.id)}}>{item.name}</ListItem>
                        ))}

                        {/* <ListItem><b>MEN</b></ListItem>
                        <ListItem>Jackets</ListItem>
                        <ListItem>Jumpsuits</ListItem> */}
                    </List>
                </div>
              </Grid>
              {/* <Grid item xs={6} style={{ display: 'flex', alignItems: 'self-start'}}>
              <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-around'}}>
                    <img src={Tops} width="28%" />
                    <List direction="row" className='category-list'>
                        <ListItem><b>WOMAN</b></ListItem>
                        <ListItem>Knitwear</ListItem>
                        <ListItem>Skirts</ListItem>
                        <ListItem>Sweatshirts</ListItem>
                    </List>
                </div>
              </Grid>
              <Grid item xs={6} style={{ display: 'flex', alignItems: 'self-start'}}>
                <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-around'}}>
                      <img src={WomenTop} width="28%" />
                      <List direction="row" className='category-list'>
                          <ListItem><b>KIDS</b></ListItem>
                          <ListItem>T-Shirts</ListItem>
                          <ListItem>Dungarees</ListItem>
                          <ListItem>Shorts</ListItem>
                      </List>
                  </div>
              </Grid>
              <Grid item xs={6} style={{ display: 'flex', alignItems: 'self-start'}}>
                <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-around'}}>
                      <img src={Skirt} width="28%" />
                      <List direction="row" className='category-list'>
                          <ListItem><b>ACCESSORIES</b></ListItem>
                          <ListItem>Scarf</ListItem>
                          <ListItem>Hats</ListItem>
                          <ListItem>Sunglasses</ListItem>
                      </List>
                  </div>
              </Grid> */}
            </Grid>
        </div>
          )}
          <Grid item xs={7} style={{padding: '10px 10px', marginTop: 10}}>
            <div>
                <img src={LetsConnect} height="15%" width="60%"  style={{padding: '30px 0'}} />
            </div>
            <Typography variant="body2" component="div">
              Live for Influential and Innovative fashion!
            </Typography>
            <Button style={{backgroundColor: '#FC9F66', boxShadow: 'none', textTransform: 'capitalize', color: 'black', margin: '20px 0'}} variant="contained">
                Shop Now
            </Button>
            </Grid>
            <Grid item xs={5} style={{padding: '10px 10px', marginTop: 10, display: 'flex', alignItems: 'center'}}>
              <Carousel images={images} />
            </Grid>
        </Grid>
        <Grid container spacing={2} style={{padding: '0 100px',backgroundColor: '#FADCCB'}}>
          <Grid item xs={12} style={{padding: '10px 10px'}}>
            <List component={Stack} direction="row">
                {brandUrl.map((item, i)=> (
                    <ListItem key={i}>
                        <img src={item} width="100px" />
                    </ListItem>
                ))}
            </List>
          </Grid>
        </Grid>
      </Box>
  )
}

export default observer(Advertisement)
