import { Button, Input } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormGroup, Loader, PageTransition } from "../../components";
import { Icons } from "../../constant/Icons";
import SocialLinkHelper from "../../helpers/SocialLinkHelper";
import RootStore from "../../mobx-store/RootStore";
import Function from "../../utils/Function";

let isValidForm: boolean = true;
let isStoreLinkCreated: boolean = false;

const SocialLinks: React.FC = () => {

    const { socialLinkStore } = RootStore;
    const navigate = useNavigate();

    useEffect(() => {
        getSocialLinks();
    }, []);

    const getSocialLinks = async () => {
        await SocialLinkHelper(navigate).GetSocialLinks();
        socialLinkStore.setSocialLinksValues();
        if (socialLinkStore.socialLinks?.id) {
            isStoreLinkCreated = true;
        }
    }

    const onChangeValue = (event: React.ChangeEvent<any>, name: string = '') => {
        event.preventDefault();
        const { value } = event.target;

        if (name === 'facebookUrl') {
            socialLinkStore.facebookUrl = value;
        } else if (name === 'whatsappUrl') {
            socialLinkStore.whatsappUrl = value;
        } else if (name === 'twitterUrl') {
            socialLinkStore.twitterUrl = value;
        } else if (name === 'skypeUrl') {
            socialLinkStore.skypeUrl = value;
        } else if (name === 'instagramUrl') {
            socialLinkStore.instagramUrl = value;
        } else if (name === 'linkedInUrl') {
            socialLinkStore.linkedInUrl = value;
        } else if (name === 'pinterestUrl') {
            socialLinkStore.pinterestUrl = value;
        } else if (name === 'youtubeUrl') {
            socialLinkStore.youtubeUrl = value;
        }

        if (!isValidForm) {
            socialLinkStore?.isValidCreateSocialLinkForm();
        }
    }

    const onSubmitCreateSocialLink = async (event: any) => {
        event.preventDefault();
        if (!Function.isUserCanProceed()) {
            return;
        }
        if (socialLinkStore?.isValidCreateSocialLinkForm()) {
            isValidForm = true;
            await SocialLinkHelper(navigate).CreateSocialLink();
        } else {
            isValidForm = false;
        }
    }

    const onSubmitUpdateSocialLink = async (event: any) => {
        event.preventDefault()
        if (socialLinkStore?.isValidCreateSocialLinkForm()) {
            isValidForm = true;
            await SocialLinkHelper(navigate).UpdateSocialLink();
        } else {
            isValidForm = false;
        }
    }

    return <PageTransition>
        <div className="row mb-2">
            <div className="col-5">
                <div className="col" style={{ fontWeight: '600', fontSize: '18px' }}>
                    <span style={{ color: '#000000' }}>Social Links:</span>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-4">
                <FormGroup isRequired label='Facebook' labelSpacing='mb-1' error={socialLinkStore?.formCreateSocialLinksErrors?.facebookUrl}>
                    <div className="d-flex" style={{ height: '35px' }}>
                        <img src={Icons.Facebook} alt='facebook-logo' />
                        <Input placeholder="Enter URL" className="custom-input ms-2" value={socialLinkStore?.facebookUrl}
                            onChange={(event) => onChangeValue(event, 'facebookUrl')} autoComplete="off" />
                    </div>
                </FormGroup>
            </div>
            <div className="col-4">
                <FormGroup label='Skype' labelSpacing='mb-1'>
                    <div className="d-flex" style={{ height: '35px' }}>
                        <img src={Icons.Skype} alt='skype-logo' />
                        <Input placeholder="Enter URL" className="custom-input ms-2" value={socialLinkStore?.skypeUrl}
                            onChange={(event) => onChangeValue(event, 'skypeUrl')} autoComplete="off" />
                    </div>
                </FormGroup>
            </div>
        </div>
        <div className="row">
            <div className="col-4">
                <FormGroup label='Twitter' labelSpacing='mb-1'>
                    <div className="d-flex" style={{ height: '35px' }}>
                        <img src={Icons.Twitter} alt='twitter-logo' />
                        <Input placeholder="Enter URL" className="custom-input ms-2" value={socialLinkStore?.twitterUrl}
                            onChange={(event) => onChangeValue(event, 'twitterUrl')} autoComplete="off" />
                    </div>
                </FormGroup>
            </div>
            <div className="col-4">
                <FormGroup isRequired label='Whatsapp' labelSpacing='mb-1' error={socialLinkStore?.formCreateSocialLinksErrors?.whatsappUrl}>
                    <div className="d-flex" style={{ height: '35px' }}>
                        <img src={Icons.WhatsApp} alt='whatsapp-logo' />
                        <Input placeholder="Enter URL" className="custom-input ms-2" value={socialLinkStore?.whatsappUrl}
                            onChange={(event) => onChangeValue(event, 'whatsappUrl')} autoComplete="off" />
                    </div>
                </FormGroup>
            </div>
        </div>
        <div className="row">
            <div className="col-4">
                <FormGroup label='Instagram' labelSpacing='mb-1'>
                    <div className="d-flex" style={{ height: '35px' }}>
                        <img src={Icons.Instagram} alt='instagram-logo' />
                        <Input placeholder="Enter URL" className="custom-input ms-2" value={socialLinkStore?.instagramUrl}
                            onChange={(event) => onChangeValue(event, 'instagramUrl')} autoComplete="off" />
                    </div>
                </FormGroup>
            </div>
        </div>
        <div className="row">
            <div className="col-4">
                <FormGroup label='Youtube' labelSpacing='mb-1'>
                    <div className="d-flex" style={{ height: '35px' }}>
                        <img src={Icons.YouTube} alt='youtube-logo' />
                        <Input placeholder="Enter URL" className="custom-input ms-2" value={socialLinkStore?.youtubeUrl}
                            onChange={(event) => onChangeValue(event, 'youtubeUrl')} autoComplete="off" />
                    </div>
                </FormGroup>
            </div>
        </div>
        <div className="row">
            <div className="col-4">
                <FormGroup label='LinkedIn' labelSpacing='mb-1'>
                    <div className="d-flex" style={{ height: '35px' }}>
                        <img src={Icons.LinkedIn} alt='linkedin-logo' />
                        <Input placeholder="Enter URL" className="custom-input ms-2" value={socialLinkStore?.linkedInUrl}
                            onChange={(event) => onChangeValue(event, 'linkedInUrl')} autoComplete="off" />
                    </div>
                </FormGroup>
            </div>
        </div>
        <div className="row">
            <div className="col-4">
                <FormGroup label='Pinterest' labelSpacing='mb-1'>
                    <div className="d-flex" style={{ height: '35px' }}>
                        <img src={Icons.Pinterest} alt='pinterest-logo' />
                        <Input placeholder="Enter URL" className="custom-input ms-2" value={socialLinkStore?.pinterestUrl}
                            onChange={(event) => onChangeValue(event, 'pinterestUrl')} autoComplete="off" />
                    </div>
                </FormGroup>
            </div>
        </div>
        <div className="row mt-3">
            <div className="col-4">
                <Button htmlType='button' className="custom-btn" type="primary"
                    onClick={isStoreLinkCreated ? onSubmitUpdateSocialLink : onSubmitCreateSocialLink}>{isStoreLinkCreated ? 'UPDATE' : 'SAVE'}</Button>
            </div>
        </div>
        <Loader visibility={socialLinkStore?.isLoading} />
    </PageTransition>
}

export default observer(SocialLinks);
