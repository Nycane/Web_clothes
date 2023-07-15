import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Validate from '../../../../Components/Validate';
import { updateUser } from '../../../../Redux/Slice/userSlice';
import styles from './accountDetail.module.scss';
const cx = classNames.bind(styles);
function AccountDetail() {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const options = {
        email: yup.string().email().required('This field cannot be empty'),
       username: yup.string().required('This field cannot be empty'),
        address: yup.string().required('This field cannot be empty'),
        phone: yup.number().typeError('Field is number not string').required('This field cannot be empty'),
    };
    const optionsForm={
            defaultValues:{
                username:user.username,
                email:user.email,
                phone:user.phone,
                address:user.address
            }
    }
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = Validate(options,optionsForm);

    const onSubmit = async (data) => {
        console.log("onsubmit")
        const info = Object.assign({id:user['id'],accessToken:user.accessToken,refreshToken:user.refreshToken},data)
        dispatch(updateUser(info))
        reset();
    };

    useEffect(() => {
        setValue('username', user.username);
        setValue('email', user.email);
        setValue('phone', user.phone);
        setValue('address', user.address);
    }, [setValue, user]);

    return (
        <Container>
            <Row>
                <Col>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={cx('field-item')}>
                            <label htmlFor="username" className={cx('label')}>
                                Full Name *
                            </label>
                            <input
                                id="username"
                                type="text"
                                {...register('username',{
                                    required:true
                                })}
                                className={cx('input')}
                            ></input>
                            <em  className={cx('display-name')}>
                                This will be how your name will be displayed in the account section and in reviews
                            </em>
                            <span className={cx('error')}>{errors.username?.message}</span>
                        </div>
                        <div className={cx('field-item')}>
                            <label htmlFor="email" className={cx('label')}>
                                Email address *
                            </label>
                            <input
                                id="email"
                                type="text"
                                {...register('email')}
                                className={cx('input')}
                            ></input>
                            <span className={cx('error')}>{errors.email?.message}</span>
                        </div>
                        <div className={cx('field-item')}>
                            <label htmlFor="phone" className={cx('label')}>
                                Phone *
                            </label>
                            <input
                                id="phone"
                                type="text"
                                {...register('phone')}
                                className={cx('input')}
                            ></input>
                            <span className={cx('error')}>{errors.phone?.message}</span>
                        </div>
                        <div className={cx('field-item')}>
                            <label htmlFor="address" className={cx('label')}>
                                Address *
                            </label>
                            <input
                                id="address"
                                type="text"
                                {...register('address')}
                                className={cx('input')}
                            ></input>
                            <span className={cx('error')}>{errors.address?.message}</span>
                        </div>
                        <button className={cx('btn-changepw')} type="submit">
                            save changes
                        </button>
                    </form>
                </Col>
            </Row>
        </Container>
    );
}

export default AccountDetail;
