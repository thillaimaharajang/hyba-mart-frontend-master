import { Button, Input, Switch } from "antd";
import { FormGroup, Loader, PageTransition } from "../../../components";
import RootStore from "../../../mobx-store/RootStore";
import { observer } from "mobx-react-lite";
import PhoneInput, { CountryData } from "react-phone-input-2";
import 'react-phone-input-2/lib/material.css';
import ContactHelper from "../../../helpers/ContactHelper";
import { useNavigate } from "react-router-dom";

let isValidForm: boolean = true;

const UpdateContact: React.FC = () => {

    let { contactStore } = RootStore;
    const navigate = useNavigate();
    
    const onChangeValue = (event: React.ChangeEvent<any>, name: string = '') => {
        event.preventDefault();
        const { value } = event.target;

        if (name === 'name') {
            contactStore.name = value;
        } else if (name == 'mobile') {
            contactStore.mobile = value;
        }

        if (!isValidForm) {
            contactStore?.isValidCreateContactForm()
        }
    }

    const onChangeDialCode = (value: string, data: CountryData | any, name: string = '') => {
        if (name === 'dialCode') {
            contactStore.dialCode = data?.dialCode;
            contactStore.countryCode = data?.countryCode;
            contactStore.countryName = data?.name;
        }
        if (!isValidForm) {
            contactStore?.isValidCreateContactForm()
        }
    }

    const toggleStatus = (checked: boolean, name: string = '') => {
        if (name === 'callSupport') {
            contactStore.isCallSupport = checked;
        } else if (name === 'whatsappSupport') {
            contactStore.isWhatsappSupport = checked;
        } else if (name === 'status') {
            contactStore.status = checked;
        }
    }

    const onSubmitUpdateContact = async (event: any) => {
        event.preventDefault();
        if (contactStore?.isValidCreateContactForm()) {
            isValidForm = true;
            await ContactHelper(navigate).UpdateContact();
            contactStore?.resetPostData();
            navigate(-1);
        } else {
            isValidForm = false;
        }
    }

    return <PageTransition>
        <form onSubmit={onSubmitUpdateContact}>
            <div className="row mt-2">
                <div className="col-4">
                    <FormGroup isRequired label='Name' labelSpacing='mb-1' error={contactStore?.formCreateContactErrors?.name}>
                        <Input placeholder="Name" className="custom-input" value={contactStore?.name}
                            onChange={(event) => onChangeValue(event, 'name')} autoComplete="off" />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup isRequired label='Country Code Number' labelSpacing='mb-1' error={contactStore?.formCreateContactErrors?.mobile}>
                        <div className="d-flex align-items-center">
                            <div className="col-4">
                                <PhoneInput
                                    containerStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingRight: '5px', marginTop: '3px' }}
                                    inputStyle={{
                                        maxWidth: '100%', paddingLeft: '2px', paddingTop: '5px', paddingBottom: '5px',
                                        backgroundColor: '#ECEFF1', fontSize: '14px', color: 'grey', border: 'none'
                                    }}
                                    buttonStyle={{ marginLeft: '25px' }} country={'in'} specialLabel=''
                                    value={contactStore.dialCode} onChange={(value, data) => onChangeDialCode(value, data, 'dialCode')}
                                />
                            </div>
                            <div className="col-8">
                                <Input placeholder="Whatsapp Number" className="custom-input" type='tel'
                                    onChange={(event) => onChangeValue(event, 'mobile')} value={contactStore?.mobile} autoComplete="off"
                                />
                            </div>
                        </div>
                    </FormGroup>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-4">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div className="custom-label">Call Support</div>
                        <div>
                            {contactStore?.isCallSupport ?
                                <span style={{ fontSize: '12px', color: '#304FFE' }}>Active</span>
                                :
                                <span style={{ fontSize: '12px', color: '#F6C451' }}>Inactive</span>
                            }
                            <Switch className={`ms-1 ${contactStore?.isCallSupport ? 'custom-switch-active' : 'custom-switch'}`}
                                size='small' checked={contactStore?.isCallSupport} onChange={(checked) => toggleStatus(checked, 'callSupport')} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-4">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div className="custom-label">Whatsapp Support</div>
                        <div>
                            {contactStore?.isWhatsappSupport ?
                                <span style={{ fontSize: '12px', color: '#304FFE' }}>Active</span>
                                :
                                <span style={{ fontSize: '12px', color: '#F6C451' }}>Inactive</span>
                            }
                            <Switch className={`ms-1 ${contactStore?.isWhatsappSupport ? 'custom-switch-active' : 'custom-switch'}`}
                                size='small' checked={contactStore?.isWhatsappSupport} onChange={(checked) => toggleStatus(checked, 'whatsappSupport')} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-4">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div className="custom-label">Status</div>
                        <div>
                            {contactStore?.status ?
                                <span style={{ fontSize: '12px', color: '#304FFE' }}>Active</span>
                                :
                                <span style={{ fontSize: '12px', color: '#F6C451' }}>Inactive</span>
                            }
                            <Switch className={`ms-1 ${contactStore?.status ? 'custom-switch-active' : 'custom-switch'}`}
                                size='small' checked={contactStore?.status} onChange={(checked) => toggleStatus(checked, 'status')} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-4">
                    <Button htmlType='submit' className="custom-btn" type="primary" onClick={onSubmitUpdateContact}>UPDATE</Button>
                </div>
            </div>
            <Loader visibility={contactStore?.isLoading} />
        </form>
    </PageTransition >
}

export default observer(UpdateContact);
