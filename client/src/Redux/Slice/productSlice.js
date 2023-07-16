import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "../../Api/productApi";

const productSlice = createSlice({
    name:"product",
    initialState:{
        products:[],
        productDetail:{},
        isLoading:false
    },
    reducer:{

    },
    extraReducers:builder=>{
        builder.addCase(getProductVariants.pending,(state,action)=>{
            state.isLoading=true;
        })
            builder.addCase(getProductVariants.fulfilled,(state,action)=>{
                // console.log("product detail",action)
                state.productDetail=action.payload
                state.isLoading=false
            })
            builder.addCase(getProducts.pending,(state,action)=>{
                state.isLoading=true
            })
            builder.addCase(getProducts.fulfilled,(state,action)=>{
                console.log("getproducts",action)
                state.products=action.payload
                state.isLoading=false

            })

    }
})

const getProductVariants  = createAsyncThunk('product/getProductVariants',async(payload)=>{
            let kq = await productApi.getProductVariantById(payload)
            return kq
})
const getProducts = createAsyncThunk('product/getProducts',async()=>{
    let kq = await productApi.getAllProduct()
    return kq
})
export { getProductVariants, getProducts };
export default productSlice