// dependencies
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/authSlice";
import mediaReducer from "../feature/mediaSlice";
import orderReducer from "../feature/orderSlice";
import productReviewsReducer from "../feature/productReviewSlice";
import productReducer from "../feature/productSlice";
import usersReducer from "../feature/userSlice";

// configure store
const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productReducer,
    productReviews: productReviewsReducer,
    auth: authReducer,
    media: mediaReducer,
    orders: orderReducer,
  },
});

// export store
export default store;
