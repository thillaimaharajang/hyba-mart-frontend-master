import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { FormGroup, Loader, PageTransition } from "../../components";
import RegistrationLayout from "../../components/RegistrationLayout";
import { Images } from "../../constant/Images";
import RootStore from "../../mobx-store/RootStore";
import { UserOutlined } from '@ant-design/icons';
import { observer } from "mobx-react-lite";
import Function from '../../utils/Function';
import AuthHelper from "../../helpers/AuthHelper";

let isValidForm: boolean = true;

const ForgotPassword = () => {

    let { authStore } = RootStore;
    let navigate = useNavigate();

    const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        var { name, value } = event.target;

        if (name === 'email') {
            authStore.email = value;
        }

        if (!isValidForm) {
            authStore.isValidForgotPasswordForm();
        }
    }

    const onSubmitForgotPassword = async (event: any) => {
        event.preventDefault()
        if (authStore?.isValidForgotPasswordForm()) {
            isValidForm = true;
            await AuthHelper().ForgotPassword(navigate);
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
                <div style={{ color: '#252F40', fontWeight: '600', fontSize: '19px' }}>Forgot Password</div>
            </div>
            <div className="text-center mt-1" style={{ lineHeight: '15px', color: '#635D5D', fontSize: '11px' }}>
                <div>Opps. It happens to the best of us. Input your email address to fix the issue.</div>
            </div>
            <form onSubmit={onSubmitForgotPassword} className="mt-3">
                <FormGroup isRequired label='Email' labelColor="#000000" error={authStore?.formForgotPasswordErrors?.email}>
                    <Input name='email' placeholder='Email' prefix={<UserOutlined />}
                        className='login-input' autoComplete="off"
                        onChange={onChangeValue} value={authStore?.email} />
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

export default observer(ForgotPassword);
