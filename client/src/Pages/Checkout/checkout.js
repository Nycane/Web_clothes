/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import Validate from '../../Components/Validate';
import { addOrder, createPayment } from '../../Redux/Slice/orderSlice';
import CartLeft from '../Cart/Component/cartleft';
import styles from './checkout.module.scss';
const cx = classNames.bind(styles);
function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user.user);
    const [addressOther, setAddressOther] = useState(false);
    const btnSubmit = useRef();
    // Validate form
    const options = {
        payment: yup.string().required('Please select a payment option'),
        notes: yup.string(),
        fullname: yup.string().required('This field cannot be empty'),
        email: yup
            .string()
            .email('Please enter a valid email address: Example@gmail.com')
            .required('This email field cannot be empty'),
        address: yup.string().required('This field cannot be empty'),
        phone: yup.number().max(13).typeError('This field is phone number').required('This field cannot be empty'),
    };
    const optionsForm = {
        defaultValues: {
            fullname: user?.username,
            email: user?.email,
            phone: user?.phone,
            address: user?.address,
            notes: '',
        },
    };
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = Validate(options, optionsForm);
// ---------------------------------------
    // handle add  order
    const onSubmit = async (data) => {
        // Kiểm tra phương thức thanh toán
        if (data.payment === 'VNpay') {
            const newData = {
                amount: cart.total,
                bankCode: '',
                language: 'vn',
                info:Object.assign({ userId: user.id }, data),
                product: cart,
                accessToken: user.accessToken,
                refreshToken: user.refreshToken,
            };
            dispatch(createPayment(newData));
        } else {
            const newData = {
                accessToken: user.accessToken,
                refreshToken: user.refreshToken,
                info: Object.assign({ userId: user.id }, data),
                product: cart,
            };
            // nếu thanh toán thành công chuyển sang trang order 
            dispatch(addOrder(newData))
            .unwrap()
            .then(() => {
               navigate('order')
            })
            .catch((rejectedValueOrSerializedError) => {
                console.log(rejectedValueOrSerializedError)
            })
        }
        reset();
    };
    // Xử lý check nhập địa chỉ khác
    useEffect(() => {
        if (addressOther) {
            reset({
                fullname: '',
                email: '',
                phone: '',
                address: '',
                payment: '',
            });
        } else {
            reset(optionsForm.defaultValues);
        }
    }, [addressOther]);
    // Kiểm tra nếu giở hàng trống chuyển về trang cart
    useEffect(() => {
        if (!(cart.carts.length > 0)) {
            navigate('/cart');
        }
    }, [cart.carts]);
   
    
    return (
        <Container fluid>
            <Row>
                {user?.username && user?.id ? (
                    <>
                        {' '}
                        <Col lg={7} md={7}>
                            <div className={cx('billing-wrap')}>
                                <h3 className={cx('title')}>Billing details</h3>
                                {/* form default */}
                                <form
                                    autoComplete="no"
                                    noValidate
                                    onSubmit={handleSubmit(onSubmit)}
                                    className={cx('billing-field')}
                                >
                                    <p className={cx('field-item')}>
                                        <label htmlFor="fullname">
                                            Full name <span className={cx('required')}>*</span>
                                        </label>
                                        <input
                                            disabled={!addressOther}
                                            {...register('fullname')}
                                            type="text"
                                            id="fullname"
                                        ></input>
                                        <span className={cx('error')}>{errors.fullname?.message}</span>
                                    </p>

                                    <p className={cx('field-item')}>
                                        <label htmlFor="address">
                                            Address <span className={cx('required')}>*</span>
                                        </label>
                                        <input
                                            disabled={!addressOther}
                                            {...register('address')}
                                            type="text"
                                            id="address"
                                            placeholder="House number and street name"
                                        ></input>
                                        <span className={cx('error')}>{errors.address?.message}</span>
                                    </p>

                                    <p className={cx('field-item')}>
                                        <label htmlFor="phone">
                                            Phone <span className={cx('required')}>*</span>
                                        </label>
                                        <input
                                            disabled={!addressOther}
                                            {...register('phone')}
                                            type="text"
                                            id="phone"
                                        ></input>
                                        <span className={cx('error')}>{errors.phone?.message}</span>
                                    </p>

                                    <p className={cx('field-item')}>
                                        <label htmlFor="email">
                                            Email Address <span className={cx('required')}>*</span>
                                        </label>
                                        <input
                                            disabled={!addressOther}
                                            {...register('email')}
                                            type="text"
                                            id="email"
                                        ></input>
                                        <span className={cx('error')}>{errors.email?.message}</span>
                                    </p>

                                    <p className={cx('field-item')}>
                                        <label htmlFor="notes">Order notes(optional)</label>
                                        <textarea
                                            {...register('notes')}
                                            placeholder="Notes about your order, e.g. special notes for delivery."
                                            id="notes"
                                        ></textarea>
                                    </p>
                                    <button ref={btnSubmit} type="submit"></button>
                                </form>
                                {/* form default */}
                                <p className={cx('field-item')}>
                                    <input
                                        onChange={(e) => setAddressOther(e.target.checked)}
                                        id="addressOther"
                                        type="checkbox"
                                    ></input>
                                    <label style={{paddingLeft:'8px'}} htmlFor="addressOther">SHIP TO A DIFFERENT ADDRESS?</label>
                                </p>
                            </div>
                        </Col>
                        <Col lg={5} md={5} style={{ padding: '0px 30px' }}>
                            <CartLeft
                                checkout
                                products={cart.carts}
                                btnSubmit={btnSubmit}
                                register={register}
                                errors={errors.payment?.message}
                            ></CartLeft>
                        </Col>{' '}
                    </>
                ) : (
                    <Col lg={12} md={12}>
                        <div className={cx('redirect-login')}>
                            <h1 className={cx('redirect-title')}>Please Login Checkout</h1>
                            <Link className={cx('redirect-btn')} to="/login">
                                Login
                            </Link>
                        </div>
                    </Col>
                )}
            </Row>
        </Container>
    );
}

export default Checkout;
