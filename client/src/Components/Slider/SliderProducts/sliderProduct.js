import Card from '../../Products/Card';
import productApi from '../../../Api/productApi'
import { faAngleLeft, faAngleRight, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Container, Row } from 'react-bootstrap';
import Slider from 'react-slick';
import React from 'react';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { Link} from 'react-router-dom';
import styles from './sliderProduct.module.scss';
import {getProducts , getProductVariants}from '../../../Redux/Slice/productSlice';
import classNames from 'classnames/bind';
import { useEffect, useState,useMemo,memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const cx = classNames.bind(styles);
// Custom Arrow
function SampleNextArrow(props) {
    const className = cx('arrow-next');
    const { onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
        </div>
    );
}

function SamplePrevArrow(props) {
    const className = cx('arrow-prev');
    const { onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
        </div>
    );
}
// Custom Arrow

function SliderProducts({ title, text = '',slShow=5,titleCenter=false,products=[]}) {
    // const dispatch = useDispatch();
    // const product = useSelector(state=>state.product.products)
    // const [products,setProducts]=useState([])
    // useEffect(()=>{
    //     const getAllProduct = async()=>{
    //         let kq = await productApi.getAllProduct()
    //         console.log("ketqua",kq)
    //         setProducts(kq)
    //     }
    //     getAllProduct()
    //     dispatch(getProducts())
    // },[])
    // const cards = useMemo(() => products.map((e, i) => (
    //     <Card product={e} key={e.id}></Card>
    //   )), [products]);
    // const cards = useMemo(() => products.map((e, i) => (
    //     <Card product={e} key={e.id}></Card>
    //   )), [products]);
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: slShow,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
    return (
        <Container fluid={true} style={{ margin: '50px 0px 130px 0px' }}>
            <Row style={{ paddingBottom: '40px' }}>
                <Col lg={6} md={6} style={{ textAlign: 'start' }}>
                    <h2 className={cx('title',{
                        'center':titleCenter
                    })}>{title}</h2>
                </Col>

                <Col lg={6} md={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                    <Link to="/shop" className={cx('text-icon')}>
                        {text && (
                          <>
                                {text}
                                <FontAwesomeIcon style={{ marginLeft: '20px' }} icon={faArrowRightLong}></FontAwesomeIcon>
                          </>
                        )}
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col lg={12} style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className={cx('slider-wrap')}>
                            <Slider {...settings}>
                                {
                                products.map((e, i) => {
                                    return (
                                    <Card product={e} key={i}></Card>
                                    );
                                })
                                // cards
                                }
                            </Slider>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default  SliderProducts;
