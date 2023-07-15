import ContentSlider from './ContentSlider';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import classNames from 'classnames/bind';
import styles from './slider.module.scss';
const cx = classNames.bind(styles);
function SliderHeader({ children }) {
    var settings = {
        // dots: true,
        infinite: true,
        // fade: true,
        // speed: 200,
        loop: true,
        // pauseOnHover: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        // speed: 1000,
        fade: false,
        autoplay: true,
        // infinite: true,
        autoplaySpeed: 5000,
        // // cssEase: 'linear',
        // slidesToShow: 1,
        // slidesToScroll: 1,
        cssEase: 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
    };
    return (
        <div className={cx('slider-wrap')}>
            {/* header */}
            {children}
            {/* header */}
            <Slider {...settings}>
                <div className={cx('slider-header')}>
                    <img
                        alt="Slider1"
                        src="/assets/slider-1.jpg"
                    ></img>
                    <div className={cx('slider-content')}>
                        <ContentSlider
                            titleSmall="get extra 50% off"
                            titleLarge="uiique fashion designers"
                        ></ContentSlider>
                    </div>
                </div>
                <div className={cx('slider-header')}>
                    <img
                        alt="Slider2"
                        src="/assets/slider-2.jpg"
                    ></img>
                    <div className={cx('slder-content')}>
                        <ContentSlider
                            titleSmall="for online oreder"
                            titleLarge="luxury design fashion"
                        ></ContentSlider>
                    </div>
                </div>
                <div className={cx('slider-header')}>
                    <img
                        alt="Slider3"
                        src="/assets/slider-3.jpg"
                    ></img>
                    <div className={cx('slder-content')}>
                        <ContentSlider titleSmall="sale up to 60% off" titleLarge="black friday sale"></ContentSlider>
                    </div>
                </div>
            </Slider>
        </div>
    );
}

export default SliderHeader;
