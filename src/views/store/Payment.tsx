
import { Button, Tooltip,Switch} from "antd";
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


const Payment: React.FC = () => {
    let { paymentStore } = RootStore;
    console.log("Payment Store: ",paymentStore)
    const navigate = useNavigate();
    let [isCategoryAddModal, toggleAddModal] = useState(false);
    const [isCategoryUpdateModal, toggleUpdateModal] = useState(false);
    console.log(isCategoryAddModal)

    
    const columns: ITableColumn[] = [
        {
            key: "name",
            title: "Name",
            width: '20%',
            // isTrim: true,
            // render: (name: string) => (
            //             <Tooltip placement="topLeft" title='Edit' arrowPointAtCenter>
            //                 <>{console.log("Name: ",name)}</>
            //                 <img src={Icons.WhatsappLogo} alt='ellipsis-vertical' style={{ height: '25px', cursor: 'pointer' }}/>
            //             </Tooltip>
            //         ),
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
                <Button className='setting-btn' htmlType='submit' type="primary" 
                onClick={()=>navigateToEditPayment(id)}

                block>Settings</Button>
            ),
        }
    ]

    const navigateToEditPayment = (id:any) => {
        console.log("ID: ",id)
        paymentStore.id=id;
        navigate(id?.toString());
    }
    useEffect(() => {
        getPaymentModes();
    }, []);
    const getPaymentModes = async () => {
        console.log("Payment modes")
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
