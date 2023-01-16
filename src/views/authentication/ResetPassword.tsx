import { Button, Input } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { FormGroup, Loader, PageTransition } from "../../components";
import RegistrationLayout from "../../components/RegistrationLayout";
import { Images } from "../../constant/Images";
import RootStore from "../../mobx-store/RootStore";
import { EyeTwoTone, EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons';
import { observer } from "mobx-react-lite";
import AuthHelper from "../../helpers/AuthHelper";
import { useEffect } from "react";
import Function from '../../utils/Function';

let isValidForm: boolean = true;

const ResetPassword = () => {

    let { authStore } = RootStore;
    let navigate = useNavigate();
    let location = useLocation();

    useEffect(() => {
        Function.checkNavigationStatus(navigate, location);
    }, []);

    const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        var { name, value } = event.target;

        if (name === 'password') {
            authStore.password = value;
        } else {
            authStore.confirmPassword = value;
        }
        if (!isValidForm) {
            authStore.isValidResetPasswordForm();
        }
    }

    const onSubmitResetPassword = async (event: any) => {
        event.preventDefault()
        if (authStore?.isValidResetPasswordForm()) {
            isValidForm = true;
            await AuthHelper().ResetPassword(navigate);
        } else {
            isValidForm = false;
        }
    }

    return <PageTransition>
        <RegistrationLayout header="New Password" subHeader="One Time Verification Password">
            <div className="d-flex justify-content-center">
                <img src={Images.ResetPasswordLogo} alt="Reset Password Logo" style={{ width: '55%' }} />
            </div>
            <div className="text-center mt-2">
                <div className="mb-1" style={{ color: '#252F40', fontWeight: '600', fontSize: '19px' }}>Set New Password</div>
            </div>
            <div className="text-center" style={{ lineHeight: '15px', color: '#635D5D', fontSize: '11px' }}>
                <div>Enter your new password below and check the hint while setting it.</div>
            </div>
            <form onSubmit={onSubmitResetPassword} className="mt-2">
                <FormGroup isRequired label="New Password" labelColor="#000000" error={authStore?.formResetPasswordErrors?.password}>
                    <Input.Password name='password' placeholder="Password" prefix={<LockOutlined />}
                        className='login-input' autoComplete="off"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        onChange={onChangeValue} value={authStore?.password} />
                </FormGroup>
                <FormGroup isRequired label="Confirm Password" labelColor="#000000" error={authStore?.formResetPasswordErrors?.confirmPassword}>
                    <Input.Password name='confirmPassword' placeholder="Confirm Password" prefix={<LockOutlined />}
                        className='login-input' autoComplete="off"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        onChange={onChangeValue} value={authStore?.confirmPassword} />
                </FormGroup>
                <div className="mt-3 d-flex justify-content-center">
                    <div className="col-9">
                        <Button htmlType='submit' className="login-btn" type="primary" block>SUBMIT</Button>
                    </div>
                </div>
            </form>
            <Loader visibility={authStore?.isLoading} />
        </RegistrationLayout>
    </PageTransition>
}

export default observer(ResetPassword);
