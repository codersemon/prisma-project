// dependencies
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axios";


/**
 * CREATE NEW PRODUCT ACTION HANDLER
 */
export const createNewProduct = createAsyncThunk(
  "products/createNewProduct",
  async (data) => {
    try {
      const response = await API.post("/api/v1/products", data);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

/**
 * GET SINGLE PRODUCT ACTION HANDLER
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
 * UPDATE SINGLE PRODUCT ACTION HANDLER
 */
export const updateSingleProduct = createAsyncThunk(
  "products/updateSingleProduct",
  async (data) => {
    try {
      const response = await API.patch(`/api/v1/products/${data.slug}`, data);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

/**
 * DELETE PRODUCT ACTION HANDLER
 */
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    try {
      const response = await API.delete(`/api/v1/products/${id}`);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

/**
 * GET ALL PRODUCTs ACTION HANDLER
 */
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async () => {
    try {
      const response = await API.get("/api/v1/products?per_page=100");

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

/**
 * CREATE CATEGORY ACTION HANDLER
 */
export const createProductCategory = createAsyncThunk(
  "products/createProductCategory",
  async (data) => {
    try {
      const response = await API.post("/api/v1/product-categories", data);

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

/**
 * GET SINGLE CATEGORY ACTION HANDLER
 */
export const getSingleProductCategory = createAsyncThunk(
  "products/getSingleProductCategory",
  async (slug) => {
    try {
      const response = await API.get(`/api/v1/product-categories/${slug}`);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

/**
 * Update SINGLE CATEGORY ACTION HANDLER
 */
export const updateSingleProductCategory = createAsyncThunk(
  "products/updateSingleProductCategory",
  async (data) => {
    try {
      const response = await API.patch(`/api/v1/product-categories/${data.slug}`, data);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

/**
 * DELETE SINGLE CATEGORY ACTION HANDLER
 */
export const deleteSingleProductCategory = createAsyncThunk(
  "products/deleteSingleProductCategory",
  async (id) => {
    try {
      const response = await API.delete(`/api/v1/product-categories/${id}`);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
