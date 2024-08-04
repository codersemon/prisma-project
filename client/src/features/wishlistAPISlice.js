// dependencies
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axios";

/**
 * CREATE WISHLIST ITEM ACTION HANDLER
 */
export const createWishlistItem = createAsyncThunk(
  "orders/createWishlistItem",
  async (data) => {
    try {
      const response = await API.post(`/api/v1/wishlist`, data);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

/**
 * GET WISHLIST ITEM BY USER ID ACTION HANDLER
 */
export const getAllWishlistItemByUserId = createAsyncThunk(
  "orders/getAllWishlistItemByUserId",
  async (id) => {
    try {
      const response = await API.get(`/api/v1/wishlist-by-user-id/${id}`);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

/**
 * DELETE WISHLIST ITEM BY ITEM ID ACTION HANDLER
 */
export const deleteWishlistItem = createAsyncThunk(
  "orders/deleteWishlistItem",
  async (id) => {
    try {
      const response = await API.delete(`/api/v1/wishlist/${id}`);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
