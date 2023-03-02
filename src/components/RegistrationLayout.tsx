import CopyRight from "./CopyRight";

interface IRegistrationLayoutProps {
    children?: any;
    header: string;
    subHeader: string;
}

const RegistrationLayout: React.FC<IRegistrationLayoutProps> = (props) => {
    const { children, header, subHeader } = props;
    return <div className="d-flex flex-column" style={{ height: '100vh' }}>
        <div style={{ height: '50%' }} className='registration-bg' />
        <div style={{ height: '50%' }} className="bg-white" />
        <div className="float-layout-container">
            <div style={{ width: '21.5%', height: '100%' }}>
                <div className="d-flex justify-content-center align-items-center" style={{ height: '28%', position: 'relative' }}>
                    <div className="layout-panel"></div>
                    <div className="layout-panel-text">
                        <div className="gradient-link-btn" style={{ fontSize: '30px', fontWeight: '700' }}>{header}</div>
                        <div style={{ color: '#635D5D', fontSize: '12px' }}>{subHeader}</div>
                    </div>
                </div>
                <div style={{ height: '72%' }}>
                    <div className="layout-container p-3">
                        {children}
                    </div>
                    <CopyRight />
                </div>
            </div>
        </div>
    </div>
}

export default RegistrationLayout;
