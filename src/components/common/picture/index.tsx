import { PictureProps } from '../../../interface/components/common/picture.interface';

function Picture({ className, webpSrc, fallbackSrc, alt }: PictureProps) {
    return (
        <picture className={className}>
            <source type="image/webp" srcSet={webpSrc} />
            <source srcSet={fallbackSrc} />
            <img src={fallbackSrc} alt={alt} className={className} />
        </picture>
    );
}

export default Picture;
