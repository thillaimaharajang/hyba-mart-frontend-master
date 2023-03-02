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
import ContactHelper from "../../../helpers/ContactHelper";
import Function from "../../../utils/Function";

const { confirm } = Modal;

const Contacts: React.FC = () => {

    let { contactStore, shopStore } = RootStore;
    const navigate = useNavigate();
    const columns: ITableColumn[] = [
        {
            key: "",
            title: "#",
            width: '6%'
        },
        {
            key: "badgeImage",
            title: "Media",
            width: '14%',
            render: () => (
                <div>
                    <img src={Function.loadImagePath(shopStore?.storeDetails?.profileImage)}
                        alt='contacts' style={{ height: '2.3rem' }} />
                </div>
            )
        },
        {
            key: "name",
            title: "Name",
            width: '20%',
            isTrim: true
        },
        {
            key: "mobileNumber",
            title: "Mobile Number",
            width: '19%'
        },
        {
            key: "support",
            title: "Support",
            width: '18%',
            render: (id: any) => (
                <div className="d-flex">
                    <Tooltip placement="topLeft" title='Call' arrowPointAtCenter>
                        <img src={Icons.Call} alt='ellipsis-vertical' style={{ height: '20px', cursor: 'pointer' }}
                            onClick={undefined} />
                    </Tooltip>
                    <Tooltip placement="topLeft" title='Chat' arrowPointAtCenter>
                        <img src={Icons.WhatsappChat} alt='ellipsis-vertical' className="ms-3" style={{ height: '23px', cursor: 'pointer' }}
                            onClick={undefined} />
                    </Tooltip>
                </div>
            ),
        },
        {
            key: "status",
            title: "Status",
            width: '13%',
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
        getContacts();
    }, []);

    const getContacts = async () => {
        await ContactHelper(navigate).GetContacts();
    }

    const onChangeContactPage = async (page: number) => {
        contactStore.page = page - 1;
        await ContactHelper(navigate).GetContacts();
    }

    const onDeleteContact = async (id: any) => {
        await ContactHelper(navigate).DeleteContact(id);
    }

    const onToggleUpdate = (id: any) => {
        contactStore.setContactValues(id);
        navigate(id?.toString());
    }

    const showDelteConfirm = (id: any) => {
        confirm({
            title: 'Delete',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure you want to delete?',
            onOk() {
                onDeleteContact(id);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const navigateToAddContact = () => {
        navigate('add');
    }

    return <PageTransition>
        <div>
            <SubHeader
                title="Contact Numbers:" count={10} addBtn addBtnText='Add New'
                onAddClick={navigateToAddContact}
            />
            <CustomTable columns={columns} datas={contactStore?.contacts}
                defaultPaginationCurrent={1} paginationCurrent={contactStore?.page}
                paginationTotal={contactStore?.totalItems}
                onPageChange={onChangeContactPage} isLoading={contactStore?.isLoading} />
            <Loader visibility={contactStore?.isLoading} />
        </div>
    </PageTransition>
}

export default observer(Contacts);
