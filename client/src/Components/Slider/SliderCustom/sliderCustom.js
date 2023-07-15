import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
// import { Container, Row, Col } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './sliderCustom.module.scss';

const cx = classNames.bind(styles);

function SliderCustom({ children, slShow = 5, countScroll = 2, dots = false, border = false , padding=false }) {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: slShow,
        // centerMode: true,
        centerPadding: '0px',
        slidesToScroll: countScroll,
        arrows: false,
        dots: dots,
    };
    return (
        // <Container fluid={true} style={{ padding: 0 }}>
        //     <Row>
        //         <Col lg={12} style={{ display: 'flex', justifyContent: 'center' }}>
        <div
            className={cx('slider-wrap', {
                'border': border,
                'padding':padding
            })}
        >
            <Slider {...settings}>{children}</Slider>
        </div>
        //         </Col>
        //     </Row>
        // </Container>
    );
}

export default SliderCustom;
