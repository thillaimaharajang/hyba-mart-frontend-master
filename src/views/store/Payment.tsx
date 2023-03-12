import { Tooltip,Switch,message} from "antd";
import {Button } from '@mui/material';
import PageTransition from "../../components/PageTransition";
import SubHeader from "../../components/SubHeader";
import RootStore from "../../mobx-store/RootStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PaymentModeHelper from "../../helpers/PaymentModeHelper";
import CustomTable from "../../components/CustomTable";
import { Loader } from "../../components";
import { ITableColumn } from "../../interface/IComponent";
import { observer } from "mobx-react-lite";
import Whatsapp from '../../assets/images/whatsappPay.svg';
import Paypal from '../../assets/images/paypal.svg';
import Razorpay from '../../assets/images/razorPay.svg';
import Stripe from '../../assets/images/stripe.svg';
import COD from '../../assets/images/cod.svg';


const Payment: React.FC = () => {
    let { paymentStore } = RootStore;
    const navigate = useNavigate();
   
    console.log(paymentStore, 'paymentStorepaymentStore')
    const columns: ITableColumn[] = [
        {
            key: "name",
            title: "Name",
            width: '15%',
            isTrim: true,
            render: (name: string) => (
                        <Tooltip placement="topLeft" title='Edit' arrowPointAtCenter>
                            {name === "Whatsapp" && (
                                <img src={Whatsapp} alt='ellipsis-vertical' style={{ height: '45px', cursor: 'pointer' }}/>
                            )}
                            {name === "Paypal" && (
                                <img src={Paypal} alt='ellipsis-vertical' style={{ height: '45px', cursor: 'pointer' }}/>
                            )}
                            {name === "Razorpay" && (
                                <img src={Razorpay} alt='ellipsis-vertical' style={{ height: '25px', cursor: 'pointer' }}/>
                            )}
                             {name === "Stripe" && (
                                <img src={Stripe} alt='ellipsis-vertical' style={{ height: '25px', cursor: 'pointer' }}/>
                            )}
                            {name === "Cash on Delivery" && (
                                <img src={COD} alt='ellipsis-vertical' style={{ height: '25px', cursor: 'pointer' }}/>
                            )}
                        </Tooltip>
                    ),
        },
        {
            key: "about",
            title: "About",
            width: '45%'
        },
        {
            key: "id",
            title: "Status",
            width: '10%',
            render: (id: any) => (                
                <div className="d-flex mt-2">
                    <div className="d-flex col-4 py-1 px-3" >
                        <div className="col-2">
                        <Switch className={paymentStore?.paymentModes?.find((mode) => mode?.id === id)?.isEnabled == true ? 'custom-switch-active' : 'custom-switch'}
                            size='small' checked={paymentStore?.paymentModes?.find((mode) => mode?.id === id)?.isEnabled} onChange={(checked) => onToggleSwitch(checked,id)}  />
                        </div>
                    </div>
                </div>                
            )
        },
        {
            key: "id",
            title: "Action",
            width: '20%',
            align: 'center',
            render: (id: any) => (
                <Button variant="contained" style={{marginTop:15, textTransform: 'capitalize', backgroundColor:'#E94A3C'}} onClick={()=>navigateToEditPayment(id)}>Settings</Button>
            ),
        }
    ]

    const navigateToEditPayment = (id:any) => {
        let isConfigurable = paymentStore?.paymentModes?.find((mode) => mode?.id === id)?.isConfigurable;
        if(!isConfigurable){
            message.warning("Mode not supported at the moment", 5);
        }else{
            paymentStore.id=id;
            navigate(id?.toString());
        }
    }

    useEffect(() => {
        getPaymentModes();
    }, []);

    const getPaymentModes = async () => {
        await PaymentModeHelper(navigate).GetPaymentModes();
        let data = paymentStore.paymentModes;
    }

    const onToggleSwitch = async(checked: boolean, id: string) => {
        let isConfigurable = paymentStore?.paymentModes?.find((mode) => mode?.id === id)?.isConfigurable;
        if(!isConfigurable){
            message.warning("Mode not supported at the moment", 5);
        }else{
            let obj : any = paymentStore?.paymentModes?.find((mode) => mode?.id === id);
            obj.isEnabled = checked;
            paymentStore.setPaymentValue(obj);
            await PaymentModeHelper(navigate).UpdatePayment();
        }       
    }

    const onChangePaymentModeSearch = async (event: any) => {
        paymentStore.searchStr = event?.target?.value;
    }

    const onSubmitPaymentModeSearch = async (searchStr: string = '') => {
        if (paymentStore?.searchStr) {
            if (searchStr === '') {
                paymentStore.searchStr = '';
            }
            await PaymentModeHelper(navigate).GetPaymentModes();
        }
    }
    const onChangePaymentModePage = async (page: number) => {
        paymentStore.page = page - 1;
        await PaymentModeHelper(navigate).GetPaymentModes();
    }

    return <PageTransition>
        <div className="payment-grid" >
            <SubHeader
                title="Payment Modes:" count={paymentStore.size}
                search searchStr={paymentStore?.searchStr} onChangeSearch={onChangePaymentModeSearch}
                onSubmitSearch={onSubmitPaymentModeSearch}

            />
            <CustomTable columns={columns} datas={paymentStore?.paymentModes}
                defaultPaginationCurrent={1} paginationCurrent={paymentStore?.page}
                paginationTotal={paymentStore?.totalItems}
                onPageChange={onChangePaymentModePage} isLoading={paymentStore?.isLoading} />
            <Loader visibility={paymentStore?.isLoading} />
        </div>
    </PageTransition>
}

export default observer(Payment);