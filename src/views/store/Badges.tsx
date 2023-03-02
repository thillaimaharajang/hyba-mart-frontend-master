import { Button, Input, message, Modal, Switch, Tooltip, Upload, UploadFile } from "antd";
import { useEffect, useState } from "react";
import { FormGroup, Loader } from "../../components";
import CustomTable from "../../components/CustomTable";
import PageTransition from "../../components/PageTransition";
import SubHeader from "../../components/SubHeader";
import { Icons } from "../../constant/Icons";
import { ITableColumn } from "../../interface/IComponent";
import RootStore from "../../mobx-store/RootStore";
import BadgeHelper from "../../helpers/BadgeHelper";
import { observer } from "mobx-react-lite";
import { RcFile, UploadChangeParam } from "antd/lib/upload";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Function from "../../utils/Function";
import CustomUpload from "../../components/CustomUpload";
import { useNavigate } from "react-router-dom";

let isValidForm: boolean = true;
const { confirm } = Modal;

const Badges: React.FC = () => {

    let { badgeStore } = RootStore;
    const navigate = useNavigate();
    const [isBadgeAddModal, toggleAddModal] = useState(false);
    const [isBadgeUpdateModal, toggleUpdateModal] = useState(false);
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
            render: (badgeImage: string) => (
                <div>
                    <img src={Function.loadImagePath(badgeImage)} alt='product-image' style={{ height: '2.3rem' }} />
                </div>
            )
        },
        {
            key: "name",
            title: "Name",
            width: '29%',
            isTrim: true
        },
        {
            key: "productCount",
            title: "Products",
            width: '13%'
        },
        {
            key: "stock",
            title: "Stock",
            width: '15%'
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
        getBadges();
    }, []);

    const getBadges = async () => {
        await BadgeHelper(navigate).GetBadges();
    }

    const onChangeValue = (event: React.ChangeEvent<any>, name: string = '') => {
        event.preventDefault();
        const { value } = event.target;

        if (name === 'badgeName') {
            badgeStore.name = value
        }
        if (!isValidForm) {
            badgeStore?.isValidCreateBadgeForm()
        }
    }

    const toggleStatus = (checked: boolean) => {
        badgeStore.status = checked;
    }

    const onSubmitCreateBadge = async (event: any) => {
        event.preventDefault();
        if (!Function.isUserCanProceed()) {
            return;
        }
        if (badgeStore?.isValidCreateBadgeForm()) {
            isValidForm = true;
            toggleAddModal(!isBadgeAddModal);
            await BadgeHelper(navigate).CreateBadge();
            badgeStore?.resetPostData();
        } else {
            isValidForm = false;
        }
    }

    const onChangeImage = (event: any, name?: string) => {
        if (name === 'image') {
            badgeStore.image = event?.target?.files[0];
        }
        if (!isValidForm) {
            badgeStore.isValidCreateBadgeForm();
        }
    }

    const onChangeBadgePage = async (page: number) => {
        badgeStore.page = page - 1;
        await BadgeHelper(navigate).GetBadges();
    }

    const onChangeBadgeSearch = async (event: any) => {
        badgeStore.searchStr = event?.target?.value;
    }

    const onSubmitBadgeSearch = async (searchStr: string = '') => {
        if (badgeStore.searchStr) {
            if (searchStr === '') {
                badgeStore.searchStr = '';
            }
            await BadgeHelper(navigate).GetBadges();
        }
    }

    const onDeleteBadge = async (id: any) => {
        await BadgeHelper(navigate).DeleteBadge(id);
    }

    const onSubmitUpdateBadge = async (event: any) => {
        event.preventDefault()
        if (badgeStore?.isValidCreateBadgeForm()) {
            isValidForm = true;
            toggleUpdateModal(!isBadgeUpdateModal);
            await BadgeHelper(navigate).UpdateBadge();
            badgeStore?.resetPostData();
        } else {
            isValidForm = false;
        }
    }

    const onToggleUpdate = (id: any) => {
        toggleUpdateModal(!isBadgeUpdateModal);
        badgeStore.setBadgeValues(id);
    }

    const showDelteConfirm = (id: any) => {
        confirm({
            title: 'Delete',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure you want to delete?',
            onOk() {
                onDeleteBadge(id);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const onBadgeImageDelete = () => {
        badgeStore.image = '';
    }

    return <PageTransition>
        <div>
            <SubHeader
                title="Badges:" count={10} addBtn addBtnText='Add Badges'
                search onAddClick={() => toggleAddModal(!isBadgeAddModal)}
                searchStr={badgeStore?.searchStr} onChangeSearch={onChangeBadgeSearch}
                onSubmitSearch={onSubmitBadgeSearch}
            />
            <CustomTable columns={columns} datas={badgeStore?.badges}
                defaultPaginationCurrent={1} paginationCurrent={badgeStore?.page}
                paginationTotal={badgeStore?.totalItems}
                onPageChange={onChangeBadgePage} isLoading={badgeStore?.isLoading} />
            <Modal
                title='Add Badges' open={isBadgeAddModal} onCancel={() => toggleAddModal(!isBadgeAddModal)}
                footer={null} width={'19%'} className='custom-add-modal'>
                <form onSubmit={onSubmitCreateBadge}>
                    <div className="row">
                        <div className="col-12">
                            <FormGroup isRequired label='Name:' labelSpacing='mb-1' error={badgeStore?.formCreateBadgeErrors?.name}>
                                <Input placeholder="Name" className="custom-input" autoComplete="off"
                                    onChange={(event) => onChangeValue(event, 'badgeName')} value={badgeStore?.name}
                                />
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <FormGroup isRequired label='' labelSpacing='mb-1' error={badgeStore?.formCreateBadgeErrors?.image}>
                                <CustomUpload value={badgeStore.image} onChange={(event: any) => onChangeImage(event, 'image')}
                                    previewContainerStyle={{ height: '3.5rem', width: '3.5rem', backgroundColor: '#2b0b6e', padding: '15px' }}
                                    maxSize={2} accept='.png' onDelete={onBadgeImageDelete} />
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <FormGroup isRequired label='Status' labelSpacing='mb-1' error={badgeStore?.formCreateBadgeErrors?.status}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    {badgeStore?.status ?
                                        <span style={{ fontSize: '14px', fontWeight: '700', color: '#304FFE' }}>Active</span>
                                        :
                                        <span style={{ fontSize: '14px', fontWeight: '700', color: '#F6C451' }}>Inactive</span>
                                    }
                                    <Switch className={badgeStore?.status ? 'custom-switch-active' : 'custom-switch'}
                                        size='small' checked={badgeStore?.status} onChange={toggleStatus} />
                                </div>
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Button htmlType='submit' type='primary' className='custom-btn mt-2' block>CREATE</Button>
                        </div>
                    </div>
                </form>
            </Modal>
            <Modal
                title='Update Badge' open={isBadgeUpdateModal} onCancel={() => toggleUpdateModal(!isBadgeUpdateModal)}
                footer={null} width={'19%'} className='custom-add-modal'>
                <form onSubmit={onSubmitUpdateBadge}>
                    <div className="row">
                        <div className="col-12">
                            <FormGroup isRequired label='Name:' labelSpacing='mb-1' error={badgeStore?.formCreateBadgeErrors?.name}>
                                <Input placeholder="Name" className="custom-input" autoComplete="off"
                                    onChange={(event) => onChangeValue(event, 'badgeName')} value={badgeStore?.name}
                                />
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <FormGroup isRequired label='' labelSpacing='mb-1' error={badgeStore?.formCreateBadgeErrors?.image}>
                                <CustomUpload value={badgeStore.image} onChange={(event: any) => onChangeImage(event, 'image')}
                                    previewContainerStyle={{ height: '3.5rem', width: '3.5rem', backgroundColor: '#2b0b6e', padding: '15px' }}
                                    maxSize={2} accept='.png' onDelete={onBadgeImageDelete} />
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <FormGroup isRequired label='Status' labelSpacing='mb-1' error={badgeStore?.formCreateBadgeErrors?.status}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    {badgeStore?.status ?
                                        <span style={{ fontSize: '14px', fontWeight: '700', color: '#304FFE' }}>Active</span>
                                        :
                                        <span style={{ fontSize: '14px', fontWeight: '700', color: '#F6C451' }}>Inactive</span>
                                    }
                                    <Switch className={badgeStore?.status ? 'custom-switch-active' : 'custom-switch'}
                                        size='small' checked={badgeStore?.status} onChange={toggleStatus} />
                                </div>
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Button htmlType='submit' type='primary' className='custom-btn mt-2' block>UPDATE</Button>
                        </div>
                    </div>
                </form>
            </Modal>
            <Loader visibility={badgeStore?.isLoading} />
        </div>
    </PageTransition>
}

export default observer(Badges);
