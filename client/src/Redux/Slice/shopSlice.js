import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productApi from '../../Api/productApi';
const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        items: [],
        max_price: 10000000,
        min_price: 1000000,
        colors: [],
        sizes: [],
        category: [],
        brand: [],
        selectSize: [],
        selectColor: [],
        sort: 'Default',
        isLoading: false,
    },
    reducers: {
        setSort(state, action) {
            state.sort = action.payload;
        },
        setPrice(state, action) {
            state.min_price = action.payload[0];
            state.max_price = action.payload[1];
        },
        setColor(state, action) {
            const kq = state.selectColor.includes(action.payload);
            if (!kq) {
                state.selectColor.push(action.payload);
            } else {
                state.selectColor = state.selectColor.filter((e) => e !== action.payload);
            }
        },
        setSize(state, action) {
            const kq = state.selectSize.includes(action.payload);
            if (!kq) {
                state.selectSize.push(action.payload);
            } else {
                state.selectSize = state.selectSize.filter((e) => e !== action.payload);
            }
        },
        resetPrice(state, action) {
            state.min_price = 1000000;
            state.max_price = 10000000;
        },
        clearAll(state, action) {
            state.max_price = 10000000;
            state.min_price = 1000000;
            state.selectColor = [];
            state.selectSize = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.sizes = action.payload.sizes;
                state.colors = action.payload.colors;
                state.brand = action.payload.brand;
                state.category = action.payload.category;
                state.isLoading = false;
            });
        builder
            .addCase(filterProducts.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(filterProducts.fulfilled, (state, action) => {
                state.items = action.payload;
                state.isLoading = false;
            });
    },
});
const getAllProducts = createAsyncThunk('shop/getAllProducts', async (data) => {
    const [colors, sizes, brand, category] = await Promise.all([
        productApi.getsizeProduct(),
        productApi.getColorProduct(),
        productApi.getBrandProducts(),
        productApi.getCategoryProducts(),
    ]);
    console.log(brand, category);
    return { sizes, colors, brand, category };
});

const filterProducts = createAsyncThunk('shop/sortProducts', async (data, { getState }) => {
    const { shop } = getState();
    const result = await productApi.filterProduct(shop);
    return result;
});
export { getAllProducts, filterProducts };
export default shopSlice;
