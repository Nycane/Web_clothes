import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Validate from '../../../../Components/Validate';
import { changePw } from '../../../../Redux/Slice/userSlice';
import styles from './accountChangePassword.module.scss';
const cx = classNames.bind(styles);
function AccountChangePassword() {
    const user = useSelector(state=>state.user.user)
    const dispatch = useDispatch();
    const options = {
        currentPw: yup.string().required('This field cannot be empty'),
        // passwordLogin: yup.string().required('This password field cannot be empty'),
        newPw: yup.string().required('This field cannot be empty'),
        confirmPw: yup.string().oneOf([yup.ref('newPw'), null], 'Passwords must match'),
    };
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = Validate(options,undefined);
    const onSubmit = (data) => {
        const newData = {
           ...user,
            currentPw:data.currentPw,
            newPw:data.newPw
        }
        dispatch(changePw(newData))
        reset()
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={cx('field-item')}>
                <label className={cx('label')}>Current password</label>
                <input type="password" {...register('currentPw')} className={cx('input')}></input>
                <span className={cx('error')}>{errors.currentPw?.message}</span>
            </div>
            <div className={cx('field-item')}>
                <label className={cx('label')}>New password</label>
                <input type="password" {...register('newPw')} className={cx('input')}></input>
                <span className={cx('error')}>{errors.newPw?.message}</span>
            </div>
            <div className={cx('field-item')}>
                <label className={cx('label')}>Confirm new password</label>
                <input type="password" {...register('confirmPw')} className={cx('input')}></input>
                <span className={cx('error')}>{errors.confirmPw?.message}</span>
            </div>
            <button className={cx('btn-changepw')} type="submit">
                save changes
            </button>
        </form>
    );
}

export default AccountChangePassword;
