/* eslint-disable array-callback-return */
/* eslint-disable */
import React from 'react'
import { Button, Grid, Box, Typography,List, ListItem, Stack } from '@mui/material'
import Logo from '../../assets/images/logo.svg'
import LetsConnect from '../../assets/images/letsConnect.svg'
import HandMBrand from '../../assets/images/brands/hm.svg'
import ObeyBrand from '../../assets/images/brands/obey.svg'
import ArrowBrand from '../../assets/images/brands/arrow.svg'
import LactoseBrand from '../../assets/images/brands/lactose.svg'
import LevisBrand from '../../assets/images/brands/levis.svg'
import LouisBrand from '../../assets/images/brands/louis.svg'
import PersonIcon from '@mui/icons-material/Person';
import Carousel from '../../components/Carousel';

const Advertisement = (props) => {
  const brandUrl = [HandMBrand, ObeyBrand, ArrowBrand, LactoseBrand, LevisBrand, LouisBrand]
  const images = [
    {
      label: 'San Francisco – Oakland Bay Bridge, United States',
      imgPath:
        'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
      label: 'Bird',
      imgPath:
        'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
      label: 'Bali, Indonesia',
      imgPath:
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
    },
    {
      label: 'Goč, Serbia',
      imgPath:
        'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    },
  ];
  return (
    <Box>
      <Grid container spacing={2} style={{padding: '20px 100px',backgroundColor: '#ECECEC'}}>
          <Grid item xs={3} style={{backgroundColor: '#FFFFFF', padding: '10px 10px', marginTop: 10, display: 'flex', alignItems: 'center'}}>
            <div style={{display: 'flex'}}>
                <img src={Logo} width="30px" style={{paddingRight: 20, borderRight: '2px solid #23254B'}} />
                <h4 className='ad-white-box'>HYBA MART</h4>
            </div>
            </Grid>
            <Grid item xs={9} style={{backgroundColor: '#FFFFFF', padding: '10px 10px', marginTop: 10, display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
              <Typography gutterBottom variant="subtitle1" component="span" style={{marginRight: 15, marginBottom: 0}}>
                <b>Categories</b>
              </Typography>
              <Button style={{backgroundColor: '#FC9F66', boxShadow: 'none'}} variant="contained" startIcon={<PersonIcon />}>
                Sign In
              </Button>
            </Grid>
        </Grid>
        <Grid container spacing={2} style={{padding: '20px 100px',backgroundColor: '#ECECEC'}}>
          <Grid item xs={7} style={{padding: '10px 10px', marginTop: 10}}>
            <div>
                <img src={LetsConnect} height="250px"  style={{padding: '30px 0'}} />
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
        <Grid container spacing={2} style={{padding: '20px 100px',backgroundColor: '#FADCCB'}}>
          <Grid item xs={12} style={{padding: '10px 10px', marginTop: 10}}>
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

export default Advertisement
