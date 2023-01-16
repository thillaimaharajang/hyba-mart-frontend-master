import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import SecureService from "../services/SecureService";

const SocialLinkHelper = (navigate: NavigateFunction) => {
    let { socialLinkStore, shopStore } = RootStore;

    const GetSocialLinks = async () => {
        let resSocialLinks: any;

        let params = `?storeId=${shopStore.id}`;

        socialLinkStore.isLoading = true;
        resSocialLinks = await SecureService(navigate).GetResponse(Endpoints.SocialLink + params);
        socialLinkStore.isLoading = false;

        if (resSocialLinks?.status === 'OK') {
            socialLinkStore.socialLinks = resSocialLinks?.data;
        }
    }

    const CreateSocialLink = async () => {
        let resCreateSocialLink: any;
        const socialLinkPostObj = {
            "storeId": shopStore.id,
            "facebookUrl": socialLinkStore.facebookUrl,
            "whatsappUrl": socialLinkStore.whatsappUrl,
            "twitterUrl": socialLinkStore.twitterUrl,
            "linkedInUrl": socialLinkStore.linkedInUrl,
            "instagramUrl": socialLinkStore.instagramUrl,
            "skypeUrl": socialLinkStore.skypeUrl,
            "youtubeUrl": socialLinkStore.youtubeUrl,
            "pinterestUrl": socialLinkStore.pinterestUrl
        }

        socialLinkStore.isLoading = true;
        resCreateSocialLink = await SecureService(navigate).PostResponse(Endpoints.SocialLink, 'POST', socialLinkPostObj);
        socialLinkStore.isLoading = false;

        if (resCreateSocialLink?.status === 'CREATED') {
            message.success(resCreateSocialLink?.message, 5);
            await GetSocialLinks();
        }
    }

    const UpdateSocialLink = async () => {
        let resUpdateSocialLink: any;
        const socialLinkPostObj = {
            "id": socialLinkStore.id,
            "facebookUrl": socialLinkStore.facebookUrl,
            "whatsappUrl": socialLinkStore.whatsappUrl,
            "twitterUrl": socialLinkStore.twitterUrl,
            "linkedInUrl": socialLinkStore.linkedInUrl,
            "instagramUrl": socialLinkStore.instagramUrl,
            "skypeUrl": socialLinkStore.skypeUrl,
            "youtubeUrl": socialLinkStore.youtubeUrl,
            "pinterestUrl": socialLinkStore.pinterestUrl
        }

        socialLinkStore.isLoading = true;
        resUpdateSocialLink = await SecureService(navigate).PostResponse(Endpoints.SocialLink, 'PUT', socialLinkPostObj);
        socialLinkStore.isLoading = false;

        if (resUpdateSocialLink?.status === 'OK') {
            message.success(resUpdateSocialLink?.message, 5);
            await GetSocialLinks();
        }
    }

    return { GetSocialLinks, CreateSocialLink, UpdateSocialLink };
}

export default SocialLinkHelper;
