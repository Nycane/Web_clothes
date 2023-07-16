import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productApi from '../../Api/productApi';
import orderApi from '../../Api/orderApi';
import Toast from '../../Components/Toastify/toastify';
const initialState = {
    order: [],
    orderByUser: [],
    orderDetailByUser: [],
    shipping: '',
    info: {},
    isSuccess: false,
    isLoading: true,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addOrder.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(addOrder.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(getOrderDetail.fulfilled, (state, action) => {
            console.log('get order detail action', action);
            state.order = action.payload?.data;
        });
        builder.addCase(getResultPayment.pending, (state, action) => {
            console.log('pending getresult payment');
            state.isLoading = true;
        });
        builder.addCase(getResultPayment.fulfilled, (state, action) => {
            console.log('fullfile getresultpayment');
            if (action?.payload.rspCode === '00') {
                state.isLoading = false;
                state.isSuccess = true;
            } else {
                state.isSuccess = false;
            }
        });
        builder.addCase(getOrderById.fulfilled, (state, action) => {
            state.orderByUser = action?.payload?.data;
        });
        builder.addCase(getOrderDetailById.fulfilled, (state, action) => {
            console.log('order detail ', action);
            state.orderDetailByUser = action?.payload?.data;
        });
    },
});

const addOrder = createAsyncThunk('order/add', async (data, { dispatch }) => {
    let kq = await productApi.addOdrer(data, dispatch);
    if (kq?.message === 'Payment Success') {
        Toast('success', 'Checkout Success');
    } else {
        Toast('error', 'Checkout Failed');
    }
    return kq;
});

const createPayment = createAsyncThunk('order/createPayment', async (data, { dispatch }) => {
    let kq = await orderApi.createPayment(data, dispatch);
    if (kq?.data) {
        window.location.href = kq.data;
    }
});
const getResultPayment = createAsyncThunk('order/getPayment', async (data, { dispatch }) => {
    console.log('Data ở createAsyncTHunk', data);
    let kq = await orderApi.getResultPayment(data, dispatch);
    // console.log(kq);
    if (kq?.rspCode === '00') {
        Toast('success', 'Checkout Success');
    } else {
        Toast('error', 'Checkout Failed');
    }
    return kq;
});
const getOrderById = createAsyncThunk('order/getOrderById', async (data, { dispatch }) => {
    let kq = await orderApi.getOrderById(data, dispatch);
    return kq;
});
const getOrderDetailById = createAsyncThunk('order/getOrderDetailById', async (data, { dispatch }) => {
    let kq = await orderApi.getOrderDetailById(data, dispatch);
    return kq;
});
const getOrderDetail = createAsyncThunk('order/getOrderDetail', async (data, { dispatch }) => {
    let kq = await productApi.getOrderDetail(data, dispatch);
    return kq;
});
export { addOrder, createPayment, getResultPayment, getOrderDetail, getOrderById, getOrderDetailById };
export default orderSlice;
