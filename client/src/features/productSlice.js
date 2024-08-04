// dependencies
import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProductCategory,
  getHomepageLatestProducts,
  getShopPageProducts,
  getSingleProduct,
} from "./productAPISlice";

// initial state
const initialState = {
  homeLatestProducts: null,
  shopProducts: null,
  singleProduct: null,
  categories: [],
  isLoading: false,
  error: null,
  message: null,
};

// create slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addReviewToSingleProductReduxState: (state, action) => {
      state.singleProduct.reviews.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // homepage latest products fetch
      .addCase(getHomepageLatestProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHomepageLatestProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getHomepageLatestProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.homeLatestProducts = action.payload.data;
      })
      // GET SINGLE PRODUCT
      .addCase(getSingleProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.singleProduct = action.payload.data;
      })
      // shop page product fetch
      .addCase(getShopPageProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShopPageProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getShopPageProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.shopProducts = action.payload.data;
      })
      // GET ALL CATEGORY
      .addCase(getAllProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getAllProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.categories = action.payload.data;
      });
  },
});

// export product state selector
export const productsSelect = (state) => state.products;

// export actions
export const { addReviewToSingleProductReduxState } = productSlice.actions;

// export reducer
export default productSlice.reducer;
