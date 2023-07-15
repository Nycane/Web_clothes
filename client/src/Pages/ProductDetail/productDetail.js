// import classNames from 'classnames/bind';
import { Col, Container, Row } from 'react-bootstrap';
import SliderProducts from '../../Components/Slider/SliderProducts/sliderProduct';
import CustomPaging from './Components/CustomPaging';
import Tabs from './Components/Tabs';
import ProductInfo from './Components/ProductInfo';
import productApi from '../../Api/productApi';
import { getProductVariants , getProducts } from '../../Redux/Slice/productSlice';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import styles from './productDetail.module.scss';
// const cx = classNames.bind(styles);

function ProductDetail() {
    // const [product,setProduct] = useState([])
    // const [variant,setVariant] = useState([])
    const dispatch = useDispatch();
    const products = useSelector(state=>state.product.products)
    const productDetail = useSelector(state=>state.product.productDetail)
    const [productImage,setProductImage] = useState([])
    let {id} = useParams()
    let listImage = [{image:productDetail?.image},...productImage]
    useEffect(()=>{
        // (async()=>{
        //     let product = await productApi.getProductById(id)
        //     let variant = await productApi.getProductVariantById(id)
        //     let productVariant=Object.assign({variant},...product)
        //     setProduct(productVariant)
        // })()
        dispatch(getProductVariants(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id])
    useEffect(()=>{
        (async()=>{
            let kq = await productApi.getProductImageById(id)
            setProductImage(kq)
        })()
    },[id])
    useEffect(()=>{
        dispatch(getProducts())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    // useEffect(()=>{
    //     (async()=>{
    //         let kq = await productApi.getProductVariantById(id)
    //         setVariant(kq)
    //     })()
    // },[id])
    return (
            <>
                <Container fluid>
                    <Row>
                        <Col lg={7} md={7}>
                            <CustomPaging product={listImage}></CustomPaging>
                        </Col>
                        <Col lg={5} md={5}>
                            <ProductInfo product={productDetail}></ProductInfo>
                            {/* <div className={cx('product-info')}>
                                <h1 className={cx('title')}>CORDUROY SLIM FLARED PANTS</h1>
                                <div className={cx('rating')}>
                                    <FontAwesomeIcon className={cx('icon-star')} icon={faStar}></FontAwesomeIcon>
                                    <FontAwesomeIcon className={cx('icon-star')} icon={faStar}></FontAwesomeIcon>
                                    <FontAwesomeIcon className={cx('icon-star')} icon={faStar}></FontAwesomeIcon>
                                    <FontAwesomeIcon className={cx('icon-star')} icon={faStar}></FontAwesomeIcon>
                                    <FontAwesomeIcon className={cx('icon-star')} icon={faStar}></FontAwesomeIcon>
                                    <p className={cx('title-rating')}>(1 customer review)</p>
                                </div>
                                <p className={cx('price')}>40.00$</p>
    
                                <div className={cx('count-view')}>
                                    <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                                    <span className={cx('title-view')}>39 people are viewing this right now</span>
                                </div>
                                <p className={cx('description')}>
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                    nulla pariatur.
                                </p>
                                <form className={cx('product-option')}>
                                    <div className={cx('btn-quantity')}>
                                        <button type="button" className={cx('btn-left')}>
                                            <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                                        </button>
                                        <input readOnly min="1" value={1} className={cx('quantity')} type="text" />
                                        <button type="button" className={cx('btn-right')}>
                                            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                                        </button>
                                    </div>
                                    <button className={cx('btn-add')}>add to cart</button>
                                    <div className={cx('wishlist')}>
                                        <button className={cx('btn-wishlist')}>
                                            <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                                        </button>
                                    </div>
                                    <button className={cx('btn-buynow')}>buy now</button>
                                </form>
                                <div className={cx('safe-checkout')}>
                                    <img
                                        className={cx('img')}
                                        alt=""
                                        src="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2022/07/payments-2.png"
                                    ></img>
                                    <p className={cx('title-checkout')}>Guaranteed Safe Checkout</p>
                                </div>
                                <div className={cx('product-shipping')}>
                                    <ul>
                                        <li>
                                            <FontAwesomeIcon icon={faTruckFast}></FontAwesomeIcon>
                                            <span className={cx('text-shipping')}>
                                                {' '}
                                                Free worldwide shipping on all orders over $100
                                            </span>
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon={faBusinessTime}></FontAwesomeIcon>
                                            <span className={cx('text-shipping')}>
                                                {' '}
                                                Delivers in: 3-7 Working Days Shipping & Return
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div> */}
                        </Col>
                    </Row>
                </Container>
                
                {/* ---------------------Tabs----------------------------- */}
                <Tabs productId={productDetail?.id}></Tabs>
                {/* -------------------Slider product---------------------------------- */}
                <SliderProducts products={products} title="RELATED PRODUCTS" titleCenter slShow={4}></SliderProducts>
                <SliderProducts products={products} title="RECENTLY VIEWED PRODUCTS" titleCenter slShow={4}></SliderProducts>
                {/*  */}
            </>
    );
}

export default ProductDetail;
