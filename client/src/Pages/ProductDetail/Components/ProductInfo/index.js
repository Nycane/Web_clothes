import { faEye, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faBusinessTime, faMinus, faPlus, faStar, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useDispatch, useSelector } from 'react-redux';
import 'tippy.js/animations/scale.css';
import 'tippy.js/dist/tippy.css';
import CustomModal from '../../../../Components/Modal/modal';
import Toast from '../../../../Components/Toastify/toastify';
import { addToCart } from '../../../../Redux/Slice/cartSlice';
import { addWishList } from '../../../../Redux/Slice/wishlistSLice';
import formatter from '../../../../Utils/formatPrice';
import styles from './productInfo.module.scss';
const cx = classNames.bind(styles);

function ProductInfo({ product }) {
    // console.log("product",product)
    const isLoading = useSelector((state) => state.product.isLoading);
    const view = useSelector((state) => state.user.countView);
    const [viewCurrent, setViewCurrent] = useState(31);
    const iconEyes = useRef(null);
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const dispatch = useDispatch();
    function handleAdd(product) {
        // console.log(product)
        if (product.variant.length > 0 && (!color || !size)) {
            Toast('warning', 'Please select size or color');
        } else {
            color && size
                ? dispatch(addToCart(Object.assign({ quantity, size, color }, product)))
                : dispatch(addToCart(Object.assign({ quantity }, product)));
        }
    }
    useEffect(() => {
        let interval = setInterval(() => {
            setViewCurrent(Math.round(Math.random() * 100));
        }, 5000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    // useEffect(() => {
    //     let timeout = setInterval(() => {
    //         iconEyes.current.style.opacity === 0
    //             ? (iconEyes.current.style.opacity = 1)
    //             : (iconEyes.current.style.opacity = 0);
    //     }, 1000);
    //     return () => clearTimeout(timeout);
    // },[]);
    function handleAddWishlist(product) {
        dispatch(addWishList(product));
    }
    function handleIncrement() {
        setQuantity((currentQuantity) => currentQuantity + 1);
    }
    function handleDecrement() {
        setQuantity((currentQuantity) => currentQuantity - 1);
    }
    function handleClear() {
        size !== '' && setSize('');
        color !== '' && setColor('');
    }
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function openModal() {
        setModalIsOpen(true);
    }
    function closeModal() {
        setModalIsOpen(false);
    }
    return (
        <>
            {/* MOdal guide size */}
            <CustomModal
                modalIsOpen={modalIsOpen}
                isOpen={modalIsOpen}
                customCss={cx('overflow-y')}
                closed
                closeModal={closeModal}
            >
                <img
                    width="100%"
                    height="auto"
                    src="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2023/01/1sizeguide-clothes.webp"
                    alt="guide"
                ></img>
            </CustomModal>
            {/* MOdal guide size */}

            <div className={cx('product-info')}>
                {isLoading ? (
                    <Skeleton height={25} style={{ marginBottom: '10px' }}></Skeleton>
                ) : (
                    <h1 className={cx('title')}>{product.name}</h1>
                )}

                {isLoading ? (
                    <Skeleton height={20} style={{ marginBottom: '8px' }}></Skeleton>
                ) : (
                    <div className={cx('rating')}>
                        {view.totalRating && view.countView ? (
                            Array.from(Array(Math.floor(view.totalRating / view.countView)), (_, index) => {
                                return (
                                    <FontAwesomeIcon
                                        key={index}
                                        className={cx('icon-star')}
                                        icon={faStar}
                                    ></FontAwesomeIcon>
                                );
                            })
                        ) : (
                            <>
                                <FontAwesomeIcon className={cx('icon-star')} icon={faStar}></FontAwesomeIcon>
                                <FontAwesomeIcon className={cx('icon-star')} icon={faStar}></FontAwesomeIcon>
                                <FontAwesomeIcon className={cx('icon-star')} icon={faStar}></FontAwesomeIcon>
                                <FontAwesomeIcon className={cx('icon-star')} icon={faStar}></FontAwesomeIcon>
                                <FontAwesomeIcon className={cx('icon-star')} icon={faStar}></FontAwesomeIcon>
                            </>
                        )}
                        <p className={cx('title-rating')}>
                            <p>({view?.countView} customer review)</p>
                        </p>
                    </div>
                )}

                <>
                    {product.price_discount > 0 ? (
                        isLoading ? (
                            <Skeleton height={20} style={{ marginBottom: '12px' }}></Skeleton>
                        ) : (
                            <p className={cx('price')}>
                                <strike className={cx('discount')}>{formatter.format(product.price)}</strike>{' '}
                                {formatter.format(product.price_discount)}
                            </p>
                        )
                    ) : isLoading ? (
                        <Skeleton height={20} style={{ marginBottom: '12px' }}></Skeleton>
                    ) : (
                        <p className={cx('price')}>{product.price && formatter.format(product.price)}</p>
                    )}
                </>
                {isLoading ? (
                    <Skeleton height={20} style={{ margin: '25px 0px' }}></Skeleton>
                ) : (
                    <div className={cx('count-view')}>
                        <span ref={iconEyes}>
                            <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                        </span>
                        <span className={cx('title-view')}>{viewCurrent} people are viewing this right now</span>
                    </div>
                )}
                {isLoading ? (
                    <Skeleton height={25} style={{ marginBottom: '35px' }}></Skeleton>
                ) : (
                    <p className={cx('description')}>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur.
                    </p>
                )}

                {isLoading ? <Skeleton height={170}  style={{marginBottom:"20px"}}></Skeleton> : product &&
                    product?.variant?.length > 0 &&
                        <div className={cx('color-size')}>
                            <div className={cx('color')}>
                                <p className={cx('color-title')}>
                                    Color:<span className={cx('color-text')}>{color}</span>
                                </p>
                                <div className={cx('select-color')}>
                                    {product?.variant?.map((e, i) => {
                                        return (
                                            <Tippy key={i} animation="scale" content={e.namecolor}>
                                                <div
                                                    onClick={() => setColor(e.namecolor)}
                                                    className={cx('color-code', {
                                                        active: e.namecolor === color,
                                                    })}
                                                    key={i}
                                                    style={{ background: e.code }}
                                                ></div>
                                            </Tippy>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className={cx('size')}>
                                <div className={cx('size-guide')}>
                                    <p className={cx('size-title')}>
                                        Size:<span className={cx('size-text')}>{size}</span>
                                    </p>
                                    <span className={cx('guide')} onClick={openModal}>
                                        size guide
                                    </span>
                                </div>
                                <div className={cx('select-size')}>
                                    {product?.variant &&
                                        product?.variant?.map((e, i) => {
                                            return (
                                                <Tippy key={i} animation="scale" content={e.namesize}>
                                                    <div
                                                        onClick={() => setSize(e.namesize)}
                                                        className={cx('size-box', {
                                                            active: e.namesize === size,
                                                        })}
                                                        key={i}
                                                    >
                                                        {e.namesize}
                                                    </div>
                                                </Tippy>
                                            );
                                        })}
                                </div>
                            </div>
                            {(size || color) && (
                                <span onClick={handleClear} className={cx('color-size-clear')}>
                                    X Clear
                                </span>
                            )}
                        </div>
                    }

                {isLoading ? (
                    <Skeleton height={120} style={{ marginBottom: '30px' }}></Skeleton>
                ) : (
                    <form className={cx('product-option')}>
                        <div className={cx('btn-quantity')}>
                            <button
                                onClick={handleDecrement}
                                type="button"
                                className={cx('btn-left', {
                                    disabled: quantity === 1,
                                })}
                            >
                                <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                            </button>
                            <input readOnly min="1" value={quantity} className={cx('quantity')} type="text" />
                            <button onClick={handleIncrement} type="button" className={cx('btn-right')}>
                                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                            </button>
                        </div>
                        <button type="button" onClick={() => handleAdd(product)} className={cx('btn-add')}>
                            add to cart
                        </button>
                        <div className={cx('wishlist')}>
                            <button
                                type="button"
                                onClick={() => handleAddWishlist(product)}
                                className={cx('btn-wishlist')}
                            >
                                <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                            </button>
                        </div>
                        <button type="button" className={cx('btn-buynow')}>
                            buy now
                        </button>
                    </form>
                )}
                {isLoading ? (
                    <Skeleton height={120} style={{ marginBottom: '16px' }}></Skeleton>
                ) : (
                    <div className={cx('safe-checkout')}>
                        <img
                            className={cx('img')}
                            alt=""
                            src="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2022/07/payments-2.png"
                        ></img>
                        <p className={cx('title-checkout')}>Guaranteed Safe Checkout</p>
                    </div>
                )}
                <div className={cx('product-shipping')}>
                    <ul>
                       { isLoading ?  <Skeleton style={{ marginBottom: '16px' }}></Skeleton>: <li>
                            <FontAwesomeIcon icon={faTruckFast}></FontAwesomeIcon>
                            <span className={cx('text-shipping')}>Free worldwide shipping on all orders over $100</span>
                        </li>}
                        { isLoading ? <Skeleton></Skeleton>:<li>
                            <FontAwesomeIcon icon={faBusinessTime}></FontAwesomeIcon>
                            <span className={cx('text-shipping')}>Delivers in: 3-7 Working Days Shipping & Return</span>
                        </li>}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default ProductInfo;
