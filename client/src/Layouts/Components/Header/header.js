import CustomModal from '../../../Components/Modal';
import Search from './Components/Search';
import PopoverCart from '../../../Components/Popover/popoverCart';
import { faFaceAngry, faHeart, faUser } from '@fortawesome/free-regular-svg-icons';
import { faBagShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './header.module.scss';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import PopoverUser from '../../../Components/Popover/popoverUser';

const cx = classNames.bind(styles);

function Header(props) {
    const cartLength = useSelector(state=>state.cart.carts)
   const user = useSelector(state=>state.user.user)
   const wishlistLength = useSelector(state=>state.wishlist.wishlists)
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    return (
        <div
            className={cx('header-wrap', {
                'header-background': props.bg,
            })}
        >
            <div className={cx('header-left')}>
                <ul>
                    <li>
                        <Link className={cx('link')} to="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link className={cx('link')} to="/shop">
                            Shop
                        </Link>
                    </li>

                    <li>
                        <Link className={cx('link')} to="/contact">
                            Contact
                        </Link>
                    </li>
                    <li>
                        <Link className={cx('link')} to="/about">
                            About
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={cx('header-center')}>
                <img
                    alt="Logo"
                    src={
                        props.bg
                            ? 'https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2023/01/logo.png'
                            : 'https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2023/01/logo-white.png'
                    }
                ></img>
            </div>
            <div className={cx('header-right')}>
                {/* search modal */}
                    <CustomModal modalIsOpen={modalIsOpen} customCss="fullwidth" closeModal={closeModal} closed={true}>
                        <Search></Search>
                    </CustomModal>

                <div onClick={openModal} className={cx('searchIcon')}>
                    <Link className={cx('icon')}>
                        <FontAwesomeIcon fontSize={22} icon={faMagnifyingGlass }></FontAwesomeIcon>
                    </Link>
                </div>
              { user?.username && user?.id ? 
             <div>
                  <PopoverUser>
                        <div className={cx('userIcon')}>
                            <Link  className={cx('icon')}>
                                <FontAwesomeIcon fontSize={22} icon={faUser}></FontAwesomeIcon>
                            </Link>
                        </div>
                   </PopoverUser> 
             </div>
               :  <div className={cx('userIcon')}>
                        <Link to="/login" className={cx('icon')}>
                            <FontAwesomeIcon fontSize={22} icon={faUser}></FontAwesomeIcon>
                        </Link>
                    </div>}
                <div className={cx('wishlistIcon')}>
                    <Link to="/wishlist" className={cx('icon')}>
                        <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                    </Link>
                    <span className={cx('After')}>{wishlistLength.length}</span>
                </div>
                <div className={cx('cartIcon')}>
                   <PopoverCart>
                        <Link className={cx('icon')}>
                            <FontAwesomeIcon fontSize={22} icon={faBagShopping}></FontAwesomeIcon>
                        </Link>
                   </PopoverCart>
                    <span className={cx('After')}>{cartLength.length}</span>
                </div>
            </div>
        </div>
    );
}

export default Header;
