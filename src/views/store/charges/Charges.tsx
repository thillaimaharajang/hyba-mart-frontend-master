import { Modal, Tooltip } from "antd";
import { useEffect } from "react";
import { Loader } from "../../../components";
import CustomTable from "../../../components/CustomTable";
import PageTransition from "../../../components/PageTransition";
import SubHeader from "../../../components/SubHeader";
import { Icons } from "../../../constant/Icons";
import { ITableColumn } from "../../../interface/IComponent";
import RootStore from "../../../mobx-store/RootStore";
import { observer } from "mobx-react-lite";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import ChargesHelper from "../../../helpers/ChargesHelper";

const { confirm } = Modal;

const Categories: React.FC = () => {
    let { chargesStore } = RootStore;
    const navigate = useNavigate();
    const columns: ITableColumn[] = [
        {
            key: "",
            title: "#",
            width: '6%'
        },
        {
            key: "name",
            title: "Name",
            width: '43%',
            isTrim: true
        },
        {
            key: "amount",
            title: "Amount",
            width: '37%',
            type: 'Amount'
        },
        {
            key: "id",
            title: "Edit",
            width: '7%',
            render: (id: any) => (
                <Tooltip placement="topLeft" title='Edit' arrowPointAtCenter>
                    <img src={Icons.Edit} alt='ellipsis-vertical' style={{ height: '25px', cursor: 'pointer' }}
                        onClick={() => onChargesUpdate(id)} />
                </Tooltip>
            ),
        }, {
            key: "id",
            title: "Delete",
            width: '7%',
            render: (id: any) => (
                <Tooltip placement="topLeft" title='Delete' arrowPointAtCenter>
                    <img src={Icons.Delete} alt='ellipsis-vertical' style={{ height: '25px', cursor: 'pointer' }}
                        onClick={() => showDelteConfirm(id)} />
                </Tooltip>
            ),
        }
    ];

    useEffect(() => {
        getCharges();
    }, []);

    const getCharges = async () => {
        await ChargesHelper(navigate).GetCharges();
    }

    const onChangeChargesPage = async (page: number) => {
        chargesStore.page = page - 1;
        await ChargesHelper(navigate).GetCharges();
    }

    const onChangeChargesSearch = async (event: any) => {
        chargesStore.searchStr = event?.target?.value;
    }

    const onSubmitChargesSearch = async (searchStr: string = '') => {
        if (chargesStore?.searchStr) {
            if (searchStr === '') {
                chargesStore.searchStr = '';
            }
            await ChargesHelper(navigate).GetCharges();
        }
    }

    const onDeleteCharges = async (id: any) => {
        await ChargesHelper(navigate).DeleteCharges(id);
    }

    const onChargesUpdate = (id: any) => {
        chargesStore.setChargesValues(id);
        navigate(id?.toString());
    }

    const navigateToAdd = () => {
        navigate('add');
    }

    const showDelteConfirm = (id: any) => {
        confirm({
            title: 'Delete',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure you want to delete?',
            onOk() {
                onDeleteCharges(id);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    return <PageTransition>
        <div>
            <SubHeader
                title="Product Charges:" count={chargesStore.size} addBtn addBtnText='Add Charges'
                search onAddClick={navigateToAdd}
                searchStr={chargesStore?.searchStr} onChangeSearch={onChangeChargesSearch}
                onSubmitSearch={onSubmitChargesSearch}
            />
            <CustomTable columns={columns} datas={chargesStore?.charges}
                defaultPaginationCurrent={1} paginationCurrent={chargesStore?.page}
                paginationTotal={chargesStore?.totalItems}
                onPageChange={onChangeChargesPage} isLoading={chargesStore?.isLoading} />
            <Loader visibility={chargesStore?.isLoading} />
        </div>
    </PageTransition>
}

export default observer(Categories);
