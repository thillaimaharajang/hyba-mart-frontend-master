import { Images } from "../constant/Images";

interface IImageViewProps {
    src: any
    alt: string
}

const ImageView: React.FC<IImageViewProps> = (props) => {
    return <img src={props?.src} alt={props?.alt} className="mx-3" style={{ height: '1rem' }} />
}

const CopyRight: React.FC = () => {
    return <div className="d-flex flex-column">
        {/* <div className="d-flex justify-content-center mt-3 mb-1">
            <ImageView src={Images.TwitterLogo} alt="Twitter Logo" />
            <ImageView src={Images.InstagramLogo} alt="Instagram Logo" />
            <ImageView src={Images.PinterestLogo} alt="Pinterest Logo" />
        </div> */}
        <small className="text-center mt-3">Copyright © 2022 Hyba Mart</small>
    </div>
}

export default CopyRight;
