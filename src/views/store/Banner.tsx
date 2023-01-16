import { FormGroup, Loader, PageTransition } from "../../components";
import RootStore from "../../mobx-store/RootStore";
import { observer } from 'mobx-react-lite';
import { Button } from "antd";
import '../../styles/Settings.css';
import BannerHelper from "../../helpers/BannerHelper";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomUpload from "../../components/CustomUpload";

let isValidForm: boolean = true;

const Banner: React.FC = () => {
    let { bannerStore } = RootStore;
    let navigate = useNavigate();

    useEffect(() => {
        getBannerDetails();
    }, []);

    const getBannerDetails = async () => {
        await BannerHelper(navigate).GetBanner();
    }

    const onChangeImage = (event: any, name?: string) => {
        if (name === 'bannerImage1') {
            bannerStore.bannerImage1 = event?.target?.files[0];
        } else if (name === 'bannerImage2') {
            bannerStore.bannerImage2 = event?.target?.files[0];
        } else if (name === 'bannerImage3') {
            bannerStore.bannerImage3 = event?.target?.files[0];
        }
        if (!isValidForm) {
            bannerStore.isValidBannerCreateForm();
        }
    }

    const onDeleteImage = (name: string = '') => {
        if (name === 'bannerImage1') {
            bannerStore.bannerImage1 = '';
        } else if (name === 'bannerImage2') {
            bannerStore.bannerImage2 = '';
        } else if (name === 'bannerImage3') {
            bannerStore.bannerImage3 = '';
        }
    }

    const onSaveBanner = async (event: any) => {
        event.preventDefault()
        if (bannerStore?.isValidBannerCreateForm()) {
            isValidForm = true;
            await BannerHelper(navigate).CreateBanner();
        } else {
            isValidForm = false;
        }
    }

    const onUpdateBanner = async (event: any) => {
        event.preventDefault()
        if (bannerStore?.isValidBannerCreateForm()) {
            isValidForm = true;
            await BannerHelper(navigate).UpdateBanner();
        } else {
            isValidForm = false;
        }
    }

    return <PageTransition>
        <div>
            <div style={{ fontWeight: '600', fontSize: '18px' }}>
                <span style={{ color: '#000000' }}>Slider Banners: 3</span>
            </div>
            <div className="row mt-2">
                <div className="col-4">
                    <FormGroup label='' isRequired labelSpacing='mb-1' error={bannerStore.formCreateBannerErrors?.bannerImage1}>
                        <CustomUpload value={bannerStore.bannerImage1} onChange={(event: any) => onChangeImage(event, 'bannerImage1')}
                            previewContainerStyle={{ height: '7rem', width: '7rem', backgroundColor: '#2b0b6e', padding: '15px' }}
                            maxSize={2} accept='.png' onDelete={() => onDeleteImage('bannerImage1')} />
                    </FormGroup>
                </div>
                <div className="col-4">
                    <FormGroup label='' isRequired labelSpacing='mb-1' error={bannerStore.formCreateBannerErrors?.bannerImage2}>
                        <CustomUpload value={bannerStore.bannerImage2} onChange={(event: any) => onChangeImage(event, 'bannerImage2')}
                            previewContainerStyle={{ height: '7rem', width: '7rem', backgroundColor: '#2b0b6e', padding: '15px' }}
                            maxSize={2} accept='.png' onDelete={() => onDeleteImage('bannerImage2')} />
                    </FormGroup>
                </div>
                <div className="col-4">
                    <FormGroup label='' isRequired labelSpacing='mb-1' error={bannerStore.formCreateBannerErrors?.bannerImage3}>
                        <CustomUpload value={bannerStore.bannerImage3} onChange={(event: any) => onChangeImage(event, 'bannerImage3')}
                            previewContainerStyle={{ height: '7rem', width: '7rem', backgroundColor: '#2b0b6e', padding: '15px' }}
                            maxSize={2} accept='.png' onDelete={() => onDeleteImage('bannerImage3')} />
                    </FormGroup>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-4">
                    <Button htmlType='button' className="custom-btn" type="primary"
                        onClick={bannerStore?.id ? onUpdateBanner : onSaveBanner}>{bannerStore?.id ? 'UPDATE' : 'SAVE'}</Button>
                </div>
            </div>
            <Loader visibility={bannerStore?.isLoading} />
        </div>
    </PageTransition>
}

export default observer(Banner);
