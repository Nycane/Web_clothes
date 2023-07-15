import classNames from "classnames/bind";
import styles from './loading.module.scss';
const cx = classNames.bind(styles);
function Loading() {
    return (  
        <div className={cx("tiktok-loading-container")}>
        <div className={cx("tiktok-loading")}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
}

export default Loading;