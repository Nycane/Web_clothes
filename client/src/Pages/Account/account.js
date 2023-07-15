import classNames from 'classnames/bind';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import AccountDashboard from './Components/accountDashboard';
import AccountDetail from './Components/accountDetail';
import AccountOrder from './Components/accountOrder';
import AccountChangePassword from './Components/accountChangePassword';
import styles from './account.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux/Slice/userSlice';
import AccountOrderDetail from './Components/accountOrderDetail';
const cx = classNames.bind(styles);
function Account() {
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // Xử lý sự kiện đăng xuất
    function handleLogout() {
        // Gọi hàm logout và truyền vào thông tin của user  
        dispatch(logout(user)).then((data) => {
            // Đăng xuất thành công chuyển về trang login
            data?.payload === 'Logout Success' && navigate('/login');
        });
    }
    return (
        <Container fluid style={{ padding: '0px 60px' }}>
            <Row>
                <Col lg={4} md={4}>
                    <div className={cx('navbar')}>
                        <ul className={cx('navbar-wrap')}>
                            <li className={cx('navbar-item')}>
                                <Link className={cx('text')} to="/account">
                                    DASHBOARD
                                </Link>
                            </li>
                            <li className={cx('navbar-item')}>
                                <Link className={cx('text')} to="/account/order">
                                    Order
                                </Link>
                            </li>
                            <li className={cx('navbar-item')}>
                                <Link className={cx('text')} to="/account/detail">
                                    ACCOUNT DETAILS
                                </Link>
                            </li>
                            <li className={cx('navbar-item')}>
                                <Link to="/account/changepw" className={cx('text')}>
                                    CHANGE PASSWORD
                                </Link>
                            </li>
                            <li className={cx('navbar-item')}>
                                <Link onClick={handleLogout} className={cx('text')}>
                                    LOGOUT
                                </Link>
                            </li>
                            <li className={cx('navbar-item')}>
                                <Link to="/wishlist" className={cx('text')}>WISHLIST</Link>
                            </li>
                        </ul>
                    </div>
                </Col>
                <Col lg={8} md={8}>
                    <Routes>
                        <Route path="/" element={<AccountDashboard></AccountDashboard>}></Route>
                        <Route path="/order" element={<AccountOrder></AccountOrder>}></Route>
                        <Route path="/order/:id" element={<AccountOrderDetail></AccountOrderDetail>}></Route>
                        <Route path="/detail" element={<AccountDetail></AccountDetail>}></Route>
                        <Route path="/changepw" element={<AccountChangePassword></AccountChangePassword>}></Route>
                    </Routes>
                </Col>
            </Row>
        </Container>
    );
}

export default Account;
