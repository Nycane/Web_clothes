import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'tippy.js/animations/scale.css';
import 'tippy.js/dist/tippy.css';
import cartSlice from '../../../Redux/Slice/cartSlice';
import formatPrice from '../../../Utils/formatPrice';
import Popover from '../popover';
import styles from './popoverCart.module.scss';
// import { useState } from 'react';
const cx = classNames.bind(styles);
function PopoverCart({ children }) {
    const listProducts = useSelector((state) => state.cart.carts);
    const totalCart = useSelector(state=>state.cart.total)
    const dispatch = useDispatch();
    function handleRemove(index) {
        dispatch(cartSlice.actions.remove(index));
    }
    // const [visible, setVisible] = useState(false);
    return (
        <div>
            <Tippy
                // visible={true}
                delay={[0, 300]}
                interactive={true}
                placement="top"
                hideOnClick={false}
                // trigger="moussenter"
                // animation="scale"
                // appendTo={document.body}
                render={(attr) => {
                    return (
                        <div className={cx('cart-wrap')}>
                            <Popover>
                                <div className={cx('cart-scroll')}>
                                    <h1 className={cx('cart-title')}>Giỏ hàng</h1>
                                    {listProducts.map((e, i) => {
                                        return (
                                            <div key={i} className={cx('cart-item')}>
                                                <div className={cx('cart-content')}>
                                                    <img
                                                        className={cx('img')}
                                                        width="100%"
                                                        height="100%"
                                                        alt=""
                                                        src={e.image}
                                                    ></img>
                                                    <div className={cx('cart-info')}>
                                                        <h5 className={cx('title')}>{e.name}</h5>
                                                       {e.variant.length>0&& <p className={cx('color-size')}>{e.color} / {e.size}</p>}
                                                        <p className={cx('quantity')}>Quantity:{e.quantity}</p>
                                                        <p className={cx('price')}>Price:{formatPrice.format(e.price_discount>0?e.price_discount:e.price)}</p>
                                                        <span onClick={() => handleRemove(i)} className={cx('close')}>
                                                            X
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {listProducts.length > 0 ? (
                                        <div className={cx('cart-total')}>
                                            <div className={cx('total')}>
                                                <p className={cx('total')}>Tổng Tiền</p>
                                                <p className={cx('price')}>{formatPrice.format(totalCart)}</p>
                                            </div>
                                            <div className={cx('options')}>
                                                <Link to="/cart" className={cx('viewcart')}>
                                                    View Cart
                                                </Link>
                                                <Link to="/checkout" className={cx('checkout')}>Checkout</Link>
                                            </div>
                                        </div>
                                    ) : (
                                        <p style={{ textAlign: 'center', paddingTop: '30px' }}>
                                            No products in the cart.
                                        </p>
                                    )}
                                </div>
                            </Popover>
                        </div>
                    );
                }}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default PopoverCart;
