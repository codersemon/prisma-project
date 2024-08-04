// dependencies
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import cartReducer from "../features/cartSlice";
import mediaReducer from "../features/mediaSlice";
import orderReducer from "../features/orderSlice";
import productReviewsReducer from "../features/productReviewSlice";
import productReducer from "../features/productSlice";
import wishlistReducer from "../features/wishlistSlice";

// configure store with auth slice
const store = configureStore({
  reducer: {
    auth: authReducer,
    media: mediaReducer,
    products: productReducer,
    productReviews: productReviewsReducer,
    cart: cartReducer,
    orders: orderReducer,
    wishlist: wishlistReducer,
  },
});

// export store
export default store;
