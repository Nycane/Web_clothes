import classNames from "classnames/bind";
import styles from './popover.module.scss'
const cx = classNames.bind(styles)
function Popover({children}) {
    return (  
        <div className={cx("popover-wrap")}>
            {children}
        </div>
    );
}

export default Popover;