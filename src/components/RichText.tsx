import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface IRichTextProps {
    onChange: any
    value: EditorState
}

const RichText: React.FC<IRichTextProps> = (props) => {
    const onEditorStateChange = (content: EditorState) => {
        props?.onChange(content)
    }

    return <Editor
        editorState={props?.value}
        wrapperClassName="demo-wrapper mt-1"
        editorClassName="demo-editor"
        onEditorStateChange={onEditorStateChange}
        wrapperStyle={{}}
        toolbar={{
            options: ["inline", "textAlign", "list", "link", "emoji", "image"],
            inline: {
                options: ["bold", "italic", "underline"]
            },
            textAlign: {
                inDropdown: true,
                dropdownClassName: undefined,
            },
            list: {
                inDropdown: true,
                dropdownClassName: undefined,
            },
            link: {
                options: ["link"]
            }
        }}
    />
}

export default RichText;
