import { Col, Container, Row } from 'react-bootstrap';
import styles from './banner3.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function Banner3() {
    return (
        <Container fluid={true} style={{ padding: 0 }}>
            <Row>
                <Col lg={6} md={6} style={{ padding: 0 }}>
                    <div className={cx('wrap-img1')}>
                        <img
                            className={cx('img1')}
                            alt=""
                            src="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2023/02/banner-57-1.jpg"
                        ></img>
                        <div className={cx('wrap-content1')}>
                            <h3 className={cx('title1')}>EVERYDAY FASHION</h3>
                            <h1 className={cx('title-sale1')}>-60%</h1>
                            <Link to="/shop" className={cx('button1')}>show now</Link>
                        </div>
                    </div>
                </Col>
                <Col lg={6} md={6} style={{ padding: 0 }}>
                    <div className={cx('wrap-img2')}>
                        <img
                            className={cx('img2')}
                            alt=""
                            style={{ filter: 'hue-rotate(10102000deg) brightness(0.9)' }}
                            src="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2023/02/banner-57-1.jpg"

                        ></img>
                        <div className={cx('wrap-content2')}>
                            <h3 className={cx('title2')}>NEW COLLECTION</h3>
                            <h1 className={cx('title-sale2')}>-50%</h1>
                            <Link to="/shop" className={cx('button2')}>show now</Link>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className={cx('row-info')}>
                <Col lg={3} md={6}>
                    <div className={cx('wrap-info')}>
                        <h2 className={cx('title-number')}>1</h2>
                        <h2 className={cx('title')}>Free Shipping</h2>
                        <p className={cx('text')}>Capped at $39 per order </p>
                    </div>
                </Col>
                <Col lg={3} md={6}>
                    <div className={cx('wrap-info')}>
                        <h2 className={cx('title-number')}>2</h2>
                        <h2 className={cx('title')}>SECURETY PAYMENTS</h2>
                        <p className={cx('text')}>Up to 12 months installments </p>
                    </div>
                </Col>
                <Col lg={3} md={6}>
                    <div className={cx('wrap-info')}>
                        <h2 className={cx('title-number')}>3</h2>
                        <h2 className={cx('title')}>14-DAY RETURNS</h2>
                        <p className={cx('text')}>Shop with confidence </p>
                    </div>
                </Col>
                <Col lg={3} md={6}>
                    <div className={cx('wrap-info')}>
                        <h2 className={cx('title-number')}>4</h2>
                        <h2 className={cx('title')}>24/7 SUPPORT</h2>
                        <p className={cx('text')}>Delivered to your door </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Banner3;
