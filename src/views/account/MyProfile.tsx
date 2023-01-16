import { PageTransition, FormGroup, Loader } from "../../components";
import { observer } from 'mobx-react-lite';
import { Button, Input } from "antd";
import RootStore from "../../mobx-store/RootStore";
import ShopHelper from "../../helpers/ShopHelper";
import { useNavigate } from "react-router-dom";
import Function from "../../utils/Function";

let isValidForm: boolean = true;

const MyProfile: React.FC = () => {
    let { authStore, shopStore } = RootStore;
    let navigate = useNavigate();
    let isStoreCreated = !Function.isEmptyObject(shopStore?.storeDetails);

    const onChangeValue = (event: React.ChangeEvent<any>, name: string = '') => {
        event.preventDefault();
        let { value } = event.target;

        if (name === 'name') {
            shopStore.name = value;
        }
        if (!isValidForm) {
            shopStore.isValidAccountUpdateForm();
        }
    }

    const onUpdateAccount = async (event: any) => {
        event.preventDefault()
        if (shopStore?.isValidAccountUpdateForm()) {
            isValidForm = true;
            await ShopHelper(navigate).UpdateAccountDetails();
            await ShopHelper(navigate).GetShopDetailsByUserId(false);
        } else {
            isValidForm = false;
        }
    }

    return <PageTransition>
        <form onSubmit={onUpdateAccount}>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Name' labelSpacing='mb-1' error={shopStore?.formAccountUpdateErrors?.name}>
                        <Input name='name' placeholder="Name" className="custom-input"
                            onChange={(event) => onChangeValue(event, 'name')} value={shopStore?.name} autoComplete="off" />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup label='Email' labelSpacing='mb-1'>
                        <Input placeholder="Email" disabled className="custom-input"
                            value={authStore?.email} autoComplete="off" />
                    </FormGroup>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-4">
                    <Button htmlType='submit' className="custom-btn" type="primary" disabled={!isStoreCreated}>UPDATE</Button>
                </div>
            </div>
        </form>
        <Loader visibility={shopStore?.isLoading} />
    </PageTransition>
}

export default observer(MyProfile);
