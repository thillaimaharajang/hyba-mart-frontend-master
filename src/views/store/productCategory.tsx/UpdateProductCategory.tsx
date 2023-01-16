import { Button, Input, Modal, Switch } from "antd";
import { FormGroup } from "../../../components";
import RootStore from "../../../mobx-store/RootStore";
import ProductCategoryHelper from "../../../helpers/ProductCategoryHelper";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

let isValidForm: boolean = true;

interface IUpdatePrductCategoryProps {
    isCategoryUpdateModal: boolean
    toggleUpdateModal: any
}

const UpdateProductCategories: React.FC<IUpdatePrductCategoryProps> = (props) => {

    const { productCategory } = RootStore;
    const navigate = useNavigate();

    const onChangeValue = (event: React.ChangeEvent<any>, name: string = '') => {
        event.preventDefault();
        const { value } = event.target;

        if (name === 'categoryName') {
            productCategory.name = value
        } else if (name === 'subCategoryName') {
            productCategory.subCategory = value
        }
        if (!isValidForm) {
            productCategory?.isValidCreateProductCategoryForm()
        }
    }

    const toggleStatus = (checked: boolean) => {
        productCategory.status = checked;
    }

    const onSubmitUpdateProductCategory = async (event: any) => {
        event.preventDefault()
        if (productCategory?.isValidCreateProductCategoryForm()) {
            isValidForm = true;
            props.toggleUpdateModal();
            await ProductCategoryHelper(navigate).UpdateProductCategory();
            productCategory?.resetPostData();
        } else {
            isValidForm = false;
        }
    }

    return <Modal
        title='Update Category' open={props?.isCategoryUpdateModal} onCancel={props.toggleUpdateModal}
        footer={null} width={'19%'} className='custom-add-modal'>
        <form onSubmit={onSubmitUpdateProductCategory}>
            <div className="row">
                <div className="col-12">
                    <FormGroup isRequired label='Category Name' labelSpacing='mb-1' error={productCategory?.formCreateProductCategoryErrors?.name}>
                        <Input placeholder="Category Name" className="custom-input" autoComplete="off"
                            onChange={(event) => onChangeValue(event, 'categoryName')} value={productCategory?.name}
                        />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <FormGroup isRequired label='Sub Category Name' labelSpacing='mb-1' error={productCategory?.formCreateProductCategoryErrors?.subCategory}>
                        <Input placeholder="Sub Category Name" className="custom-input" autoComplete="off"
                            onChange={(event) => onChangeValue(event, 'subCategoryName')} value={productCategory?.subCategory}
                        />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <FormGroup isRequired label='Status' labelSpacing='mb-1' error={productCategory?.formCreateProductCategoryErrors?.isActive}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            {productCategory?.status ?
                                <span style={{ fontSize: '14px', fontWeight: '700', color: '#304FFE' }}>Active</span>
                                :
                                <span style={{ fontSize: '14px', fontWeight: '700', color: '#F6C451' }}>Inactive</span>
                            }
                            <Switch className={productCategory?.status ? 'custom-switch-active' : 'custom-switch'}
                                size='small' checked={productCategory?.status} onChange={toggleStatus} />
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
}

export default observer(UpdateProductCategories);
