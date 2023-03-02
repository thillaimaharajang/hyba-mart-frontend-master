import { Button, Input, Switch } from "antd";
import { FormGroup, Loader, PageTransition } from "../../../components";
import RootStore from "../../../mobx-store/RootStore";
import { observer } from "mobx-react-lite";
import 'react-phone-input-2/lib/material.css';
import { useNavigate } from "react-router-dom";
import PagesHelper from "../../../helpers/PagesHelper";
import CustomUpload from "../../../components/CustomUpload";
import RichText from "../../../components/RichText";
import { EditorState } from "draft-js";

let isValidForm: boolean = true;

const UpdatePage: React.FC = () => {

    let { pagesStore } = RootStore;
    const navigate = useNavigate();

    const onChangeValue = (event: React.ChangeEvent<any>, name: string = '') => {
        event.preventDefault();
        const { value } = event.target;

        if (name === 'name') {
            pagesStore.name = value;
        } else if (name == 'slug') {
            pagesStore.slug = value;
        }

        if (!isValidForm) {
            pagesStore?.isValidCreatePageForm()
        }
    }

    const onChangeImage = (event: any, name?: string) => {
        if (name === 'coverImage') {
            pagesStore.cover = event?.target?.files[0];
        }
        if (!isValidForm) {
            pagesStore.isValidCreatePageForm();
        }
    }

    const onRichTextChangeValue = (value: EditorState) => {
        pagesStore.description = value;
    }

    const onDeleteImage = (name: string = '') => {
        if (name === 'coverImage') {
            pagesStore.cover = '';
        }
    }

    const toggleSwitch = (checked: boolean, name: string = '') => {
        if (name === 'status') {
            pagesStore.status = checked;
        }
    }

    const onSubmitUpdatePage = async (event: any) => {
        event.preventDefault();
        if (pagesStore?.isValidCreatePageForm()) {
            isValidForm = true;
            await PagesHelper(navigate).UpdatePage();
            pagesStore?.resetPostData();
            navigate(-1);
        } else {
            isValidForm = false;
        }
    }

    return <PageTransition>
        <form onSubmit={onSubmitUpdatePage}>
            <div className="row mb-2">
                <div className="col-5">
                    <div className="col" style={{ fontWeight: '600', fontSize: '18px' }}>
                        <span style={{ color: '#000000' }}>Update Page:</span>
                    </div>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-4">
                    <FormGroup isRequired label='Title' labelSpacing='mb-1' error={pagesStore?.formCreatePagesErrors?.name}>
                        <Input placeholder="Title" className="custom-input" value={pagesStore?.name}
                            onChange={(event) => onChangeValue(event, 'name')} autoComplete="off" />
                    </FormGroup>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-4">
                    <FormGroup isRequired label='URL' labelSpacing='mb-1' error={pagesStore?.formCreatePagesErrors?.slug}>
                        <Input placeholder="URL" className="custom-input" value={pagesStore?.slug}
                            onChange={(event) => onChangeValue(event, 'slug')} autoComplete="off" />
                    </FormGroup>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-4">
                    <FormGroup label='Cover' labelSpacing='mb-1' error={pagesStore.formCreatePagesErrors?.cover}>
                        <CustomUpload value={pagesStore.cover} onChange={(event: any) => onChangeImage(event, 'coverImage')}
                            previewContainerStyle={{ height: '7rem', width: '15rem', backgroundColor: '#2b0b6e', padding: '15px' }}
                            uploadBtnStyle={{ height: '7rem', width: '15rem' }}
                            maxSize={2} accept='.png' onDelete={() => onDeleteImage('coverImage')} />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <FormGroup label='Description (Max 80 chars)' labelSpacing='mb-1' error={pagesStore.formCreatePagesErrors.description}>
                        <RichText onChange={onRichTextChangeValue} value={pagesStore.description} />
                    </FormGroup>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-4">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div className="custom-label">Status</div>
                        <div>
                            {pagesStore?.status ?
                                <span style={{ fontSize: '12px', color: '#304FFE' }}>Active</span>
                                :
                                <span style={{ fontSize: '12px', color: '#F6C451' }}>Inactive</span>
                            }
                            <Switch className={`ms-1 ${pagesStore?.status ? 'custom-switch-active' : 'custom-switch'}`}
                                size='small' checked={pagesStore?.status} onChange={(checked) => toggleSwitch(checked, 'status')} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-4">
                    <Button htmlType='submit' className="custom-btn" type="primary" onClick={onSubmitUpdatePage}>UPDATE</Button>
                </div>
            </div>
            <Loader visibility={pagesStore?.isLoading} />
        </form>
    </PageTransition >
}

export default observer(UpdatePage);
