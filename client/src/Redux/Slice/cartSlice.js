import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Toast from '../../Components/Toastify/toastify';
// function getCartLocalStorage() {
//     return JSON.parse(localStorage.getItem('cart'));
// }
// function setCartLocalStorage(cart) {
//     localStorage.setItem('cart', JSON.stringify(cart));
// }

const initialState = { carts: [], total: 0,totalDiscount:0, isCoupoun: ""};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add(state, action) {
            console.log("action",action)
            let findProduct = state.carts.findIndex((e) => e.id === action.payload.id && e.size === action.payload.size && e.color === action.payload.color);
            if (findProduct !== -1) {
                action.payload.quantity > 1
                    ? (state.carts[findProduct].quantity += action.payload.quantity)
                    : (state.carts[findProduct].quantity += 1);
            } else {
                state.carts.push(action.payload);
            }
            state.total = state.carts.reduce((init, e) => {
                return (init +=( e.price_discount>0?e.price_discount:e.price) * e.quantity);
            }, 0);
            // setCartsLocalStorage(state);
        },
        remove(state, action) {
            if(action.payload==="reset"){
                state.carts.splice(0,state.carts.length);
                state.isCoupoun="";
                state.totalDiscount=0;
            }else{
                state.carts.splice(action.payload, 1);
            }
            state.total = state.carts.reduce((init, e) => {
                return (init +=( e.price_discount>0?e.price_discount:e.price) * e.quantity);
            }, 0);

            // setCartsLocalStorage(state);
        },
        update(state, action) {
            if (action.payload.type === 'increment') {
                state.carts.find((e) => (e.id === action.payload.id && e.color=== action.payload.color && e.size ===action.payload.size ? e.quantity++ : ''));
            } else {
                state.carts.find((e) => (e.id === action.payload.id && e.color=== action.payload.color && e.size ===action.payload.size ? e.quantity-- : ''));
            }
            state.total = state.carts.reduce((init, e) => {
                return (init +=( e.price_discount>0?e.price_discount:e.price) * e.quantity);
            }, 0);

            // setCartLocalStorage(state);
        },
        totalDiscount(state,action){
           if(state.isCoupoun){
            state.totalDiscount=state.total -( state.total * 0.1)
           }else{
            state.totalDiscount=0
           }
        },
        setCoupoun(state, action) {
            state.isCoupoun = action.payload;
            // setCartLocalStorage(state);
        },
       
    },
});
const addToCart = createAsyncThunk('cart/addToCart',(action,{dispatch})=>{
    // console.log("addtocart",action)
    dispatch(cartSlice.actions.add(action))
    Toast('success',"Add To Cart Success ")
})
export {addToCart}
export default cartSlice;
