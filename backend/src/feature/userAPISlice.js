// dependencies
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axios";

/**
 * @description - GET ALL USER LIST
 */
export const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
  try {
    const response = await API.get("/api/v1/users");

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

/**
 * @description - CREATE USER ACCOUNT
 */
export const createUserAccount = createAsyncThunk(
  "users/createUserAccount",
  async (data) => {
    try {
      const response = await API.post("/api/v1/users", data);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

/**
 * @description - DELETE SINGLE USER ACCOUNT
 */
export const deleteSingleUserAccount = createAsyncThunk(
  "users/deleteSingleUserAccount",
  async (id) => {
    try {
      const response = await API.delete(`/api/v1/user/${id}`);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

/**
 * @description - UPDATE SINGLE USER ACCOUNT
 */
export const updateSingleUserAccount = createAsyncThunk(
  "users/updateSingleUserAccount",
  async (data) => {
    const {id, ...userData} = data;
    try {
      const response = await API.patch(`/api/v1/user/${id}`, userData);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

/**
 * @description - GET SINGLE USER ACCOUNT
 */
export const getSingleUserAccount = createAsyncThunk(
  "users/getSingleUserAccount",
  async (id) => {
    try {
      const response = await API.get(`/api/v1/user/${id}`);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
