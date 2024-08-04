// dependencies
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axios";

/**
 * @description - register user reducer function.
 * @param {*} data - form data {email, password, consent}
 */
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data) => {
    try {
      const response = await API.post("/api/v1/auth/users", data);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

/**
 * @description - verify account by otp
 * @param {*} data - form data {otp}
 */
export const verifyAccountByOTP = createAsyncThunk(
  "auth/verifyAccountByOTP",
  async (data) => {
    try {
      const response = await API.post(
        "/api/v1/auth/verify-account-by-otp",
        data
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

/**
 * @description - verify account by url
 * @param {*} data - form data {otp, token}
 */
export const verifyAccountByURL = createAsyncThunk(
  "auth/verifyAccountByURL",
  async (data) => {
    try {
      const response = await API.post(
        "/api/v1/auth/verify-account-by-url",
        data
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

/**
 * @description - resend otp
 */
export const resendOTP = createAsyncThunk("auth/resendOTP", async () => {
  try {
    const response = await API.post("/api/v1/auth/resend-otp");

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

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

/**
 * @description - send forget password request
 */
export const sendForgotPasswordRequest = createAsyncThunk(
  "auth/sendForgotPasswordRequest",
  async (data) => {
    try {
      const response = await API.post("/api/v1/auth/forgot-password-request", data);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

/**
 * @description - send forget password request accept
 */
export const sendForgotPasswordRequestAccept = createAsyncThunk(
  "auth/sendForgotPasswordRequestAccept",
  async (data) => {
    try {
      const response = await API.patch("/api/v1/auth/forgot-password-request-accept", data);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

/**
 * @description - update user meta
 */
export const updateUserMeta = createAsyncThunk(
  "auth/updateUserMeta",
  async (data) => {
    try {
      const response = await API.patch("/api/v1/auth/update-user-meta", data);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

/**
 * @description - update user password from my prfile
 */
export const updateUserPassword = createAsyncThunk(
  "auth/updateUserPassword",
  async (data) => {
    try {
      const response = await API.patch("/api/v1/auth/update-password", data);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

/**
 * @description - ADD NEW ADDRESS
 */
export const addNewAddress = createAsyncThunk(
  "auth/addNewAddress",
  async (data) => {
    try {
      const response = await API.post("/api/v1/auth/addresses", data);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
