import { Button, Input, Modal, Switch } from "antd";
import { FormGroup } from "../../../components";
import RootStore from "../../../mobx-store/RootStore";
import ProductCategoryHelper from "../../../helpers/ProductCategoryHelper";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

let isValidForm: boolean = true;

interface IUpdatePrductCategoryProps {
    isCategoryUpdateModal: boolean
    toggleUpdateModal: any
}

const UpdateProductCategories: React.FC<IUpdatePrductCategoryProps> = (props) => {

    let { productCategory } = RootStore;

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
            // await ProductCategoryHelper().UpdateProductCategory();
            productCategory?.resetPostData();
        } else {
            isValidForm = false;
        }
    }

    return <div>Update</div>
}

export default observer(UpdateProductCategories);
