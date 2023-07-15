import ReactImageMagnify from 'react-image-magnify';
import classNames from 'classnames/bind';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './imageMagnify.module.scss'
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles)
function ImageMagnify({src}) {
    const isLoading = useSelector(state=>state.product.isLoading)
    return (
       <div className={cx('image-magnify')}>
           { !isLoading ? <ReactImageMagnify
                {...{
                    fadeDurationInMs:500,
                    smallImage: {
                        alt: 'Wristwatch by Ted Baker London',
                        isFluidWidth: true,
                        src:src?.image||"https://cuocsongdungnghia.com/wp-content/uploads/2018/05/loi-hinh-anh.jpg",
                    },
                    largeImage: {
                        src: src?.image||"https://cuocsongdungnghia.com/wp-content/uploads/2018/05/loi-hinh-anh.jpg",
                        alt: 'Wristwatch by Ted Baker London',
                        width: 2000,
                        height: 1000
                    },
                    enlargedImagePosition: 'over',
                }}
            />:<Skeleton  height={1000}></Skeleton>}
       </div>
    );
}

export default ImageMagnify;
