import { Container, Col, Row } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './banner.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function Banner({
    left = false,
    right = false,
    img = 'https://thuemaychuao.net/wp-content/uploads/2021/10/img.gif',
    title,
    text,
    btn = false,
}) {
    return (
        <Container fluid={true} className={cx('banner-wrap')}>
            {left && (
                <Row>
                    <Col lg={6} md={6}>
                        <div className={cx('banner-img')}>
                            <img className={cx('img')} src={img} alt=""></img>
                        </div>
                    </Col>
                    <Col lg={6} md={6}>
                        <div className={cx('content')}>
                         <h2 className={cx('title')}>{title}</h2>
                         <h1 className={cx('text')}>{text}</h1>
                            {btn && (
                                <div>
                                    <Link to="/shop" className={cx('btn')}>
                                        shop now
                                    </Link>
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            )}
            {right && (
                <Row>
                    <Col lg={6} md={6}>
                        <div className={cx('content')}>
                            <h2 className={cx('title')}>{title}</h2>
                            <h1 className={cx('text')}>{text}</h1>
                            {btn && (
                                <div>
                                    <Link className={cx('btn')}>sale up to 40%</Link>
                                </div>
                            )}
                        </div>
                    </Col>
                    <Col lg={6} md={6}>
                        <div className={cx('banner-img')}>
                            <img className={cx('img')} src={img} alt=""></img>
                        </div>
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default Banner;
