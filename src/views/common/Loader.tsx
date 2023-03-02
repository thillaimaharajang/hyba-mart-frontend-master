import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ShopHelper from "../../helpers/ShopHelper";
import useLogout from "../../hooks/useLogout";
import RootStore from "../../mobx-store/RootStore";
import Function from "../../utils/Function";

interface ILoaderProps {
    visibility: boolean
}

const Loader: React.FC<ILoaderProps> = (props) => {
    let { authStore, shopStore } = RootStore;
    let navigate = useNavigate();
    const logoutCb = useLogout();

    useEffect(() => {
        if (authStore?.isLoggedIn) {
            getStoreDetails();
        } else {
            navigate('/login');
        }
    }, []);

    const getStoreDetails = async () => {
        await ShopHelper(navigate).GetShopDetailsByUserId();
        shopStore.isInfoModal = Function.isEmptyObject(shopStore.storeDetails);
    }

    return <>
        {props?.visibility &&
            <div className='d-flex loader-frame'>
                <div className='loading-spinner' />
            </div>
        }
    </>
}

export default Loader;
