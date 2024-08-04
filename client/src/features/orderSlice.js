// dependencies
import { createSlice } from "@reduxjs/toolkit";
import {
  createNewOrder,
  getAllOrdersByUserId,
  getSingleOrderById,
} from "./orderAPISlice";

const initialState = {
  orders: [],
  newOrder: null,
  singleOrder: null,
  isLoading: false,
  error: null,
  message: null,
  status: null,
};
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrdersStateMessageEmpty: (state) => {
      state.error = null;
      state.message = null;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET ALL ORDERS BY USER ID
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.data.sort((a, b) => b.id - a.id);
      })
      // CREATE NEW ORDER
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.status = action.payload.status;
        state.orders.unshift(action.payload.data);
        state.newOrder = action.payload.data;
      })
      // GET ALL ORDERS BY USER ID
      .addCase(getSingleOrderById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleOrderById.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getSingleOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleOrder = action.payload.data;
      });
  },
});

// export order selector
export const orderSelect = (state) => state.orders;

// export reducer actions
export const { setOrdersStateMessageEmpty } = orderSlice.actions;

// export reducer
export default orderSlice.reducer;
