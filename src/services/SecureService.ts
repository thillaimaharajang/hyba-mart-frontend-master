import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Function from "../utils/Function";
import Endpoints from "./Endpoints";
import HttpClient from "./HttpClient";

const SecureService = (navigate: NavigateFunction) => {
    const { authStore } = RootStore;

    const RefreshToken = async () => {
        let resRefreshToken: any;
        const refreshTokenPostData = {
            refreshToken: authStore?.refreshToken
        };

        authStore.isLoading = true;
        resRefreshToken = await HttpClient(navigate).PostResponse(Endpoints.RefreshToken, 'POST', refreshTokenPostData);
        authStore.isLoading = false;

        if (resRefreshToken?.status === 'OK') {
            authStore.isLoggedIn = true;
            authStore.isValidToken = true;
            authStore.updateToken(resRefreshToken?.data);
        }

        return resRefreshToken?.status === 'OK' ? true : false;
    }

    const GetResponse = async (endpoint: string) => {
        if (!Function.isValidJWTToken()) {
            if (!await RefreshToken()) {
                return;
            }
        }

        return await HttpClient(navigate).GetResponse(endpoint);
    }

    const PostResponse = async (endpoint: string, method: string, body: any, isFormData: boolean = false) => {
        console.log("Body",body)

        return await HttpClient(navigate).PostResponse(endpoint, method, body, isFormData);
    }

    return { GetResponse, PostResponse };
}

export default SecureService;
