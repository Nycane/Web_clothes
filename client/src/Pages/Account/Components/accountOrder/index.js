import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../../../../Redux/Slice/orderSlice';
import classNames from 'classnames/bind';
import styles from './accountOrder.module.scss';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useEffect } from 'react';
import formatPrice from '../../../../Utils/formatPrice';
import { Link } from 'react-router-dom';
import formatDate from '../../../../Utils/formatDate';
const cx = classNames.bind(styles);
function AccountOrder() {
    const user = useSelector((state) => state.user.user);
    const orders = useSelector((state) => state.order.orderByUser);
    const isLoading = useSelector(state=>state.order.isLoading)
    // console.log(orders);
    const dispatch = useDispatch();
    useEffect(() => {
    console.log("Account Order",user)
        dispatch(
            getOrderById({
                userId: user.id,
                accessToken: user.accessToken,
                refreshToken: user.refreshToken,
            }),
        );
    }, []);
    return (
        <Container fluid={true}>
            <Row>
                <Col lg={12} md={12}>
                  { 
                  isLoading ? <Skeleton height={400}></Skeleton>:
                   <>
                        {orders?.length > 0 ? (
                          <div className={cx('order-scroll')}>
                                <table className={cx('table')}>
                                    <thead>
                                        <tr>
                                            <th
                                                className={cx('th')}
                                                scope="row"
                                                style={{ textAlign: 'start', borderRight: 'none' }}
                                            >
                                                Order
                                            </th>
                                            <th
                                                className={cx('th')}
                                                scope="row"
                                                style={{ textAlign: 'start', borderLeft: 'none', borderRight: 'none' }}
                                            >
                                                Date
                                            </th>
                                            <th
                                                className={cx('th')}
                                                scope="row"
                                                style={{ textAlign: 'start', borderRight: 'none', borderLeft: 'none' }}
                                            >
                                                Status
                                            </th>
                                            <th
                                                className={cx('th')}
                                                scope="row"
                                                style={{ textAlign: 'start', borderLeft: 'none', borderRight: 'none' }}
                                            >
                                                Total
                                            </th>
                                            <th
                                                className={cx('th')}
                                                scope="row"
                                                style={{ textAlign: 'start', borderLeft: 'none' }}
                                            >
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders?.map((e, i) => {
                                            return (
                                                <tr key={i} className={cx('tr')}>
                                                    <td className={cx('td')}>
                                                        #{e.id}
                                                    </td>
                                                    <td className={cx('td')}> {formatDate(e.created_at)}</td>
                                                    <td className={cx('td')}>
                                                        {' '}
                                                        {e.status === 1 ? 'Success' : 'Processing'}
                                                    </td>
                                                    <td className={cx('td')}>
                                                        {formatPrice.format(
                                                            e.discount_amount > 0 ? e.discount_amount : e.total_price,
                                                        )}
                                                    </td>
                                                    <td className={cx('td')}>
                                                        <Link className={cx('view')} to={`${e.id}`}>
                                                            View
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                    <tfoot></tfoot>
                                </table>
                          </div>
                        ) : (
                            <>
                                <h1 className={cx('title-order')}>No Order Has Been Made Yet.</h1>
                            </>
                        )}
                    </>
                    }
                </Col>
            </Row>
        </Container>
    );
}

export default AccountOrder;
