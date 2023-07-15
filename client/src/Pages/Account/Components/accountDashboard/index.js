import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { logout } from '../../../../Redux/Slice/userSlice';
import styles from './accountDashboard.module.scss';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
function AccountDashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const user = useSelector((state) => state.user.user);
    function handleLogout(){
        // dispatch(logout(user)).then(data=>data.payload==="Logout Success" ? navigate("/login"):"")
        dispatch(logout(user)).then(data=>data.payload==="Logout Success" ? navigate("/login"):"")

    }
    return (
        <div>
            <p className={cx('hello-user')}>
                Hello <span className={cx('text-force')}>{user.username}</span> (not{' '}
                <span className={cx('text-force')}>{user.username}</span>? { user.id && user.username&&<Link  onClick={handleLogout} className={cx('a')}>Log out</Link>})
            </p>
            <p className={cx('text-info')}>
                From your account dashboard you can view your recent orders, manage your shipping and billing addresses,
                and edit your password and account details.
            </p>
        </div>
    );
}

export default AccountDashboard;
