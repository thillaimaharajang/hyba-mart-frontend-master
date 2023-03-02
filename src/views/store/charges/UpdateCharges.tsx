import { PageTransition, FormGroup, Loader } from "../../../components";
import { observer } from 'mobx-react-lite';
import { Button, Input } from "antd";
import RootStore from "../../../mobx-store/RootStore";
import Function from "../../../utils/Function";
import ChargesHelper from "../../../helpers/ChargesHelper";
import { useNavigate } from "react-router-dom";

let isValidForm: boolean = true;

const UpdateCharges: React.FC = () => {
    let { chargesStore, shopStore } = RootStore;
    const navigate = useNavigate();

    const onChangeValue = (event: React.ChangeEvent<any>, name: string = '') => {
        event.preventDefault();
        let { value } = event.target;

        if (name === 'name') {
            chargesStore.name = value;
        } else if (name === 'amount') {
            chargesStore.amount = value;
        }
        if (!isValidForm) {
            chargesStore.isValidCreateChargesForm();
        }
    }

    const onTogglePercentage = () => {
        chargesStore.isPercentage = !chargesStore.isPercentage;
    }

    const onUpdateCharges = async (event: any) => {
        event.preventDefault();
        if (chargesStore?.isValidCreateChargesForm()) {
            isValidForm = true;
            await ChargesHelper(navigate).UpdateCharges();
            chargesStore.resetPostData();
            navigate(-1);
        } else {
            isValidForm = false;
        }
    }

    return <PageTransition>
        <form onSubmit={onUpdateCharges}>
            <div className="row mb-2">
                <div className="col-4">
                    <div className="col" style={{ fontWeight: '600', fontSize: '18px' }}>
                        <span style={{ color: '#000000' }}>Product Charges:</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Name' labelSpacing='mb-1' error={chargesStore?.formCreateChargesErrors?.name}>
                        <Input placeholder="Name" className="custom-input"
                            onChange={(event) => onChangeValue(event, 'name')} value={chargesStore?.name} autoComplete="off" />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Charges Amount' labelSpacing='mb-1' error={chargesStore?.formCreateChargesErrors?.amount}>
                        <Input placeholder="Charges Amount" className="custom-input"
                            suffix={<div className="d-flex">
                                <div className={`px-2 me-1 percentage-btn ${chargesStore.isPercentage ? 'percentage-btn-active' : ''}`}
                                    onClick={onTogglePercentage}>%</div>
                                <div style={{ backgroundColor: '#635d5d4d', borderRadius: '5px' }}
                                    className='px-1'>{shopStore?.currency}</div>
                            </div>}
                            onChange={(event) => onChangeValue(event, 'amount')} value={chargesStore?.amount} autoComplete="off" />
                    </FormGroup>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-4">
                    <Button htmlType='submit' className="custom-btn" type="primary">UPDATE</Button>
                </div>
            </div>
            <Loader visibility={chargesStore?.isLoading} />
        </form>
    </PageTransition>
}

export default observer(UpdateCharges);
