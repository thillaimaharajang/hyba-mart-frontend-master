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
import PagesHelper from "../../../helpers/PagesHelper";
import Function from "../../../utils/Function";

const { confirm } = Modal;

const Pages: React.FC = () => {

    let { pagesStore } = RootStore;
    const navigate = useNavigate();
    const columns: ITableColumn[] = [
        {
            key: "",
            title: "#",
            width: '6%'
        },
        {
            key: "cover",
            title: "Cover",
            width: '12%',
            render: (image: string) => (
                <div>
                    <img src={Function.loadImagePath(image)} alt='page-image' style={{ height: '2.3rem' }} />
                </div>
            )
        },
        {
            key: "name",
            title: "Title",
            width: '29%',
            isTrim: true
        },
        {
            key: "slug",
            title: "URL",
            width: '29%',
            isLink: true
        },
        {
            key: "status",
            title: "Status",
            width: '14%',
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
        },
        {
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
        getPages();
    }, []);

    const getPages = async () => {
        await PagesHelper(navigate).GetPagess();
    }

    const onDeleteLink = async (id: any) => {
        await PagesHelper(navigate).DeletePage(id);
    }

    const onToggleUpdate = (id: any) => {
        pagesStore.setPageValues(id);
        navigate(id?.toString());
    }

    const showDelteConfirm = (id: any) => {
        confirm({
            title: 'Delete',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure you want to delete?',
            onOk() {
                onDeleteLink(id);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const navigateToAddLink = () => {
        navigate('add');
    }

    const onChangePage = async (page: number) => {
        pagesStore.page = page - 1;
        await PagesHelper(navigate).GetPagess();
    }

    const onChangeSearch = async (event: any) => {
        pagesStore.searchStr = event?.target?.value;
    }

    const onSubmitSearch = async (searchStr: string = '') => {
        if (pagesStore.searchStr) {
            if (searchStr === '') {
                pagesStore.searchStr = '';
            }
            await PagesHelper(navigate).GetPagess();
        }
    }

    return <PageTransition>
        <div>
            <SubHeader
                title="Pages:" count={10} addBtn addBtnText='Add New'
                onAddClick={navigateToAddLink} search searchStr={pagesStore?.searchStr}
                onChangeSearch={onChangeSearch} onSubmitSearch={onSubmitSearch}
            />
            <CustomTable columns={columns} datas={pagesStore?.pages}
                defaultPaginationCurrent={1} paginationCurrent={pagesStore?.page}
                paginationTotal={pagesStore?.totalItems}
                onPageChange={onChangePage} isLoading={pagesStore?.isLoading} />
            <Loader visibility={pagesStore?.isLoading} />
        </div>
    </PageTransition>
}

export default observer(Pages);
