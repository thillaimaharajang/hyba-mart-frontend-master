import { Button } from "antd";
import { SVGs } from "../constant/SVGs";

interface ISubscriptionPanelProps {
    
}

const SubscriptionPanel: React.FC<ISubscriptionPanelProps> = (props) => {

    return <div className="d-flex flex-column p-2 pb-0"
        style={{ height: '20rem', width: '20%', backgroundColor: '#EFEFEF', borderRadius: '25px' }}>
        <div className="d-flex align-items-center" style={{ height: '25%', borderBottom: '1px solid rgba(99, 93, 93, 0.3)' }}>
            <div className="col-3">
                <img src={SVGs.Diamond} alt="diamond" style={{ maxWidth: '100%' }} />
            </div>
            <div className="col-6">

            </div>
            <div className="col-3">

            </div>
        </div>
        <div style={{ height: '60%', borderBottom: '1px solid rgba(99, 93, 93, 0.3)' }}>b</div>
        <div className='d-flex justify-content-center align-items-center' style={{ height: '15%' }}>
            <Button htmlType='button' className="subscription-btn" type="primary">Your Plan</Button>
        </div>
    </div>
}

export default SubscriptionPanel;
