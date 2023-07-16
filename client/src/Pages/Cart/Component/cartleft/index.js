/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cartSlice from '../../../../Redux/Slice/cartSlice';
import formatPrice from '../../../../Utils/formatPrice';
import styles from './cartleft.module.scss';
import { useEffect } from 'react';
const cx = classNames.bind(styles);
function CartLeft({ checkout, products, btnSubmit, register, errors }) {
    const dispatch = useDispatch();
    const totalPriceCart = useSelector((state) => state.cart.total);
    const totalDiscount = useSelector((state) => state.cart.totalDiscount);
    const isCoupoun = useSelector((state) => state.cart.isCoupoun);
    function handleRemoveCoupoun() {
        dispatch(cartSlice.actions.setCoupoun(''));
    }
    // console.log("product",products)
    // function handleVerifyUser(){
    //     ((user?.username && user?.id) ? navigate("/") :alert("Please login to checkout"))
    // }
    function handleSubmit(e) {
        e.preventDefault();
        btnSubmit.current.click();
    }
    useEffect(() => {
        dispatch(cartSlice.actions.totalDiscount());
    }, [isCoupoun, totalPriceCart]);
    return (
        <>
            <div
                className={cx('cart-total-wrap', {
                    'background-none': checkout,
                    border: checkout,
                })}
            >
                <h2
                    className={cx('cart-total-title', {
                        'background-none': checkout,
                        'text-bold': checkout,
                    })}
                >
                    {checkout ? 'PRODUCT' : 'CART TOTALS'}
                </h2>
                {checkout &&
                    products.map((e, i) => {
                        return (
                            <div key={i} className={cx('product-item')}>
                                <div className={cx('product-info')}>
                                    <img alt={e.name} src={e.image} width="50px" height="50px"></img>

                                    <div className={cx('product-content')}>
                                        <p
                                            className={cx('product-name', {
                                                '': checkout,
                                            })}
                                        >
                                            {e.name }  
                                       
                                        </p>
                                        <p>
                                            
                                        {(e.color && e.size) && ` - ${e.color} - ${e.size}`}
                                        </p>
                                        <p className={cx('product-quantity')}>QTY:{e.quantity}</p>
                                    </div>
                                </div>
                                <h5
                                    className={cx('product-price', {
                                        'color-brown': checkout,
                                    })}
                                >
                                    {formatPrice.format((e.price_discount > 0 ? e.price_discount : e.price) * e.quantity)}
                                </h5>
                            </div>
                        );
                    })}
                <div className={cx('sub-total')}>
                    <p className={cx('sub-total-text')}>subtotal</p>
                    <h5
                        className={cx('sub-total-price', {
                            'color-brown': checkout,
                            'fontsize-sm': checkout,
                        })}
                    >
                        {formatPrice.format(totalPriceCart)}
                    </h5>
                </div>
                <div className={cx('shipping')}>
                    <p className={cx('shipping-text')}>SHIPPING</p>
                    <ul className={cx('shipping-checkbox')}>
                        {totalPriceCart >= 10000000 && (
                            <li>
                                <input
                                    {...(checkout && { ...register('shipping') })}
                                    readOnly
                                    checked={totalPriceCart >= 10000000}
                                    name="shipping"
                                    value="free shipping"
                                    id="shipping1"
                                    type="radio"
                                ></input>
                                <label htmlFor="shipping1">Free shipping</label>
                            </li>
                        )}
                        <li>
                            <input
                                {...(checkout && { ...register('shipping') })}
                                readOnly
                                checked={totalPriceCart < 10000000}
                                name="shipping"
                                id="shipping2"
                                type="radio"
                                value="flat rate"
                            ></input>
                            <label htmlFor="shipping2">Flat rate</label>
                        </li>
                    </ul>
                </div>
                {isCoupoun && (
                    <div className={cx('discount')}>
                        <p className={cx('discount-text')}>Discount</p>
                        <h5 className={cx('discount-sale')}>-10%</h5>
                        <span className={cx('close-discount')} onClick={handleRemoveCoupoun}>
                            X
                        </span>
                    </div>
                )}
                <div className={cx('total')}>
                    <p className={cx('total-text')}>TOTAL</p>
                    <h5
                        className={cx('total-price', {
                            'color-brown': checkout,
                        })}
                    >
                        {isCoupoun ? formatPrice.format(totalDiscount) : formatPrice.format(totalPriceCart)}
                    </h5>
                </div>
                {checkout && (
                    <form>
                        <ul className={cx('payment-methods')}>
                            <li style={{ padding: '17px 0px' }}>
                                <input
                                    {...register('payment')}
                                    value="Cash on delivery"
                                    type="radio"
                                    id="direct-payment"
                                    name="payment"
                                ></input>
                                <label style={{ fontWeight: '500' }} htmlFor="direct-payment">
                                    Cash on delivery
                                </label>

                                <div className={cx('payment-text')}>Pay with cash upon delivery.</div>
                            </li>
                            <li>
                                <input
                                    {...register('payment')}
                                    value="VNpay"
                                    type="radio"
                                    id="online-payment"
                                    name="payment"
                                ></input>
                                <label style={{ fontWeight: '500' }} htmlFor="online-payment">
                                    VNpay
                                </label>
                                <div className={cx('payment-text')}>
                                    Pay via PayPal; you can pay with your credit card if you don’t have a PayPal
                                    account.
                                </div>
                            </li>

                            <span className={cx('error')}>{errors}</span>
                        </ul>
                    </form>
                )}
                {!checkout ? (
                    <div className={cx('btn-checkout')}>
                        <Link to="/checkout" className={cx('btn')}>
                            Proceed to checkout
                        </Link>
                    </div>
                ) : (
                    <div className={cx('btn-checkout')}>
                        <button onClick={(e) => handleSubmit(e)} className={cx('btn')}>
                            Place Order
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default CartLeft;
