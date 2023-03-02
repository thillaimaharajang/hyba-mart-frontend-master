import { FormGroup, Loader, PageTransition } from "../../../components";
import RootStore from "../../../mobx-store/RootStore";
import { observer } from 'mobx-react-lite';
import { Button, Input } from "antd";
import '../../../styles/Settings.css';
import RichText from "../../../components/RichText";
import { useEffect } from "react";
import { EditorState } from "draft-js";
import { useNavigate } from "react-router-dom";
import CheckoutHelper from "../../../helpers/CheckoutHelper";

let isValidForm: boolean = true;

const MinOrder: React.FC = () => {
    let { checkoutStore } = RootStore;
    let navigate = useNavigate();

    useEffect(() => {
        getMinOrderDetails();
    }, []);

    const getMinOrderDetails = async () => {
        await CheckoutHelper(navigate).GetMinOrder();
    }

    const onChangeValue = (event: React.ChangeEvent<any>, name: string = '') => {
        event.preventDefault();
        let { value } = event.target;

        if (name === 'amount') {
            checkoutStore.amount = value;
        }

        if (!isValidForm) {
            checkoutStore.isValidMinOrderCreateForm();
        }
    }

    const onRichTextChangeValue = (value: EditorState) => {
        checkoutStore.minOrderNotes = value;

        if (!isValidForm) {
            checkoutStore.isValidMinOrderCreateForm();
        }
    }

    const onSaveMinOrder = async (event: any) => {
        event.preventDefault()
        if (checkoutStore?.isValidMinOrderCreateForm()) {
            isValidForm = true;
            await CheckoutHelper(navigate).CreateMinOrder();
            checkoutStore?.resetMinOrderPostData();
            await CheckoutHelper(navigate).GetMinOrder();
        } else {
            isValidForm = false;
        }
    }

    const onUpdateMinOrder = async (event: any) => {
        event.preventDefault()
        if (checkoutStore?.isValidMinOrderCreateForm()) {
            isValidForm = true;
            await CheckoutHelper(navigate).UpdateMinOrder();
            checkoutStore?.resetMinOrderPostData();
            await CheckoutHelper(navigate).GetMinOrder();
        } else {
            isValidForm = false;
        }
    }

    return <PageTransition>
        <div>
            <div className="row">
                <div className="col-5">
                    <FormGroup isRequired label='Amount' labelSpacing='mb-1' error={checkoutStore?.formMinOrderCreateErrors?.amount}>
                        <Input placeholder="Amount" className="custom-input" autoComplete="off"
                            onChange={(event) => onChangeValue(event, 'amount')} value={checkoutStore?.amount}
                        />
                        <div style={{ color: '#635D5D', fontSize: '11px' }}>Customers will not be able to place order if the amount is below that specified here.</div>
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-5">
                    <FormGroup isRequired label='Notes (Max 80 chars)' labelSpacing='mb-1' error={checkoutStore?.formMinOrderCreateErrors?.minOrderNotes}>
                        <RichText onChange={onRichTextChangeValue} value={checkoutStore.minOrderNotes} />
                    </FormGroup>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-5">
                    <Button htmlType='button' className="custom-btn" type="primary"
                        onClick={checkoutStore?.minOrderId ? onUpdateMinOrder : onSaveMinOrder}>{checkoutStore?.minOrderId ? 'UPDATE' : 'SAVE'}</Button>
                </div>
            </div>
            <Loader visibility={checkoutStore?.isLoading} />
        </div>
    </PageTransition>
}

export default observer(MinOrder);
