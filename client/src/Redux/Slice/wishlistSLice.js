import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Toast from '../../Components/Toastify';
const initialState = { wishlists: [] };

const wishlistSlice = createSlice({
    name: 'wishlish',
    initialState,
    reducers: {
        add(state, action) {
            let findProduct = state.wishlists.findIndex((e) => e.id === action.payload.id);
            if (findProduct === -1) {
                const date = new Date();
                const currentDate =`${date.toLocaleString('en-US', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
                const wishlist = Object.assign({currentDate},action.payload);
                state.wishlists.push(wishlist);
            }
        },
        remove(state, action) {
            state.wishlists.splice(action.payload, 1);
        },
    },
});
const addWishList = createAsyncThunk('wishlist/add',(payload,{dispatch})=>{
            dispatch(wishlistSlice.actions.add(payload))
            Toast("success",'Add Wishlist Success')

})
export {addWishList}
export default wishlistSlice;
