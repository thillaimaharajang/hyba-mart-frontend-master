import React from 'react';
import {Grid, Typography, Container, OutlinedInput, Button, Link } from '@mui/material';
import OrderCompletionIcon from '../../assets/images/order-completion.svg';
import ClockIcon from '../../assets/images/clock.svg';
import NotepadIcon from '../../assets/images/notepad.svg';
import LocalStorage from '../../storage/LocalStorage';

const OrderStatus = (props) => {
    let storeUrl = LocalStorage.get('storeUrl')
    return (
    <Container>
        <Grid container>
            <Grid item xs={12} style={{margin: "0 10px 20px 10px"}} className="flexCenter">
                <Grid container item className='grid-holder'>
                    <img src={ClockIcon} alt='clock' style={{position:'absolute',left:'-5%', top: 0, width: '80px'}} />
                    <img src={NotepadIcon} alt='notepad' style={{position:'absolute',right:'-4%', bottom: '-10%', width: '60px'}} />
                    <img src={OrderCompletionIcon} alt='order completion' />
                    <Typography gutterBottom variant="h6" component="div" style={{ margin: 20, width: '100%', textAlign: 'center'}}>
                        <b>Your Order Is Completed!</b>
                    </Typography>
                    <Typography gutterBottom variant="caption" component="div" color="#9096B2" style={{ margin: 20, width: '100%', textAlign: 'center'}}>
                        Thank you for your order! Your order is being processed and will be completed within 3-6
                        hours. You will receive an email confirmation when your order is completed.
                    </Typography>
                    <Button variant="contained" href={storeUrl} className='pinkBtn' style={{marginTop:15, marginBottom: 20}}>Continue Shopping</Button>
                </Grid>
            </Grid>
        </Grid>
    </Container>
   )
 }
 
 export default OrderStatus