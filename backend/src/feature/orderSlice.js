// dependencies
import { createSlice } from "@reduxjs/toolkit";
import {
  deleteSingleOrderById,
  getAllOrders,
  getSingleOrderById,
  updateSingleOrderById,
} from "./orderAPISlice";

const initialState = {
  orders: [],
  singleOrder: null,
  isLoading: false,
  error: null,
  message: null,
  status: null,
};
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all orders
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.orders = action.payload.data.sort((a, b) => b.id - a.id);
      })
      // GET SINGLE ORDERS BY ORDER ID
      .addCase(getSingleOrderById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleOrderById.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getSingleOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleOrder = action.payload.data;
      })
      // UPDATE SINGLE ORDER BY ORDER ID
      .addCase(updateSingleOrderById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSingleOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateSingleOrderById.fulfilled, (state, action) => {
        const { message, status, data } = action.payload;
        state.isLoading = false;
        state.status = status;
        state.message = message;
        state.orders = state.orders.map((order) =>
          order.id === data.id ? data : order
        );
        state.singleOrder = data;
      })
      // DELETE SINGLE ORDER BY ORDER ID
      .addCase(deleteSingleOrderById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSingleOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteSingleOrderById.fulfilled, (state, action) => {
        const { message, status, data } = action.payload;
        state.isLoading = false;
        state.status = status;
        state.message = message;
        state.orders = state.orders.filter((order) => order.id !== data.id);
      });
  },
});

// export order selector
export const orderSelect = (state) => state.orders;

// export reducer actions

// export reducer
export default orderSlice.reducer;
