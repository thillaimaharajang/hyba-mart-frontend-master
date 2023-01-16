import { Outlet, useLocation } from "react-router-dom";
import Content from "./Content";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout: React.FC = () => {
    const { pathname } = useLocation();

    return <div className="d-flex" style={{ overflowX: 'hidden' }}>
        <Sidebar />
        <div className="d-flex flex-column bg-white col-10">
            <Header />
            {pathname?.includes('store') ?
                <div style={{ marginTop: '50px' }}>
                    <Outlet />
                </div>
                :
                <div className="content-body">
                    <Content />
                </div>
            }
        </div>
    </div>
}

export default Layout;
