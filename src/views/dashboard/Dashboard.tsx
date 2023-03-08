import React,{useEffect} from 'react';
import { PageTransition } from "../../components";
import DashboardIcon from '../../assets/images/dashboard.svg';
import WhatsappIcon from '../../assets/images/whatsappIcon.svg';
import FbIcon from '../../assets/images/fbIcon.svg';
import TwitterIcon from '../../assets/images/twitIcon.svg';
import RootStore from "../../mobx-store/RootStore";
import {Typography, Link } from '@mui/material';
import { observer } from 'mobx-react-lite';
import DashboardHelper from '../../helpers/DashboardHelper';
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
            <Typography style={{marginBottom: 10}} gutterBottom variant="h6" component="div" color="#304FFE">
                <b>Hi, Hyba Mart</b>
            </Typography>
            <Typography style={{marginBottom: 10}} gutterBottom variant="subtitle1" component="div" color="#000">
               <img src={DashboardIcon} alt="dashboard icon" width="20px"/> <b>Store: Build your e-commerce store</b>
            </Typography>
            <div style={{border: '1px solid #635D5D', borderRadius: 20, padding: "10px 20px", width: '35%',display:"flex", justifyContent:'space-between', alignItems: 'center'}}>
                <div>
                <Typography gutterBottom variant="subtitle1" component="div" color="#000">
                    <b>Your store will be live at</b>
                </Typography>
                <Typography gutterBottom variant="subtitle1" component="div" color="#304FFE">
                    <Link href={shopStore?.storeUrl} underline="hover"><b>{shopStore?.storeUrl}</b></Link>
                </Typography>
                </div>
                <div>
                    <img src={WhatsappIcon} alt="dashboard icon" width="50px" style={{marginRight: 15}}/> 
                    <img src={FbIcon} alt="dashboard icon" width="50px" style={{marginRight: 15}}/> 
                    <img src={TwitterIcon} alt="dashboard icon" width="50px"/> 
                </div>
            </div>
            {/* <div>Dashboard Logged successfully with {authStore?.email}</div>
            <span>Your store will be live at <a href={shopStore?.storeUrl} target="_blank">{shopStore?.storeUrl}</a></span> */}
    </PageTransition>   
}

export default observer(Dashboard);