import { FormGroup, Loader, PageTransition } from "../../components";
import { Images } from "../../constant/Images";
import { Button, Checkbox, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import RootStore from "../../mobx-store/RootStore";
import { useNavigate } from "react-router-dom";
import Function from "../../utils/Function";
import { observer } from 'mobx-react-lite';
import CopyRight from "../../components/CopyRight";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import AuthHelper from "../../helpers/AuthHelper";
import GoogleLogin from "react-google-login";
import useLogout from "../../hooks/useLogout";

const { COLORS } = Function.getTheme();
let isValidForm: boolean = true;

const Registration: React.FC = () => {
    let { authStore } = RootStore;
    let navigate = useNavigate();
    const logoutCb = useLogout();

    const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        var { name, value } = event.target;

        if (name === 'email') {
            authStore.email = value;
        }
        if (!isValidForm) {
            authStore.isValidRegistrationForm();
        }
    }

    const togglePrivacyPolicy = (e: CheckboxChangeEvent) => {
        authStore.isPrivacyPolicyEnabled = e?.target?.checked;
        if (!isValidForm) {
            authStore.isValidRegistrationForm();
        }
    }

    const onSubmitRegistration = async (event: any) => {
        event.preventDefault()
        if (authStore?.isValidRegistrationForm()) {
            isValidForm = true;
            await AuthHelper().Registration(navigate);
        } else {
            isValidForm = false;
        }
    }

    const googleAuthSuccess = async (res: any) => {
        await AuthHelper().RegisterWithGoogle(navigate, res?.tokenId);
    }

    const googleAuthFail = (e: any) => {
        console.log("fail", e)
    }

    return <PageTransition>
        <div className="d-flex">
            <div className="col-6 d-flex justify-content-center">
                <div className="flex-column" style={{ height: '100%', width: '55%' }}>
                    <div className="row justify-content-center align-items-center" style={{ height: '26%' }}>
                        <div className="d-flex">
                            <img src={Images.BrandLogoWithName} alt="Brand Logo With Text" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                        </div>
                    </div>
                    <div className="d-flex flex-column" style={{ height: '74%' }}>
                        <form onSubmit={onSubmitRegistration}>
                            <div>
                                <img src={Images.RegistrationText} alt="Registration Text" style={{ width: '5rem' }} />
                            </div>
                            <div className="mt-1 mb-2" style={{ color: '#635D5D', fontSize: '15px' }}>Enter your email to sign up</div>
                            <FormGroup isRequired label='Email' labelColor="#000000" error={authStore?.formRegistrationErrors?.email}>
                                <div className="d-flex">
                                    <div className="col">
                                        <Input name='email' placeholder="Email" prefix={<UserOutlined />}
                                            className='col login-input' autoComplete="off"
                                            onChange={onChangeValue} value={authStore?.email} />
                                    </div>
                                </div>
                            </FormGroup>
                            <div className="row justify-content-center mt-3">
                                <div className="col-12">
                                    <Button htmlType='submit' className="login-btn" type="primary" block>SIGN UP</Button>
                                </div>
                                <div className="mt-3">
                                    <FormGroup isRequired error={authStore?.formRegistrationErrors?.privacyPolicy}>
                                        <Checkbox name="privacyPolicy" checked={authStore.isPrivacyPolicyEnabled} style={{ lineHeight: '14px', fontSize: '13px' }}
                                            onChange={togglePrivacyPolicy}>
                                            <div className="pe-0" style={{ fontSize: '11px' }}>
                                                by selecting this, you agree to Hyba Mart’s <span className="fw-bold">Privacy Policy</span> and <span className="fw-bold">Terms and conditions</span></div>
                                        </Checkbox>
                                    </FormGroup>
                                </div>
                                <div className="another-login mt-2" style={{ fontWeight: 'bold' }}>Or</div>
                                <div className="d-flex justify-content-center mt-2">
                                    <GoogleLogin
                                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
                                        buttonText="Sign up with Google"
                                        onSuccess={googleAuthSuccess}
                                        onFailure={googleAuthFail}
                                        className="custom-google-btn"
                                        cookiePolicy={'single_host_origin'}
                                    />
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

export default observer(Registration);

