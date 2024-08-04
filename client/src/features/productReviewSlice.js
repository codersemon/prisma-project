// dependencies
import { createSlice } from "@reduxjs/toolkit";
import { addProductReview } from "./productReviewAPISlice";

// initial state
const initialState = {
  reviews: [],
  lastGivenReview: null,
  isLoading: false,
  error: null,
  message: null,
  status: null,
};

// create product review slice
const productReviewSlice = createSlice({
  name: "productReviews",
  initialState,
  reducers: {
    setProductReviewsStateMessageErrorStatusEmpty: (state) => {
      state.error = null;
      state.message = null;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProductReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addProductReview.fulfilled, (state, action) => {
        const { data, status, message } = action.payload;
        state.isLoading = false;
        state.message = message;
        state.status = status;
        state.reviews.unshift(data);
        state.lastGivenReview = data;
      });
  },
});

// export selector
export const productReviewsSelect = (state) => state.productReviews;

// export actions
export const { setProductReviewsStateMessageErrorStatusEmpty } =
  productReviewSlice.actions;

// export reducer
export default productReviewSlice.reducer;
