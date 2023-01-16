import { Button, Input } from "antd";
import { FormGroup, Loader, PageTransition } from "../../../components";
import RootStore from "../../../mobx-store/RootStore";
import { observer } from "mobx-react-lite";
import 'react-phone-input-2/lib/material.css';
import { useNavigate } from "react-router-dom";
import LinksHelper from "../../../helpers/LinksHelper";
import Function from "../../../utils/Function";

let isValidForm: boolean = true;

const AddLink: React.FC = () => {

    let { linksStore } = RootStore;
    const navigate = useNavigate();

    const onChangeValue = (event: React.ChangeEvent<any>, name: string = '') => {
        event.preventDefault();
        const { value } = event.target;

        if (name === 'title') {
            linksStore.title = value;
        } else if (name == 'url') {
            linksStore.url = value;
        } else if (name == 'description') {
            linksStore.description = value;
        }

        if (!isValidForm) {
            linksStore?.isValidCreateLinkForm()
        }
    }

    const onSubmitCreateLink = async (event: any) => {
        event.preventDefault();
        if (!Function.isUserCanProceed()) {
            return;
        }
        if (linksStore?.isValidCreateLinkForm()) {
            isValidForm = true;
            await LinksHelper(navigate).CreateLink();
            linksStore?.resetPostData();
            navigate(-1);
        } else {
            isValidForm = false;
        }
    }

    return <PageTransition>
        <form onSubmit={onSubmitCreateLink}>
            <div className="row mb-2">
                <div className="col-5">
                    <div className="col" style={{ fontWeight: '600', fontSize: '18px' }}>
                        <span style={{ color: '#000000' }}>Create Link:</span>
                    </div>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-4">
                    <FormGroup isRequired label='Title' labelSpacing='mb-1' error={linksStore?.formCreateLinksErrors?.title}>
                        <Input placeholder="Title" className="custom-input" value={linksStore?.title}
                            onChange={(event) => onChangeValue(event, 'title')} autoComplete="off" />
                    </FormGroup>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-4">
                    <FormGroup isRequired label='URL' labelSpacing='mb-1' error={linksStore?.formCreateLinksErrors?.url}>
                        <Input placeholder="URL" className="custom-input" value={linksStore?.url}
                            onChange={(event) => onChangeValue(event, 'url')} autoComplete="off" />
                    </FormGroup>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-4">
                    <FormGroup isRequired label='Description' labelSpacing='mb-1' error={linksStore?.formCreateLinksErrors?.description}>
                        <Input placeholder="Description" className="custom-input" value={linksStore?.description}
                            onChange={(event) => onChangeValue(event, 'description')} autoComplete="off" />
                    </FormGroup>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-4">
                    <Button htmlType='submit' className="custom-btn" type="primary" onClick={onSubmitCreateLink}>CREATE</Button>
                </div>
            </div>
            <Loader visibility={linksStore?.isLoading} />
        </form>
    </PageTransition >
}

export default observer(AddLink);
