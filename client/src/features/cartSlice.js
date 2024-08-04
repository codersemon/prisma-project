import { createSlice } from "@reduxjs/toolkit";
import {
  addItemToCart,
  getAllCartItems,
  removeItemFromCart,
  updateItemInCart,
} from "./cartAPISlice";

const initialState = {
  products: [],
  lastProductIdInCart: null,
  isLoading: false,
  error: null,
  message: null,
  status: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setStateEmpty: (state) => {
      state.message = null;
      state.error = null;
      state.status = null;
    },
    setCartProductsEmpty: (state) => {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // GET ALL CART ITEMS FOR CURRENT USER
      .addCase(getAllCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getAllCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.products = action.payload.data;
      })
      // REMOVE CART ITEM
      .addCase(removeItemFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.status = action.payload.status;
        // remove the item which is deleted from cart db table
        state.products = state.products.filter(
          (item) => item.id !== action.payload.data.id
        );
      })
      // ADD ITEM TO CART
      .addCase(addItemToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.status = action.payload.status;
        state.lastProductIdInCart = action.payload.data.productId
        // check the item is already exist in state
        const isItemExistInState = state.products.find(
          (item) => item.id === action.payload.data.id
        );
        // if exist, update quantity
        if (isItemExistInState) {
          isItemExistInState.quantity = action.payload.data.quantity;
        } else {
          // if not exist, push new item
          state.products.push(action.payload.data);
        }
      })
      // UPDATE ITEM IN CART
      .addCase(updateItemInCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateItemInCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateItemInCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.status = action.payload.status;
        // check the item is already exist in state
        const isItemExistInState = state.products.find(
          (item) => item.id === action.payload.data.id
        );
        // if exist, update quantity
        if (isItemExistInState) {
          isItemExistInState.quantity = action.payload.data.quantity;
        } else {
          // if not exist, push new item
          state.products.push(action.payload.data);
        }
      });
  },
});

// export selector
export const cartSelect = (state) => state.cart;

// export actions
export const { setStateEmpty, setCartProductsEmpty } = cartSlice.actions;

// export reducer
export default cartSlice.reducer;
