import { faBoxOpen, faHandHoldingDollar, faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Col, Container, Row } from 'react-bootstrap';
import Banner2 from '../../Components/Banner/banner2';
import SliderCustom from '../../Components/Slider/SliderCustom';
import BannerVideo from './Components/BannerVideo';
import LookBook from './Components/Lookbook';
import OurTeam from './Components/Ourteam';
import styles from './about.module.scss';
const cx = classNames.bind(styles);
function About() {
    console.log("about")
    return (
        <>
            <BannerVideo></BannerVideo>
            {/* ------------------------------ */}
            <Container style={{ marginBottom: '50px' }}>
                <Row>
                    <Col lg={4} md={4} sm={4}>
                        <div className={cx('icon-text-wrap')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faBoxOpen}></FontAwesomeIcon>
                            <span className={cx('text')}>Free In - App Shipping</span>
                        </div>
                    </Col>
                    <Col lg={4} md={4} sm={4}>
                        <div className={cx('icon-text-wrap')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faTags}></FontAwesomeIcon>
                            <span className={cx('text')}> Students get 20% off</span>
                        </div>
                    </Col>
                    <Col lg={4} md={4} sm={4}>
                        <div className={cx('icon-text-wrap')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faHandHoldingDollar}></FontAwesomeIcon>
                            <span className={cx('text')}>Shop styles, Earn points </span>
                        </div>
                    </Col>
                </Row>
            </Container>
            {/* ------------------------------ */}
            <OurTeam></OurTeam>

            {/* ----------------------- */}
            <Banner2
                right
                img="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2023/01/banner-52.jpg"
                title=" Quisque ut leo vel nisl posuere lobortis. Praesent imperdiet nibh at velit elementum, at imperdiet ligula tempus."
                text="kuki ko kio azxc asdwe"
            ></Banner2>
            {/* ----------------------- */}

            {/* ------------------------- */}
            <SliderCustom border padding>
                <img
                    className={cx('img-brand')}
                    alt=""
                    src="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2022/11/brand-2.jpg"
                ></img>
                <img
                    className={cx('img-brand')}
                    alt=""
                    src="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2022/11/brand-5.jpg"
                ></img>
                <img
                    className={cx('img-brand')}
                    alt=""
                    src="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2022/11/brand-3.jpg"
                ></img>
                <img
                    className={cx('img-brand')}
                    alt=""
                    src="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2022/11/brand-4.jpg"
                ></img>
                <img
                    className={cx('img-brand')}
                    alt=""
                    src="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2022/11/brand-1.jpg"
                ></img>
            </SliderCustom>
            {/* --------------------------- */}
            <LookBook></LookBook>
            {/* ------------------------- */}
        </>
    );
}

export default About;
