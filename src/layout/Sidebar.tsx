import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { Images } from "../constant/Images";
import { SVGs } from "../constant/SVGs";
import RootStore from "../mobx-store/RootStore";
import _routes from "../router/Routes";
import Function from "../utils/Function";

const Sidebar: React.FC = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const matchedPath = useMatch(pathname);
    let { shopStore } = RootStore;
    let isStoreCreated: boolean = !Function.isEmptyObject(shopStore.storeDetails);
    let profileImage = Images.BrandLogoLight;
    let businessName = 'Hyba Mart';
    let description = '“Empowering Your Business”';

    if (isStoreCreated) {
        profileImage = Function.loadImagePath(shopStore?.storeDetails?.profileImage);
        businessName = shopStore.storeDetails?.businessName;
        description = JSON.parse(shopStore.storeDetails?.description);
    }

    return <div className="col-2">
        <div className="navigation col-2">
            <div className="d-flex flex-column justify-content-center px-2" style={{ height: '8.5rem' }}>
                <div className="mt-2 mb-1">
                    <img src={profileImage} alt='brand-logo-light' style={{ width: '4.2rem' }} />
                </div>
                <div className="mt-2" style={{ fontSize: '13px' }}>
                    <div className="text-white text-ellipsis">{businessName}</div>
                    {isStoreCreated ?
                        <div className="text-white text-ellipsis-with-two-line" dangerouslySetInnerHTML={{ __html: description }} />
                        :
                        <div className="text-white text-ellipsis-with-two-line">{description}</div>
                    }
                </div>
            </div>
            <ul className="pt-3">
                {_routes.map((route, index) => {
                    const isActive = matchedPath?.pathname?.includes(`/${route?.path}`);
                    return <li key={index} className={`list ${isActive ? 'active' : ''}`}
                        onClick={() => navigate(route?.path)}>
                        <b></b>
                        <b></b>
                        <a>
                            <span className="icon">
                                <img src={SVGs[route?.icon]} alt="sidebar-logo" height='16' width='16' className={isActive ? 'sidebar-icon-active' : 'sidebar-icon'} />
                            </span>
                            <span className="title">{route?.name}</span>
                        </a>
                    </li>
                })}
            </ul>
            <div className="upgrade-btn">
                <div className="col-4 d-flex justify-content-center">
                    <img src={Images.UpgradeLogo} alt="upgrade-logo" style={{ height: '5rem' }} />
                </div>
                <div className="col-8">
                    <div style={{ color: '#4701C4', fontWeight: 'bold', fontSize: 'medium', marginLeft: '-15px' }}>Upgrade to PRO</div>
                    <div style={{ fontSize: '12px' }} className="mt-2">Get 1 month free on annual subscription</div>
                    <div style={{ fontSize: '11px', color: '#4601C0', fontWeight: '500', textAlign: 'right' }} className="pe-2">Upgrade Today!</div>
                </div>
            </div>
        </div>
    </div>
}

export default Sidebar;
