import { Outlet } from "react-router-dom";
import _routes from "../router/Routes";

const Content: React.FC = () => {
    return <div className="col px-4 py-3" style={{ overflowX: 'hidden', overflowY: 'auto' }}>
        <Outlet />
    </div>
}

export default Content;
