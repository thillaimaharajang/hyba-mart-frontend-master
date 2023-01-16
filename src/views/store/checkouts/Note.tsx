import { FormGroup, Loader, PageTransition } from "../../../components";
import RootStore from "../../../mobx-store/RootStore";
import { observer } from 'mobx-react-lite';
import { Button } from "antd";
import '../../../styles/Settings.css';
import RichText from "../../../components/RichText";
import { useEffect } from "react";
import { EditorState } from "draft-js";
import { useNavigate } from "react-router-dom";
import CheckoutHelper from "../../../helpers/CheckoutHelper";

let isValidForm: boolean = true;

const Note: React.FC = () => {
    let { checkoutStore } = RootStore;
    let navigate = useNavigate();

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        await CheckoutHelper(navigate).GetNotes();
    }

    const onRichTextChangeValue = (value: EditorState) => {
        checkoutStore.notes = value;

        if (!isValidForm) {
            checkoutStore.isValidNoteCreateForm();
        }
    }

    const onSaveNotes = async (event: any) => {
        event.preventDefault()
        if (checkoutStore?.isValidNoteCreateForm()) {
            isValidForm = true;
            await CheckoutHelper(navigate).CreateNotes();
            checkoutStore?.resetNotePostData();
            await CheckoutHelper(navigate).GetNotes();
        } else {
            isValidForm = false;
        }
    }

    const onUpdateNotes = async (event: any) => {
        event.preventDefault()
        if (checkoutStore?.isValidNoteCreateForm()) {
            isValidForm = true;
            await CheckoutHelper(navigate).UpdateNotes();
            checkoutStore?.resetNotePostData();
            await CheckoutHelper(navigate).GetNotes();
        } else {
            isValidForm = false;
        }
    }

    return <PageTransition>
        <div>
            <div style={{ fontWeight: '600', fontSize: '18px' }}>
                <span style={{ color: '#000000' }}>Checkout Note:</span>
            </div>
            <div className="row mt-2">
                <div className="col-5">
                    <FormGroup isRequired label='Notes (Max 80 chars)' labelSpacing='mb-1' error={checkoutStore?.formNotesCreateErrors?.notes}>
                        <RichText onChange={onRichTextChangeValue} value={checkoutStore.notes} />
                        <div style={{ color: '#635D5D', fontSize: '12.5px' }}>A help note for customers from you. This will be
                            shown above the ‘Place Order’ button.</div>
                    </FormGroup>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-5">
                    <Button htmlType='button' className="custom-btn" type="primary"
                        onClick={checkoutStore?.noteId ? onUpdateNotes : onSaveNotes}>{checkoutStore?.noteId ? 'UPDATE' : 'SAVE'}</Button>
                </div>
            </div>
            <Loader visibility={checkoutStore?.isLoading} />
        </div>
    </PageTransition>
}

export default observer(Note);
