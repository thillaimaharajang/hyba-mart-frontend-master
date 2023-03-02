import { Tooltip } from "antd";
import { Outlet, useLocation, useMatch, useNavigate } from "react-router-dom";
import { ITabRoutesProps } from "../interface/ICommon";
import { SVGs } from "./SVGs";

interface ITabsProps {
    tabRoutes: ITabRoutesProps[] | undefined;
}

const Tabs: React.FC<ITabsProps> = (props) => {
    const { tabRoutes } = props;
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const matchedPath = useMatch(pathname);

    return <div>
        <div className="custom-tabs-container">
            {tabRoutes?.map((tab, tabIndex) => {
                const isActive = matchedPath?.pathname?.includes(`/${tab?.path}`);
                return tab?.name &&
                    <Tooltip key={tabIndex} placement='bottomLeft' title={tab?.name} arrowPointAtCenter>
                        <div onClick={() => navigate(tab?.path)}
                            className={`mb-3 custom-tabs ${isActive ? 'custom-tabs-active' : ''}`}>
                            <img src={SVGs[tab?.icon]} alt="tab-logo" height='15' width='15' className={isActive ? 'custom-tab-icon-active' : 'custom-tab-icon'} />
                            <span className="text-ellipsis ms-2">{tab?.name}</span>
                        </div>
                    </Tooltip>
            })}
        </div>
        <div>
            <Outlet />
        </div>
    </div>
}

export default Tabs;
