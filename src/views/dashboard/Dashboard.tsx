import { PageTransition } from "../../components";
import RootStore from "../../mobx-store/RootStore";
import { observer } from 'mobx-react-lite';
import React,{useEffect} from 'react';
import DashboardHelper from "../../helpers/dashboardHelper"
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
    let { authStore, shopStore } = RootStore;
    const navigate = useNavigate();

    useEffect(() => {
        getProductStoreDetails();
    }, []);
    
    const getProductStoreDetails = async () => {
        await DashboardHelper(navigate).GetDashboard();
    }
    return <PageTransition>
        <div className="d-flex">
            <div>Dashboard Logged successfully with {authStore?.email}</div>
            <span>Your store will be live at <a href={shopStore?.storeUrl} target="_blank">{shopStore?.storeUrl}</a></span>
        </div>
    </PageTransition>
}

export default observer(Dashboard);
