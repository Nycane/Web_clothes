import axiosClient from './axiosClient';
import createAxiosAuth from './axiosAuth';
const productApi = {
    async getAllProduct() {
        try {
            const url = '/products';
            const kq = await axiosClient.get(url);
            return kq;
        } catch (error) {
            console.log(error);
        }
    },
    async getColorProduct() {
        try {
            const url = 'product/color';
            const color = await axiosClient.get(url);
            return color;
        } catch (error) {
            console.log(error);
        }
    },
    async getsizeProduct() {
        try {
            const url = 'product/size';
            const size = await axiosClient.get(url);
            return size;
        } catch (error) {
            console.log(error);
        }
    },
    async filterProduct(query) {
        console.log(query);
        let url = `product/filter`;
        try {
            if (query.sort) {
                url += `?sort=${query.sort}`;
            }
            if (query.min_price || query.max_price) {
                url +=`&min_price=${query.min_price}&max_price=${query.max_price}`;
            }
            if(query.selectColor.length>0){
                url +=`&color=${query.selectColor.join(',')}`
            }
            if(query.selectSize.length>0){
                url +=`&size=${query.selectSize.join(',')}`

            }
            const kq = await axiosClient.get(url);
            return kq;
        } catch (error) {
          return error
        }
    },
    async getProductById(id) {
        try {
            const url = `product/${id}`;
            const kq = await axiosClient.get(url);
            return kq;
        } catch (error) {
            console.log(error);
        }
    },
    async getProductImageById(id) {
        try {
            const url = `product/image/${id}`;
            const kq = await axiosClient.get(url);
            return kq;
        } catch (error) {
            console.log(error);
        }
    },
    async getProductVariantById(id) {
        try {
            const url = `product/variant/${id}`;
            const kq = await axiosClient.get(url);
            return kq;
        } catch (error) {
            return error
        }
    },
    async searchProduct(keyword) {
        try {
            const url = '/product/search/?q=' + keyword;
            const kq = await axiosClient.get(url);
            return kq;
        } catch (error) {
            console.log(error);
        }
    },
    async deleteProductById(id) {
        try {
            const url = '/products';
            const kq = await axiosClient.delete(url, { id });
            return kq;
        } catch (error) {
            console.log(error);
        }
    },
    async updateProductById(id) {
        try {
            const url = '/products';
            const kq = await axiosClient.get(url, { id });
            return kq;
        } catch (error) {
            console.log(error);
        }
    },
    async getBrandProducts(){
        try {
            const url = '/product/brand';
            const kq = await axiosClient.get(url);
            return kq;
        } catch (error) {
            console.log(error);
        }
    },
    async getCategoryProducts(){
        try {
            const url = '/product/category';
            const kq = await axiosClient.get(url);
            return kq;
        } catch (error) {
            console.log(error);
        }
    },
    async addOdrer(data,dispatch){
        try {
         const axiosAuth = createAxiosAuth(data,dispatch)
            const url = '/order/add';
            const kq = await axiosAuth.post(url,JSON.stringify(data));
            return kq;
        } catch (error) {
            return error
        }
    },
    async getOrderDetail(data,dispatch){
        try {
         const axiosAuth = createAxiosAuth(data,dispatch)
            const url = '/order/detail';
            const kq = await axiosAuth.get(url);
            return kq;
        } catch (error) {
            console.log(error);
        }
    }
   
};
export default productApi;
