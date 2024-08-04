// dependencies
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axios";

/**
 * GET ALL PRODUCT REVIEWs ACTION HANDLER
 */
export const getAllProductReviews = createAsyncThunk(
  "orders/getAllProductReviews",
  async () => {
    try {
      const response = await API.get(`/api/v1/product-reviews`);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

/**
 * DELETE SINGLE PRODUCT REVIEW ACTION HANDLER
 */
export const deleteSingleProductReview = createAsyncThunk(
  "orders/deleteSingleProductReview",
  async (id) => {
    try {
      const response = await API.delete(`/api/v1/product-review/${id}`);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

/**
 * EDIT SINGLE PRODUCT REVIEW ACTION HANDLER
 */
export const editSingleProductReview = createAsyncThunk(
  "orders/editSingleProductReview",
  async (data) => {
    const { id, ...reviewData } = data;
    try {
      const response = await API.patch(
        `/api/v1/product-review/${id}`,
        reviewData
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
