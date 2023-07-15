/* eslint-disable jsx-a11y/iframe-has-title */
import classNames from 'classnames/bind';
import styles from './contact.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
// import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import Toast from '../../Components/Toastify/toastify';
import { faDribbble, faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
const cx = classNames.bind(styles);
function Contact(props) {
    console.log("contct",props.match)
    
    function handleSubmit(){
        Toast("success","The skill are improving")
    }
    return (
        <>
            {/* <div className={cx('wrap-contact')}>
                <div className={cx('background-contact')}>
                    <div className={cx('wrap-content')}>
                        <h2 className={cx('title')}>CONTACT</h2>
                        <div className={cx('title-page')}>
                            <Link to="/" className={cx('before')}>
                                Home
                            </Link>
                            <FontAwesomeIcon className={cx('icon')} icon={faChevronRight}></FontAwesomeIcon>
                            <span className={cx('current')}> Contact</span>
                        </div>
                    </div>
                </div>
            </div> */}
    
            <Container fluid={true} style={{ padding: 0 }}>
                <Row>
                    <Col lg={12} md={12} sm={12}>
                        <iframe
                            width="100%"
                            height="700px"
                            id="gmap-canvas"
                            src="https://maps.google.com/maps?q=Việt Nam&t=&z=10&ie=UTF8&iwloc=&output=embed"
                        ></iframe>
                    </Col>
                </Row>
            </Container>

            <Container style={{ marginTop: '90px', marginBottom: '90px' }}>
                <Row>
                    <Col lg={7}>
                        <form className={cx('contact-form')}>
                            <Row>
                                <h1 className={cx('title')}>Get In Touch</h1>
                                <Col lg={4}>
                                    <label className={cx('form-label')}>Name</label>
                                    <input className={cx('form-input')} type="text" placeholder="Name"></input>
                                </Col>
                                <Col lg={4}>
                                    <label className={cx('form-label')}>Email</label>
                                    <input className={cx('form-input')} type="text" placeholder="Email adress"></input>
                                </Col>
                                <Col lg={4}>
                                    <label className={cx('form-label')}>Phone</label>
                                    <input className={cx('form-input')} type="text" placeholder="Number Phone"></input>
                                </Col>
                                <Col lg={12}>
                                    <label className={cx('form-label')}>Your message</label>
                                    <textarea
                                        className={cx('form-textarea')}
                                        placeholder="Comment of Message"
                                    ></textarea>
                                </Col>
                            </Row>
                            <button type='button' onClick={handleSubmit} className={cx('form-button')}>send message</button>
                        </form>
                    </Col>
                    <Col lg={5}>
                        <div className={cx('info-wrap')}>
                            <h2 className={cx('title')}>Address</h2>
                            <a href="asd" className={cx('text')}>
                                14 LE Gounlburn St, Sydney 1198NSA.
                            </a>
                        </div>
                        <div className={cx('info-wrap')}>
                            <h2 className={cx('title')}>Phone</h2>
                            <a href="as" className={cx('text')}>
                                (+089) 19918989
                            </a>
                        </div>
                        <div className={cx('info-wrap')}>
                            <h2 className={cx('title')}>Email</h2>
                            <a href="as" className={cx('text')}>
                                support@mafoil.com
                            </a>
                        </div>
                        <div className={cx('info-wrap')}>
                            <h2 className={cx('title')}>Follow Us On</h2>
                            <div className={cx('list-icon')}>
                                <FontAwesomeIcon className={cx('icon-social')} icon={faTwitter}></FontAwesomeIcon>
                                <FontAwesomeIcon className={cx('icon-social')} icon={faFacebookF}></FontAwesomeIcon>
                                <FontAwesomeIcon className={cx('icon-social')} icon={faDribbble}></FontAwesomeIcon>
                                <FontAwesomeIcon className={cx('icon-social')} icon={faInstagram}></FontAwesomeIcon>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Contact;
