import { Button, Input, Select } from "antd";
import { FormGroup, Loader, PageTransition } from "../../../components";
import RootStore from "../../../mobx-store/RootStore";
import { observer } from "mobx-react-lite";
import { EditorState } from "draft-js";
import { useEffect } from "react";
import RichText from "../../../components/RichText";
import CustomUpload from "../../../components/CustomUpload";
import { toJS } from "mobx";
import { IAttribute } from "../../../interface/IProduct";
import { useNavigate } from "react-router-dom";
import ProductHelper from "../../../helpers/ProductHelper";
import ProductCategoryHelper from "../../../helpers/ProductCategoryHelper";
import BadgeHelper from "../../../helpers/BadgeHelper";
import AttributesHelper from "../../../helpers/AttributesHelper";
import StatusComponent from "../../../components/StatusComponent";

let isValidForm: boolean = true;
const { Option } = Select;

interface IAddPrductCategoryProps {
    isCategoryAddModal: boolean
    toggleAddModal: any
}

const UpdateProduct: React.FC<IAddPrductCategoryProps> = (props) => {

    const { productStore, productCategory, shopStore, badgeStore, attributesStore } = RootStore;
    let navigate = useNavigate();

    useEffect(() => {
        getDropdownValues();
    }, []);

    const getDropdownValues = async () => {
        const value = productStore.productCategoryId;
        await ProductCategoryHelper(navigate).GetProductCategories();
        productStore.productCategoryName = productCategory.productCategories?.find((productCategory) => Number(productCategory?.id) === value)?.name;
        productStore.productSubCategoryName = productCategory.productCategories?.find((productCategory) => Number(productCategory?.id) === value)?.subCategory;
        await AttributesHelper(navigate).GetAttributes();
        await BadgeHelper(navigate).GetBadges();

    }

    const onChangeValue = (event: React.ChangeEvent<any>, name: string = '', attributeIndex: any = '') => {
        event.preventDefault();
        const { value } = event.target;

        if (name === 'name') {
            productStore.name = value;
        } else if (name === 'regularPrice') {
            productStore.regularPrice = value;
        } else if (name === 'offerPrice') {
            productStore.offerPrice = value;
        } else if (name === 'sku') {
            productStore.sku = value;
        } else if (name === 'measurement') {
            productStore.measurement = value;
        } else if (name === 'quantity') {
            productStore.quantity = value;
        } else if (name === 'attributeDescription') {
            productStore.attributes[attributeIndex].description = value;
        }

        if (!isValidForm) {
            productStore?.isValidCreateBadgeForm()
        }
    }

    const onChangeSelectValue = (value: any, name: string = '', attributeIndex: any = '') => {
        if (name === 'productCategory') {
            productStore.productCategoryId = value;
            productStore.productCategoryName = productCategory.productCategories?.find((productCategory) => productCategory?.id === value)?.name;
            productStore.productSubCategoryName = productCategory.productCategories?.find((productCategory) => productCategory?.id === value)?.subCategory;
        } else if (name === 'badgeId') {
            productStore.badgeId = value;
        } else if (name === 'attributeId') {
            productStore.attributes[attributeIndex].id = value;
        }

        if (!isValidForm) {
            productStore.isValidCreateBadgeForm();
        }
    }

    const onRichTextChangeValue = (value: EditorState) => {
        console.log("ValueChanges",value)
        productStore.description = value;

        if (!isValidForm) {
            productStore.isValidCreateBadgeForm();
        }
    }

    const onChangeImage = (event: any, name?: string) => {
        if (name === 'mainImage') {
            productStore.mainImage = event?.target?.files[0];
        } else if (name === 'galleryImage') {
            productStore.galleryImage.push(event?.target?.files[0]);
        }

        if (!isValidForm) {
            productStore.isValidCreateBadgeForm();
        }
    }

    const onImageDelete = (name: string = '', imageIndex: any = '') => {
        if (name === 'mainImage') {
            productStore.mainImage = '';
        } else if (name === 'galleryImage') {
            productStore.galleryImage?.splice(imageIndex, 1);
        }
    }

    const onAddAttribute = () => {
        const attributeObj: IAttribute = { id: '', description: '', status: false , attributeId :0};
        productStore.attributes.push(attributeObj);
    }

    const onRemoveAttribute = (index: number) => {
        productStore.attributes.splice(index, 1);
    }

    const toggleStatus = (checked: boolean, name: string = '', index: any = '') => {
        if (name === 'badgeStatus') {
            productStore.badgeStatus = checked;
        } else if (name === 'attributeStatus') {
            productStore.attributes[index].status = checked;
        } else if (name === 'productStatus') {
            productStore.productStatus = checked;
        } else if (name === 'outOfStock') {
            productStore.outOfStock = checked;
        }
    }

    const onSubmitCreateProduct = async (event: any) => {
        event.preventDefault()
        if (productStore?.isValidCreateBadgeForm()) {
            isValidForm = true;
            await ProductHelper(navigate).UpdateProduct();
            productStore?.resetPostData();
            navigate(-1);
        } else {
            isValidForm = false;
        }
    }

    return <PageTransition>
        <form onSubmit={onSubmitCreateProduct}>
            <div className="row mb-2">
                <div className="col-5">
                    <div className="col" style={{ fontWeight: '600', fontSize: '18px' }}>
                        <span style={{ color: '#000000' }}>Product Type:</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-5">
                    <FormGroup isRequired label='Name' labelSpacing='mb-1' error={productStore?.formCreateProductErrors?.name}>
                        <Input placeholder="Name" className="custom-input" value={productStore?.name}
                            onChange={(event) => onChangeValue(event, 'name')} autoComplete="off" />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-5">
                    <FormGroup isRequired label='Product Category' labelSpacing='mb-1' error={productStore?.formCreateProductErrors?.productCategory}>
                        <Select placeholder="Select Product Category" className="custom-input" style={{ width: '100%' }}
                            defaultValue={productStore?.productCategoryName}
                            onChange={(value) => onChangeSelectValue(value, 'productCategory')}
                        >
                            {productCategory.productCategories?.map((productCategory: any, index: any) => {
                                return <Option key={index} value={productCategory?.id}>{productCategory?.name}</Option>
                            })}
                        </Select>
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-5">
                    <FormGroup isRequired label='Product Sub Category' labelSpacing='mb-1' error={productStore?.formCreateProductErrors?.productSubCategory}>
                        <Input placeholder="Product Sub Category" className="custom-input"
                            value={productStore?.productSubCategoryName} disabled />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-5 d-flex flex-column">
                    <div className="row">
                        <div className="col-6 pe-1">
                            <FormGroup isRequired label='Regular Price' labelSpacing='mb-1' error={productStore?.formCreateProductErrors?.regularPrice}>
                                <Input placeholder="Regular Price" className="custom-input" value={productStore?.regularPrice}
                                    onChange={(event) => onChangeValue(event, 'regularPrice')} autoComplete="off" suffix={shopStore?.currency} />
                            </FormGroup>
                        </div>
                        <div className="col-6 ps-1">
                            <FormGroup isRequired label='Offer Price' labelSpacing='mb-1' error={productStore?.formCreateProductErrors?.offerPrice}>
                                <Input placeholder="Offer Price" className="custom-input" value={productStore?.offerPrice}
                                    onChange={(event) => onChangeValue(event, 'offerPrice')} autoComplete="off" suffix={shopStore?.currency} />
                            </FormGroup>
                        </div>
                    </div>
                    <div className="mb-1" style={{ color: '#635D5D', fontSize: '8px' }}>Regular Price will be striked out and Offer price will be used as a final price to display. Helpful when offering a product at a discounted.</div>
                </div>
            </div>
            <div className="row">
                <div className="col-5">
                    <FormGroup isRequired label='SKU (Stock Keeping Unit)' labelSpacing='mb-1' error={productStore?.formCreateProductErrors?.sku}>
                        <Input placeholder="SKU" className="custom-input" value={productStore?.sku}
                            onChange={(event) => onChangeValue(event, 'sku')} autoComplete="off" />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-5">
                    <FormGroup isRequired label='Description (Max 80 chars)' labelSpacing='mb-1' error={productStore?.formCreateProductErrors?.description}>
                        <RichText onChange={onRichTextChangeValue} value={productStore?.description} />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-5">
                    <FormGroup label='Image Upload:' labelSpacing='mb-1'>
                        <div className="d-flex">
                            <div className="col-3">
                                <div style={{ fontSize: '10px', color: '#635D5D' }}>Main image</div>
                                <FormGroup isRequired label='' labelSpacing='mb-1' error={productStore?.formCreateProductErrors?.mainImage}>
                                    <CustomUpload value={productStore.mainImage} onChange={(event: any) => onChangeImage(event, 'mainImage')}
                                        previewContainerStyle={{ height: '3.5rem', width: '3.5rem', backgroundColor: '#2b0b6e', padding: '15px', borderRadius: '8px' }}
                                        uploadBtnStyle={{ height: '5rem', width: '5rem' }}
                                        maxSize={2} accept='.png' onDelete={() => onImageDelete('mainImage')} />
                                </FormGroup>
                            </div>
                            <div className="col-9 mx-3">
                                <div style={{ fontSize: '10px', color: '#635D5D' }}>Gallery</div>
                                <FormGroup label='' labelSpacing='mb-1' error={productStore?.formCreateProductErrors?.galleryImage}>
                                    <CustomUpload value={toJS(productStore.galleryImage)} onChange={(event: any) => onChangeImage(event, 'galleryImage')}
                                        previewContainerStyle={{ height: '3.5rem', width: '3.5rem', backgroundColor: '#2b0b6e', padding: '15px', borderRadius: '8px' }}
                                        uploadBtnStyle={{ height: '5rem', width: '5rem' }} isMultipleImage
                                        maxSize={2} accept='.png' onDelete={(imageIndex: any) => onImageDelete('galleryImage', imageIndex)} />
                                </FormGroup>
                            </div>
                        </div>
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-5">
                    <FormGroup label='Measurement' labelSpacing='mb-1' error={productStore?.formCreateProductErrors?.measurement}>
                        <Input placeholder="Measurement" className="custom-input" value={productStore?.measurement}
                            onChange={(event) => onChangeValue(event, 'measurement')} autoComplete="off" />
                        <div style={{ fontSize: '9px', color: '#635D5D' }}>Example: 500 gm, 1 kgs</div>
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-5">
                    <FormGroup isRequired label='Quantity' labelSpacing='mb-1' error={productStore?.formCreateProductErrors?.quantity}>
                        <Input placeholder="Quantity" className="custom-input" value={productStore?.quantity}
                            onChange={(event) => onChangeValue(event, 'quantity')} autoComplete="off" />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-5">
                    <FormGroup isRequired label='Badges' labelSpacing='mb-1' error={productStore?.formCreateProductErrors?.badge}
                        labelComponent={<StatusComponent status={productStore.badgeStatus} onToggle={(checked: boolean) => toggleStatus(checked, 'badgeStatus')} />}>
                        <div style={{ fontSize: '9px', color: '#635D5D' }}>Select the badge for your product</div>
                        <Select placeholder="Select Badge" className="custom-input" style={{ width: '100%' }}
                            defaultValue={productStore?.badgeId} onChange={(value) => onChangeSelectValue(value, 'badgeId')}
                        >
                            {badgeStore.badges?.map((badge: any, index: any) => {
                                return <Option key={index} value={badge?.id}>{badge?.name}</Option>
                            })}
                        </Select>
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-5 d-flex flex-column">
                    <FormGroup isRequired label='Attributes' labelSpacing='mb-1' error={productStore?.formCreateProductErrors?.attribute}
                        labelComponent={<div className="d-flex align-items-center">
                            <div className="d-flex align-items-center me-2 px-1" onClick={onAddAttribute}
                                style={{
                                    backgroundColor: '#ebeffe', borderRadius: '4px', cursor: 'pointer',
                                    pointerEvents: productStore.attributes?.length === 5 ? 'none' : 'auto'
                                }}>
                                <span className="me-1" style={{ color: '#304ffe', fontSize: '10px' }}>Add More</span>
                                <div className="d-flex align-items-center justify-content-center"
                                    style={{ backgroundColor: 'rgb(48, 79, 254)', borderRadius: '10px', height: '10px', width: '10px' }}>
                                    <span style={{ color: 'white', fontSize: '10px' }}>+</span>
                                </div>
                            </div>
                        </div>}>
                        <div style={{ fontSize: '9px', color: '#635D5D' }}>Select the attribute for your product</div>
                        {productStore.attributes.map((attribute, attributeIndex) => {
                            let attributeName = attributesStore.attributes?.find((attr) => Number(attr?.id) === attribute?.attributeId)?.name;
                            return <div key={attributeIndex} className="d-flex align-items-center">
                                <div className="col-5 pe-1">
                                    <FormGroup isRequired label='' labelSpacing='mb-1' error={productStore?.formCreateProductErrors?.attributeId}>
                                        <Select placeholder="Select Attribute" className="custom-input" style={{ width: '100%' }}
                                            defaultValue={attributeName} onChange={(value) => onChangeSelectValue(value, 'attributeId', attributeIndex)}
                                        >
                                            {attributesStore.attributes?.map((attribute: any, index: any) => {
                                                return <Option key={index} value={attribute?.id}>{attribute?.name}</Option>
                                            })}
                                        </Select>
                                    </FormGroup>
                                </div>
                                <div className="col-5 ps-1">
                                    <FormGroup isRequired label='' labelSpacing='mb-1' error={productStore?.formCreateProductErrors?.attributeDescription}>
                                        <Input placeholder="Type..." className="custom-input"
                                            value={attribute?.description}
                                            onChange={(event) => onChangeValue(event, 'attributeDescription', attributeIndex)} autoComplete="off" />
                                    </FormGroup>
                                </div>
                                <div className="col-2 d-flex">
                                    <StatusComponent status={attribute.status} switchOnly onToggle={(checked: boolean) => toggleStatus(checked, 'attributeStatus', attributeIndex)} />
                                    {attributeIndex > 0 &&
                                        <div className="col ms-2" style={{ cursor: 'pointer', color: 'rgb(99, 93, 93)', fontSize: '11px' }}
                                            onClick={() => onRemoveAttribute(attributeIndex)}>x</div>
                                    }
                                </div>
                            </div>
                        })}
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-5">
                    <FormGroup isRequired label='Status' labelSpacing='mb-1' error={productStore?.formCreateProductErrors?.productStatus}
                        labelComponent={<StatusComponent status={productStore.productStatus} onToggle={(checked: boolean) => toggleStatus(checked, 'productStatus')} />}>
                        <div style={{ fontSize: '9px', color: '#635D5D' }}>Inactive products will not be listed in store</div>
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-5">
                    <FormGroup isRequired label='Out Of Stock' labelSpacing='mb-1' error={productStore?.formCreateProductErrors?.outOfStock}
                        labelComponent={<StatusComponent status={productStore.outOfStock} onToggle={(checked: boolean) => toggleStatus(checked, 'outOfStock')} />}>
                        <div style={{ fontSize: '9px', color: '#635D5D' }}>Turning this on will show the products as `out of stock` even if the stock is available</div>
                    </FormGroup>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-5">
                    <Button htmlType='button' className="custom-btn" type="primary" onClick={onSubmitCreateProduct}>SAVE</Button>
                </div>
            </div>
            <Loader visibility={productStore?.isLoading} />
        </form>
    </PageTransition >
}

export default observer(UpdateProduct);
