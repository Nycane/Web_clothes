import { register as handleRegister } from '../../../Redux/Slice/userSlice';
import classNames from 'classnames/bind';
import * as yup from 'yup';
import Validate from '../../../Components/Validate';
import { useDispatch } from 'react-redux';
import styles from './register.module.scss';
const cx = classNames.bind(styles);
function Register({ toggle, setToogle }) {
    // Validate form
    const options={
        fullname: yup.string().required('This fullname field cannot be empty'),
        phone: yup.number().typeError('Please enter field number').required('This phone field cannot be empty'),
        address: yup.string().required('This address field cannot be empty'),
        email: yup
            .string()
            .email('Please enter a valid email address: Example@gmail.com')
            .required('This email field cannot be empty'),
        password: yup
            .string()
            .required('This password field cannot be empty')
            .min(8, 'Password must have 8 characters or more')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .required(),
    }
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = Validate(options);
    const dispatch =useDispatch();
    // Request sever
    const onSubmit = async (data) => {
        dispatch(handleRegister(data)).then(data=>{ return data.payload?setToogle('signin'):""})
        reset();
    };
    return (
        <>
                <form
                    autoComplete='no'
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                    className={cx('form-register', {
                        active: toggle === 'register',
                    })}
                >
                    <input {...register('fullname')} type="text" placeholder="Name*" />
                    <p className={cx('error')}>{errors.fullname?.message}</p>
    
                    <input {...register('email')} type="text" placeholder="Email*" />
                    <p className={cx('error')}>{errors.email?.message}</p>
    
                    <input {...register('password')} type="password" placeholder="Password*" />
                    <p className={cx('error')}>{errors.password?.message}</p>
    
                    <input {...register('phone')} type="text" placeholder="Phone*" />
                    <p className={cx('error')}>{errors.phone?.message}</p>
    
                    <input {...register('address')} type="text" placeholder="Address*" />
                    <p className={cx('error')}>{errors.address?.message}</p>
    
                    <button type="submit" className={cx('btn-register')}>
                        register
                    </button>
                    <button
                        onClick={() => {
                            setToogle('signin');
                        }}
                        className={cx('btn-next-signin')}
                        type="button"
                    >
                        Already has an account
                    </button>
                </form>
        </>
    );
}

export default Register;
