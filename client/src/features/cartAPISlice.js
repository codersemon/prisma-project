// dependencies
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axios";

/**
 * @description - GET ALL CART ITEMS ACTION
 */
export const getAllCartItems = createAsyncThunk(
  "cart/getAllCartItems",
  async () => {
    try {
      const response = await API.get("/api/v1/cart");

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

/**
 * @description - REMOVE CART ITEM FORM DB ACTION
 * @params - cart item id
 */
export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async (id) => {
    try {
      const response = await API.delete(`/api/v1/cart/${id}`);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

/**
 * @description - ADD CART ITEM TO DB ACTION
 * @params - product id & quantity
 */
export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (data) => {
    try {
      const response = await API.post("/api/v1/cart/", data);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

/**
 * @description - UPDATE CART ITEM IN DB ACTION
 * @params - product id & quantity
 */
export const updateItemInCart = createAsyncThunk(
  "cart/updateItemInCart",
  async (data) => {
    try {
      const response = await API.patch(`/api/v1/cart/${data.productId}`, data);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
