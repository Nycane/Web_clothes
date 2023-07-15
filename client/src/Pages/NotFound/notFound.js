import classNames from 'classnames/bind';
import styles from './notFound.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function NotFound() {
    return (
        <div className={cx('notfound-content')}>
            <div className={cx('title-error')}>404</div>
            <div className={cx('sub-title')}>Oops! That page can't be found.</div>
            <div className={cx('sub-error')}>
                We're really sorry but we can't seem to find the page you were looking for.
            </div>
           <Link to="/" className={cx('btn')}>back the homepage</Link>
        </div>
    );
}

export default NotFound;
