import { Outlet, useLocation, useMatch, useNavigate } from "react-router-dom";
import { SVGs } from "../constant/SVGs";
import NestedRoutes from "../router/NestedRoutes";

const NestedSidebar: React.FC = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const matchedPath = useMatch(pathname);

    return <div className="d-flex">
        <div className="col-2 px-2 nested-sidebar"
            style={{ overflowX: 'hidden', overflowY: 'scroll', height: 'calc(100vh - 50px)' }}>
            {NestedRoutes?.map((nestedRoute, nestedRouteIndex) => {
                return <div key={nestedRouteIndex}>
                    <div style={{ borderBottom: nestedRoute?.category ? '1.5px solid #EBEFFE' : 'none' }}>{nestedRoute?.category}</div>
                    {nestedRoute?.routes?.map((route, routeIndex) => {
                        const isActive = matchedPath?.pathname?.includes(`/${route?.path}`);
                        return <div key={routeIndex} className={`my-2 d-flex align-items-center ${isActive ? 'nested-list-active' : ''}`}
                            style={{ height: '30px', color: '#635D5D', fontWeight: '500', fontSize: '15px', cursor: 'pointer' }} onClick={() => navigate(route?.path)}>
                            <div className="ms-3 me-2 text-ellipsis d-flex align-items-center" key={routeIndex}>
                                <img src={SVGs[route?.icon]} alt="nested-sidebar-logo" height='15' width='15' className={isActive ? 'nested-sidebar-icon-active' : 'nested-sidebar-icon'} />
                                <span className="ms-2">{route?.name}</span>
                            </div>
                        </div>
                    })}
                </div>
            })}
        </div>
        <div className="col-10 p-2"
            style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 50px)' }}
        >
            <Outlet />
        </div>
    </div>
}

export default NestedSidebar;
