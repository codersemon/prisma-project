// dependencies
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axios";

/**
 * @description - login user
 * @param {*} data - form data {email, password}
 */
export const loginUser = createAsyncThunk("auth/loginUser", async (data) => {
  try {
    const response = await API.post("/api/v1/auth/login", data);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

/**
 * @description - log out user
 */
export const logOutUser = createAsyncThunk("auth/logOutUser", async () => {
  try {
    const response = await API.post("/api/v1/auth/logout");

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

/**
 * @description - get logged in user information
 */
export const getLoggedInUserInformation = createAsyncThunk(
  "auth/getLoggedInUserInformation",
  async () => {
    try {
      const response = await API.post("/api/v1/auth/me");

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
