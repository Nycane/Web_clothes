import { faDribbble, faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Container, Row, Col } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './ourteam.module.scss';
import SliderCustom from '../../../../Components/Slider/SliderCustom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const cx = classNames.bind(styles);
function OurTeam() {
    return (
        <Container fluid style={{ padding: 0, margin: '90px 0px' }}>
            <Row>
                <Col lg={4}>
                    <img
                        alt=""
                        src="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2023/01/banner-51.jpg"
                        width="100%"
                        height="100%"
                    ></img>
                </Col>
                <Col lg={8} style={{ backgroundColor: '#F8F5F4' }}>
                    <SliderCustom slShow={2} countScroll={2} dots={true} padding>
                        <div className={cx('ourteam-item')}>
                            <div className={cx('icon-social')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faTwitter}></FontAwesomeIcon>
                                <FontAwesomeIcon className={cx('icon')} icon={faFacebookF}></FontAwesomeIcon>
                                <FontAwesomeIcon className={cx('icon')} icon={faDribbble}></FontAwesomeIcon>
                                <FontAwesomeIcon className={cx('icon')} icon={faInstagram}></FontAwesomeIcon>
                            </div>
                            <div className={cx('text')}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor tortor ac magna
                                hendrerit, ut suscipit elit pharetra.
                            </div>
                            <div className={cx('info')}>
                                <img
                                    className={cx('img')}
                                    alt=""
                                    src="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2019/06/team-4.jpg"
                                ></img>
                                <div className={cx('info-content')}>
                                    <p className={cx('info-name')}>Robert Smith</p>
                                    <p className={cx('info-job')}>CEO</p>
                                </div>
                            </div>
                        </div>
                        <div className={cx('ourteam-item')}>
                            <div className={cx('icon-social')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faTwitter}></FontAwesomeIcon>
                                <FontAwesomeIcon className={cx('icon')} icon={faFacebookF}></FontAwesomeIcon>
                                <FontAwesomeIcon className={cx('icon')} icon={faDribbble}></FontAwesomeIcon>
                                <FontAwesomeIcon className={cx('icon')} icon={faInstagram}></FontAwesomeIcon>
                            </div>
                            <div className={cx('text')}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor tortor ac magna
                                hendrerit, ut suscipit elit pharetra.
                            </div>
                            <div className={cx('info')}>
                                <img
                                    className={cx('img')}
                                    alt=""
                                    src="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2021/04/team-3.jpg"
                                ></img>
                                <div className={cx('info-content')}>
                                    <p className={cx('info-name')}>Crystel Casper</p>
                                    <p className={cx('info-job')}>CEO</p>
                                </div>
                            </div>
                        </div>
                        <div className={cx('ourteam-item')}>
                            <div className={cx('icon-social')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faTwitter}></FontAwesomeIcon>
                                <FontAwesomeIcon className={cx('icon')} icon={faFacebookF}></FontAwesomeIcon>
                                <FontAwesomeIcon className={cx('icon')} icon={faDribbble}></FontAwesomeIcon>
                                <FontAwesomeIcon className={cx('icon')} icon={faInstagram}></FontAwesomeIcon>
                            </div>
                            <div className={cx('text')}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor tortor ac magna
                                hendrerit, ut suscipit elit pharetra.
                            </div>
                            <div className={cx('info')}>
                                <img
                                    className={cx('img')}
                                    alt=""
                                    src="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2016/08/team-1.jpg"
                                ></img>
                                <div className={cx('info-content')}>
                                    <p className={cx('info-name')}>Haleigh Walter</p>
                                    <p className={cx('info-job')}>Designer</p>
                                </div>
                            </div>
                        </div>
                        <div className={cx('ourteam-item')}>
                            <div className={cx('icon-social')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faTwitter}></FontAwesomeIcon>
                                <FontAwesomeIcon className={cx('icon')} icon={faFacebookF}></FontAwesomeIcon>
                                <FontAwesomeIcon className={cx('icon')} icon={faDribbble}></FontAwesomeIcon>
                                <FontAwesomeIcon className={cx('icon')} icon={faInstagram}></FontAwesomeIcon>
                            </div>
                            <div className={cx('text')}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor tortor ac magna
                                hendrerit, ut suscipit elit pharetra.
                            </div>
                            <div className={cx('info')}>
                                <img
                                    className={cx('img')}
                                    alt=""
                                    src="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2016/08/team-2.jpg"
                                ></img>
                                <div className={cx('info-content')}>
                                    <p className={cx('info-name')}>Kaya Luettgen</p>
                                    <p className={cx('info-job')}>Designer</p>
                                </div>
                            </div>
                        </div>
                    </SliderCustom>
                </Col>
            </Row>
        </Container>
    );
}

export default OurTeam;
