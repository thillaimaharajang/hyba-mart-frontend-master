import { FormGroup, Loader, PageTransition } from "../../../components";
import RootStore from "../../../mobx-store/RootStore";
import { observer } from 'mobx-react-lite';
import { Button, Input, Switch } from "antd";
import '../../../styles/Settings.css';
import RichText from "../../../components/RichText";
import CheckoutHelper from "../../../helpers/CheckoutHelper";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

let isValidForm: boolean = true;

const UserVerification: React.FC = () => {
    let { checkoutStore } = RootStore;
    let navigate = useNavigate();

    useEffect(() => {
        getUserVerificationDetails();
    }, []);

    const getUserVerificationDetails = async () => {
        await CheckoutHelper(navigate).GetUserDetails();
    }

    const onToggleSwitch = (checked: boolean, name: string) => {
        if (name === 'Mobile') {
            checkoutStore.isMobileNumberStatus = checked;
        } else if (name === 'Whatsapp') {
            checkoutStore.isWhatsappCheckoutStatus = checked;
        }
    }

    const onSaveUserDetails = async (event: any) => {
        event.preventDefault()
        if (checkoutStore?.isValidUserDetailsCreateForm()) {
            isValidForm = true;
            await CheckoutHelper(navigate).CreateUserDetails();
        } else {
            isValidForm = false;
        }
    }

    const onUpdateUserDetails = async (event: any) => {
        event.preventDefault()
        if (checkoutStore?.isValidUserDetailsCreateForm()) {
            isValidForm = true;
            await CheckoutHelper(navigate).UpdateUserDetails();
        } else {
            isValidForm = false;
        }
    }

    return <PageTransition>
        <div>
            <div className="mb-1" style={{ fontWeight: '600', fontSize: '18px' }}>
                <span style={{ color: '#000000' }}>Mobile Number:</span>
            </div>
            <div style={{ color: '#635D5D', fontSize: '12.5px' }}>Allow customers to checkout with their Mobile number while checking out, if user selects a payment gateway other than
                ‘Paylater’.</div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='' labelSpacing='mb-1' error={checkoutStore?.formUserDetailsCreateErrors?.isMobileNumberStatus}>
                        <div className="d-flex">
                            <div className="col-6" style={{ color: '#635D5D', fontWeight: '600' }}>Status</div>
                            <div className="col-6 d-flex justify-content-end align-items-center">
                                {checkoutStore?.isMobileNumberStatus ?
                                    <span style={{ fontSize: '14px', color: '#304FFE' }}>Active</span>
                                    :
                                    <span style={{ fontSize: '14px', color: '#F6C451' }}>Inactive</span>
                                }
                                <Switch className={checkoutStore?.isMobileNumberStatus ? 'custom-switch-active ms-1' : 'custom-switch ms-1'}
                                    size='small' checked={checkoutStore?.isMobileNumberStatus}
                                    onChange={(checked) => onToggleSwitch(checked, 'Mobile')} />
                            </div>
                        </div>
                    </FormGroup>
                </div>
            </div>

            <div className="mb-1 mt-2" style={{ fontWeight: '600', fontSize: '18px' }}>
                <span style={{ color: '#000000' }}>WhatsApp Checkout:</span>
            </div>
            <div style={{ color: '#635D5D', fontSize: '12.5px' }}>Let your customers place an order quickly via a WhatsApp message.</div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='' labelSpacing='mb-1' error={checkoutStore?.formUserDetailsCreateErrors?.isWhatsappCheckoutStatus}>
                        <div className="d-flex">
                            <div className="col-6" style={{ color: '#635D5D', fontWeight: '600' }}>Status</div>
                            <div className="col-6 d-flex justify-content-end align-items-center">
                                {checkoutStore?.isWhatsappCheckoutStatus ?
                                    <span style={{ fontSize: '14px', color: '#304FFE' }}>Active</span>
                                    :
                                    <span style={{ fontSize: '14px', color: '#F6C451' }}>Inactive</span>
                                }
                                <Switch className={checkoutStore?.isWhatsappCheckoutStatus ? 'custom-switch-active ms-1' : 'custom-switch ms-1'}
                                    size='small' checked={checkoutStore?.isWhatsappCheckoutStatus}
                                    onChange={(checked) => onToggleSwitch(checked, 'Whatsapp')} />
                            </div>
                        </div>
                    </FormGroup>
                </div>
            </div>

            <div className="row mt-2">
                <div className="col-4">
                    <Button htmlType='button' className="custom-btn" type="primary"
                        onClick={checkoutStore?.userDetailsId ? onUpdateUserDetails : onSaveUserDetails}>{checkoutStore?.userDetailsId ? 'UPDATE' : 'SAVE'}</Button>
                </div>
            </div>
            <Loader visibility={checkoutStore?.isLoading} />
        </div>
    </PageTransition>
}

export default observer(UserVerification);
