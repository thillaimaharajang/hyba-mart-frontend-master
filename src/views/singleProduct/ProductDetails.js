import React from 'react';
import {Grid, Link, Container, Typography } from '@mui/material';
import Premium from '../../assets/images/premium.png';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TwitterRoundICon from '../../assets/images/twitterRound.svg';
import FbRoundICon from '../../assets/images/fbRound.svg';
import InstaRoundICon from '../../assets/images/instaRound.svg';

const ProductDetails = (props) => {

    return (
    <Container style={{background: 'white', boxShadow: '0px 0px 25px 10px #F6F4FD'}}>
        <Grid container>
            <Grid item xs={2}>
                <div><img alt="complex" src={Premium} width="100px"/></div>
                <div><img alt="complex" src={Premium} width="100px"/></div>
                <div><img alt="complex" src={Premium} width="100px"/></div>
            </Grid>
            <Grid item xs={3} style={{display: 'flex', alignItems: 'center'}}>
                <div><img alt="complex" src={Premium} width="200px"/></div>
            </Grid>
            <Grid item xs={6} style={{marginTop: 30}}>
                <Typography gutterBottom variant="h4" component="div">
                    Playwood arm chair
                </Typography>
                <Typography variant="caption" gutterBottom component="div" style={{marginBottom: 10}}>
                    <StarIcon fontSize='small' className='rating-yellow' /> <StarIcon className='rating-yellow' fontSize='small'/><StarIcon className='rating-yellow' fontSize='small' /><StarIcon className='rating-yellow' fontSize='small' /><StarIcon className='rating-yellow' fontSize='small' /> (22)
                </Typography>
                <Typography variant="caption" gutterBottom component="div" style={{marginBottom: 10}}>
                    <b>$32.00 <span>$32.00</span></b>
                </Typography>
                <Typography variant="caption" gutterBottom component="div" style={{marginBottom: 10}}>
                    <b>Color</b>
                </Typography>
                <Typography variant="caption" gutterBottom color="#A9ACC6" component="div" style={{marginBottom: 10}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus porttitor purus, et volutpat sit.
                </Typography>
                <Typography variant="caption" gutterBottom component="div" style={{marginBottom: 10}}>
                    <b>Add To Cart</b> <FavoriteBorderIcon style={{marginLeft: 20}} fontSize='small'/>
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