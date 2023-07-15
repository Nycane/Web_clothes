import axiosClient from './axiosClient';
import createAxiosAuth from './axiosAuth';
const orderAPi = {
    async addOdrer(data, dispatch) {
        console.log(data);
        try {
            const axiosAuth = createAxiosAuth(data, dispatch);
            const url = '/order/add';
            const kq = await axiosAuth.post(url, JSON.stringify(data));
            return kq;
        } catch (error) {
            console.log(error);
        }
    },
    async getOrderDetail(data, dispatch) {
        console.log(data);
        try {
            const axiosAuth = createAxiosAuth(data, dispatch);
            const url = '/order/detail';
            const kq = await axiosAuth.get(url);
            return kq;
        } catch (error) {
            console.log(error);
        }
    },
    async createPayment(data,dispatch){
        try {
            const axiosAuth = createAxiosAuth(data, dispatch);
            const url = '/order/create_payment';
            const kq = await axiosAuth.post(url,data);
            return kq;
        } catch (error) {
            console.log(error);
        }
    },
    async getResultPayment(data,dispatch){
        try {
            const axiosAuth = createAxiosAuth(data, dispatch);
            const url = `/order/vnpay_ipn${data.search}`;
            const kq = await axiosAuth.get(url);
            return kq;
        } catch (error) {
            return error
        }
    },
    async getOrderById(data,dispatch){
        try {
            const axiosAuth = createAxiosAuth(data, dispatch);
            const url = `/order/${data.userId}`;
            const kq = await axiosAuth.get(url);
            return kq;
        } catch (error) {
            console.log(error);
        }
    },
    async getOrderDetailById(data,dispatch){
        try {
         const axiosAuth = createAxiosAuth(data,dispatch)
            const url = `/order/detail/${data.orderId}`;
            const kq = await axiosAuth.get(url);
            return kq;
        } catch (error) {
            console.log(error);
        }
    }

};
export default orderAPi;