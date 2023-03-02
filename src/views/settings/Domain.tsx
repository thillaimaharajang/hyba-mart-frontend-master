import { Button, Input } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormGroup, Loader, PageTransition } from "../../components";
import { Icons } from "../../constant/Icons";
import DomainHelper from "../../helpers/DomainHelper";
import RootStore from "../../mobx-store/RootStore";
import Function from '../../utils/Function';

let isValidForm: boolean = true;

const Domain: React.FC = () => {

    const { domainStore } = RootStore;
    const navigate = useNavigate();

    useEffect(() => {
        getDomain();
    }, []);

    const getDomain = async () => {
        await DomainHelper(navigate).GetDomain();
    }

    const onChangeValue = (event: React.ChangeEvent<any>, name: string = '') => {
        event.preventDefault();
        const { value } = event.target;

        if (name === 'url') {
            domainStore.url = value;
        }

        if (!isValidForm) {
            domainStore?.isValidCreateDomainForm();
        }
    }

    const onToggleDomainType = (name = '') => {
        if (name === 'custom') {
            domainStore.domainType = domainStore.domainType === 2 ? 0 : 2;
        } else if (name === 'default') {
            domainStore.domainType = domainStore.domainType === 1 ? 0 : 1;
        }
    }

    const onSubmitCreateDomain = async (event: any) => {
        event.preventDefault();
        if (!Function.isUserCanProceed()) {
            return;
        }
        if (domainStore?.isValidCreateDomainForm()) {
            isValidForm = true;
            await DomainHelper(navigate).CreateDomain();
            domainStore.resetPostData();
            await DomainHelper(navigate).GetDomain();
        } else {
            isValidForm = false;
        }
    }

    const onSubmitUpdateDomain = async (event: any) => {
        event.preventDefault()
        if (domainStore?.isValidCreateDomainForm()) {
            isValidForm = true;
            await DomainHelper(navigate).UpdateDomain();
            domainStore.resetPostData();
            await DomainHelper(navigate).GetDomain();
        } else {
            isValidForm = false;
        }
    }

    return <PageTransition>
        <div className="row mb-2">
            <div className="col-5">
                <div className="col" style={{ fontWeight: '600', fontSize: '18px' }}>
                    <span style={{ color: '#000000' }}>Domain:</span>
                </div>
                <div className="col mt-2" style={{ fontWeight: '500', fontSize: '11px' }}>
                    <span style={{ color: '#635D5D' }}>Create My Bizz Page URL & share it with people.</span>
                </div>
            </div>
        </div>

        <FormGroup isRequired label='' labelSpacing='mb-1' error={domainStore?.formCreateDomainErrors?.domainType}>
            <div className="row mt-2">
                <div className="col-4">
                    <div className={`d-flex domain-type-container ${domainStore.domainType === 2 ? 'custom-gradient-container' : ''}`}>
                        <div className="col-3 d-flex justify-content-center align-items-center">
                            <div className={`domain-type-radio ${domainStore.domainType === 2 ? 'domain-type-radio-active' : ''}`}
                                onClick={() => onToggleDomainType('custom')}>
                                {domainStore.domainType === 2 &&
                                    <img src={Icons.Tick} alt="tick-icon" style={{ height: '10px', width: '10px' }} />
                                }
                            </div>
                        </div>
                        <div className="col-9">
                            <div className={`domain-type-header-text ${domainStore.domainType === 2 ? 'domain-type-header-text-active' : ''}`}
                            >Your own Domain</div>
                            <div className={`domain-type-header-msg ${domainStore.domainType === 2 ? 'domain-type-header-msg-active' : ''}`}
                            >Use your own domain to make your Biz Page and Store live.</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-4">
                    <div className={`d-flex domain-type-container ${domainStore.domainType === 1 ? 'custom-gradient-container' : ''}`}>
                        <div className="col-3 d-flex justify-content-center align-items-center">
                            <div className={`domain-type-radio ${domainStore.domainType === 1 ? 'domain-type-radio-active' : ''}`}
                                onClick={() => onToggleDomainType('default')}>
                                {domainStore.domainType === 1 &&
                                    <img src={Icons.Tick} alt="tick-icon" style={{ height: '10px', width: '10px' }} />
                                }
                            </div>
                        </div>
                        <div className="col-9">
                            <div className={`domain-type-header-text ${domainStore.domainType === 1 ? 'domain-type-header-text-active' : ''}`}
                            >https://hybamart.io/name</div>
                            <div className={`domain-type-header-msg ${domainStore.domainType === 1 ? 'domain-type-header-msg-active' : ''}`}
                            >You can make your Bizz Page and Store live with our domain.</div>
                        </div>
                    </div>
                </div>
            </div>
        </FormGroup>

        <div className="row">
            <div className="col-4">
                <FormGroup isRequired label='URL' labelSpacing='mb-1' error={domainStore?.formCreateDomainErrors?.url}>
                    <Input placeholder="URL" className="custom-input" value={domainStore?.url}
                        disabled={domainStore.domainType === 2 ? false : true}
                        onChange={(event) => onChangeValue(event, 'url')} autoComplete="off" />
                </FormGroup>
            </div>
        </div>
        <div className="row mt-3">
            <div className="col-4">
                <Button htmlType='button' className="custom-btn" type="primary"
                    disabled={domainStore.domainType === 0 ? true : false}
                    onClick={domainStore.domain?.id ? onSubmitUpdateDomain : onSubmitCreateDomain}>{domainStore.domain?.id ? 'UPDATE' : 'SAVE'}</Button>
            </div>
        </div>
        <Loader visibility={domainStore?.isLoading} />
    </PageTransition>
}

export default observer(Domain);
