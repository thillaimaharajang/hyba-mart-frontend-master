import { NavigateFunction } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import Endpoints from "../services/Endpoints";
import SecureService from "../services/SecureService";

const DashboardHelper = (navigate: NavigateFunction) => {
    let { authStore,shopStore} = RootStore;

    const GetDashboard = async () => {
        let resDashboardDetails: any;
        resDashboardDetails = await SecureService(navigate).GetResponse(`${Endpoints.Dashboard}?userId=${authStore?.userId}`);
        if (resDashboardDetails?.status === 'OK') {
            shopStore.storeUrl = resDashboardDetails?.data;
        }
    }

    return { GetDashboard };
}

export default DashboardHelper;
