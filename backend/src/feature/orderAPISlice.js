// dependencies
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axios";

/**
 * GET ALL ORDERS ACTION HANDLER
 */
export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async () => {
    try {
      const response = await API.get(`/api/v1/orders`);

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

/**
 * UPDATE SINGLE ORDER By ORDER Id ACTION HANDLER
 */
export const updateSingleOrderById = createAsyncThunk(
  "orders/updateSingleOrderById",
  async (data) => {
    const { id, ...editableData } = data;
    try {
      const response = await API.patch(`/api/v1/order/${id}`, editableData);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

/**
 * DELETE SINGLE ORDER By ORDER Id ACTION HANDLER
 */
export const deleteSingleOrderById = createAsyncThunk(
  "orders/deleteSingleOrderById",
  async (id) => {
    try {
      const response = await API.delete(`/api/v1/order/${id}`);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
