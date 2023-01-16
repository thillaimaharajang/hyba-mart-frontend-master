import { Dropdown, Menu, Modal } from "antd";
import Search from "antd/lib/input/Search";
import { ExclamationCircleOutlined, LogoutOutlined, UserOutlined, KeyOutlined } from '@ant-design/icons';
import { Icons } from "../constant/Icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import RootStore from "../mobx-store/RootStore";
import Function from "../utils/Function";

const { confirm } = Modal;

const Header: React.FC = () => {
    const { shopStore } = RootStore;
    let navigate = useNavigate();
    const { pathname } = useLocation();
    const logoutCb = useLogout();
    const pathnames = pathname.split("/").filter(Boolean);

    const onRouteToProfile = () => {
        navigate('/account/my-profile');
    }

    const onRouteToResetPassword=()=>{
        navigate('/account/reset-password');
    }

    const showLogoutConfirm = () => {
        confirm({
            title: 'Logout',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure you want to log out?',
            onOk() {
                logoutCb();
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const userMenu = (
        <Menu>
            <Menu.Item key="profile" icon={<UserOutlined />} onClick={onRouteToProfile}>Profile</Menu.Item>
            <Menu.Divider />
            <Menu.Item key="resetPassword" icon={<KeyOutlined />} onClick={onRouteToResetPassword}>Reset Password</Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={showLogoutConfirm}>Logout</Menu.Item>
        </Menu>
    );

    return <div className="header">
        <div className="col-7 d-flex align-items-center ps-2">
            <img src={Icons.BackNav} style={{ height: '22px', cursor: 'pointer' }} alt='Back-Nav' onClick={() => navigate(-1)} />
            <span className="ms-2 d-flex" style={{ alignItems: 'baseline' }}>
                {(pathnames.length && !pathname?.includes('main-dashboard')) ?
                    <span>
                        <Link to='/main-dashboard' style={{ color: '#635D5D', fontSize: '12px' }}>Dashboard</Link>
                        <span className="mx-1">/</span>
                    </span>
                    :
                    <span>
                        <div style={{ fontSize: '13px' }}>Dashboard</div>
                        {!pathname?.includes('main-dashboard') &&
                            <span className="mx-1">/</span>
                        }
                    </span>
                }
                {!pathname?.includes('main-dashboard') && pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                    const isLast = index === pathnames.length - 1;
                    return isLast ?
                        <div key={index} style={{ textTransform: 'capitalize', fontSize: '13px' }} className="text-ellipsis me-2">{name}</div>
                        :
                        <span key={index}>
                            <Link to={routeTo} style={{ textTransform: 'capitalize', color: '#635D5D', fontSize: '12px' }}>{name}</Link>
                            <span className="mx-1">/</span>
                        </span>
                })}
            </span>
        </div>
        <div className="col-5 d-flex">
            <div className="col-8">
                <Search placeholder="Search here" className="custom-header-search" enterButton
                    onSearch={undefined} />
            </div>
            <div className="col-4 d-flex justify-content-around align-items-center">
                <div>
                    <img src={Icons.Notifications} style={{ height: '23px', cursor: 'pointer' }} alt='Notifications' />
                </div>
                <div>
                    <img src={Icons.Comments} style={{ height: '23px', cursor: 'pointer' }} alt='Comments' />
                </div>
                <div>
                    <Dropdown className="dropdown-btn" overlay={userMenu}>
                        <img src={shopStore?.storeDetails?.favImage ? Function.loadImagePath(shopStore?.storeDetails?.favImage) : Icons.User}
                            style={{ height: '23px', cursor: 'pointer' }} alt='User' />
                    </Dropdown>
                </div>
            </div>
        </div>
    </div>
}

export default Header;
