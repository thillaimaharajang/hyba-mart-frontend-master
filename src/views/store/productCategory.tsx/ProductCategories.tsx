import { Modal, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { Loader } from "../../../components";
import CustomTable from "../../../components/CustomTable";
import PageTransition from "../../../components/PageTransition";
import SubHeader from "../../../components/SubHeader";
import { Icons } from "../../../constant/Icons";
import { ITableColumn } from "../../../interface/IComponent";
import RootStore from "../../../mobx-store/RootStore";
import ProductCategoryHelper from "../../../helpers/ProductCategoryHelper";
import { observer } from "mobx-react-lite";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import AddProductCategory from "./AddProductCategory";
import UpdateProductCategory from "./UpdateProductCategory";
import { useNavigate } from "react-router-dom";

const { confirm } = Modal;

const Categories: React.FC = () => {
    let { productCategory } = RootStore;
    const navigate = useNavigate();
    const [isCategoryAddModal, toggleAddModal] = useState(false);
    const [isCategoryUpdateModal, toggleUpdateModal] = useState(false);
    const columns: ITableColumn[] = [
        {
            key: "",
            title: "#",
            width: '6%'
        },
        {
            key: "id",
            title: "Id",
            width: '7%'
        },
        {
            key: "name",
            title: "Name",
            width: '15%',
            isTrim: true
        },
        {
            key: "subCategory",
            title: "Sub Category",
            width: '15%',
            isTrim: true
        },
        {
            key: "productCount",
            title: "Products",
            width: '8%'
        },
        {
            key: "productActive",
            title: "Active Products",
            width: '14%'
        },
        {
            key: "productInctive",
            title: "Inactive Products",
            width: '15%'
        },
        {
            key: "status",
            title: "Status",
            width: '10%',
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
            width: '5%',
            align: 'center',
            render: (id: any) => (
                <Tooltip placement="topLeft" title='Edit' arrowPointAtCenter>
                    <img src={Icons.Edit} alt='ellipsis-vertical' style={{ height: '25px', cursor: 'pointer' }}
                        onClick={() => onToggleUpdate(id)} />
                </Tooltip>
            ),
        }, {
            key: "id",
            title: "Delete",
            width: '5%',
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
        getProductCategories();
    }, []);

    const getProductCategories = async () => {
        await ProductCategoryHelper(navigate).GetProductCategories();
    }

    const onChangeProductCategoryPage = async (page: number) => {
        productCategory.page = page - 1;
        await ProductCategoryHelper(navigate).GetProductCategories();
    }

    const onChangeProductCategorySearch = async (event: any) => {
        productCategory.searchStr = event?.target?.value;
    }

    const onSubmitProductCategorySearch = async (searchStr: string = '') => {
        if (productCategory?.searchStr) {
            if (searchStr === '') {
                productCategory.searchStr = '';
            }
            await ProductCategoryHelper(navigate).GetProductCategories();
        }
    }

    const onDeleteProductCategory = async (id: any) => {
        await ProductCategoryHelper(navigate).DeleteProductCategory(id);
    }

    const onToggleUpdate = (id: any) => {
        toggleUpdateModal(!isCategoryUpdateModal);
        productCategory.setProductCategoryValues(id);
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

    return <PageTransition>
        <div>
            <SubHeader
                title="Product Categories:" count={productCategory.size} addBtn addBtnText='Add Category'
                search filterBtn onAddClick={() => toggleAddModal(!isCategoryAddModal)}
                searchStr={productCategory?.searchStr} onChangeSearch={onChangeProductCategorySearch}
                onSubmitSearch={onSubmitProductCategorySearch}
            />
            <CustomTable columns={columns} datas={productCategory?.productCategories}
                defaultPaginationCurrent={1} paginationCurrent={productCategory?.page}
                paginationTotal={productCategory?.totalItems}
                onPageChange={onChangeProductCategoryPage} isLoading={productCategory?.isLoading} />
            <AddProductCategory
                isCategoryAddModal={isCategoryAddModal} toggleAddModal={() => toggleAddModal(!isCategoryAddModal)}
            />
            <UpdateProductCategory
                isCategoryUpdateModal={isCategoryUpdateModal} toggleUpdateModal={() => toggleUpdateModal(!isCategoryUpdateModal)} />
            <Loader visibility={productCategory?.isLoading} />
        </div>
    </PageTransition>
}

export default observer(Categories);
