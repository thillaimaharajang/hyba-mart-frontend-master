import { Button, Input, message, Modal, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { FormGroup, Loader } from "../../components";
import CustomTable from "../../components/CustomTable";
import PageTransition from "../../components/PageTransition";
import SubHeader from "../../components/SubHeader";
import { Icons } from "../../constant/Icons";
import { ITableColumn } from "../../interface/IComponent";
import RootStore from "../../mobx-store/RootStore";
import { observer } from "mobx-react-lite";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import AttributesHelper from "../../helpers/AttributesHelper";
import Function from "../../utils/Function";
import Messages from "../../constant/Messages";
import { useNavigate } from "react-router-dom";

let isValidForm: boolean = true;
const { confirm } = Modal;

const Attributes: React.FC = () => {

    let { attributesStore } = RootStore;
    const navigate = useNavigate();
    const [isAttributeAddModal, toggleAddModal] = useState(false);
    const [isAttributeUpdateModal, toggleUpdateModal] = useState(false);
    const columns: ITableColumn[] = [
        {
            key: "",
            title: "#",
            width: '6%'
        },
        {
            key: "name",
            title: "Name",
            width: '67%',
            isTrim: true
        },
        {
            key: "productCount",
            title: "Products",
            width: '15%'
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
        getAttributes();
    }, []);

    const getAttributes = async () => {
        await AttributesHelper(navigate).GetAttributes();
    }

    const onChangeValue = (event: React.ChangeEvent<any>, name: string = '') => {
        event.preventDefault();
        const { value } = event.target;

        if (name === 'name') {
            attributesStore.name = value
        }
        if (!isValidForm) {
            attributesStore?.isValidCreateAttributeForm()
        }
    }

    const onSubmitCreateAttribute = async (event: any) => {
        event.preventDefault()
        if (!Function.isUserCanProceed()) {
            return;
        }
        if (attributesStore?.isValidCreateAttributeForm()) {
            isValidForm = true;
            toggleAddModal(!isAttributeAddModal);
            await AttributesHelper(navigate).CreateAttribute();
            attributesStore?.resetPostData();
        } else {
            isValidForm = false;
        }
    }

    const onChangeAttributePage = async (page: number) => {
        attributesStore.page = page - 1;
        await AttributesHelper(navigate).GetAttributes();
    }

    const onChangeAttributeSearch = async (event: any) => {
        attributesStore.searchStr = event?.target?.value;
    }

    const onSubmitAttributeSearch = async (searchStr: string = '') => {
        if (attributesStore.searchStr) {
            if (searchStr === '') {
                attributesStore.searchStr = '';
            }
            await AttributesHelper(navigate).GetAttributes();
        }
    }

    const onDeleteBadge = async (id: any) => {
        await AttributesHelper(navigate).DeleteAttribute(id);
    }

    const onSubmitUpdateAttribute = async (event: any) => {
        event.preventDefault()
        if (attributesStore?.isValidCreateAttributeForm()) {
            isValidForm = true;
            toggleUpdateModal(!isAttributeUpdateModal);
            await AttributesHelper(navigate).UpdateAttribute();
            attributesStore?.resetPostData();
        } else {
            isValidForm = false;
        }
    }

    const onToggleUpdate = (id: any) => {
        toggleUpdateModal(!isAttributeUpdateModal);
        attributesStore.setAttributeValues(id);
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

    return <PageTransition>
        <div>
            <SubHeader
                title="Attributes:" count={10} addBtn addBtnText='Add Attributes'
                search onAddClick={() => toggleAddModal(!isAttributeAddModal)}
                searchStr={attributesStore?.searchStr} onChangeSearch={onChangeAttributeSearch}
                onSubmitSearch={onSubmitAttributeSearch}
            />
            <CustomTable columns={columns} datas={attributesStore?.attributes}
                defaultPaginationCurrent={1} paginationCurrent={attributesStore?.page}
                paginationTotal={attributesStore?.totalItems}
                onPageChange={onChangeAttributePage} isLoading={attributesStore?.isLoading} />
            <Modal
                title='Add Attribute' open={isAttributeAddModal} onCancel={() => toggleAddModal(!isAttributeAddModal)}
                footer={null} width={'19%'} className='custom-add-modal'>
                <form onSubmit={onSubmitCreateAttribute}>
                    <div className="row">
                        <div className="col-12">
                            <FormGroup isRequired label='Name:' labelSpacing='mb-1' error={attributesStore?.formCreateAttributesErrors?.name}>
                                <Input placeholder="Name" className="custom-input" autoComplete="off"
                                    onChange={(event) => onChangeValue(event, 'name')} value={attributesStore?.name}
                                />
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
                title='Update Attribute' open={isAttributeUpdateModal} onCancel={() => toggleUpdateModal(!isAttributeUpdateModal)}
                footer={null} width={'19%'} className='custom-add-modal'>
                <form onSubmit={onSubmitUpdateAttribute}>
                    <div className="row">
                        <div className="col-12">
                            <FormGroup isRequired label='Name' labelSpacing='mb-1' error={attributesStore?.formCreateAttributesErrors?.name}>
                                <Input placeholder="Name" className="custom-input" autoComplete="off"
                                    onChange={(event) => onChangeValue(event, 'name')} value={attributesStore?.name}
                                />
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
            <Loader visibility={attributesStore?.isLoading} />
        </div>
    </PageTransition>
}

export default observer(Attributes);
