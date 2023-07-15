import { faBoxOpen, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'tippy.js/animations/scale.css';
import 'tippy.js/dist/tippy.css';
import Toast from '../../Components/Toastify';
import cartSlice from '../../Redux/Slice/cartSlice';
import formatPrice from '../../Utils/formatPrice';
import CartLeft from './Component/cartleft';
import styles from './cart.module.scss';
const cx = classNames.bind(styles);
function Cart() {
    const [totalPercent, setTotalPercent] = useState('0%');
    const [coupoun, setCoupoun] = useState('');
    const [codeCoupoun, setCodeCoupoun] = useState('');
    const isCoupoun = useSelector((state) => state.cart.isCoupoun);
    const moneyFreeShip = 10000000;
    const listProduct = useSelector((state) => state.cart.carts);
    const dispatch = useDispatch();
    let listCoupouns = ['MAFOIL1', 'MAFOIL2', 'MAFOIL3', 'MAFOIL4', 'MAFOIL5'];
    const totalPriceCart = useSelector((state) => state.cart.total);
    // remove product
    function handleRemove(index) {
        dispatch(cartSlice.actions.remove(index));
    }
    // Tăng số lượng
    function handleIncrement(product) {
        const { id, color, size } = product;
        dispatch(cartSlice.actions.update({ type: 'increment', id, color, size }));
    }
    // Xóa số lượng
    function handleDecrement(product) {
        const { id, color, size } = product;
        dispatch(cartSlice.actions.update({ type: 'decrement', id,color,size }));
    }
    // Lấy mã giảm giá
    function handleGetCoupoun() {
        let coupounIndex = Math.floor(Math.random() * listCoupouns.length);
        let coupoun = listCoupouns[coupounIndex];
        setCoupoun(coupoun);
        Toast('success', `Coupoun Code is Your: ${coupoun}`);
    }
    // Kiểm tra mã giảm giá
    function handleVerifyCoupoun() {
        if (codeCoupoun.trim()) {
            if (coupoun === codeCoupoun && !isCoupoun) {
                Toast('success', 'Congratulations you get 10% off');
                setCodeCoupoun('');
                dispatch(cartSlice.actions.setCoupoun(codeCoupoun));
            } else if (isCoupoun && coupoun === codeCoupoun) {
                Toast('warning', 'Coupoun has been applied');
            } else {
                Toast('error', 'Coupoun is not correct');
            }
        } else {
            Toast('error', 'Please enter coupoun code');
        }
    }
     // Miễn phí ship nếu giá trị giở hàng trên 10 triệu
    useEffect(() => {
        let price = moneyFreeShip - totalPriceCart;
        let percent = 100 - (price / moneyFreeShip) * 100;
        if (percent < 100) {
            setTotalPercent(`${percent}%`);
        } else {
            percent = 100;
            setTotalPercent(`${percent}%`);
        }
    }, [totalPriceCart]);

    return (
        <Container fluid style={{ paddingTop: '60px' }}>
            <Row>
                {listProduct.length === 0 ? (
                    <Col lg={12} md={12}>
                        <h1 className={cx('title-cart-empty')}>YOUR CART IS CURRENTLY EMPTY.</h1>
                        <p className={cx('btn-cart-empty')}>
                            <Link className={cx('btn')} to="/">
                                Return to shop
                            </Link>
                        </p>
                    </Col>
                ) : (
                    <>
                        <Col lg={8}>
                            <Row>
                                <Col lg={12} md={12}>
                                    <div className={cx('percent-cart')}>
                                        <div className={cx('free-ship')}>
                                            {moneyFreeShip - totalPriceCart > 0 ? (
                                                <p className={cx('title-ship')}>
                                                    Spend
                                                    <h5 className={cx('price-ship')}>
                                                        {formatPrice.format(
                                                            moneyFreeShip - totalPriceCart < 0
                                                                ? 0
                                                                : moneyFreeShip - totalPriceCart,
                                                        )}
                                                    </h5>
                                                    more and get <h5 className={cx('force-ship')}>free shipping!</h5>
                                                </p>
                                            ) : (
                                                <p className={cx('title-ship')}>
                                                    Congratulations , you've got free shipping!
                                                </p>
                                            )}
                                        </div>
                                        <div className={cx('total-percent')}>
                                            <div
                                                style={{ width: `${totalPercent}` }}
                                                className={cx('percent', {
                                                    active: totalPriceCart >= moneyFreeShip,
                                                })}
                                            ></div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <table className={cx('table')}>
                                <thead style={{ border: '1px solid black' }}>
                                    <tr className={cx('tr')}>
                                        <th width="20%">Product</th>
                                        <th width="20%"></th>
                                        <th width="20%">Price</th>
                                        <th width="20%">Quantity</th>
                                        <th width="15%">Subtotal</th>
                                        <th width="5%"></th>
                                    </tr>
                                </thead>
                               <tbody>
                                    {listProduct.map((e, i) => {
                                        return (
                                            <tr key={i} style={{ textAlign: 'center', border: '1px solid black' }}>
                                                <td>
                                                    <img alt={e.name} src={e.image} width="80px" height="auto"></img>
                                                </td>
                                                <td>
                                                    {e.name}{' '}
                                                    {e.variant.length > 0 && (
                                                        <span>
                                                            - {e.size} - {e.color}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className={cx('price')}>
                                                    {formatPrice.format(e.price_discount > 0 ? e.price_discount : e.price)}
                                                </td>
                                                <td>
                                                    <div className={cx('btn-quantity')}>
                                                        <button
                                                            onClick={() => handleDecrement(e)}
                                                            type="button"
                                                            className={cx('btn-increment', {
                                                                disabled: e.quantity === 1,
                                                            })}
                                                        >
                                                            <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                                                        </button>
                                                        <input
                                                            readOnly
                                                            min="1"
                                                            value={e.quantity}
                                                            className={cx('quantity')}
                                                            type="text"
                                                        />
                                                        <button
                                                            onClick={() => handleIncrement(e)}
                                                            type="button"
                                                            className={cx('btn-decrement')}
                                                        >
                                                            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className={cx('sub-total')}>
                                                    {formatPrice.format(
                                                        e.quantity * (e.price_discount > 0 ? e.price_discount : e.price),
                                                    )}
                                                </td>
                                                <td>
                                                    <span className={cx('icon-close')} onClick={() => handleRemove(i)}>
                                                        X
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                               </tbody>
                              <tfoot>
                                    <tr>
                                        <td colSpan={6}>
                                            <div className={cx('bottom-cart')}>
                                                <div className={cx('coupoun-code')}>
                                                    <input
                                                        type="text"
                                                        value={codeCoupoun}
                                                        onChange={(e) => setCodeCoupoun(e.target.value)}
                                                        placeholder="Coupoun code"
                                                    ></input>
                                                    <button onClick={handleVerifyCoupoun}>Apply Coupoun</button>
                                                    <Tippy placement="right" content="Click Get Coupoun" animation="scale">
                                                        <div onClick={handleGetCoupoun}>
                                                            <FontAwesomeIcon
                                                                className={cx('icon-boxopen')}
                                                                icon={faBoxOpen}
                                                            ></FontAwesomeIcon>
                                                        </div>
                                                    </Tippy>
                                                </div>
                                                <div className={cx('continue-shopping')}>
                                                    <Link to="/shop" className={cx('btn-continue')}>
                                                        Continue Shopping
                                                    </Link>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                              </tfoot>
                            </table>
                        </Col>
                        <Col lg={4} md={4}>
                            <CartLeft></CartLeft>
                        </Col>
                    </>
                )}
            </Row>
        </Container>
    );
}

export default Cart;
