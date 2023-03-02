import { Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { FormGroup, Loader, OTPInput, PageTransition } from "../../components";
import RegistrationLayout from "../../components/RegistrationLayout";
import { Images } from "../../constant/Images";
import RootStore from "../../mobx-store/RootStore";
import { observer } from "mobx-react-lite";
import AuthHelper from "../../helpers/AuthHelper";
import { useEffect } from "react";
import Function from '../../utils/Function';

let isValidForm: boolean = true;

const RegistrationOTPVerification = () => {

    let { authStore } = RootStore;
    let navigate = useNavigate();
    let location = useLocation();

    useEffect(() => {
        Function.checkNavigationStatus(navigate, location);
    }, []);

    const onChangeValue = (value: any) => {
        authStore.otp = value;
        if (!isValidForm) {
            authStore.isValidOTPVerificationForm();
        }
    }

    const onSubmitRegOTPVerification = async (event: any) => {
        event.preventDefault()
        if (authStore?.isValidOTPVerificationForm()) {
            isValidForm = true;
            await AuthHelper().RegistrationOTPVerification(navigate);
        } else {
            isValidForm = false;
        }
    }

    const onResendOTP = async () => {
        await AuthHelper().Registration();
    }

    return <PageTransition>
        <RegistrationLayout header="OTP" subHeader="One Time Verification Password">
            <div className="d-flex justify-content-center">
                <img src={Images.OTPVerificationLogo} alt="OTP Verification Logo" style={{ width: '55%' }} />
            </div>
            <div className="text-center mt-2">
                <div className="mb-1" style={{ color: '#252F40', fontWeight: '600', fontSize: '19px' }}>OTP Verification</div>
            </div>
            <div className="text-center" style={{ lineHeight: '15px', color: '#635D5D', fontSize: '11px' }}>
                <div>We Will send you a one time password on</div>
                <div className="text-primary">{authStore?.email}</div>
            </div>
            <form onSubmit={onSubmitRegOTPVerification} className="mt-3">
                <FormGroup isRequired error={authStore?.formOTPVerificationErrors?.otp}>
                    <OTPInput
                        name='otp' value={authStore.otp} onChange={onChangeValue}
                        numInputs={5} isTypeNumber onChangeRegex={/^([0-9]{0,})$/} autoFocus
                        inputProps={{ className: 'otp-field__input', disabled: false }} />
                </FormGroup>
                <div className="d-flex justify-content-center mt-2">
                    <div className="col-12 text-center">
                        <small style={{ fontFamily: 'Outfit', fontWeight: '400', color: '#000000', fontSize: '12px' }}>Did not receive OTP yet ?</small>
                        <small className="ps-2 gradient-link-btn fw-bold" onClick={onResendOTP}
                            style={{ fontFamily: 'Outfit', fontWeight: 'bold', color: '#000000', fontSize: '12px' }}>Send OTP again!</small>
                    </div>
                </div>
                <div className="mt-3 d-flex justify-content-center">
                    <div className="col-9">
                        <Button htmlType='submit' className="login-btn" type="primary" block>SUBMIT</Button>
                    </div>
                </div>
            </form>
            <Loader visibility={authStore.isLoading} />
        </RegistrationLayout>
    </PageTransition>
}

export default observer(RegistrationOTPVerification);
