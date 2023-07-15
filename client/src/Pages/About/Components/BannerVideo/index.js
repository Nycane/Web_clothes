import CustomModal from '../../../../Components/Modal';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { Col, Container, Row } from "react-bootstrap";
import styles from './bannerVideo.module.scss';
import { useState } from 'react';
const cx = classNames.bind(styles);
function BannerVideo() {
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    return (  
        <Container style={{ marginBottom: '100px' }}>
        <Row>
            <Col lg={6} md={6} sm={12}>
                {/* Modal */}
                <CustomModal modalIsOpen={modalIsOpen} closeModal={closeModal} closed={false}>
                <iframe width="100%" height="538px" controls src="https://www.youtube.com/embed/yekdy9NZCdw" title="Women’s Fall-Winter 2022 Fashion Show | LOUIS VUITTON" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </CustomModal>
                {/*  */}
                <div className={cx('banner-video')}>
                    <img
                        className={cx('img-banner')}
                        src="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2023/01/banner-video3.jpg"
                        alt=""
                    ></img>
                    <div className={cx('content-video-wrap')} onClick={openModal}>
                        <div className={cx('icon-box')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faPlay}></FontAwesomeIcon>
                        </div>
                    </div>
                </div>
            </Col>
            <Col
                lg={6}
                md={6}
                sm={12}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <div className={cx('content-wrap')}>
                    <p className={cx('title-small')}>SPECIAL FASHION</p>
                    <h2 className={cx('title-default')}>WHO WE ARE?</h2>
                    <p className={cx('text')}>
                        Fusce blandit, leo eu pellentesque convallis, velit neque porttitor dui, a tristique
                        ipsum lacus ut leo. Integer congue risus ac tristique porttitor. In erat justo, luctus
                        mattis vestibulum sed, rhoncus et justo
                    </p>
                    <p className={cx('text')}>
                        Curabitur hendrerit arcu a ante egestas, nec dignissim sem maximus. Nunc eu purus at
                        odio commodo lobortis a nec augue. Maecenas bibendum, erat sed mollis tempor, odio est
                        ornare lorem, non convallis neque ligula vitae dui.
                    </p>
                </div>
            </Col>
        </Row>
    </Container>
    )
}

export default BannerVideo;