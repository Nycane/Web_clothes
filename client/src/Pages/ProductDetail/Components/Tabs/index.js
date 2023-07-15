import {
    faFaceAngry,
    faFaceGrinHearts,
    faFaceKissWinkHeart,
    faFaceSmile,
    faSmileWink,
    faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import 'tippy.js/animations/scale.css';
import 'tippy.js/dist/tippy.css';
import CustomModal from '../../../../Components/Modal';
import Toast from '../../../../Components/Toastify/toastify';
import { commentUser, deleteComment, getComments } from '../../../../Redux/Slice/userSlice';
import formatDate from '../../../../Utils/formatDate';
import styles from './tabs.module.scss';
const cx = classNames.bind(styles);
function Tabs() {
    const dispatch = useDispatch();
    const { id: productId } = useParams();
    const [toggle, setToggle] = useState(1);
    const [star, setStar] = useState(0);
    const [isStart, setiStar] = useState(false);
    const [storageStar, setStorageStar] = useState();
    const [comment, setComment] = useState('');
    const user = useSelector((state) => state.user.user);
    const listComments = useSelector((state) => state.user.listComments);
    const view = useSelector((state) => state.user?.countView);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    // Mở modal comment
    function openModal() {
        setModalIsOpen(true);
    }
    // Đóng modal commnet
    function closeModal() {
        setModalIsOpen(false);
    }
        // Handle Rating
    function handleStar(value) {
        setStar(value);
        setStorageStar(value);
        setiStar(true);
    }
    function handleMoveStar() {
        !isStart ? setStar(0) : setStar(storageStar);
    }
    // --------------------
        
        // Kiểm tra và gửi comment
    function handleSubmit() {
        if (!isStart) {
            Toast('error', 'Please Select Rating');
            return;
        }
        if (!comment.trim()) {
            Toast('error', 'Please Enter A Review');
            return;
        }
        setiStar(false);
        setStar(0);
        setComment('');
        // request Comment and add Comment
        dispatch(
            commentUser({
                productId,
                username: user?.username,
                userId: user?.id,
                accessToken: user?.accessToken,
                refreshToken: user?.refreshToken,
                content: comment,
                rating: star,
            }),
        );
    }
    // remove comment
    function handleDeleteComment(id){
       const isDelete = window.confirm("Are you sure to delete?")
       isDelete && dispatch(deleteComment({
            productId,
            commentId:id,
            accessToken: user?.accessToken,
            refreshToken: user?.refreshToken,
        }))
    }
    // Get comments
    useEffect(() => {
        dispatch(
            getComments({
                productId
            }),
        );
    }, [productId]);
    return (
        <>
            <CustomModal
                modalIsOpen={modalIsOpen}
                isOpen={modalIsOpen}
                customCss={cx({ 'fullwidth-50': modalIsOpen })}
                closed
                closeModal={closeModal}
            >
                <Container>
                    <Row>
                        <Col lg={12} md={12}>
                            {user?.username && user?.id ? (
                                <div className={cx('comment-wrap')}>
                                    <h5 className={cx('comment-title')}> add a review</h5>
                                    <div className={cx('comment-rating')}>
                                        <p className={cx('rating-title')}>Your rating</p>
                                        <div className={cx('list-star')}>
                                            <Tippy
                                                animation="scale"
                                                content={
                                                    <FontAwesomeIcon
                                                        style={{ color: 'white', fontSize: '20px' }}
                                                        icon={faFaceAngry}
                                                    ></FontAwesomeIcon>
                                                }
                                            >
                                                <span>
                                                    <FontAwesomeIcon
                                                        onClick={() => handleStar(1)}
                                                        onMouseMove={() => setStar(1)}
                                                        onMouseLeave={() => handleMoveStar()}
                                                        // id="1"
                                                        className={cx({
                                                            'active-star': 1 <= star,
                                                        })}
                                                        icon={faStar}
                                                    ></FontAwesomeIcon>
                                                </span>
                                            </Tippy>

                                            <Tippy
                                                animation="scale"
                                                content={
                                                    <FontAwesomeIcon
                                                        style={{ color: 'white', fontSize: '20px' }}
                                                        icon={faFaceSmile}
                                                    ></FontAwesomeIcon>
                                                }
                                            >
                                                <span>
                                                    <FontAwesomeIcon
                                                        onClick={() => handleStar(2)}
                                                        onMouseMove={() => setStar(2)}
                                                        onMouseLeave={() => handleMoveStar()}
                                                        className={cx({
                                                            'active-star': 2 <= star,
                                                        })}
                                                        icon={faStar}
                                                    ></FontAwesomeIcon>
                                                </span>
                                            </Tippy>

                                            <Tippy
                                                animation="scale"
                                                content={
                                                    <FontAwesomeIcon
                                                        style={{ color: 'white', fontSize: '20px' }}
                                                        icon={faSmileWink}
                                                    ></FontAwesomeIcon>
                                                }
                                            >
                                                <span>
                                                    <FontAwesomeIcon
                                                        onClick={() => handleStar(3)}
                                                        onMouseMove={() => setStar(3)}
                                                        onMouseLeave={() => handleMoveStar()}
                                                        // id="3"
                                                        className={cx({
                                                            'active-star': 3 <= star,
                                                        })}
                                                        icon={faStar}
                                                    ></FontAwesomeIcon>
                                                </span>
                                            </Tippy>
                                            <Tippy
                                                animation="scale"
                                                content={
                                                    <FontAwesomeIcon
                                                        style={{ color: 'white', fontSize: '20px' }}
                                                        icon={faFaceGrinHearts}
                                                    ></FontAwesomeIcon>
                                                }
                                            >
                                                <span>
                                                    <FontAwesomeIcon
                                                        onClick={() => handleStar(4)}
                                                        onMouseMove={() => setStar(4)}
                                                        onMouseLeave={() => handleMoveStar()}
                                                        // id="4"
                                                        className={cx({
                                                            'active-star': 4 <= star,
                                                        })}
                                                        icon={faStar}
                                                    ></FontAwesomeIcon>
                                                </span>
                                            </Tippy>
                                            <Tippy
                                                animation="scale"
                                                content={
                                                    <FontAwesomeIcon
                                                        style={{ color: 'white', fontSize: '20px' }}
                                                        icon={faFaceKissWinkHeart}
                                                    ></FontAwesomeIcon>
                                                }
                                            >
                                                <span>
                                                    <FontAwesomeIcon
                                                        onClick={() => handleStar(5)}
                                                        onMouseMove={() => setStar(5)}
                                                        onMouseLeave={() => handleMoveStar()}
                                                        // id="5"
                                                        className={cx({
                                                            'active-star': 5 <= star,
                                                        })}
                                                        icon={faStar}
                                                    ></FontAwesomeIcon>
                                                </span>
                                            </Tippy>
                                        </div>
                                    </div>
                                    <textarea
                                        className={cx('comment-content')}
                                        placeholder="Your Reviews *"
                                        cols={45}
                                        rows={8}
                                        value={comment}
                                        onChange={(e) => {
                                            setComment(e.target.value);
                                        }}
                                    ></textarea>
                                    <button onClick={handleSubmit} className={cx('btn-submit')}>
                                        submit
                                    </button>
                                </div>
                            ) : (
                                <div className={cx('please-login')}>
                                    <h1 className={cx('title-redirect')}>Please Login To Comment</h1>
                                    <Link to="/login" className={cx('btn-redirect')}>
                                        login
                                    </Link>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Container>
            </CustomModal>
            <Container>
                <Row>
                    <Col lg={12} md={12}>
                        <div className={cx('tabs')}>
                            <div
                                onClick={() => {
                                    setToggle(1);
                                }}
                                className={cx('tabs-title', {
                                    'active-tabs': toggle === 1,
                                })}
                            >
                                DESCRIPTION
                            </div>
                            <div
                                onClick={() => {
                                    setToggle(2);
                                }}
                                className={cx('tabs-title', {
                                    'active-tabs': toggle === 2,
                                })}
                            >
                                REVIEWS ({view?.countView})
                            </div>
                        </div>
                        <div className={cx('tabs-content')}>
                            <div
                                className={cx('content', {
                                    'active-content': toggle === 1,
                                })}
                            >
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                                    deserunt mollit anim id est laborum.
                                </p>
                            </div>
                            <div
                                className={cx('content', {
                                    'active-content': toggle === 2,
                                })}
                            >
                                <div className={cx('review')}>
                                    <h2 className={cx('review-title')}>
                                        {view?.countView} review for Corduroy Slim Flared Pants
                                    </h2>
                                    <div className={cx("review-scroll")}>
                                        {listComments?.length > 0 &&
                                            listComments.map((e, i) => {
                                                return (
                                                    <div key={i} className={cx('review-item')}>
                                                        <div className={cx('info-user')}>
                                                            <img
                                                                className={cx('avatar')}
                                                                alt=""
                                                                src="https://thuthuatnhanh.com/wp-content/uploads/2020/09/avatar-nu-cute-anime.jpg"
                                                                width="50px"
                                                                height="50px"
                                                            ></img>
                                                            <div className={cx('rate')}>
                                                                {Array.from(Array(e.rating), (_, i) => (
                                                                    <FontAwesomeIcon
                                                                        key={i}
                                                                        className={cx('icon-star')}
                                                                        icon={faStar}
                                                                    ></FontAwesomeIcon>
                                                                ))}
    
                                                                <p className={cx('name')}>{e.username}</p>
                                                                <span className={cx('date')}>{formatDate(e.create_at)}</span>
                                                            </div>
                                                        </div>
                                                        <div className={cx('info-comment')}>
                                                            <p className={cx('comment-text')}>{e.content}</p>
                                                        </div>
                                                       { 
                                                       user?.username===e.username&&
                                                       <div onClick={()=>handleDeleteComment(e.id)} className={cx('remove-comment')}>X</div>
                                                       }
                                                    </div>
                                                );
                                            })}
                                    </div>
                                    <button onClick={openModal} type="button" className={cx('btn-modal-comment')}>
                                        write a review
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Tabs;
