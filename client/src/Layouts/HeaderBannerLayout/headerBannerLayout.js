import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './headerBannerLayout.module.scss'
const cx = classNames.bind(styles)
function HeaderBannerLayout({ children}) {
    const location = useLocation();
    let pathName=location.pathname.substring(1,location.pathname.length)
    if(pathName.includes('/')){
        pathName = pathName.split('/')[0];
    }
    return (
        <>
            <Header bg={true}></Header>
           { pathName!=="about"
                    ?
            <div className={cx('wrap')}>
                <div className={cx('background')}>
                    <div className={cx('content')}>
                        <h2 className={cx('title')}>{pathName}</h2>
                        <div className={cx('title-page')}>
                            <Link to="/" className={cx('before')}>
                                Home
                            </Link>
                            <FontAwesomeIcon className={cx('icon')} icon={faChevronRight }></FontAwesomeIcon>
                            <span className={cx('current')}> {pathName}</span>
                        </div>
                    </div>
                </div>
            </div>
                    :
            <div className={cx('img-bg')}>
                <h3 className={cx('img-title')}>About us</h3>
            </div>}
            {children}
            <Footer></Footer>
        </>
    );
}

export default HeaderBannerLayout;
