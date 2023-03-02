import { PageTransition, FormGroup, Loader } from "../../components";
import { observer } from 'mobx-react-lite';
import { Button, Input } from "antd";
import RootStore from "../../mobx-store/RootStore";
import Function from "../../utils/Function";
import { useNavigate } from "react-router-dom";
import DeliveryHelper from "../../helpers/DeliveryHelper";
import RichText from "../../components/RichText";
import { EditorState } from "draft-js";
import StatusComponent from "../../components/StatusComponent";
import { useEffect } from "react";

let isValidForm: boolean = true;

const Delivery: React.FC = () => {
    let { deliveryStore, shopStore } = RootStore;
    const navigate = useNavigate();

    useEffect(() => {
        getDelivery();
    }, []);

    const getDelivery = async () => {
        await DeliveryHelper(navigate).GetDelivery();
    }

    const onChangeValue = (event: React.ChangeEvent<any>, name: string = '') => {
        event.preventDefault();
        let { value } = event.target;

        if (name === 'baseDistance') {
            deliveryStore.baseDistance = value;
        } else if (name === 'chargesAmount') {
            deliveryStore.chargesAmount = value;
        } else if (name === 'freeOrderLimit') {
            deliveryStore.freeOrderLimit = value;
        }

        if (!isValidForm) {
            deliveryStore.isValidCreateDeliveryForm();
        }
    }

    const onRichTextChangeValue = (value: EditorState) => {
        deliveryStore.shippingNotes = value;

        if (!isValidForm) {
            deliveryStore.isValidCreateDeliveryForm();
        }
    }

    const toggleStatus = (checked: boolean, name: string = '') => {
        if (name === 'status') {
            deliveryStore.status = checked;
        }
    }

    const onCreateDelivery = async (event: any) => {
        event.preventDefault();
        if (!Function.isUserCanProceed()) {
            return;
        }
        if (deliveryStore?.isValidCreateDeliveryForm()) {
            isValidForm = true;
            await DeliveryHelper(navigate).CreateDelivery();
            deliveryStore.resetPostData();
            await DeliveryHelper(navigate).GetDelivery();
        } else {
            isValidForm = false;
        }
    }

    const onUpdateDelivery = async (event: any) => {
        event.preventDefault();
        if (deliveryStore?.isValidCreateDeliveryForm()) {
            isValidForm = true;
            await DeliveryHelper(navigate).UpdateDelivery();
            deliveryStore.resetPostData();
            await DeliveryHelper(navigate).GetDelivery();
        } else {
            isValidForm = false;
        }
    }

    return <PageTransition>
        <form onSubmit={deliveryStore.delivery?.id ? onUpdateDelivery : onCreateDelivery}>
            <div className="row mb-2">
                <div className="col-5">
                    <div className="col" style={{ fontWeight: '600', fontSize: '18px' }}>
                        <span style={{ color: '#000000' }}>Delivery Charges:</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-5">
                    <FormGroup isRequired label='Country Name' labelSpacing='mb-1'>
                        <Input placeholder="Name" className="custom-input" disabled autoComplete="off"
                            onChange={(event) => onChangeValue(event, 'name')} value={shopStore?.storeDetails?.countryName} />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-5">
                    <FormGroup isRequired label='Base Distance' labelSpacing='mb-1' error={deliveryStore?.formCreateDeliveryErrors?.baseDistance}>
                        <Input placeholder="Base Distance" className="custom-input" suffix='KM'
                            onChange={(event) => onChangeValue(event, 'baseDistance')} value={deliveryStore?.baseDistance} autoComplete="off" />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-5">
                    <FormGroup isRequired label='Charges Amount' labelSpacing='mb-1' error={deliveryStore?.formCreateDeliveryErrors?.chargesAmount}>
                        <Input placeholder="Charges Amount" className="custom-input" suffix={shopStore?.currency}
                            onChange={(event) => onChangeValue(event, 'chargesAmount')} value={deliveryStore?.chargesAmount} autoComplete="off" />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-5">
                    <FormGroup isRequired label='Free For Orders Above' labelSpacing='mb-1' error={deliveryStore?.formCreateDeliveryErrors?.freeOrderLimit}>
                        <Input placeholder="Free For Orders Above" className="custom-input" suffix={shopStore?.currency}
                            onChange={(event) => onChangeValue(event, 'freeOrderLimit')} value={deliveryStore?.freeOrderLimit} autoComplete="off" />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-5">
                    <FormGroup isRequired label='Shipping Notes (Max 80 chars)' labelSpacing='mb-1' error={deliveryStore?.formCreateDeliveryErrors?.shippingNotes}>
                        <RichText onChange={onRichTextChangeValue} value={deliveryStore.shippingNotes} />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-5">
                    <FormGroup isRequired label='Status' labelSpacing='mb-1' error={deliveryStore?.formCreateDeliveryErrors?.status}
                        labelComponent={<StatusComponent status={deliveryStore.status} onToggle={(checked: boolean) => toggleStatus(checked, 'status')} />}>
                        <div style={{ fontSize: '9px', color: '#635D5D' }}>Inactive products will not be listed in store</div>
                    </FormGroup>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-5">
                    <Button htmlType='submit' className="custom-btn" type="primary">
                        {deliveryStore.delivery?.id ? 'UPDATE' : 'SAVE'}
                    </Button>
                </div>
            </div>
            <Loader visibility={deliveryStore?.isLoading} />
        </form>
    </PageTransition>
}

export default observer(Delivery);
