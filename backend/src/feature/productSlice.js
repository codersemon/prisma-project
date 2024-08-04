import { createSlice } from "@reduxjs/toolkit";
import {
  createNewProduct,
  createProductCategory,
  deleteProduct,
  deleteSingleProductCategory,
  getAllProductCategory,
  getAllProducts,
  getSingleProduct,
  getSingleProductCategory,
  updateSingleProduct,
  updateSingleProductCategory,
} from "./productAPISlice";

const initialState = {
  products: [],
  singleProduct: null,
  productThumbnail: null,
  categories: [],
  singleProductCategory: null,
  isLoading: false,
  error: null,
  message: null,
  status: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductsStateMessageEmpty: (state) => {
      state.error = null;
      state.message = null;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ADD NEW PRODUCT
      .addCase(createNewProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.status = action.payload.status;
        state.products.unshift(action.payload.data);
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
      // UPDATE SINGLE PRODUCT
      .addCase(updateSingleProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSingleProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateSingleProduct.fulfilled, (state, action) => {
        const { data, message, status } = action.payload;
        state.isLoading = false;
        state.message = message;
        state.status = status;
        state.products = state.products.map((product) =>
          product.id === data.id ? { ...data } : product
        );
      })
      // DELETE PRODUCT
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.status = action.payload.status;

        // remove deleted product from the state
        state.products = state.products.filter(
          (product) => product.id !== action.payload.data.id
        );
      })
      // GET ALL PRODUCTS
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.products = action.payload.data.sort((a, b) => b.id - a.id); // sort by id in decending value
      })
      // CREATE PRODUCT CATEGORY
      .addCase(createProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.status = action.payload.status;
        state.categories.unshift(action.payload.data);
      })
      // GET ALL PRODUCT CATEGORY
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
        state.categories = action.payload.data.sort((a, b) => b.id - a.id);
      })
      // DELETE SINGLE CATEGORY
      .addCase(deleteSingleProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSingleProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteSingleProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.status = action.payload.status;
        state.categories = state.categories.filter(
          (category) => category.id !== action.payload.data.id
        );
      })
      // GET SINGLE CATEGORY
      .addCase(getSingleProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getSingleProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleProductCategory = action.payload.data;
      })
      // Update SINGLE CATEGORY
      .addCase(updateSingleProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSingleProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateSingleProductCategory.fulfilled, (state, action) => {
        const { data, message, status } = action.payload;
        state.isLoading = false;
        state.message = message;
        state.status = status;
        state.singleProductCategory = data;
        state.categories = state.categories.map((category) =>
          category.id === data.id ? { ...data } : category
        );
      });
  },
});

// export selector
export const productSelect = (state) => state.products;

// export actions
export const { setProductsStateMessageEmpty } = productSlice.actions;

// export reducer
export default productSlice.reducer;
