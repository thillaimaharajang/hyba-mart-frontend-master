/* eslint-disable array-callback-return */
/* eslint-disable */
import React from 'react';
import {Grid, Box, Container, Typography, Link } from '@mui/material';
import SecondHeader from '../../layout/SecondHeader';
import SubHeader from '../../layout/SubHeader';
import SecondFooter from '../../layout/SecondFooter';
import TwitterRoundICon from '../../assets/images/twitterRound.svg';
import FbRoundICon from '../../assets/images/fbRound.svg';
import InstaRoundICon from '../../assets/images/instaRound.svg';
import ShippingDetails from './ShippingDetails';

const ProductCheckout = (props) => {
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
          Shopping Cart
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
                            Checkout
                        </Typography>
                        {/* <Breadcrumb breadcrumbs={breadcrumbs} separator="." /> */}
                    </Container>
                    </div>
                    <div style={{padding: '5% 170px'}}>
                        <ShippingDetails />
                    </div>
                    <div style={{backgroundColor: '#EEEFFB', padding: '30px 170px'}}>
                        <SecondFooter></SecondFooter>
                    </div>
                    <div style={{backgroundColor: '#E7E4F8', padding: '20px 170px 10px 170px'}}>
                        <Container>
                            <Grid container spacing={2}>
                                <Grid item xs={9}>
                                    <Typography gutterBottom variant="caption" component="div" color="#8A8FB9">
                                        ©HybaMart - All Rights Reserved
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

export default ProductCheckout
