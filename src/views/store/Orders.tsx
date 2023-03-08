import PageTransition from "../../components/PageTransition";
import { Modal, Tooltip } from "antd";
import { ITableColumn } from "../../interface/IComponent";

import CustomTable from "../../components/CustomTable";
import SubHeader from "../../components/SubHeader";
import ProductCategoryHelper from "../../helpers/ProductCategoryHelper";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import RootStore from "../../mobx-store/RootStore";
import { observer } from "mobx-react-lite";
import OrderHelper from "../../helpers/OrderHelper";
import { Loader } from "../../components";
import Function from "../../utils/Function";

const Orders: React.FC = () => {
    const navigate = useNavigate();
    const { productCategory, orderStore } = RootStore;
    const columns: ITableColumn[] = [
        {
            key: "",
            title: "#",
            width: '6%'
        },
        {
            key: "orderId",
            title: "Id",
            width: '20%'
        },
        // {
        //     key: "mainImage",
        //     title: "Name",
        //     width: '8%',
        //     render: (mainImage: string) => (
        //         <div>
        //             <img src={Function.loadImagePath(mainImage)} alt='product-image' style={{ height: '2rem' }} />
        //         </div>
        //     )
        // },
        {
            key: "name",
            title: "Name",
            width: '23%',
            isTrim: true
        },
        {
            key: "address",
            title: "Address",
            width: '23%',
            isTrim: true
        },
        {
            key: "price",
            title: "Price",
            width: '14%'
        },
        {
            key: "paymentStatus",
            title: "Payment",
            width: '13%'
        },
        {
            key: "quantity",
            title: "Payment Via",
            width: '13%'
        },
        {
            key: "orderStatus",
            title: "Status",
            width: '11%',
            render: (status: any) => (
                <div className='d-flex align-items-center'>
                    <div className={`custom-dot ${status ? 'active-dot' : 'inactive-dot'}`} />
                    <div style={{ color: status ? '#46BE82' : '#F6C451' }}>{status ? status : ''}</div>
                </div>
            )
        }
        
    ];

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async () => {
        await OrderHelper(navigate).GetOrder();
        console.log(orderStore?.orders, '---------------')
    }

    const onSubmitProductSearch = async (searchStr: string = '') => {
        if (orderStore?.searchStr) {
            if (searchStr === '') {
                orderStore.searchStr = '';
            }
        }
    }


    const onClickSelectValue = async () => {
        await ProductCategoryHelper(navigate).GetProductCategories();
    }

    const onChangeSelectValue = async (value: any) => {
        await getOrders();
    }

    const navigateToAddProduct = () => {
        navigate('add');
    }

    return <PageTransition>
        <div>
            <SubHeader
                title="Orders:" count={7} 
                search filterBtn
                onAddClick={navigateToAddProduct} searchStr={orderStore?.searchStr}
                onSubmitSearch={onSubmitProductSearch}
                onChangeDropdown={onChangeSelectValue} onClickDropdown={onClickSelectValue}
            />
            <CustomTable columns={columns} datas={orderStore?.orders}
                defaultPaginationCurrent={1} paginationCurrent={orderStore?.page}
                paginationTotal={orderStore?.totalItems}
                isLoading={orderStore?.isLoading} />
            <Loader visibility={orderStore?.isLoading} />
        </div>
    </PageTransition>
}

export default observer(Orders);
