// dependencies
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axios";

/**
 * CREATE ORDER ACTION HANDLER
 */
export const addProductReview = createAsyncThunk(
    "orders/addProductReview",
    async (data) => {
      try {
        const response = await API.post(`/api/v1/product-reviews`, data);
  
        return response.data;
      } catch (error) {
        throw new Error(error.response.data.message);
      }
    }
  );