import React from 'react';
import {Grid, Typography, Container, OutlinedInput, Button, Link } from '@mui/material';
import RootStore from "../../../mobx-store/RootStore";
import AuthHelper from "../../../helpers/AuthHelper";
import { useNavigate } from "react-router-dom";
import useLogout from "../../../hooks/useLogout";

const Login = (props) => {
    let isValidForm = true;
    const logoutCb = useLogout();
    let navigate = useNavigate();

    let { authStore } = RootStore;

    const onChangeValue = (event) => {
        event.preventDefault();
        var { id, value } = event.target;
        if (id === 'email') {
            authStore.email = value;
        } else {
            authStore.password = value;
        }
        if (!isValidForm) {
            authStore.isValidLoginForm();
        }
    }

    const onSubmitLogin = async (event) => {
        event.preventDefault()
        authStore.portal = 'store';
        if (authStore?.isValidLoginForm()) {
            isValidForm = true;
            await AuthHelper().Login(navigate, logoutCb);
        } else {
            isValidForm = false;
        }
        console.log(authStore?.formLoginErrors?.email)
    }

    return (
    <Container>
        <Grid container>
            <Grid item xs={12} style={{margin: "20px 10px"}} className="flexCenter">
                <Grid container item style={{backgroundColor: 'white', boxShadow: '0px 0px 25px 10px #F6F4FD', padding: 25, borderRadius: 5, width: '47%'}}>
                    <h3 style={{ textAlign: 'center', width: '100%'}}>Login</h3>
                    <Typography gutterBottom variant="caption" component="div" color="#9096B2" style={{ textAlign: 'center', width: '100%', marginBottom: 20}}>
                        Please login using account detail bellow.
                    </Typography>
                    <OutlinedInput
                        id="email"
                        className='outline-input'
                        placeholder='Email Address'
                        style={{fontSize: '13px', marginBottom: 15}}
                        label="email"
                        onChange={onChangeValue} 
                        defaultValue={authStore?.email}
                        error={authStore?.formLoginErrors?.email}
                    />
                    <OutlinedInput
                        id="password"
                        className='outline-input'
                        type="password"
                        placeholder='Password'
                        style={{fontSize: '13px', marginBottom: 15}}
                        label="search"
                        onChange={onChangeValue} 
                        defaultValue={authStore?.password}
                        error={authStore?.formLoginErrors?.password}
                    />
                    <Link href="#" underline="hover" color='#9096B2' className='link-style'>
                        Forgot your password?
                    </Link>
                    <Button variant="contained" className='pinkBtn' style={{marginTop:15, width: '100%'} } onClick={onSubmitLogin}>Sign In</Button>
                    <Typography gutterBottom  component="div" color="#9096B2" style={{ textAlign: 'center', width: '100%', marginTop: 20, fontSize: 14}}>
                        Don’t have an Account?  {' '}
                         <Link href="#" underline="hover" color='#7E33E0' className='link-style'>
                           Create account
                        </Link>
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    </Container>
   )
 }
 
 export default Login