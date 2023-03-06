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
    const { productStore, productCategory, orderStore } = RootStore;
    const columns: ITableColumn[] = [
        {
            key: "",
            title: "#",
            width: '6%'
        },
        {
            key: "mainImage",
            title: "Media",
            width: '8%',
            render: (mainImage: string) => (
                <div>
                    <img src={Function.loadImagePath(mainImage)} alt='product-image' style={{ height: '2rem' }} />
                </div>
            )
        },
        {
            key: "name",
            title: "Name",
            width: '23%',
            isTrim: true
        },
        {
            key: "offerPrice",
            title: "Price",
            width: '14%'
        },
        {
            key: "sku",
            title: "SKU",
            width: '13%'
        },
        {
            key: "quantity",
            title: "Stock",
            width: '13%'
        },
        {
            key: "status",
            title: "Status",
            width: '11%',
            render: (status: any) => (
                <div className='d-flex align-items-center'>
                    <div className={`custom-dot ${status ? 'active-dot' : 'inactive-dot'}`} />
                    <div style={{ color: status ? '#46BE82' : '#F6C451' }}>{status ? 'Active' : 'Inactive'}</div>
                </div>
            )
        }
        
    ];

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async () => {
        await OrderHelper(navigate).GetOrder();
        console.log(orderStore)
    }

    const onSubmitProductSearch = async (searchStr: string = '') => {
        if (productStore?.searchStr) {
            if (searchStr === '') {
                productStore.searchStr = '';
            }
        }
    }


    const onClickSelectValue = async () => {
        await ProductCategoryHelper(navigate).GetProductCategories();
    }

    const onChangeSelectValue = async (value: any) => {
        productStore.filterProductCategoryId = value;
        await getOrders();
    }

    const navigateToAddProduct = () => {
        navigate('add');
    }

    return <PageTransition>
        <div>
            <SubHeader
                title="Product:" count={7} addBtn addBtnText='Add Products'
                dropdown dropdownText='Category' search filterBtn
                onAddClick={navigateToAddProduct} searchStr={productStore?.searchStr}
                onSubmitSearch={onSubmitProductSearch}
                dropdownList={productCategory.productCategories} dropdownValue={productStore?.filterProductCategoryId}
                onChangeDropdown={onChangeSelectValue} onClickDropdown={onClickSelectValue}
            />
            <CustomTable columns={columns} datas={productStore?.products}
                defaultPaginationCurrent={1} paginationCurrent={productStore?.page}
                paginationTotal={productStore?.totalItems}
                isLoading={productStore?.isLoading} />
            <Loader visibility={productStore?.isLoading} />
        </div>
    </PageTransition>
}

export default Orders;
