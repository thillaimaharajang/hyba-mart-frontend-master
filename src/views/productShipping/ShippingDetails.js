import React, {useState} from 'react';
import {Grid, Typography, Container, Link, Button, TextField, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Premium from '../../assets/images/premium.png';
import MasterCard from '../../assets/images/masterCard.svg';
import VisaCard from '../../assets/images/visa.svg';
import RupayCard from '../../assets/images/rupay.svg';
import AmexCard from '../../assets/images/amex.svg';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Breadcrumb from '../../components/BreadCrumb';
import RedirectMsgICon from '../../assets/images/redirectMsg.svg';
import PaytmIcon from '../../assets/images/paytm.svg';

const ShippingDetails = (props) => {
    const [value, setValue] = useState('');
    const handleRadioChange = (event) => {
        setValue(event.target.value);
      };

    const CardsImgs = () => {
        return (
            <>
                <div className='card-img-holder'>
                <img alt="complex" src={MasterCard} />
                </div><div className='card-img-holder'>
                    <img alt="complex" src={VisaCard} />
                </div><div className='card-img-holder'>
                    <img alt="complex" src={RupayCard} />
                </div><div className='card-img-holder' style={{backgroundColor: '#26A6D1'}}>
                    <img alt="complex" src={AmexCard} />
                </div>
                {/* <MasterCard />
                <VisaCard />
                <RupayCard/>
                <AmexCard /> */}
                <Typography gutterBottom variant="caption" component="span" color="#000000">
                    and more
                </Typography></>
        )
    }
    
    const breadcrumbs = [
        <Link underline="hover" variant="caption" key="1" color="inherit" href="/">
          Cart
        </Link>,
        <Link
          underline="hover"
          key="2"
          color="inherit"
          variant="caption"
          href="/material-ui/getting-started/installation/"
        >
          Information
        </Link>,
        <Typography key="3" variant="caption">
          Shipping
        </Typography>,
      ];
    return (
    <Container style={{background: 'white'}}>
        <Typography style={{marginBottom: 0}} gutterBottom variant="h4" component="div" color="#000000">
            Shipping Details
        </Typography>
        <Breadcrumb breadcrumbs={breadcrumbs} separator="/"/>
        <Grid container style={{marginTop:20}}>
            <Grid item xs={8} style={{backgroundColor:'#F8F8FD', padding: '40px 30px 20px 30px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
                    <Typography gutterBottom variant="subtitle2" component="div" color="#000000">
                        <b>Contact Information</b>
                    </Typography>
                    <Typography gutterBottom variant="caption" component="div" color="#C1C8E1">
                        Already have an account? <Link underline="hover" href='#' color="#C1C8E1">Log in</Link>
                    </Typography>
                </div>
                <TextField id="email" label="Email or mobile phone number" className='cart-test-field' variant="standard" />
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: "20px 0"}}>
                    <Typography gutterBottom variant="subtitle2" component="div" color="#000000">
                        <b>Shipping address</b>
                    </Typography>
                </div>
                <TextField id="firstName" label="First name (optional)" sx={{ mr: 1, width: '49%' }} className='cart-test-field' variant="standard" />
                <TextField id="lastName" label="Last name" sx={{ width: '49%' }} className='cart-test-field' variant="standard" />
                <TextField id="address" label="Address" className='cart-test-field' variant="standard" />
                <TextField id="block" label="Appartment,suit,e.t.c (optional)" className='cart-test-field' variant="standard" />
                <TextField id="city" label="City" className='cart-test-field' variant="standard" />
                <TextField id="country" label="Bangladesh" sx={{ mr: 1, width: '49%' }} className='cart-test-field' variant="standard" />
                <TextField id="code" label="Postal Code" sx={{ width: '49%' }} className='cart-test-field' variant="standard" />
                <div style={{margin: "20px 0"}}>
                    <Typography gutterBottom variant="subtitle2" component="div" color="#000000">
                        <b>Payment</b>
                    </Typography>
                    <Typography gutterBottom variant="caption" component="div" color="#000000">
                        All transactions are secure and encrypted.
                    </Typography>
                </div>
                <FormControl sx={{ m: 3 }}  variant="standard" style={{width: '100%', margin: 0}}>
                    <RadioGroup
                    className='payment-radio'
                    aria-labelledby="demo-error-radios"
                    name="quiz"
                    value={value}
                    onChange={handleRadioChange}
                    >
                    <div className='same-box'>
                    <FormControlLabel value="credit/debit" control={<Radio />} 
                    label={
                    <Grid item xs={12} container>
                        <Grid item xs={5}>
                        <Typography gutterBottom variant="subtitle2" component="div" color="#000000" style={{marginTop: 10}}>
                            Credit / Debit Card
                        </Typography>
                        </Grid>
                        <Grid item xs={7}>
                           <CardsImgs />
                        </Grid>
                    </Grid> }/>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: "20px 0"}}>
                        <img alt="complex" src={RedirectMsgICon} width="200px" height="100px" style={{marginRight: 5, marginBottom: 10}}/>
                        <Typography gutterBottom variant="subtitle2" component="div" color="#000000" style={{marginTop: 10}}>
                            After clicking “Complete order” , you will be redirected to payment page to complete your purchase securely.
                        </Typography>
                    </div>
                    <div className='same-box' style={{paddingTop: 15, paddingBottom: 10}}>
                    <FormControlLabel value="razor" control={<Radio />} label={
                        <Grid item xs={12} container>
                        <Grid item xs={5}>
                        <Typography gutterBottom variant="subtitle2" component="div" color="#000000" style={{marginTop: 10}}>
                            Razorpay (card, UPI, NetBanking, Wallets)
                        </Typography>
                        </Grid>
                        <Grid item xs={7}>
                           <CardsImgs />
                        </Grid>
                    </Grid>
                    } />
                    <FormControlLabel value="paytm" control={<Radio />} label={
                        <Grid item xs={12} container>
                        <Grid item xs={5}>
                            <img alt="complex" src={PaytmIcon} width="auto" height="20px" style={{marginTop: 5}}/>
                        </Grid>
                        <Grid item xs={7}>
                           <CardsImgs />
                        </Grid>
                    </Grid>
                    } />
                    <FormControlLabel value="gpay" control={<Radio />} label={
                        <Grid item xs={12} container>
                        <Grid item xs={5}>
                        <Typography gutterBottom variant="subtitle2" component="div" color="#000000" style={{marginTop: 10}}>
                            Google Pay
                        </Typography>
                        </Grid>
                        <Grid item xs={7}>
                           <CardsImgs />
                        </Grid>
                    </Grid>
                    } />
                    </div>
                    </RadioGroup>
                </FormControl>

            </Grid>
            <Grid item xs={4}>
                <div>
                    <Grid container>
                        <Grid item xs={12} style={{margin: "10px 10px 20px 10px"}}>
                            <Grid container item style={{padding: "25px 0", borderRadius: 5}}>
                                <Grid item className='shipBox'>
                                    <div style={{display: 'flex', paddingTop: 20}}>
                                        <img alt="complex" src={Premium} width="80px" height="80px" style={{marginRight: 5}}/>
                                        <div>
                                        <Typography gutterBottom variant="caption" component="div" color="#000">Ut diam consequat</Typography>
                                        <Typography gutterBottom variant="caption" component="div" color="#A1A8C1">Color: Brown</Typography>
                                        <Typography gutterBottom variant="caption" component="div" color="#A1A8C1">Size: XL</Typography>
                                        </div>
                                    </div>
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <Typography gutterBottom variant="caption" component="div" color="#000">
                                            £219.00
                                        </Typography>
                                    </div>
                                </Grid>
                                <Grid item className='shipBox'>
                                    <div style={{display: 'flex', paddingTop: 20}}>
                                        <img alt="complex" src={Premium} width="80px" height="80px" style={{marginRight: 5}}/>
                                        <div>
                                        <Typography gutterBottom variant="caption" component="div" color="#000">Ut diam consequat</Typography>
                                        <Typography gutterBottom variant="caption" component="div" color="#A1A8C1">Color: Brown</Typography>
                                        <Typography gutterBottom variant="caption" component="div" color="#A1A8C1">Size: XL</Typography>
                                        </div>
                                    </div>
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <Typography gutterBottom variant="caption" component="div" color="#000">
                                            £219.00
                                        </Typography>
                                    </div>
                                </Grid>
                                <Grid item className='shipBox'>
                                    <div style={{display: 'flex', paddingTop: 20}}>
                                        <img alt="complex" src={Premium} width="80px" height="80px" style={{marginRight: 5}}/>
                                        <div>
                                        <Typography gutterBottom variant="caption" component="div" color="#000">Ut diam consequat</Typography>
                                        <Typography gutterBottom variant="caption" component="div" color="#A1A8C1">Color: Brown</Typography>
                                        <Typography gutterBottom variant="caption" component="div" color="#A1A8C1">Size: XL</Typography>
                                        </div>
                                    </div>
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <Typography gutterBottom variant="caption" component="div" color="#000">
                                            £219.00
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container item style={{backgroundColor: '#F4F4FC', padding: 25, borderRadius: 5, margin: "10px 10px 20px 10px"}}>
                                <div className='cartBox'>
                                    <Typography gutterBottom variant="subtitle2" component="span" color="#000">
                                    Subtotals:
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle2" component="span" color="#000">
                                        £219.00
                                    </Typography>
                                </div>
                                <div className='cartBox'>
                                    <Typography gutterBottom variant="subtitle2" component="span" color="#000">
                                        Totals:
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle2" component="span" color="#000">
                                        £219.00
                                    </Typography>
                                </div>
                                <Typography gutterBottom variant="caption" component="div" color="#000">
                                    <CheckCircleIcon fontSize='12px'  style={{fill: '#19D16F'}}/> Shipping & taxes calculated at checkout
                                </Typography>
                                <Button variant="contained" className='greenBtn' style={{marginTop:15}}>Complete Order</Button>
                            </Grid>

                    </Grid>
                </div>
            </Grid>
        </Grid>
    </Container>
   )
 }
 
 export default ShippingDetails