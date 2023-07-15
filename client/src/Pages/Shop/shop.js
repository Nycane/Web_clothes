/* eslint-disable react-hooks/exhaustive-deps */
import Card from '../../Components/Products/Card';
// import productApi from '../../Api/productApi';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ReactSlider from 'react-slider';
import 'tippy.js/animations/scale.css';
import 'tippy.js/dist/tippy.css';
import debounce from '../../Components/Hook/debounce';
import Loading from '../../Components/Loading/loading';
import shopSlice, { filterProducts, getAllProducts } from '../../Redux/Slice/shopSlice';
import formatPrice from '../../Utils/formatPrice';
import styles from './shop.module.scss';
import Tippy from '@tippyjs/react';
import Skeleton from 'react-loading-skeleton';
const cx = classNames.bind(styles);
let max_price_df = 10000000;
let min_price_df = 1000000;
function Shop() {
    const dispatch = useDispatch();
    const [layout, setLayout] = useState(4);
    const [value, setValue] = useState([1000000, 10000000]);
    const listProduct = useSelector((state) => state.shop.items);
    const isLoading = useSelector((state) => state.shop.isLoading);
    const sort = useSelector((state) => state.shop.sort);
    const brand = useSelector((state) => state.shop.brand);
    const category = useSelector((state) => state.shop.category);
    const listColors = useSelector((state) => state.shop.colors);
    const listSizes = useSelector((state) => state.shop.sizes);
    // Delay thời gian lấy gía và gửi lên sever
    const focusColor = debounce(
        300,
        useSelector((state) => state.shop.selectColor),
    );

    const focusSize = debounce(
        300,
        useSelector((state) => state.shop.selectSize),
    );

    const min_price = debounce(
        300,
        useSelector((state) => state.shop.min_price),
    );
    // --------------------------------------
    const max_price = debounce(
        300,
        useSelector((state) => state.shop.max_price),
    );
        // Lọc sản phẩm theo giá
    const handleChangePrice = (newValue) => {
        setValue(newValue);
        dispatch(shopSlice.actions.setPrice(newValue));
    };
    // Lọc theo size
    function handleSelectSize(name) {
        dispatch(shopSlice.actions.setSize(name));
    }
    // Lọc theo màu
    function handleSelectColor(name) {
        dispatch(shopSlice.actions.setColor(name));
    }
    // Sắp xếp sản phẩm theo giá
    function handleSort(value) {
        dispatch(shopSlice.actions.setSort(value));
    }
    // Xóa tất cả bộ lọc
    function handleClearAll() {
        setValue([1000000, 10000000]);
        dispatch(shopSlice.actions.clearAll());
    }
    // Xóa lọc theo giá
    function handleResetPrice() {
        dispatch(shopSlice.actions.resetPrice());
        setValue([1000000, 10000000]);
    }
// Lấy sản phẩm theo bộ lọc
    useEffect(() => {
        dispatch(getAllProducts());
    }, []);
    useEffect(() => {
        dispatch(filterProducts());
    }, [sort, min_price, max_price, focusColor, focusSize]);
    return (
        <Container fluid >
            <Row>
                <Col lg={4} md={4}>
                    <div className={cx('navbar-left')}>
                        <div className={cx('category')}>
                            <h2 className={cx('title-category')}>categories</h2>
                            {category.map((e) => {
                                return (
                                    <div key={e.id} className={cx('item-category')}>
                                        <span className={cx('name')}>{e.name}</span>
                                        <span className={cx('count')}>({e.countproduct})</span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className={cx('filter-price')}>
                            <h3 className={cx('title-price')}>Price</h3>
                            <ReactSlider
                                className={cx('slider')}
                                value={value}
                                onChange={handleChangePrice}
                                min={min_price_df}
                                max={max_price_df}
                            ></ReactSlider>
                            <span className={cx('show-price')}>
                                Range :{' '}
                                <span className={cx('price')}>
                                    {formatPrice.format(value[0])} - {formatPrice.format(value[1])}
                                </span>
                            </span>
                        </div>
                        <div className={cx('filter-color')}>
                            <h3 className={cx('color-title')}>COLOR</h3>
                            <ul className={cx('list-color')}>
                                {listColors.map((e, i) => {
                                    return (
                                        <Tippy key={i} animation="scale" content={e.name}>
                                            <li
                                                onClick={() => handleSelectColor(e.name)}
                                                className={cx('color', {
                                                    'active-focus': focusColor.includes(e.name),
                                                })}
                                            >
                                                <div
                                                    className={cx('random-color')}
                                                    style={{ backgroundColor: e.code }}
                                                ></div>
                                            </li>
                                        </Tippy>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className={cx('filter-size')}>
                            <h3 className={cx('size-title')}>SIZE</h3>
                            <ul className={cx('list-size')}>
                                {listSizes.map((e, i) => {
                                    return (
                                        <Tippy animation="scale" placement="top" key={i} content={e.name}>
                                            <li
                                                className={cx('size', {
                                                    'active-focus': focusSize.includes(e.name),
                                                })}
                                                onClick={() => handleSelectSize(e.name)}
                                            >
                                                <span>{e.name}</span>
                                            </li>
                                        </Tippy>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className={cx('filter-brand')}>
                            <h3 className={cx('title-brand')}>BRANDS</h3>
                            {brand.map((e) => {
                                return (
                                    <div key={e.id} className={cx('list-brand')}>
                                        <div className={cx('item-brand')}>
                                            <span className={cx('name')}>{e.name}</span>
                                            <span className={cx('count')}> ({e.countproduct})</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Col>
                <Col lg={8} md={8}>
                    <div className={cx('top-bar')}>
                        <div className={cx('filter-dropdown')}>
                            <select onChange={(e) => handleSort(e.target.value)} className={cx('select')}>
                                <option value="Default">Default sorting</option>
                                <option value="Asc">Sort by price: low to high</option>
                                <option value="Desc">Sort by price: high to low</option>
                            </select>
                        </div>
                        {/* <div> {(min_price !== 1000000 || max_price !== 10000000) && <span> Clear ALL</span>}</div> */}
                        <div className={cx('list-layout')}>
                            <div
                                onClick={() => setLayout(6)}
                                className={cx('layout-item', {
                                    active: layout === 6,
                                })}
                            >
                                <span className={cx('item')}></span>
                                <span className={cx('item')}></span>
                            </div>
                            <div
                                onClick={() => setLayout(4)}
                                className={cx('layout-item', {
                                    active: layout === 4,
                                })}
                            >
                                <span className={cx('item')}></span>
                                <span className={cx('item')}></span>
                                <span className={cx('item')}></span>
                            </div>
                            <div
                                onClick={() => setLayout(3)}
                                className={cx('layout-item', {
                                    active: layout === 3,
                                })}
                            >
                                <span className={cx('item')}></span>
                                <span className={cx('item')}></span>
                                <span className={cx('item')}></span>
                                <span className={cx('item')}></span>
                            </div>
                        </div>
                    </div>
                    <Row>
                        <Col lg={12} md={12}>
                            <div className={cx('list-select')}>
                                {(min_price !== 1000000 || max_price !== 10000000) && (
                                    <span onClick={() => handleResetPrice()} className={cx('item-select')}>
                                        {formatPrice.format(min_price)} - {formatPrice.format(max_price)} x
                                    </span>
                                )}
                                {focusColor.length > 0 &&
                                    focusColor.map((e, i) => {
                                        return (
                                            <span
                                                key={i}
                                                onClick={() => handleSelectColor(e)}
                                                className={cx('item-select')}
                                            >
                                                {e} x
                                            </span>
                                        );
                                    })}
                                {focusSize.length > 0 &&
                                    focusSize.map((e, i) => {
                                        return (
                                            <span
                                                key={i}
                                                onClick={() => handleSelectSize(e)}
                                                className={cx('item-select')}
                                            >
                                                {e} x
                                            </span>
                                        );
                                    })}
                                {(min_price !== 1000000 ||
                                    max_price !== 10000000 ||
                                    focusColor.length > 0 ||
                                    focusSize.length > 0) && (
                                    <div onClick={() => handleClearAll()} className={cx('clear-all')}>
                                        Clear All
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                           { listProduct?.map((e, i) => {
                                return (
                                    <Col key={i} lg={layout} md={6} sm={6} xs={6}>
                                        <Card product={e}></Card>
                                    </Col>
                                );
                            })
                       }
                        {listProduct.length === 0 && (
                           isLoading? "Loading ....": <h1 style={{ textAlign: 'center', color: '#666' }}>No Products</h1>
                        )}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Shop;
