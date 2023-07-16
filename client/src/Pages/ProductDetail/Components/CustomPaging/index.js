import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import 'react-loading-skeleton/dist/skeleton.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import ImageMagnify from '../ImageMagnify';
import styles from './customPaging.module.scss';
const cx = classNames.bind(styles);
function SampleNextArrow(props) {
    const className = cx('arrow-next');
    const { onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
        </div>
    );
}

function SamplePrevArrow(props) {
    const className = cx('arrow-prev');
    const { onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
        </div>
    );
}
function CustomPaging({ product }) {
    const settings = {
        customPaging: function (i) {
            const img = product[i]?.image;
            return (
                <div>
                 {<img src={img} alt="abc" width="100%" height="100%" />}
                </div>
            );
        },
        dots: true,
        dotsClass: `${cx('slick-dots')} ${cx('slick-thumb')}`,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: (dots) => (
            <ul>
                { dots.map((dot) => (
                    <li key={dot.key} className={cx(dot.props.className)}>
                        { dot.props.children}
                    </li>
                ))}
            </ul>
        ),
    };
    return (
        <div className={cx('slider-wrap')}>
            <Slider {...settings}>
                {product.map((e, i) => {
                    return (
                        <div key={i} >
                            <ImageMagnify key={i} src={e} />
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
}

export default CustomPaging;
