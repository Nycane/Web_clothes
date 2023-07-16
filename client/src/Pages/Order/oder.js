/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import cartSlice from '../../Redux/Slice/cartSlice';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getOrderDetail, getResultPayment } from '../../Redux/Slice/orderSlice';
import moment from 'moment';
import formatter from '../../Utils/formatPrice';
import styles from './order.module.scss';
// import { getResultPayment } from '../../Redux/Slice/orderSlice';
const cx = classNames.bind(styles);
function Order() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector((state) => state.user.user);
    const isSuccess = useSelector((state) => state.order.isSuccess);
    const isLoading = useSelector((state) => state.order.isLoading);
    const dispatch = useDispatch();
    const order = useSelector((state) => state.order.order);
    // console.log('loading', isLoading);
    // Lấy thông tin đơn hàng khi thanh toán
    useEffect(() => {
        if (!location.search || isSuccess) {
            dispatch(
                getOrderDetail({
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                }),
            );
            dispatch(cartSlice.actions.remove('reset'));
        }
    }, [isSuccess]);
    // Xử lý thanh toán thành công hay thất bại
    useEffect(() => {
        if (location.search) {
            const data = {
                accessToken: user.accessToken,
                refreshToken: user.refreshToken,
                search: location.search,
            };
            dispatch(getResultPayment(data))
                .unwrap()
                .then((data) => {
                    // Thanh toán thất bại chuyển về trang thanh toán
                    if (data.rspCode === '24') {
                        navigate('/checkout');
                    } else {
                        // Thanh toán thành công chuyển về trang đơn hàng
                        navigate('/checkout/order');
                    }
                });
        }
    }, []);
    return (
        <Container fluid>
            <Row>
                <Col lg={12} md={12}>
                    {isLoading ? (
                        <Skeleton height={10} count={50}></Skeleton>
                    ) : (
                    <>
                        <div className={cx('order-wrap')}>
                            <p className={cx('order-thank')}>Thank you. Your order has been received.</p>
                            <ul className={cx('order-detail')}>
                                <li>
                                    Order number: <strong>{order?.orderDetail?.id}</strong>
                                </li>
                                <li>
                                    Date:{' '}
                                    <strong>{moment(order?.orderDetail?.created_at).format('MMMM D, YYYY')}</strong>
                                </li>
                                <li>
                                    Total:{' '}
                                    <strong>
                                        {formatter.format(
                                            !order?.orderDetail?.coupon_code
                                                ? order?.orderDetail?.total_price
                                                : order?.orderDetail?.discount_amount,
                                        )}
                                    </strong>
                                </li>
                                <li>
                                    Payment method: <strong>{order?.orderDetail?.payment_method}</strong>
                                </li>
                            </ul>
                            <h2 className={cx('order-detail-title')}>Order details</h2>
                            <table className={cx('table')}>
                                <thead>
                                    <tr>
                                        <th
                                            className={cx('td')}
                                            scope="row"
                                            style={{ textAlign: 'start', borderRight: 'none' }}
                                        >
                                            Product
                                        </th>
                                        <th
                                            className={cx('td')}
                                            scope="row"
                                            style={{ textAlign: 'start', borderLeft: 'none' }}
                                        >
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order?.productDetail?.map((e, i) => {
                                        return (
                                            <tr key={i}>
                                                <td className={cx('td')}>
                                                    {e.name} × {e.quantity}
                                                    {e.color !== 'default' && e.size !== 'default' && (
                                                        <ul className={cx('color-size')}>
                                                            <li className={cx('title-color')}>Color:</li>
                                                            <li style={{ listStyleType: 'none' }}>{e.color}</li>

                                                            <li className={cx('title-color')}>Size:</li>
                                                            <li style={{ listStyleType: 'none' }}>{e.size}</li>
                                                        </ul>
                                                    )}
                                                </td>
                                                <td className={cx('td')}> {formatter.format(e.total)}</td>
                                            </tr>
                                        );
                                    })}
                                    <tr>
                                        <td className={cx('td')}>Subtotal:</td>
                                        <td className={cx('td')}>
                                            {' '}
                                            {formatter.format(order?.orderDetail?.total_price)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={cx('td')}>Shipping:</td>
                                        <td className={cx('td')}> {order?.orderDetail?.shipping}</td>
                                    </tr>
                                    <tr>
                                        <td className={cx('td')}>Payment method:</td>
                                        <td className={cx('td')}> {order?.orderDetail?.payment_method}</td>
                                    </tr>
                                    {order?.orderDetail?.coupon_code && (
                                        <>
                                            <tr>
                                                <td className={cx('td')}>Coupon Code:</td>
                                                <td className={cx('td')}> {order?.orderDetail?.coupon_code}</td>
                                            </tr>

                                            <tr>
                                                <td className={cx('td')}>Discount Amount:</td>
                                                <td className={cx('td')}> -10%</td>
                                            </tr>
                                        </>
                                    )}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td className={cx('td')}>Total:</td>
                                        <td className={cx('td')}>
                                            {' '}
                                            {formatter.format(
                                                !order?.orderDetail?.coupon_code
                                                    ? order?.orderDetail?.total_price
                                                    : order?.orderDetail?.discount_amount,
                                            )}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        <div className={cx('billing-address')}>
                            <h5 className={cx('billing-title')}>Billing address</h5>

                            <div className={cx('billing-group')}>
                                <p className={cx('billing-item')}>{order?.orderDetail?.fullname}</p>
                                <p className={cx('billing-item')}>{order?.orderDetail?.address}</p>
                                <p className={cx('billing-item')}>{order?.orderDetail?.phone}</p>
                                <p className={cx('billing-item')}>{order?.orderDetail?.email}</p>
                            </div>
                        </div>
                    </>
                    )} 
                </Col>
            </Row>
        </Container>
    );
}

export default Order;
