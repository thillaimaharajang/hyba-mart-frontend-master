import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import HttpClient from "../services/HttpClient";
import ShopHelper from "./ShopHelper";
import LocalStorage from "../storage/LocalStorage";

const AuthHelper = () => {
    let { authStore, shopStore } = RootStore;

    const Login = async (navigate: NavigateFunction, logoutCb: any) => {
        console.log("Logging in from ",authStore?.portal)
        let resLogin: any;
        const loginPostData = {
            email: authStore?.email,
            password: authStore?.password,
            portal: authStore?.portal
        };

        authStore.isLoading = true;
        resLogin = await HttpClient().PostResponse(Endpoints.Login, 'POST', loginPostData);
        authStore.isLoading = false;

        if (resLogin?.status === 'OK') {
            authStore.isLoggedIn = true;
            LocalStorage.set('USER_INFO',resLogin?.data);
            LocalStorage.set('isLoggedIn',true);
            LocalStorage.set('portal',authStore?.portal);

            authStore.setProfileInfo(resLogin?.data);
            message.success(resLogin?.message, 5);
            console.log("shopStore",shopStore)
            if (authStore.roleId === 3){
                navigate('/product-store/'+shopStore?.storeDetails?.uniqueName, { replace: true });
            }else{
                if(authStore.portal === 'admin'){
                    await ShopHelper(navigate).GetShopDetailsByUserId();
                    if (shopStore?.storeDetails?.id) {
                        navigate('/main-dashboard', { replace: true });
                    } else {
                        shopStore.isInfoModal = true;
                        navigate('/settings', { replace: true });
                    }
                }else{
                    navigate('/product-store/'+shopStore?.storeDetails?.uniqueName, { replace: true });
                }

            }           
        }
    }

    const LoginWithGoogle = async (navigate: NavigateFunction, tokenId: string, logoutCb: any) => {
        let resLogin: any;
        const loginWithGooglePostData = {
            token: tokenId
        };

        authStore.isLoading = true;
        resLogin = await HttpClient().PostResponse(Endpoints.GoogleLogin, 'POST', loginWithGooglePostData);
        authStore.isLoading = false;

        if (resLogin?.status === 'OK') {
            authStore.isLoggedIn = true;
            authStore.setProfileInfo(resLogin?.data, true);
            message.success(resLogin?.message, 5);
            await ShopHelper(navigate).GetShopDetailsByUserId();
            if (shopStore?.storeDetails?.id) {
                navigate('/main-dashboard', { replace: true });
            } else {
                shopStore.isInfoModal = true;
                navigate('/settings', { replace: true });
            }
        }
    }

    const RegisterWithGoogle = async (navigate: NavigateFunction, tokenId: string) => {
        let resRegister: any;
        const registerWithGooglePostData = {
            token: tokenId
        };

        authStore.isLoading = true;
        resRegister = await HttpClient().PostResponse(Endpoints.GoogleRegistration, 'POST', registerWithGooglePostData);
        authStore.isLoading = false;

        if (resRegister?.status === 'CREATED') {
            message.success(resRegister?.message, 5);
            if (navigate) {
                navigate('/login');
            }
        }
    }

    const Registration = async (navigate?: NavigateFunction) => {
        let resRegistration;
        const registrationPostData = {
            name: authStore?.name,
            email: authStore?.email
        };

        authStore.isLoading = true;
        resRegistration = await HttpClient().PostResponse(Endpoints.Registration, 'POST', registrationPostData);
        authStore.otp = '';
        authStore.isLoading = false;

        if (resRegistration?.status === 'CREATED') {
            message.success(resRegistration?.message, 5);
            if (navigate) {
                navigate('/registration-otp-verification', { state: { isSecureNavigate: true } });
            }
        }
    }

    const RegistrationOTPVerification = async (navigate: NavigateFunction) => {
        let resRegOTPVerification;
        const regOTPVerificationPostData = {
            email: authStore?.email,
            otp: authStore?.otp
        };

        authStore.isLoading = true;
        resRegOTPVerification = await HttpClient().PostResponse(Endpoints.RegOTPVerification, 'POST', regOTPVerificationPostData);
        authStore.otp = '';
        authStore.isLoading = false;

        if (resRegOTPVerification?.status === 'OK') {
            message.success(resRegOTPVerification?.message, 5);
            navigate('/account-activation', { state: { isSecureNavigate: true }, replace: true });
        }
    }

    const AccountActivation = async (navigate: NavigateFunction, logoutCb: any) => {
        let resAccountActivation;
        const regAccountActivationPostData = {
            email: authStore?.email,
            password: authStore?.password
        };

        authStore.isLoading = true;
        resAccountActivation = await HttpClient().PostResponse(Endpoints.AccountActivation, 'POST', regAccountActivationPostData);
        authStore.isLoading = false;

        if (resAccountActivation?.status === 'OK') {
            message.success(resAccountActivation?.message, 5);
            await Login(navigate, logoutCb);
        }
    }

    const ForgotPassword = async (navigate?: NavigateFunction) => {
        let resForgotPassword;
        const regForgotPasswordPostData = {
            email: authStore?.email
        };

        authStore.isLoading = true;
        resForgotPassword = await HttpClient().PostResponse(Endpoints.ForgotPassword, 'POST', regForgotPasswordPostData);
        authStore.isLoading = false;

        if (resForgotPassword?.status === 'OK') {
            message.success(resForgotPassword?.message, 5);
            if (navigate) {
                navigate('/forgot-password-otp-verification', { state: { isSecureNavigate: true }, replace: true });
            }
        }
    }

    const ForgotPasswordOTPVerification = async (navigate?: NavigateFunction) => {
        let resForgotPasswordOTPVerification;
        const regForgotPasswordOTPVerifyPostData = {
            email: authStore?.email,
            otp: authStore?.otp
        };

        authStore.isLoading = true;
        resForgotPasswordOTPVerification = await HttpClient().PostResponse(Endpoints.ForgotPasswordOTPVerification, 'POST', regForgotPasswordOTPVerifyPostData);
        authStore.isLoading = false;

        if (resForgotPasswordOTPVerification?.status === 'OK') {
            message.success(resForgotPasswordOTPVerification?.message, 5);
            if (navigate) {
                navigate('/reset-password', { state: { isSecureNavigate: true }, replace: true });
            }
        }
    }

    const ResetPassword = async (navigate: NavigateFunction, logoutCb: any = null) => {
        let resResetPassword;
        const regResetPasswordPostData = {
            email: authStore?.email,
            password: authStore?.password
        };

        authStore.isLoading = true;
        resResetPassword = await HttpClient().PostResponse(Endpoints.ResetPassword, 'POST', regResetPasswordPostData);
        authStore.isLoading = false;

        if (resResetPassword?.status === 'OK') {
            authStore.password = '';
            authStore.confirmPassword = '';
            message.success(resResetPassword?.message, 5);
            if(logoutCb) {
                logoutCb();
            }
        }
    }

    return {
        Login, RegisterWithGoogle, LoginWithGoogle, Registration, RegistrationOTPVerification, AccountActivation,
        ForgotPassword, ForgotPasswordOTPVerification, ResetPassword
    };
}

export default AuthHelper;
