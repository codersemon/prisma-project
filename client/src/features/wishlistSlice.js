// dependencies
import { createSlice } from "@reduxjs/toolkit";
import {
  createWishlistItem,
  deleteWishlistItem,
  getAllWishlistItemByUserId,
} from "./wishlistAPISlice";

// define initial state
const initialState = {
  wishlist: [],
  isLoading: false,
  message: null,
  error: null,
  status: null,
};

// create slice
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlistStateMessageErrorStatusEmpty: (state) => {
      state.message = null;
      state.error = null;
      state.status = null;
    },
    removeWishlistItemByIdFromReduxState: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.productId !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // ADD WISHLIST ITEM
      .addCase(createWishlistItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createWishlistItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createWishlistItem.fulfilled, (state, action) => {
        const { data, message, status } = action.payload;
        state.isLoading = false;
        state.message = message;
        state.status = status;
        state.wishlist.unshift(data);
      })
      // GET WISHLIST ITEMs BY USER ID
      .addCase(getAllWishlistItemByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllWishlistItemByUserId.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllWishlistItemByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishlist = action.payload.data;
      })
      // DELETE WISHLIST ITEM BY ID
      .addCase(deleteWishlistItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteWishlistItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteWishlistItem.fulfilled, (state, action) => {
        const { data, message, status } = action.payload;
        state.isLoading = false;
        state.status = status;
        state.message = message;
        state.wishlist = state.wishlist.filter((item) => item.id !== data.id);
      });
  },
});

// export selector
export const wishlistSelect = (state) => state.wishlist;

// export actions
export const {
  setWishlistStateMessageErrorStatusEmpty,
  removeWishlistItemByIdFromReduxState,
} = wishlistSlice.actions;

// export wishlist reducer
export default wishlistSlice.reducer;
