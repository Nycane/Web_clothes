import Tippy from "@tippyjs/react/headless";
import { Link } from "react-router-dom";
import 'tippy.js/dist/tippy.css';
import Popover from "../popover";
import styles from './popoverLookBook.module.scss';
import classNames from "classnames/bind";
const cx = classNames.bind(styles)
function PopoverLookBook({children}) {
    return ( 
            <Tippy 
            hideOnClick={true}
            trigger="click"
            interactive={true}
            placement="top"
            appendTo={document.body}
            render={attr=>{ 
                return (
                    <div className={cx('product-wrap')}>
                        <Popover>
                                <img width='100%' height='auto' alt="" src="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2020/04/10-1.jpg">
                                </img>
                                <div className={cx('product-content')}>
                                    <Link className={cx('title-product')}>Middle Gauge Crew Neck</Link>
                                    <p className={cx('price-product')}> 150.00$</p>
                                </div>
                        </Popover>
                    </div>
                )
            }}
            >
                {children}
            </Tippy>
     );
}


export default PopoverLookBook;