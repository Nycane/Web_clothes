import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    FacebookShareButton,
    InstapaperShareButton,
    PinterestIcon,
    PinterestShareButton,
    TwitterShareButton
} from 'react-share';
import { addToCart } from '../../Redux/Slice/cartSlice';
import wishlistSlice from '../../Redux/Slice/wishlistSLice';
import formatPrice from '../../Utils/formatPrice';
import styles from './wishList.module.scss';
const cx = classNames.bind(styles);
function WishList() {
    const dishpatch = useDispatch();
    const wishlists = useSelector((state) => state.wishlist.wishlists);
    console.log(wishlists);
    // Xóa sản phẩm
    function handleRemove(index) {
        dishpatch(wishlistSlice.actions.remove(index));
    }
    // Thêm sản phẩm
    function handeAddToCart(product) {
        console.log('wishlist', product);
        const newProduct = Object.assign({ quantity: 1 }, product);
        dishpatch(addToCart(newProduct));
    }
    return (
        <Container>
            <Row>
                <Col lg={12} md={12}>
                    {wishlists.length > 0 ? (
                        <>
                            <table className={cx('wishlist-wrap')}>
                                {wishlists?.map((e, i) => {
                                    return (
                                        <tbody key={i}>
                                            <tr>
                                                <td className={cx('wishlist-remove')}>
                                                    <div onClick={() => handleRemove(i)} className={cx('removeItem')}>
                                                        x
                                                    </div>
                                                </td>
                                                <td className={cx('wishlist-img')}>
                                                    <Link>
                                                        <img width="80px" height="auto" alt="" src={e.image}></img>
                                                    </Link>
                                                </td>
                                                <td className={cx('wishlist-content')}>
                                                    <Link to={`/product/${e.id}`} className={cx('name')}>
                                                        {e.name}
                                                    </Link>
                                                    <p className={cx('price')}>{formatPrice.format(e.price)}</p>
                                                    <p className={cx('current-date')}>{e.currentDate}</p>
                                                </td>
                                                {e?.variant?.length > 0 ? (
                                                    <td className={cx('wishlist-btn')}>
                                                        <Link to={`/product/${e.id}`} className={cx('btn-add')}>
                                                            Select Options
                                                        </Link>
                                                    </td>
                                                ) : (
                                                    <td className={cx('wishlist-btn')}>
                                                        <Link
                                                            onClick={() => handeAddToCart(e)}
                                                            className={cx('btn-add')}
                                                        >
                                                            Add to cart
                                                        </Link>
                                                    </td>
                                                )}
                                            </tr>
                                        </tbody>
                                    );
                                })}
                            </table>
                            <div className={cx('list-icon')}>
                                <span className={cx('text-share')}>share on:</span>
                                <TwitterShareButton url="https://wpbingosite.com/wordpress/mafoil/wishlist/">
                                    <FontAwesomeIcon
                                        className={cx('icon-social-tw')}
                                        icon={faTwitter}
                                    ></FontAwesomeIcon>
                                </TwitterShareButton>
                                <FacebookShareButton url="https://wpbingosite.com/wordpress/mafoil/wishlist/">
                                    <FontAwesomeIcon
                                        className={cx('icon-social-fb')}
                                        icon={faFacebookF}
                                    ></FontAwesomeIcon>
                                </FacebookShareButton>
                                <PinterestShareButton
                                    media="http://example.com/image.jpg"
                                    url="https://wpbingosite.com/wordpress/mafoil/wishlist/"
                                >
                                    <PinterestIcon className={cx('icon-social-db')}></PinterestIcon>
                                </PinterestShareButton>
                                <InstapaperShareButton url="https://wpbingosite.com/wordpress/mafoil/wishlist/">
                                    <FontAwesomeIcon
                                        className={cx('icon-social-ins')}
                                        icon={faInstagram}
                                    ></FontAwesomeIcon>
                                </InstapaperShareButton >
                            </div>
                        </>
                    ) : (
                        <p className={cx('wishlist-empty')}>There are no products on the Wishlist!</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default WishList;
