/* eslint-disable array-callback-return */
/* eslint-disable */
import React from 'react'
import { Grid, List, ListItem, Typography, Container, FormControl, InputLabel, OutlinedInput,InputAdornment, IconButton } from '@mui/material'
import HybaLogo from '../assets/images/hybaLogo.svg';
import '../styles/index.scss';

const SecondFooter = (props) => {

  return (
   <Container style={{paddingTop: 35}}>
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <img src={HybaLogo} width="245px" height='49px' />
                <div style={{marginTop: 20, marginBottom: 20}}>
                <FormControl sx={{ mt: 4, width: '80%' }} className='footer-search'  variant="outlined">
                    <OutlinedInput
                        id="searchProduct"
                        placeholder='Enter Email Address'
                        style={{fontSize: '13px'}}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="email"
                            
                            edge="end"
                            className='search-icon'
                            >
                             Sign up
                            </IconButton>
                        </InputAdornment>
                        }
                        label="search"
                    />
                </FormControl>
                </div>
                <Typography gutterBottom variant="caption" component="div" color="#8A8FB9">
                    Contact info
                </Typography>
                <Typography gutterBottom variant="caption" component="div" color="#8A8FB9">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing jasbdkij . 
                </Typography>
            </Grid>
        
            <Grid item xs={3}>
                <Typography gutterBottom variant="subtitle2" component="div" color="#000000">
                    <b>Catagories</b>
                </Typography>
                <List className='footer-list'>
                    <ListItem>Laptops & Computers</ListItem>
                    <ListItem>Cameras & Photography</ListItem>
                    <ListItem>Smart Phones & Tablets</ListItem>
                    <ListItem>Video Games & Consoles</ListItem>
                    <ListItem>Waterproof Headphones</ListItem>
                </List>
            </Grid>
            <Grid item xs={2}>
                <Typography gutterBottom variant="subtitle2" component="div" color="#000000">
                    <b>Customer Care</b>
                </Typography>
                <List  className='footer-list'>
                    <ListItem>My Account</ListItem>
                    <ListItem>Discount</ListItem>
                    <ListItem>Returns</ListItem>
                    <ListItem>Orders History</ListItem>
                    <ListItem>Order Tracking</ListItem>
                </List>
            </Grid>
            <Grid item xs={3}>
                <Typography gutterBottom variant="subtitle2" component="div" color="#000000">
                    <b>Pages</b>
                </Typography>
                <List  className='footer-list'>
                    <ListItem>Blog</ListItem>
                    <ListItem>Browse the Shop</ListItem>
                    <ListItem>Category</ListItem>
                    <ListItem>Pre-Built Pages</ListItem>
                    <ListItem>Visual Composer Elements</ListItem>
                </List>
            </Grid>
        </Grid>
   </Container>
  )
}

export default SecondFooter
