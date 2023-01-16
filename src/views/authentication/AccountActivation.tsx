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
import useLogout from "../../hooks/useLogout";

let isValidForm: boolean = true;

const AccountActivation = () => {

    let { authStore } = RootStore;
    let navigate = useNavigate();
    let location = useLocation();
    const logoutCb = useLogout();

    useEffect(() => {
        Function.checkNavigationStatus(navigate, location);
    }, []);

    const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        let { value } = event.target;

        authStore.password = value;
        if (!isValidForm) {
            authStore.isValidAccountActivationForm();
        }
    }

    const onSubmitAccountActivation = async (event: any) => {
        event.preventDefault()
        if (authStore?.isValidAccountActivationForm()) {
            isValidForm = true;
            await AuthHelper().AccountActivation(navigate, logoutCb);
        } else {
            isValidForm = false;
        }
    }

    return <PageTransition>
        <RegistrationLayout header="Sign Up" subHeader="Create new account by filling up details">
            <div className="d-flex justify-content-center">
                <img src={Images.ForgotPasswordLogo} alt="Forgot Password Logo" style={{ width: '55%' }} />
            </div>
            <div className="text-center mt-2">
                <div className="mb-1" style={{ color: '#252F40', fontWeight: '600', fontSize: '21px' }}>Enter Password</div>
            </div>
            <form onSubmit={onSubmitAccountActivation} className="mt-3">
                <FormGroup isRequired label='Password' error={authStore?.formAccountActivationErrors?.password}>
                    <Input.Password name='password' placeholder="Password" prefix={<LockOutlined />}
                        className='login-input' autoComplete="off"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        onChange={onChangeValue} value={authStore?.password} />
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

export default observer(AccountActivation);
