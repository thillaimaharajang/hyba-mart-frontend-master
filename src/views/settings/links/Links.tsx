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
import { Images } from "../../../constant/Images";
import { useNavigate } from "react-router-dom";
import LinksHelper from "../../../helpers/LinksHelper";

const { confirm } = Modal;

const Links: React.FC = () => {

    let { linksStore } = RootStore;
    const navigate = useNavigate();
    const columns: ITableColumn[] = [
        {
            key: "",
            title: "#",
            width: '6%'
        },
        {
            key: "title",
            title: "Title",
            width: '24%',
            isTrim: true
        },
        {
            key: "url",
            title: "URL",
            width: '30%',
            isLink: true
        },
        {
            key: "description",
            title: "Description",
            width: '30%',
            isTrim: true
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
        getLinks();
    }, []);

    const getLinks = async () => {
        await LinksHelper(navigate).GetLinks();
    }

    const onDeleteLink = async (id: any) => {
        await LinksHelper(navigate).DeleteLink(id);
    }

    const onToggleUpdate = (id: any) => {
        linksStore.setLinkValues(id);
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

    return <PageTransition>
        <div>
            <SubHeader
                title="Links:" count={10} addBtn addBtnText='Add New'
                onAddClick={navigateToAddLink}
            />
            <CustomTable columns={columns} datas={linksStore?.links} isLoading={linksStore?.isLoading} />
            <Loader visibility={linksStore?.isLoading} />
        </div>
    </PageTransition>
}

export default observer(Links);
