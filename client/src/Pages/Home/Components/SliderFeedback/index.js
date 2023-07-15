import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Col, Container, Row } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styles from './sliderFeedback.module.scss';
const cx = classNames.bind(styles);
// Custom Arrow
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
// Custom Arrow

function sliderFeedback() {
    const settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:3000,    
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
    return (
        <Container fluid={true} className={cx('feedback-wrap')}>
            <Row>
                <Col>
                    <h2 className={cx('title-feedback')}>OUR HAPPY CLIENTS</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <div className={cx('slider-wrap')}>
                            <Slider {...settings}>
                                <div className={cx('feedback-content')}>
                                    <p className={cx('title-feedback')}>
                                        5-star rating 100%. So amazing and helpful. Stress-free and fun. ???? Eileen was
                                        amazing. So wonderful.
                                    </p>
                                    <p className={cx('name-feedback')}>Linda</p>
                                </div>
                                <div className={cx('feedback-content')}>
                                    <p className={cx('title-feedback')}>
                                        “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam accumsan hendrerit
                                        massa id lacinia. Nulla sed ipsum id odio luctus ornare.”
                                    </p>
                                    <p className={cx('name-feedback')}>Linda</p>
                                </div>
                                <div className={cx('feedback-content')}>
                                    <p className={cx('title-feedback')}>
                                        So happy with my Almo. Beautiful wood, great craftmanship. It is exactly as I
                                        was hoping. Perfect for my needs.
                                    </p>
                                    <p className={cx('name-feedback')}>Linda</p>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default sliderFeedback;
