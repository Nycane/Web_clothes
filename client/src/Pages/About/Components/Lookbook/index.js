import PopoverLookBook from '../../../../Components/Popover/popoverLookBook';
import SliderCustom from '../../../../Components/Slider/SliderCustom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './LookBook.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
const cx = classNames.bind(styles);

function LookBook() {
    const [visible, setVisible] = useState(false);
    return (
        <>
            <Container fluid style={{ padding: 0 }}>
                <Row>
                    <Col>
                        <SliderCustom>
                            <div className={cx('img-popover')}>
                                <img
                                    style={{width:"100%" ,height:"100%"}}
                                    alt=""
                                    src="https://wpbingosite.com/wordpress/mafoil/wp-content/plugins/wpbingo/lib/lookbook/images/bwp_lookbook/ig-4.jpg"
                                ></img>
                                <div className={cx('item-lookbook')}>
                                    <PopoverLookBook visible={visible}>
                                        <div className={cx('number-lookbook')}>
                                            <FontAwesomeIcon
                                                onClick={() => setVisible(true)}
                                                className={cx('icon-lookbook')}
                                                icon={faPlus}
                                            ></FontAwesomeIcon>
                                        </div>
                                    </PopoverLookBook>
                                </div>
                            </div>
                            <div className={cx('img-popover')}>
                                <img
                                    style={{width:"100%" ,height:"100%"}}

                                    alt=""
                                    src="https://wpbingosite.com/wordpress/mafoil/wp-content/plugins/wpbingo/lib/lookbook/images/bwp_lookbook/ig-4.jpg"
                                ></img>
                                <div className={cx('item-lookbook')}>
                                    <PopoverLookBook visible={visible}>
                                        <div className={cx('number-lookbook')}>
                                            <FontAwesomeIcon
                                                onClick={() => setVisible(true)}
                                                className={cx('icon-lookbook')}
                                                icon={faPlus}
                                            ></FontAwesomeIcon>
                                        </div>
                                    </PopoverLookBook>
                                </div>
                            </div>
                            <div className={cx('img-popover')}>
                                <img
                                    style={{width:"100%" ,height:"100%"}}

                                    alt=""
                                    src="https://wpbingosite.com/wordpress/mafoil/wp-content/plugins/wpbingo/lib/lookbook/images/bwp_lookbook/ig-4.jpg"
                                ></img>
                                <div className={cx('item-lookbook')}>
                                    <PopoverLookBook visible={visible}>
                                        <div className={cx('number-lookbook')}>
                                            <FontAwesomeIcon
                                                onClick={() => setVisible(true)}
                                                className={cx('icon-lookbook')}
                                                icon={faPlus}
                                            ></FontAwesomeIcon>
                                        </div>
                                    </PopoverLookBook>
                                </div>
                            </div>
                            <div className={cx('img-popover')}>
                                <img
                                    style={{width:"100%" ,height:"100%"}}

                                    alt=""
                                    src="https://wpbingosite.com/wordpress/mafoil/wp-content/plugins/wpbingo/lib/lookbook/images/bwp_lookbook/ig-4.jpg"
                                ></img>
                                <div className={cx('item-lookbook')}>
                                    <PopoverLookBook visible={visible}>
                                        <div className={cx('number-lookbook')}>
                                            <FontAwesomeIcon
                                                onClick={() => setVisible(true)}
                                                className={cx('icon-lookbook')}
                                                icon={faPlus}
                                            ></FontAwesomeIcon>
                                        </div>
                                    </PopoverLookBook>
                                </div>
                            </div>
                            <div className={cx('img-popover')}>
                                <img
                                    style={{width:"100%" ,height:"100%"}}

                                    alt=""
                                    src="https://wpbingosite.com/wordpress/mafoil/wp-content/plugins/wpbingo/lib/lookbook/images/bwp_lookbook/ig-4.jpg"
                                ></img>
                                <div className={cx('item-lookbook')}>
                                    <PopoverLookBook visible={visible}>
                                        <div className={cx('number-lookbook')}>
                                            <FontAwesomeIcon
                                                onClick={() => setVisible(true)}
                                                className={cx('icon-lookbook')}
                                                icon={faPlus}
                                            ></FontAwesomeIcon>
                                        </div>
                                    </PopoverLookBook>
                                </div>
                            </div>
                        </SliderCustom>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default LookBook;
