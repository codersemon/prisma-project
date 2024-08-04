// dependencies
import { createSlice } from "@reduxjs/toolkit";
import {
  deleteSingleProductReview,
  editSingleProductReview,
  getAllProductReviews,
} from "./productReviewAPISlice";

// initial state
const initialState = {
  reviews: [],
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
      // GET ALL PRODUCT REVIEWS
      .addCase(getAllProductReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProductReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getAllProductReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data.sort((a, b) => b.id - a.id);
      })
      // DELETE SINGLE PRODUCT REVIEW
      .addCase(deleteSingleProductReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSingleProductReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteSingleProductReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.status = action.payload.status;
        state.reviews = state.reviews.filter(
          (review) => review.id !== action.payload.data.id
        );
      })
      // EDIT SINGLE PRODUCT REVIEW
      .addCase(editSingleProductReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editSingleProductReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(editSingleProductReview.fulfilled, (state, action) => {
        const { message, status, data } = action.payload;
        state.isLoading = false;
        state.message = message;
        state.status = status;
        state.reviews = state.reviews.map((review) =>
          review.id === data.id ? data : review
        );
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
