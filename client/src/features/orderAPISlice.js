// dependencies
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axios";

/**
 * GET ALL ORDERs By User Id ACTION HANDLER
 */
export const getAllOrdersByUserId = createAsyncThunk(
  "orders/getAllOrdersByUserId",
  async (id) => {
    try {
      const response = await API.get(`/api/v1/orders-by-user/${id}`);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

/**
 * CREATE ORDER ACTION HANDLER
 */
export const createNewOrder = createAsyncThunk(
  "orders/createNewOrder",
  async (data) => {
    try {
      const response = await API.post(`/api/v1/orders`, data);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

/**
 * GET SINGLE ORDER By ORDER Id ACTION HANDLER
 */
export const getSingleOrderById = createAsyncThunk(
  "orders/getSingleOrderById",
  async (id) => {
    try {
      const response = await API.get(`/api/v1/order/${id}`);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
