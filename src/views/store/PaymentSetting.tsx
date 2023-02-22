import { PageTransition, FormGroup, Loader } from "../../components";
import { observer } from 'mobx-react-lite';
import { Button, Input } from "antd";
import RootStore from "../../mobx-store/RootStore";
import Function from "../../utils/Function";
import { useNavigate } from "react-router-dom";
import PaymentModeHelper from "../../helpers/PaymentModeHelper";
import RichText from "../../components/RichText";
import { EditorState } from "draft-js";
import StatusComponent from "../../components/StatusComponent";
import { useEffect } from "react";

let isValidForm: boolean = true;

const PaymentSetting: React.FC = () => {
    let { paymentStore, shopStore } = RootStore;
    const navigate = useNavigate();

    useEffect(() => {
        getPayment();
    }, []);

    const getPayment = async () => {
        await PaymentModeHelper(navigate).GetPaymentModesById();
    }

    const onChangeValue = (event: React.ChangeEvent<any>, name: string = '') => {
        console.log("Event: ",event)
        event.preventDefault();
        let { value } = event.target;

        if (name === 'publishKey') {
            paymentStore.publishKey = value;
        } else if (name === 'secretKey') {
            paymentStore.secretKey = value;
        } else if (name === 'webHookUrl') {
            paymentStore.webHookUrl = value;
        }

        // if (!isValidForm) {
        //     paymentStore.isValidCreatePaymentForm();
        // }
    }

    // const onRichTextChangeValue = (value: EditorState) => {
    //     paymentStore.shippingNotes = value;

    //     if (!isValidForm) {
    //         paymentStore.isValidCreatePaymentForm();
    //     }
    // }

    // const toggleStatus = (checked: boolean, name: string = '') => {
    //     if (name === 'status') {
    //         paymentStore.status = checked;
    //     }
    // }

    // const onCreatePayment = async (event: any) => {
    //     event.preventDefault();
    //     if (!Function.isUserCanProceed()) {
    //         return;
    //     }
    //     if (paymentStore?.isValidCreatePaymentForm()) {
    //         isValidForm = true;
    //         await PaymentModeHelper(navigate).CreatePayment();
    //         paymentStore.resetPostData();
    //         await PaymentModeHelper(navigate).GetPaymentModes();
    //     } else {
    //         isValidForm = false;
    //     }
    // }

    const onUpdatePayment = async (event: any) => {
        console.log("Event: ",event)
        event.preventDefault();
        await PaymentModeHelper(navigate).UpdatePayment();

    }

    return <PageTransition>
        <form onSubmit={onUpdatePayment}>
            <div className="row mb-2">
                <div className="col-5">
                    <div className="col" style={{ fontWeight: '600', fontSize: '18px' }}>
                        <span style={{ color: '#000000' }}>Payment Setting:</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-5">
                    <FormGroup label='Display Name' labelSpacing='mb-1'>
                        <Input placeholder="Name" className="custom-input" disabled autoComplete="off"
                            onChange={(event) => onChangeValue(event, 'name')} value={paymentStore?.name} />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-5">
                    <FormGroup label='Description' labelSpacing='mb-1' error={paymentStore?.formCreatePaymentModeErrors?.baseDistance}>
                        <Input placeholder="About" className="custom-input" disabled 
                            onChange={(event) => onChangeValue(event, 'about')} value={paymentStore?.about} autoComplete="off" />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-5">
                    <FormGroup label='Publish Key' labelSpacing='mb-1' error={paymentStore?.formCreatePaymentModeErrors?.chargesAmount}>
                        <Input placeholder="Publish Key" className="custom-input" 
                            onChange={(event) => onChangeValue(event, 'publishKey')} value={paymentStore?.publishKey} autoComplete="off" />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-5">
                    <FormGroup label='Secret Key' labelSpacing='mb-1' error={paymentStore?.formCreatePaymentModeErrors?.chargesAmount}>
                        <Input placeholder="Secret Key" className="custom-input"
                            onChange={(event) => onChangeValue(event, 'secretKey')} value={paymentStore?.secretKey} autoComplete="off" />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-5">
                    <FormGroup label='Webhook' labelSpacing='mb-1' error={paymentStore?.formCreatePaymentModeErrors?.freeOrderLimit}>
                        <Input placeholder="https://" className="custom-input" 
                            onChange={(event) => onChangeValue(event, 'webHookUrl')} value={paymentStore?.webHookUrl} autoComplete="off" />
                    </FormGroup>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-5">
                    <Button htmlType='submit' className="custom-btn" type="primary">
                        {'SAVE'}
                    </Button>
                </div>
            </div>
            <Loader visibility={paymentStore?.isLoading} />
        </form>
    </PageTransition>
}

export default observer(PaymentSetting);
