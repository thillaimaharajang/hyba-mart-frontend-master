import { useNavigate } from "react-router-dom";
import RootStore from "../mobx-store/RootStore";
import AppStorage from "../storage/AppStorage";

const useLogout = () => {
    const navigate = useNavigate();
    const { authStore, shopStore, productCategory, badgeStore, chargesStore, attributesStore,
        productStore, contactStore, socialLinkStore, linksStore, domainStore } = RootStore;

    return () => {
        AppStorage.clearStorage();
        authStore.resetData();
        shopStore.resetData();
        productCategory.resetData();
        badgeStore.resetData();
        chargesStore.resetData();
        attributesStore.resetData();
        productStore.resetData();
        contactStore.resetData();
        socialLinkStore.resetData();
        linksStore.resetData();
        domainStore.resetData();
        navigate('/login', { replace: true });
    }
}

export default useLogout;
