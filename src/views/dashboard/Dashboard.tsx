import { PageTransition } from "../../components";
import RootStore from "../../mobx-store/RootStore";
import { observer } from 'mobx-react-lite';

const Dashboard: React.FC = () => {
    let { authStore } = RootStore;

    return <PageTransition>
        <div className="d-flex">
            <div>Dashboard Logged successfully with {authStore?.email}</div>
        </div>
    </PageTransition>
}

export default observer(Dashboard);
