import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping, faLeftLong, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import 'tippy.js/animations/scale.css';
import 'tippy.js/dist/tippy.css';
import ProductInfo from '../../../Pages/ProductDetail/Components/ProductInfo';
import { addToCart } from '../../../Redux/Slice/cartSlice';
import { addWishList } from '../../../Redux/Slice/wishlistSLice';
import formatter from '../../../Utils/formatPrice';
import CustomModal from '../../Modal';
import styles from './card.module.scss';
const cx = classNames.bind(styles);
// const disabled = cx('disabled');
function Card({ product, options = true }) {
    const dispatch = useDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    // const [product, setProduct] = useState({});

    // useEffect(() => {
    //     (async () => {
    //         let variant = await productApi.getProductVariantById(item.id);
    //         let result = Object.assign({ variant }, item);
    //         setProduct(result);
    //     })();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);
    function handleAddProduct(product) {
        let newProduct = Object.assign({ quantity: 1}, product);
        console.log("product",newProduct)
        dispatch(addToCart(newProduct));
    }

    function handleAddWishlish(product) {
        dispatch(addWishList(product));
    }

    function openModal() {
        setModalIsOpen(true);
    }
    
    function closeModal() {
        setModalIsOpen(false);
    }
    return (
        <>
            {/* Show Modal When Click Quickview*/}
            <CustomModal modalIsOpen={modalIsOpen} customCss={cx('background-none')} closed closeModal={closeModal}>
                <Container>
                    <Row>
                        <Col lg={6} md={6} style={{ padding: '0', zIndex: 200 }}>
                            <img alt="" src={product.image} width="100%"></img>
                        </Col>
                        <Col lg={6} md={6} style={{ padding: '0' }} className={cx('product-detail-wrap')}>
                            <div className={cx('product-detail-modal')}>
                                <ProductInfo product={product}></ProductInfo>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </CustomModal>
            {/*  */}

           { 
           <div className={cx('card')}>
                <div className={cx('card-body')}>
                    <img className={cx('img')} alt={product?.name} src={product?.image}></img>
                    {options && (
                        <div className={cx('product-options')}>
                            {Object.keys(product)?.length > 0 && product?.variant?.length === 0 ? (
                                <Tippy animation="scale" content="Add Cart">
                                    <Link onClick={() => handleAddProduct(product)} className={cx('btn-cart')}>
                                        <FontAwesomeIcon
                                            className={cx('icon-cart')}
                                            icon={faCartShopping}
                                        ></FontAwesomeIcon>
                                    </Link>
                                </Tippy>
                            ) : (
                                <Tippy animation="scale" content="Select Option">
                                    <Link to={`/product/${product.id}`} className={cx('btn-cart')}>
                                        <FontAwesomeIcon
                                            className={cx('icon-cart')}
                                            icon={faLeftLong}
                                        ></FontAwesomeIcon>
                                    </Link>
                                </Tippy>
                            )}
                            <Tippy animation="scale" content={<span>Wishlist</span>}>
                                <Link onClick={() => handleAddWishlish(product)} className={cx('btn-wishlist')}>
                                    <FontAwesomeIcon className={cx('icon-heart')} icon={faHeart}></FontAwesomeIcon>
                                </Link>
                            </Tippy>
                            <Tippy animation="scale" content="Quick View" visible={visible}>
                                <Link
                                    onMouseMove={() => {
                                        setVisible(true);
                                    }}
                                    onMouseLeave={() => {
                                        setVisible(false);
                                    }}
                                    onClick={openModal}
                                    className={cx('btn-quickview')}
                                >
                                    <FontAwesomeIcon
                                        className={cx('icon-quickview')}
                                        icon={faMagnifyingGlass}
                                    ></FontAwesomeIcon>
                                </Link>
                            </Tippy>
                        </div>
                    )}
                    {product.price_discount > 0 ? (
                        <div className={cx('product-sale')}>Sale</div>
                    ) : (
                        <div className={cx('product-hot')}>Hot</div>
                    )}
                </div>
                <div className={cx('card-content')}>
                    <Link to={`/product/${product.id}`} className={cx('product-title')}>
                        {product.name}
                    </Link>
                    {product.price_discount > 0 ? (
                        <div className={cx('product-price')}><strike className={cx('discount')}>{formatter.format(product.price)}</strike>{formatter.format(product.price_discount)}</div>
                    ) : (
                        <div className={cx('product-price')}>{formatter.format(product.price)}</div>
                    )}
                </div>
            </div>}
        </>
    );
}

export default Card;
