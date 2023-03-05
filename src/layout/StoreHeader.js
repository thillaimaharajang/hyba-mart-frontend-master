/* eslint-disable array-callback-return */
/* eslint-disable */
import React, {useState} from 'react';
import { Grid, Typography, Link, Divider, Select, MenuItem, Container} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CartIcon from '../assets/images/cart.svg';
import '../styles/index.scss';
import { useNavigate } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import CartHelper from "../helpers/CartHelper";
import { message } from "antd";
import LocalStorage from '../storage/LocalStorage';

const SecondHeader = (props) => {
    const [language, setLanguage] = useState('English');
    const [usd, setUsd] = useState('USD');
    const navigate = useNavigate();
    let { authStore } = RootStore;
    let getMsg = null;

    const handleLangChange = (event) => {
        setLanguage(event.target.value);
    };
    const handleUsdChange = (event) => {
        setUsd(event.target.value);
    };
    const navigateToLogin = async() =>{
        let isLoggedIn = LocalStorage.get('isLoggedIn');
        if(isLoggedIn){
            message.warning(getMsg ? getMsg : "You were already logged in", 5);

        }else{
            navigate('/store-login');

        }
    }

    const getCartItems = async() => {
        if(authStore?.userId){
          await CartHelper(navigate).GetCart(); 
          navigate('/shopping-cart');
        }else{
            message.warning(getMsg ? getMsg : "Please login to view cart", 5);
            navigate('/store-login');
        }
    }

   return (
    <Container>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Typography gutterBottom variant="caption" component="span" color="#fff" style={{marginRight: 20}}>
                    <MailOutlineIcon sx={{ fontSize: "16px" }} /> mhhasanul@gmail.com
                </Typography>
                <Typography gutterBottom variant="caption" component="span" color="#fff">
                    <PhoneInTalkIcon sx={{ fontSize: "15px" }} /> (12345)67890
                </Typography>
            </Grid>
            <Grid item xs={6} className='flexEnd'>
                <Select labelId="label" id="selectLanguage" value={language} className='dropdown-border' onChange={handleLangChange} MenuProps={{ style: { maxWidth: 250, maxHeight: 300, position: 'absolute' }, disableScrollLock: true }}>
                    <MenuItem value={language} tabIndex="0" style={{ display: 'none' }}>
                    <span className="cursor-pointer  flexCenter">
                        <div className="drop-label" style={{ color: '#002a57' }}>English</div>
                    </span>
                    </MenuItem>
                    <MenuItem value={1} tabIndex="-2" className="dropdown-menu-item">
                        Spanish
                    </MenuItem>
                    <Divider />
                    <MenuItem value={2} tabIndex="-1" className="dropdown-menu-item">
                        Chinese
                    </MenuItem>
                </Select>
                <Select labelId="label" id="usd" value={usd} className='dropdown-border' onChange={handleUsdChange} MenuProps={{ style: { maxWidth: 250, maxHeight: 300, position: 'absolute' }, disableScrollLock: true }}>
                    <MenuItem value={usd} tabIndex="0" style={{ display: 'none' }}>
                    <span className="cursor-pointer flexCenter">
                        <div className="drop-label" style={{ color: '#002a57' }}>USD</div>
                    </span>
                    </MenuItem>
                    <MenuItem value={1} tabIndex="-2" className="dropdown-menu-item">
                        123
                    </MenuItem>
                    <Divider />
                    <MenuItem value={2} tabIndex="-1" className="dropdown-menu-item">
                        456
                    </MenuItem>
                </Select>
                <Typography gutterBottom variant="caption" component="span" color="#fff" className='cursor-pointer' style={{marginRight: 20}} onClick={navigateToLogin}>
                Login<PersonOutlineIcon sx={{ fontSize: "16px" }} />
                </Typography>
                <Typography gutterBottom variant="caption" component="span" color="#fff" className='cursor-pointer' style={{marginRight: 20}} onClick={getCartItems}>
                   Wishlist <FavoriteBorderIcon sx={{ fontSize: "15px" }} />
                </Typography>
                <Typography gutterBottom component="span" color="#fff" className='cursor-pointer'>
                    <img src={CartIcon} width="16px" />
                </Typography>
            </Grid>
        </Grid>
    </Container>
  )
}

export default SecondHeader
