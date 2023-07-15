import { Link } from 'react-router-dom';
import styles from './contentSlider.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function ContentSlider({ titleSmall = 'sale up to 60% of', titleLarge = 'black friday sale' }) {
    return (
        <div className={cx('content-wrap')}>
            <div className={cx('title-small')}>
                <p>{titleSmall}</p>
            </div>
            <div className={cx('title-large')}>
                <h5>{titleLarge}</h5>
            </div>

            <Link to="/shop" className={cx('btn')}>
                <span className={cx('text-btn')} style={{ zIndex: 9 }}>shop now</span>
            </Link>
        </div>
    );
}

export default ContentSlider;
