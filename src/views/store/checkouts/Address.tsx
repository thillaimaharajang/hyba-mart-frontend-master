import { Loader, PageTransition } from "../../../components";
import RootStore from "../../../mobx-store/RootStore";
import { observer } from 'mobx-react-lite';
import { Button, Switch } from "antd";
import '../../../styles/Settings.css';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutHelper from "../../../helpers/CheckoutHelper";

interface IPanelProps {
    name: string
    status: boolean
}

const Address: React.FC = () => {
    let { checkoutStore } = RootStore;
    let navigate = useNavigate();

    useEffect(() => {
        getAddressDetails();
    }, []);

    const getAddressDetails = async () => {
        await CheckoutHelper(navigate).GetAddress();
    }

    const onSaveAddress = async (event: any) => {
        event.preventDefault()
        await CheckoutHelper(navigate).CreateAddress();
    }

    const onUpdateAddress = async (event: any) => {
        event.preventDefault()
        await CheckoutHelper(navigate).UpdateAddress();
    }

    const onToggleSwitch = (checked: boolean, name: string) => {
        if (name === 'Name') {
            checkoutStore.isName = checked;
        } else if (name === 'Number') {
            checkoutStore.isNumber = checked;
        } else if (name === 'Email') {
            checkoutStore.isEmail = checked;
        } else if (name === 'Address 1') {
            checkoutStore.isAddress1 = checked;
        } else if (name === 'Address 2') {
            checkoutStore.isAddress2 = checked;
        } else if (name === 'Landmark') {
            checkoutStore.isLandmark = checked;
        } else if (name === 'State') {
            checkoutStore.isState = checked;
        } else if (name === 'Country') {
            checkoutStore.isCountry = checked;
        } else if (name === 'Zipcode') {
            checkoutStore.isZipcode = checked;
        }
    }

    const AddressView = (props: IPanelProps) => {
        return <div className="d-flex mt-2">
            <div className="d-flex col-4 py-1 px-3" style={{ border: "1.9px solid rgba(99, 93, 93, 0.3)", borderRadius: '5px' }}>
                <div className="col-10">{props?.name}</div>
                <div className="col-2">
                    <Switch className={`ms-1 ${props?.status ? 'custom-switch-active' : 'custom-switch'}`}
                        checked={props?.status ? true : false} onChange={(checked) => onToggleSwitch(checked, props?.name)} />
                </div>
            </div>
        </div>
    }

    return <PageTransition>
        <div>
            <div style={{ fontWeight: '600', fontSize: '18px' }}>
                <span style={{ color: '#000000' }}>Address Form:</span>
            </div>
            <div style={{ color: '#635D5D', fontSize: '12.5px' }}>Address details to ask from customer while checking out.</div>
            <div className="mt-2" style={{ fontWeight: '600', fontSize: '13px' }}>Status:</div>
            <AddressView name="Name" status={checkoutStore.isName} />
            <AddressView name="Number" status={checkoutStore.isNumber} />
            <AddressView name="Email" status={checkoutStore.isEmail} />
            <AddressView name="Address 1" status={checkoutStore.isAddress1} />
            <AddressView name="Address 2" status={checkoutStore.isAddress2} />
            <AddressView name="Landmark" status={checkoutStore.isLandmark} />
            <AddressView name="State" status={checkoutStore.isState} />
            <AddressView name="Country" status={checkoutStore.isCountry} />
            <AddressView name="Zipcode" status={checkoutStore.isZipcode} />
            <div className="row mt-3">
                <div className="col-4">
                    <Button htmlType='button' className="custom-btn" type="primary"
                        onClick={checkoutStore?.addressId ? onUpdateAddress : onSaveAddress}>{checkoutStore?.addressId ? 'UPDATE' : 'SAVE'}</Button>
                </div>
            </div>
            <Loader visibility={checkoutStore?.isLoading} />
        </div>
    </PageTransition>
}

export default observer(Address);
