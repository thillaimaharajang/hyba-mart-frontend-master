import { PageTransition, FormGroup, Loader } from "../../components";
import { observer } from 'mobx-react-lite';
import { Button, Input } from "antd";
import RootStore from "../../mobx-store/RootStore";
import { useNavigate } from "react-router-dom";
import { EyeTwoTone, EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons';
import AuthHelper from "../../helpers/AuthHelper";
import useLogout from "../../hooks/useLogout";

let isValidForm: boolean = true;

const ResetPassword: React.FC = () => {
    let { authStore } = RootStore;
    let navigate = useNavigate();
    const logoutCb = useLogout();

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
            await AuthHelper().ResetPassword(navigate, logoutCb);
        } else {
            isValidForm = false;
        }
    }

    return <PageTransition>
        <form onSubmit={onSubmitResetPassword} className="mt-2">
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label="New Password" labelColor="#000000" error={authStore?.formResetPasswordErrors?.password}>
                        <Input.Password name='password' placeholder="Password" prefix={<LockOutlined />}
                            className="custom-input" autoComplete="off"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            onChange={onChangeValue} value={authStore?.password} />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label="Confirm Password" labelColor="#000000" error={authStore?.formResetPasswordErrors?.confirmPassword}>
                        <Input.Password name='confirmPassword' placeholder="Confirm Password" prefix={<LockOutlined />}
                            className="custom-input" autoComplete="off"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            onChange={onChangeValue} value={authStore?.confirmPassword} />
                    </FormGroup>
                </div>
            </div>
            <div className="mt-3">
                <div className="col-4">
                    <Button htmlType='submit' className="custom-btn" type="primary">SUBMIT</Button>
                </div>
            </div>
        </form>
        <Loader visibility={authStore?.isLoading} />
    </PageTransition>
}

export default observer(ResetPassword);
