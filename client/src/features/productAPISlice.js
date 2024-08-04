// dependencies
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axios";

/**
 * Get homagepage latest products
 */
export const getHomepageLatestProducts = createAsyncThunk(
  "products/getHomepageLatestProducts",
  async () => {
    try {
      const response = await API.get("/api/v1/products?status=publish");

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

/**
 * Get shop page products
 */
export const getShopPageProducts = createAsyncThunk(
  "products/getShopPageProducts",
  async () => {
    try {
      const response = await API.get(`/api/v1/products`);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);


/**
 * Get single product
 */
export const getSingleProduct = createAsyncThunk(
  "products/getSingleProduct",
  async (slug) => {
    try {
      const response = await API.get(`/api/v1/products/${slug}`);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);


/**
 * GET ALL CATEGORY ACTION HANDLER
 */
export const getAllProductCategory = createAsyncThunk(
  "products/getAllProductCategory",
  async () => {
    try {
      const response = await API.get("/api/v1/product-categories");

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

