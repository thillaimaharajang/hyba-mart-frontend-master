import { message } from "antd";
import { useEffect, useState } from "react";
import { Icons } from "../constant/Icons";
import Function from "../utils/Function";

interface ICustomUploadProps {
    value?: any
    onChange?: any
    onDelete: any
    previewImageStyle?: React.CSSProperties;
    previewContainerStyle?: React.CSSProperties;
    uploadBtnStyle?: React.CSSProperties;
    maxSize: number
    accept: string
    isMultipleImage?: boolean
    showPlusOnly?: boolean
}

const CustomUpload: React.FC<ICustomUploadProps> = (props) => {
    const { value, previewImageStyle, previewContainerStyle } = props;
    const [displayImages, setDisplayImage]: any[] = useState([]);

    useEffect(() => {
        setDisplayImage([]);
        let images: any[] = [];

        if (Array.isArray(value)) {
            value.forEach((val) => {
                if (typeof val === 'object') {
                    if (val?.size) {
                        images.push(convertFileObjectToUrl(val));
                    }
                } else {
                    images.push(Function.loadImagePath(val));
                }
            })
        } else if (value) {
            if (typeof value === 'object') {
                if (value?.size) {
                    images.push(convertFileObjectToUrl(value));
                }
            } else {
                images.push(Function.loadImagePath(value));
            }
        }
        setDisplayImage(images);
    }, [value]);

    const convertFileObjectToUrl = (object: any) => {
        return URL.createObjectURL(object)
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const maxFileSize: number = props?.maxSize * 1024 * 1024; // Convert Mb to Bytes

        if (event && event.target && event.target.files && event.target.files.length > 0) {
            if (event.target.files[0].size > maxFileSize) {
                message.error(`Image must not exceed ${props?.maxSize} MB!`, 5);
                return false;
            } else {
                props?.onChange(event);
            }
        }
    }

    const onDelete = (imageIndex: any) => {
        props?.onDelete(imageIndex);
    }
    return <div className="row m-0">
        {displayImages?.map((displayImage: string | undefined, imageIndex: any) => {
            return <div key={imageIndex} style={previewContainerStyle} className={`image-preview-container ${props?.isMultipleImage ? 'me-3 mb-3' : ''}`}>
                <img src={displayImage} alt={`upload ${imageIndex}`} style={previewImageStyle} className='image-preview' />
                <div className="image-preview-delete" onClick={() => onDelete(imageIndex)}>
                    <img src={Icons.Delete} alt={`delete ${imageIndex}`} style={{ height: '20px', width: '20px' }} />
                </div>
            </div>
        })}
        {(displayImages.length === 0 || (props?.isMultipleImage && displayImages.length < 5)) &&
            <div className="upload-btn-wrapper p-0" style={props?.uploadBtnStyle}>
                <div className="upload-btn" style={props?.uploadBtnStyle}>
                    <div style={{ fontSize: '15px' }}>+</div>
                    {!props?.showPlusOnly &&
                        <>
                            <div style={{ fontSize: '9px' }}>{`accept: ${props?.accept}`}</div>
                            <div style={{ fontSize: '10px' }}>{`(max size ${props?.maxSize} MB)`}</div>
                        </>
                    }
                </div>
                <input type="file" name="myfile" onChange={onChange} accept={props?.accept} />
            </div>
        }
    </div>
}

export default CustomUpload;
