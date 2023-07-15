import classNames from 'classnames/bind';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import Validate from '../../Components/Validate';
import { login } from '../../Redux/Slice/userSlice';
import Register from './Register';
import styles from './login.module.scss';
import Toast from '../../Components/Toastify/toastify';
const cx = classNames.bind(styles);
function Login() {
    // Validate form
    const options = {
        email: yup
            .string()
            .email('Please enter a valid email address: Example@gmail.com')
            .required('This email field cannot be empty'),
        password: yup.string().required('This password field cannot be empty'),
    };
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = Validate(options);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // -----------------------------------------
    const [toggle, setToogle] = useState('signin');

    // Request sever
    const onSubmit = async (data) => {
        dispatch(login(data)).then((data) => {
            return data.payload ? navigate('/') : '';
        });
        reset();
    };
    return (
        <Container>
            <Row>
                <Col style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className={cx('wrap')}>
                        <div className={cx('singin-img')}>
                            <img
                                className={cx('img')}
                                alt="Sign In"
                                src="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2023/01/sign-in.jpg"
                            ></img>
                            <h2
                                className={cx('title-login', {
                                    active: toggle === 'signin',
                                })}
                            >
                                Sign In{' '}
                            </h2>
                            <h2
                                className={cx('title-register', {
                                    active: toggle === 'register',
                                })}
                            >
                                Register
                            </h2>
                        </div>
                        {/* ---------------form signin------------------- */}
                        <form
                            autoComplete="no"
                            noValidate
                            onSubmit={handleSubmit(onSubmit)}
                            className={cx('form-signin', {
                                active: toggle === 'signin',
                            })}
                        >
                            <input type="text" {...register('email')} placeholder="Name*" />
                            <span className={cx('error')}>{errors.email?.message}</span>
                            <input type="password" {...register('password')} placeholder="Passoword*" />
                            <span className={cx('error')}>{errors.password?.message}</span>
                            <Link
                                onClick={() => {
                                    Toast('success', 'The skill are improving');
                                }}
                                className={cx('forgetpassword')}
                            >
                                lost your password?
                            </Link>
                            <button type="submit" className={cx('btn-signin')}>
                                Sign In
                            </button>
                            <button
                                onClick={() => {
                                    setToogle('register');
                                }}
                                className={cx('btn-next-register')}
                                type="button"
                            >
                                Create An Account
                            </button>
                        </form>

                        {/* -------------form register---------------- */}
                        <Register toggle={toggle} setToogle={setToogle}></Register>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
