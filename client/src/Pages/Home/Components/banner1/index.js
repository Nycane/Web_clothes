import { Col, Row, Container } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './banner1.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function Banner1() {
    return (
        <Container className={cx('banner-wrap')} fluid={true} style={{ height: '650', width: '100%', padding: '0' }}>
            <Row>
                <Col lg={4} md={4} sm={12} style={{ padding: 0 }}>
                    <div className={cx('img-wrap')}>
                        <img
                            className={cx('banner-img')}
                            alt=""
                            src="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2023/02/banner-53-1.jpg"
                        ></img>
                        <div className={cx('banner-info')}>
                            <Link to="/shop" className={cx('btn')}>sale up to 60%</Link>
                        </div>
                    </div>
                </Col>
                <Col lg={4} md={4} sm={12} style={{ padding: 0 }}>
                    <div className={cx('img-wrap')}>
                        <img
                            className={cx('banner-img')}
                            alt=""
                            src="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2023/02/banner-54-1.jpg"
                        ></img>
                        <div className={cx('banner-info')}>
                            <Link to="/shop" className={cx('btn')}>sale up to 50%</Link>
                        </div>
                    </div>
                </Col>
                <Col lg={4} md={4} sm={12} style={{ padding: 0 }}>
                    <div className={cx('img-wrap')}>
                        <img
                            className={cx('banner-img')}
                            alt=""
                            src="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2023/02/banner-55-1.jpg"
                        ></img>
                        <div className={cx('banner-info')}>
                            <Link to="/shop" className={cx('btn')}>sale up to 40%</Link>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Banner1;
