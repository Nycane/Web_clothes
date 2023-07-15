import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import classNames from "classnames/bind";
import styles from './scrollBackToTop.module.scss'
const cx = classNames.bind(styles)
function ScrollBackToTop() {
    const [backToTop, setBackToTop] = useState(false);
    useEffect(()=>{
        window.addEventListener('scroll',()=>{
            window.scrollY > 1000 ?setBackToTop(true):setBackToTop(false)
        })
    })
    function scrollTop(){
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    }
    return <>{backToTop && <button className={cx('btn')} onClick={scrollTop} ><FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon></button>}</>;
}

export default ScrollBackToTop;
