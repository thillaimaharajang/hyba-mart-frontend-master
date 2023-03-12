import { Modal, Tooltip } from "antd";
import CustomTable from "../../../components/CustomTable";
import PageTransition from "../../../components/PageTransition";
import SubHeader from "../../../components/SubHeader";
import { Icons } from "../../../constant/Icons";
import { ITableColumn } from "../../../interface/IComponent";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ProductHelper from "../../../helpers/ProductHelper";
import RootStore from "../../../mobx-store/RootStore";
import { observer } from "mobx-react-lite";
import { Loader } from "../../../components";
import ProductCategoryHelper from "../../../helpers/ProductCategoryHelper";
import Function from "../../../utils/Function";

const { confirm } = Modal;

const Products: React.FC = () => {
    const navigate = useNavigate();
    const { productStore, productCategory } = RootStore;
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
            key: "id",
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
        },
        {
            key: "id",
            title: "Edit",
            width: '6%',
            align: 'center',
            render: (id: any) => (
                <Tooltip placement="topLeft" title='Edit' arrowPointAtCenter>
                    <img src={Icons.Edit} alt='ellipsis-vertical' style={{ height: '25px', cursor: 'pointer' }}
                        onClick={() => onToggleUpdate(id)} />
                </Tooltip>
            ),
        },
        {
            key: "id",
            title: "Delete",
            width: '6%',
            align: 'center',
            render: (id: any) => (
                <Tooltip placement="topLeft" title='Delete' arrowPointAtCenter>
                        <img src={Icons.Delete} alt='ellipsis-vertical' style={{ height: '25px', cursor: 'pointer' }}
                        onClick={() => showDelteConfirm(id)} />
                </Tooltip>
            ),
        }
    ];  

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        await ProductHelper(navigate).GetProducts();
    }

    const onChangeProductPage = async (page: number) => {
        productStore.page = page - 1;
        await ProductHelper(navigate).GetProducts();
    }

    const onChangeProductSearch = async (event: any) => {
        productStore.searchStr = event?.target?.value;
    }

    const onSubmitProductSearch = async (searchStr: string = '') => {
        if (productStore?.searchStr) {
            if (searchStr === '') {
                productStore.searchStr = '';
            }
            await ProductHelper(navigate).GetProducts();
        }
    }

    const onToggleUpdate = async (id: any) => {
        await ProductHelper(navigate).GetProductsbyId(id)
        productStore.setProductValues(id);
        navigate(id?.toString());
    }

    const onDeleteProductCategory = async (id: any) => {
        await ProductHelper(navigate).DeleteProduct(id);
    }

    const showDelteConfirm = (id: any) => {
        confirm({
            title: 'Delete',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure you want to delete?',
            onOk() {
                onDeleteProductCategory(id);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const onClickSelectValue = async () => {
        await ProductCategoryHelper(navigate).GetProductCategories();
    }

    const onChangeSelectValue = async (value: any) => {
        productStore.filterProductCategoryId = value;
        await getProducts();
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
                onChangeSearch={onChangeProductSearch} onSubmitSearch={onSubmitProductSearch}
                dropdownList={productCategory.productCategories} dropdownValue={productStore?.filterProductCategoryId}
                onChangeDropdown={onChangeSelectValue} onClickDropdown={onClickSelectValue}
            />
            <CustomTable columns={columns} datas={productStore?.products}
                defaultPaginationCurrent={1} paginationCurrent={productStore?.page}
                paginationTotal={productStore?.totalItems}
                onPageChange={onChangeProductPage} isLoading={productStore?.isLoading} />
            <Loader visibility={productStore?.isLoading} />
        </div>
    </PageTransition>
}

export default observer(Products);
