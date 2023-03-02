import { FormGroup, Loader, PageTransition } from "../../components";
import RootStore from "../../mobx-store/RootStore";
import { observer } from 'mobx-react-lite';
import { Button, Input, Modal, Select, Switch } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Images } from "../../constant/Images";
import '../../styles/Settings.css';
import RichText from "../../components/RichText";
import ShopHelper from "../../helpers/ShopHelper";
import { useEffect } from "react";
import { EditorState } from "draft-js";
import { useNavigate } from "react-router-dom";
import Function from "../../utils/Function";
import CustomUpload from "../../components/CustomUpload";

let isValidForm: boolean = true;
const { Option } = Select;

const BusinessProfile: React.FC = () => {
    let { shopStore } = RootStore;
    let navigate = useNavigate();
    let isStoreCreated = !Function.isEmptyObject(shopStore?.storeDetails);

    useEffect(() => {
        getCountryandCategoryDetails();
    }, []);

    const getCountryandCategoryDetails = async () => {
        await ShopHelper(navigate).GetCountries();
        await ShopHelper(navigate).GetCategories();
    }

    const onChangeImage = (event: any, name?: string) => {
        if (name === 'profileImage') {
            shopStore.profileImage = event?.target?.files[0];
        } else if (name === 'coverImage') {
            shopStore.coverImage = event?.target?.files[0];
        } else if (name === 'favImage') {
            shopStore.favImage = event?.target?.files[0];
        }
        if (!isValidForm) {
            shopStore.isValidShopCreateForm();
        }
    }

    const onDeleteImage = (name: string = '') => {
        if (name === 'profileImage') {
            shopStore.profileImage = '';
        } else if (name === 'coverImage') {
            shopStore.coverImage = '';
        } else if (name === 'favImage') {
            shopStore.favImage = '';
        }
    }

    const onChangeValue = (event: React.ChangeEvent<any>, name: string = '') => {
        event.preventDefault();
        let { value } = event.target;

        if (name === 'businessName') {
            shopStore.businessName = value;
        } else if (name === 'name') {
            shopStore.name = value;
        } else if (name === 'businessCategory') {
            shopStore.selectedCategoryId = value;
        } else if (name === 'address') {
            shopStore.address = value;
        } else if (name === 'country') {
            shopStore.selectedCountryId = value;
        } else if (name === 'invoiceNotes') {
            shopStore.invoiceNotes = value;
        }
        if (!isValidForm) {
            shopStore.isValidShopCreateForm();
        }
    }

    const onChangeSelectValue = (value: any, name: string = '') => {
        if (name === 'businessCategory') {
            shopStore.selectedCategoryId = value;
        } else if (name === 'country') {
            shopStore.selectedCountryId = value;
        }
        if (!isValidForm) {
            shopStore.isValidShopCreateForm();
        }
    }

    const onRichTextChangeValue = (value: EditorState) => {
        shopStore.businessDescription = value;

        if (!isValidForm) {
            shopStore.isValidShopCreateForm();
        }
    }

    const onChangeStoreStatus = (checked: boolean) => {
        shopStore.status = checked;
    }

    const onSaveStore = async (event: any) => {
        event.preventDefault()
        if (shopStore?.isValidShopCreateForm()) {
            isValidForm = true;
            await ShopHelper(navigate).CreateShop();
            shopStore?.resetCreateShopData();
            await ShopHelper(navigate).GetShopDetailsByUserId(false);
        } else {
            isValidForm = false;
        }
    }

    const onUpdateStore = async (event: any) => {
        event.preventDefault()
        if (shopStore?.isValidShopCreateForm()) {
            isValidForm = true;
            await ShopHelper(navigate).UpdateShop();
            shopStore?.resetCreateShopData();
            await ShopHelper(navigate).GetShopDetailsByUserId(false);
        } else {
            isValidForm = false;
        }
    }

    return <PageTransition>
        <div>
            <div className="row">
                <div className="col-4">
                    <FormGroup label='Profile Image' isRequired labelSpacing='mb-1' error={shopStore.formShopCreateErrors?.profileImage}>
                        <CustomUpload value={shopStore.profileImage} onChange={(event: any) => onChangeImage(event, 'profileImage')}
                            previewContainerStyle={{ height: '7rem', width: '7rem', backgroundColor: '#2b0b6e', padding: '15px' }}
                            maxSize={2} accept='.png' onDelete={() => onDeleteImage('profileImage')} />
                    </FormGroup>
                </div>
                <div className="col-4">
                    <FormGroup label='Cover Image' isRequired labelSpacing='mb-1' error={shopStore.formShopCreateErrors?.coverImage}>
                        <CustomUpload value={shopStore.coverImage} onChange={(event: any) => onChangeImage(event, 'coverImage')}
                            previewContainerStyle={{ height: '7rem', width: '19rem', backgroundColor: '#2b0b6e', padding: '15px' }}
                            maxSize={2} accept='.png' onDelete={() => onDeleteImage('coverImage')} />
                    </FormGroup>
                </div>
                <div className="col-4">
                    <FormGroup label='Favicon Image' labelSpacing='mb-1'>
                        <CustomUpload value={shopStore.favImage} onChange={(event: any) => onChangeImage(event, 'favImage')}
                            previewContainerStyle={{ height: '3.5rem', width: '3.5rem', backgroundColor: '#2b0b6e', padding: '15px' }}
                            maxSize={2} accept='.png' onDelete={() => onDeleteImage('favImage')} />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Business Name' labelSpacing='mb-1' error={shopStore?.formShopCreateErrors?.businessName}>
                        <Input placeholder="Business Name" className="custom-input" autoComplete="off"
                            onChange={(event) => onChangeValue(event, 'businessName')} value={shopStore?.businessName}
                        />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup label='Your Name' labelSpacing='mb-1' error={shopStore?.formShopCreateErrors?.name}>
                        <Input placeholder="Your Name" className="custom-input" autoComplete="off"
                            onChange={(event) => onChangeValue(event, 'name')} value={shopStore?.name}
                        />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Business Category(Can be selected once only)' labelSpacing='mb-1' error={shopStore?.formShopCreateErrors?.businessCategory}>
                        <Select placeholder="Select Business Category" className="custom-input" style={{ width: '100%' }}
                            defaultValue={shopStore?.categoryName}
                            onChange={(value) => onChangeSelectValue(value, 'businessCategory')} disabled={isStoreCreated ? true : false}
                        >
                            {shopStore.businessCategories?.map((businessCategory: any, index: any) => {
                                return <Option key={index} value={businessCategory?.id}>{businessCategory?.name}</Option>
                            })}
                        </Select>
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='About Your Business (Max 80 chars)' labelSpacing='mb-1' error={shopStore?.formShopCreateErrors?.businessDescription}>
                        <RichText onChange={onRichTextChangeValue} value={shopStore.businessDescription} />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Address' labelSpacing='mb-1' error={shopStore?.formShopCreateErrors?.address}>
                        <Input placeholder="Address" className="custom-input" autoComplete="off" disabled={isStoreCreated ? true : false}
                            onChange={(event) => onChangeValue(event, 'address')} value={shopStore?.address}
                        />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Country' labelSpacing='mb-1' error={shopStore?.formShopCreateErrors?.country}>
                        <Select placeholder="Select Country" className="custom-input" style={{ width: '100%' }}
                            defaultValue={shopStore.countryName}
                            onChange={(value) => onChangeSelectValue(value, 'country')}>
                            {shopStore.countries?.map((country: any, index: any) => {
                                return <Option key={index} value={country?.id}>{country?.name}</Option>
                            })}
                        </Select>
                    </FormGroup>
                </div>
            </div>
            {isStoreCreated &&
                <div className="row">
                    <div className="col-4">
                        <FormGroup isRequired label='Currency' labelSpacing='mb-1' error={shopStore?.formShopCreateErrors?.address}>
                            <Input placeholder="Currency" className="custom-input" autoComplete="off" disabled={true}
                                value={shopStore?.currency}
                            />
                        </FormGroup>
                    </div>
                </div>
            }
            {isStoreCreated &&
                <div className="row mb-1">
                    <div className="col-4">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '-6px' }}>
                            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>Status</span>
                            <div>
                                <small className='me-2' style={{ color: shopStore?.status ? '#46BE82' : '#ff0000' }}>
                                    {shopStore?.status ? 'Active' : 'Inactive'}</small>
                                <Switch checked={shopStore?.status} onChange={onChangeStoreStatus} size='small' />
                            </div>
                        </div>
                        <small style={{ color: '#635D5D' }}>Turn off if you want to disable store on your business page.</small>
                    </div>
                </div>
            }
            <div className="row">
                <div className="col-4">
                    <FormGroup label='Invoice Notes' labelSpacing='mb-1'>
                        <TextArea rows={4} name='invoiceNotes' placeholder="Invoice Notes" className="custom-input"
                            onChange={(event) => onChangeValue(event, 'invoiceNotes')} value={shopStore?.invoiceNotes} autoComplete="off" />
                    </FormGroup>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-4">
                    <Button htmlType='button' className="custom-btn" type="primary"
                        onClick={isStoreCreated ? onUpdateStore : onSaveStore}>{isStoreCreated ? 'UPDATE' : 'SAVE'}</Button>
                </div>
            </div>
            <Modal centered closable={false} open={shopStore.isInfoModal} footer={null} width={'23%'}
                bodyStyle={{ padding: '13px' }} maskStyle={{ backgroundColor: '#000000', opacity: 0.8 }}
                wrapClassName='custom-info-modal'>
                <div className="d-flex flex-column align-items-center">
                    <div>
                        <img src={Images.Tick} alt="tick-logo" width={50} height={50} />
                    </div>
                    <div className='my-2' style={{ color: '#7777A9', textAlign: 'center', fontSize: '13px', fontWeight: '600' }}>
                        Please fill out the details in business profile and then proceed to your dashboard !</div>
                    <Button htmlType='button' className="lets-go-btn mb-1" onClick={() => shopStore.isInfoModal = false}
                        type="primary" block>LETS GO</Button>
                </div>
            </Modal>
            <Loader visibility={shopStore?.isLoading} />
        </div>
    </PageTransition>
}

export default observer(BusinessProfile);
