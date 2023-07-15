import productApi from '../../../../../Api/productApi';
import Card from '../../../../../Components/Products/Card';
import Debounce from '../../../../../Components/Hook/debounce';
import { Container, Row, Col } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useState } from 'react';
const cx = classNames.bind(styles);
function Search() {
    const [search, setSearch] = useState('');
    const [productSearch, setProductSearch] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(true);
    let searchDebounce = Debounce(500, search);
    // Làm chậm thời gian gửi kết quả lên api
    useEffect(() => {
        if (!searchDebounce.trim()) {
            setProductSearch([]);
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        async function searchProduct() {
            let result = await productApi.searchProduct(searchDebounce);
            setProductSearch(result);
            setIsLoading(false);
        }
        searchProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchDebounce]);
    // Lấy giá trị tìm kiếm
    function handleSearch(keyword) {
        if (keyword.startsWith(' ')) {
            setVisible(true);
            return;
        } else {
            setSearch(keyword);
            setIsLoading(true);
            setVisible(false);
        }
    }
    // Xóa giá trị tìm kiếm
    function handleClose() {
        setSearch('');
        setIsLoading(false);
        setProductSearch([]);
    }
    return (
        <Container fluid>
            <Row>
                <Col lg={12} md={12}>
                    <div className={cx('search-wrap')}>
                        <h2 className={cx('search-title')}>What are you looking for?</h2>
                        <div className={cx('form-search')}>
                            <input
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="Search..."
                                className={cx('search-input')}
                            ></input>
                            {!isLoading && (
                                <FontAwesomeIcon onClick={handleClose} className={cx('close-icon')} icon={faClose} />
                            )}
                            {isLoading && search.length > 0 && !visible && (
                                <FontAwesomeIcon className={cx('loading-icon')} icon={faSpinner} />
                            )}
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className={cx('result-search-wrap')}>
                {/* <div className={cx('result-search-wrap')}> */}
                {productSearch.map((e, i) => {
                    return (
                        <Col key={i} lg={3} md={3}>
                            <Card options={false} product={e}></Card>
                        </Col>
                    );
                })}
                <Col lg={12} md={12}>
                    {!isLoading && search.length > 0 && productSearch.length === 0 && (
                        <h1 className={cx('no-result')}>No Result</h1>
                    )}
                </Col>

                {/* </div> */}
            </Row>
        </Container>
    );
}

export default Search;
