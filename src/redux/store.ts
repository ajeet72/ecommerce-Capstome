import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import wishlistReducer from "./wishlist/wishlistSlice";
import productReducer from "./products/productSlice";

export const store = configureStore({
  reducer:{

        cart:cartReducer,

        wishlist:wishlistReducer,

        products:productReducer

    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;