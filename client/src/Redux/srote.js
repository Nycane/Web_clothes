import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import modalSlice from './modalSlice';
import cartSlice from './Slice/cartSlice';
import userSlice from './Slice/userSlice';
import wishlistSlice from './Slice/wishlistSLice'
import shopSlice from './Slice/shopSlice'
import orderSlice from './Slice/orderSlice';
import productSlice from './Slice/productSlice';
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist:['cart','user','wishlist']
};
const rootReducer = combineReducers({
    cart: cartSlice.reducer,
    user: userSlice.reducer,
    wishlist:wishlistSlice.reducer,
    shop:shopSlice.reducer,
    order:orderSlice.reducer,
    product:productSlice.reducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    // modal: modalSlice.reducer,
});
let persistor = persistStore(store);
export { store, persistor };
