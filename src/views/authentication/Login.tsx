import { FormGroup, Loader, PageTransition } from "../../components";
import { Images } from "../../constant/Images";
import { Button, Input, Switch } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import RootStore from "../../mobx-store/RootStore";
import { useNavigate } from "react-router-dom";
import Function from "../../utils/Function";
import AuthHelper from "../../helpers/AuthHelper";
import { observer } from 'mobx-react-lite';
import CopyRight from "../../components/CopyRight";
import GoogleLogin from "react-google-login";
import { gapi } from 'gapi-script';
import { useEffect } from "react";
import useLogout from "../../hooks/useLogout";

const { COLORS } = Function.getTheme();
let isValidForm: boolean = true;

const Login: React.FC = () => {
    let { authStore } = RootStore;
    let navigate = useNavigate();
    const logoutCb = useLogout();

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                scope: 'email',
            });
        }

        gapi.load('client:auth2', start);
    }, []);

    const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        var { name, value } = event.target;

        if (name === 'email') {
            authStore.email = value;
        } else {
            authStore.password = value;
        }
        if (!isValidForm) {
            authStore.isValidLoginForm();
        }
    }

    const onSubmitLogin = async (event: any) => {
        event.preventDefault()
        authStore.portal = 'admin';
        if (authStore?.isValidLoginForm()) {
            isValidForm = true;
            await AuthHelper().Login(navigate, logoutCb);
        } else {
            isValidForm = false;
        }
    }

    const toggleRememberMe = (checked: boolean) => {
        authStore.isRememberMe = checked;
    }

    const navigateToRegistration = () => {
        navigate('/registration');
    }

    const navigateToForgotPassword = () => {
        navigate('/forgot-password');
    }

    const googleAuthSuccess = async (res: any) => {
        await AuthHelper().LoginWithGoogle(navigate, res?.tokenId, logoutCb)
    }

    const googleAuthFail = (e: any) => {
        console.log("fail", e)
    }

    return <PageTransition>
        <div className="d-flex">
            <div className="col-6 d-flex justify-content-center">
                <div className="flex-column" style={{ height: '100%', width: '55%' }}>
                    <div className="row justify-content-center align-items-center" style={{ height: '25%' }}>
                        <div className="d-flex">
                            <img src={Images.BrandLogoWithName} alt="Brand Logo With Text" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                        </div>
                    </div>
                    <div className="d-flex flex-column" style={{ height: '75%' }}>
                        <form onSubmit={onSubmitLogin}>
                            <div>
                                <img src={Images.LoginText} alt="Login Text" style={{ width: '4rem' }} />
                            </div>
                            <div className="mt-1 mb-2" style={{ color: '#635D5D', fontSize: '15px' }}>Enter your email to sign in</div>
                            <FormGroup isRequired label='Email' labelColor="#000000" error={authStore?.formLoginErrors?.email}>
                                <Input name='email' placeholder="Email" prefix={<UserOutlined />}
                                    className='login-input' autoComplete="off"
                                    onChange={onChangeValue} value={authStore?.email} />
                            </FormGroup>
                            <FormGroup isRequired label='Password' labelColor="#000000" error={authStore?.formLoginErrors?.password}>
                                <Input.Password name='password' placeholder="Password" prefix={<LockOutlined />}
                                    className='login-input' autoComplete="off"
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    onChange={onChangeValue} value={authStore?.password} />
                            </FormGroup>
                            <div className="d-flex align-items-center">
                                <div className="col-6">
                                    <Switch checked={authStore?.isRememberMe} onChange={toggleRememberMe} size='small' />
                                    <span className="ms-2" style={{ fontSize: '12.5px', fontWeight: '400', color: '#000000' }}>Remember me</span>
                                </div>
                                <div className="d-flex col-6 justify-content-end">
                                    <div className="pe-0 gradient-link-btn text-right" style={{ fontWeight: 'bold', fontSize: '13px' }}
                                        onClick={navigateToForgotPassword}>Forgot Password?</div>
                                </div>
                            </div>
                            <div className="row justify-content-center mt-3">
                                <div className="col-12">
                                    <Button htmlType='submit' className="login-btn" type="primary" block>SIGN IN</Button>
                                </div>
                                <div className="another-login mt-2" style={{ fontWeight: 'bold' }}>Or</div>
                                <div className="d-flex justify-content-center mt-2">
                                    <GoogleLogin
                                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
                                        buttonText="Sign in with Google"
                                        onSuccess={googleAuthSuccess}
                                        onFailure={googleAuthFail}
                                        className="custom-google-btn"
                                        cookiePolicy={'single_host_origin'}
                                    />
                                </div>
                                <div className="mt-3 text-center">
                                    <small style={{ color: '#635D5D', fontSize: '12px', fontWeight: '600' }}>Don't have an account?</small>
                                    <small className="ps-2 gradient-link-btn" style={{ fontSize: '13px', fontWeight: 'bold' }}
                                        onClick={navigateToRegistration}>Sign up</small>
                                </div>
                                <CopyRight />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-6">
                <img src={Images.LoginBg} alt="Login Bg" style={{ width: '100%', height: '100vh' }} />
            </div>
            <Loader visibility={authStore?.isLoading} />
        </div>
    </PageTransition>
}

export default observer(Login);
