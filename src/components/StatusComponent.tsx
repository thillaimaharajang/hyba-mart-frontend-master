import { Switch } from "antd";

interface IStatusComponentProps {
    status: boolean
    onToggle: any
    switchOnly?: boolean
}

const StatusComponent: React.FC<IStatusComponentProps> = (props) => {
    let statusText = null;
    if (!props?.switchOnly) {
        if (props?.status) {
            statusText = <span style={{ fontSize: '13px', color: '#304FFE' }}>Active</span>
        } else {
            statusText = <span style={{ fontSize: '13px', color: '#F6C451' }}>Inactive</span>
        }
    }
    return <div style={{ display: 'flex', alignItems: 'center' }}>
        {statusText}
        <Switch className={`ms-1 ${props?.status ? 'custom-switch-active' : 'custom-switch'}`}
            size='small' checked={props?.status} onChange={props.onToggle} />
    </div>
}

export default StatusComponent;
