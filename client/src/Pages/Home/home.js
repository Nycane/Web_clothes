import SliderFeedback from './Components/SliderFeedback';
import SliderCustom from '../../Components/Slider/SliderCustom'
import BannerScroll from './Components/bannerScroll/index.';
import Banner3 from './Components/banner3'
import SliderProducts from '../../Components/Slider/SliderProducts/sliderProduct';
import Banner1 from './Components/banner1';
import Banner2 from '../../Components/Banner/banner2';
import {getProducts} from '../../Redux/Slice/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './home.module.scss';
const cx = classNames.bind(styles);
function Home() {
    const products = useSelector(state=>state.product.products)
    console.log("home",products)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getProducts())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <>
            <Banner1></Banner1>
            <SliderProducts products={products} title="BEST SELLER" slShow={4} text="view all"></SliderProducts>
            <Banner2
                left
                img="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2022/12/banner-23.jpg"
                title="News COLLECTION"
                text="-70%"
                btn
            ></Banner2>
            <SliderFeedback></SliderFeedback>
            <SliderProducts products={products.slice().reverse()} title="TRENDING PRODUCT" slShow={4} text="view all"></SliderProducts>
            <SliderCustom border padding>
                <img
                    className={cx('img')}
                    alt=""
                    src="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2022/11/brand-2.jpg"
                ></img>
                <img
                    className={cx('img')}
                    alt=""
                    src="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2022/11/brand-5.jpg"
                ></img>
                <img
                    className={cx('img')}
                    alt=""
                    src="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2022/11/brand-3.jpg"
                ></img>
                <img
                    className={cx('img')}
                    alt=""
                    src="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2022/11/brand-4.jpg"
                ></img>
                <img
                    className={cx('img')}
                    alt=""
                    src="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2022/11/brand-1.jpg"
                ></img>
            </SliderCustom>
            <BannerScroll></BannerScroll>
            <Banner3></Banner3>
        </>
    );
}

export default Home;
