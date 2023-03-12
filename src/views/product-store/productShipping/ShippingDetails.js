import React, {useEffect, useState} from 'react';
import {Grid, Typography, Container, Link, Button, TextField, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Premium from '../../../assets/images/premium.png';
import MasterCard from '../../../assets/images/masterCard.svg';
import VisaCard from '../../../assets/images/visa.svg';
import RupayCard from '../../../assets/images/rupay.svg';
import AmexCard from '../../../assets/images/amex.svg';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Breadcrumb from '../../../components/BreadCrumb';
import RedirectMsgICon from '../../../assets/images/redirectMsg.svg';
import PaytmIcon from '../../../assets/images/paytm.svg';
import RootStore from "../../../mobx-store/RootStore";
import { useNavigate } from "react-router-dom";
import Function from "../../../utils/Function"
import OrderHelper from "../../../helpers/OrderHelper";
import { observer } from "mobx-react-lite";

const ShippingDetails = (props) => {
    const [value, setValue] = useState('');
    let { paymentStore, cartStore ,shippingStore,shopStore,authStore } = RootStore;  
    
    const handleRadioChange = (event) => {
        setValue(event.target.value);
        shippingStore.paymentId = event.target.value;
        shippingStore.paymentModeId = event.target.name;
      };

    let navigate = useNavigate();
    let data = cartStore.products;
    const total = data.reduce((total, num) => {
        return total + Number(num.total);
      }, 0)
      shippingStore.orderTotal=total

    let paymentModes = paymentStore.paymentModes;

    const onChangeValue = (event) => {
        event.preventDefault();
        var { id, value } = event.target;
        if (id === 'firstName') {
            shippingStore.firstName = value;
        }else if (id === 'lastName') {
            shippingStore.lastName = value;
        }else if (id === 'address') {
            shippingStore.address = value;
        }else if (id === 'apartment') {
            shippingStore.apartment = value;
        }else if (id === 'city') {
            shippingStore.city = value;
        }else if (id === 'state') {
            shippingStore.state = value;
        }else if (id === 'postalCode') {
            shippingStore.postalCode = value;
        }else if (id === 'mobile') {
            shippingStore.mobile = value;
        }
    }

    function loadScript(src) {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };
          document.body.appendChild(script);
        });
    }

    const completeOrder = async() =>{
        let createOrderObj = {
            name: shippingStore?.firstName +" "+ shippingStore?.lastName,
            address:"new addess",
            price: shippingStore?.orderTotal,
            userId:authStore?.userId,
            storeId:shopStore?.storeDetails?.id,
            paymentModeId:shippingStore?.paymentModeId,
            paymentId:shippingStore?.paymentId,

            // storeId: shopStore?.id
        }

        let createdOrder = await OrderHelper(navigate).CreateOrder(createOrderObj)
        if(createdOrder?.data){
            const res = await loadScript(
                "https://checkout.razorpay.com/v1/checkout.js"
              );
          
              if (!res) {
                alert("Razorpay SDK failed to load. Are you online?");
                return;
              }
          
              const options = {
                  key: "rzp_test_zsqZSeSqO2fgTz", // Enter the Key ID generated from the Dashboard
                amount: shippingStore?.orderTotal, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: "INR",
                order_id: createdOrder?.data?.orderId, 
                
                name: "HybaMart",
                handler: function (response) {
                  
                  console.log("response",response)
                  navigate('/order-completion', { replace: true });
                },
                prefill: {
                  name: "Rajat",
                  email: "rajat@rajat.com",
                  phone_number: "9899999999",
                },
              };
              console.log("Options: ",options)
              const paymentObject = new window.Razorpay(options);
              paymentObject.open();
        }

           
          
    }
  
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
        <Grid key='1' container style={{marginTop:20}}>
            <Grid item xs={8} style={{backgroundColor:'#F8F8FD', padding: '40px 30px 20px 30px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
                    <Typography gutterBottom variant="subtitle2" component="div" color="#000000">
                        <b>Contact Information</b>
                    </Typography>
                    <Typography gutterBottom variant="caption" component="div" color="#C1C8E1">
                        Already have an account? <Link underline="hover" href='#' color="#C1C8E1">Log in</Link>
                    </Typography>
                </div>
                <TextField onChange={onChangeValue} defaultValue={shippingStore?.mobile} id="mobile" label="Email or mobile phone number" className='cart-test-field' variant="standard" />
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: "20px 0"}}>
                    <Typography gutterBottom variant="subtitle2" component="div" color="#000000">
                        <b>Shipping address</b>
                    </Typography>
                </div>
               
               
               
                <TextField onChange={onChangeValue} defaultValue={shippingStore?.firstName} id="firstName" label="First name (optional)" sx={{ mr: 1, width: '49%' }} className='cart-test-field' variant="standard" />
                <TextField onChange={onChangeValue} defaultValue={shippingStore?.lastName} id="lastName" label="Last name" sx={{ width: '49%' }} className='cart-test-field' variant="standard" />
                <TextField onChange={onChangeValue} defaultValue={shippingStore?.address} id="address" label="Address" className='cart-test-field' variant="standard" />
                <TextField onChange={onChangeValue} defaultValue={shippingStore?.appartment} id="apartment" label="Appartment,suit,e.t.c (optional)" className='cart-test-field' variant="standard" />
                <TextField onChange={onChangeValue} defaultValue={shippingStore?.city} id="city" label="City" className='cart-test-field' variant="standard" />
                <TextField onChange={onChangeValue} defaultValue={shippingStore?.country} id="country" label="Bangladesh" sx={{ mr: 1, width: '49%' }} className='cart-test-field' variant="standard" />
                <TextField onChange={onChangeValue} defaultValue={shippingStore?.postalCode} id="postalCode" label="Postal Code" sx={{ width: '49%' }} className='cart-test-field' variant="standard" />
               
               
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
                    {paymentModes.map((mode)=>{
                        if(mode.isEnabled){
                            return <FormControlLabel key={mode.id} name={mode.paymentModeId.toString()} value={mode.id} control={<Radio />} 
                                label={
                                <Grid key='1' item xs={12} container>
                                    <Grid item xs={5}>
                                    <Typography gutterBottom variant="subtitle2" component="div" color="#000000" style={{marginTop: 10}}>
                                        {mode.name}
                                    </Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                    <CardsImgs />
                                    </Grid>
                            </Grid> }/>

                        }
                    })}
                    
                    
                    </div>

                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: "20px 0"}}>
                        <img alt="complex" src={RedirectMsgICon} width="200px" height="100px" style={{marginRight: 5, marginBottom: 10}}/>
                        <Typography gutterBottom variant="subtitle2" component="div" color="#000000" style={{marginTop: 10}}>
                            After clicking “Complete order” , you will be redirected to payment page to complete your purchase securely.
                        </Typography>
                    </div>
                 </RadioGroup>
                </FormControl>

            </Grid>
            <Grid item xs={4}>
                <div>
                    <Grid container>
                        <Grid item xs={12} style={{margin: "10px 10px 20px 10px"}}>
                            <Grid container item style={{padding: "25px 0", borderRadius: 5}}>
                            {data.map((product)=>{
                                let productImage = Function.loadImagePath("productImages/" +product.productImage);                            

                                return <Grid item className='shipBox'>
                                        <div style={{display: 'flex', paddingTop: 20}}>
                                            <img alt="complex" src={productImage} width="80px" height="80px" style={{marginRight: 5}}/>
                                            <div>
                                            <Typography gutterBottom variant="caption" component="div" color="#000">{product.productName}</Typography>
                                            <Typography gutterBottom variant="caption" component="div" color="#A1A8C1">Color: Brown</Typography>
                                            <Typography gutterBottom variant="caption" component="div" color="#A1A8C1">Size: XL</Typography>
                                            </div>
                                        </div>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <Typography gutterBottom variant="caption" component="div" color="#000">
                                                {product.total}
                                            </Typography>
                                        </div>
                                    </Grid>
                            })}
                            </Grid>
                        </Grid>
                        <Grid container item style={{backgroundColor: '#F4F4FC', padding: 25, borderRadius: 5, margin: "10px 10px 20px 10px"}}>
                                <div className='cartBox'>
                                    <Typography gutterBottom variant="subtitle2" component="span" color="#000">
                                    Subtotals:
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle2" component="span" color="#000">
                                        {total}
                                    </Typography>
                                </div>
                                <div className='cartBox'>
                                    <Typography gutterBottom variant="subtitle2" component="span" color="#000">
                                        Totals:
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle2" component="span" color="#000">
                                    {total}
                                    </Typography>
                                </div>
                                <Typography gutterBottom variant="caption" component="div" color="#000">
                                    <CheckCircleIcon fontSize='12px'  style={{fill: '#19D16F'}}/> Shipping & taxes calculated at checkout
                                </Typography>
                                <Button variant="contained" className='greenBtn' style={{marginTop:15}} onClick={completeOrder}>Complete Order</Button>
                            </Grid>

                    </Grid>
                </div>

                
            </Grid>
        </Grid>
    </Container>
   )
 }
 
 export default observer(ShippingDetails)