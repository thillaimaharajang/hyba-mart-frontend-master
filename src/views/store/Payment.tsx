import { Tooltip,Switch} from "antd";
import {Button } from '@mui/material';
import PageTransition from "../../components/PageTransition";
import SubHeader from "../../components/SubHeader";
import RootStore from "../../mobx-store/RootStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentModeHelper from "../../helpers/PaymentModeHelper";
import CustomTable from "../../components/CustomTable";
import { Loader } from "../../components";
import { ITableColumn } from "../../interface/IComponent";
import { observer } from "mobx-react-lite";
import { Icons } from "../../constant/Icons";
import AddProductCategory from "./PaymentSetting";
import Whatsapp from '../../assets/images/whatsappPay.svg';
import Paypal from '../../assets/images/paypal.svg';
import Razorpay from '../../assets/images/razorPay.svg';
import Stripe from '../../assets/images/stripe.svg';
import COD from '../../assets/images/cod.svg';


const Payment: React.FC = () => {
    let { paymentStore } = RootStore;
    const navigate = useNavigate();
    let [isCategoryAddModal, toggleAddModal] = useState(false);
    const [isCategoryUpdateModal, toggleUpdateModal] = useState(false);
    
    console.log(paymentStore, 'paymentStorepaymentStore')
    const columns: ITableColumn[] = [
        {
            key: "name",
            title: "Name",
            width: '20%',
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
            width: '40%'
        },
        {
            key: "isEnabled",
            title: "Status",
            width: '10%',
            render: (isEnabled: any) => (                
               <>{console.log(isEnabled)
               }
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Switch className={isEnabled==true ? 'custom-switch-active' : 'custom-switch'}
                    size='small' checked={paymentStore?.isEnabled} onChange={toggleStatus} />
            </div></>
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
        paymentStore.id=id;
        navigate(id?.toString());
    }
    useEffect(() => {
        getPaymentModes();
    }, []);
    const getPaymentModes = async () => {
        await PaymentModeHelper(navigate).GetPaymentModes();
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


    const toggleStatus = (checked: boolean) => {
        paymentStore.isEnabled = checked;
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