// dependencies
import { createSlice } from "@reduxjs/toolkit";
import {
  addNewAddress,
  getLoggedInUserInformation,
  logOutUser,
  loginUser,
  registerUser,
  resendOTP,
  sendForgotPasswordRequest,
  sendForgotPasswordRequestAccept,
  updateUserMeta,
  updateUserPassword,
  verifyAccountByOTP,
  verifyAccountByURL,
} from "./authAPISlice";

const initialState = {
  user: localStorage.getItem("c_user")
    ? JSON.parse(localStorage.getItem("c_user"))
    : null,
  isLoading: false,
  error: null,
  message: null,
  status: null,
};

// create slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStateEmpty: (state) => {
      state.error = null;
      state.message = null;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //register new user
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.status = action.payload.status;
        state.user = action.payload.data;
      })
      //verify account by otp
      .addCase(verifyAccountByOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyAccountByOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(verifyAccountByOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.status = action.payload.status;
      })
      //verify account by url
      .addCase(verifyAccountByURL.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyAccountByURL.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(verifyAccountByURL.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.status = action.payload.status;
      })
      //resend OTP
      .addCase(resendOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(resendOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.status = action.payload.status;
      })
      //login user
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.status = action.payload.status;
        state.user = action.payload.data;

        // add data to client localStorage
        localStorage.setItem("c_user", JSON.stringify(action.payload.data));
      })
      //log out user
      .addCase(logOutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.status = action.payload.status;
        state.user = null; // remove user informaton from state

        // remove data from client localStorage
        localStorage.removeItem("c_user");
      })
      //get logged in user information
      .addCase(getLoggedInUserInformation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoggedInUserInformation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;

        // remove user data from client localStorage
        localStorage.removeItem("c_user");
      })
      .addCase(getLoggedInUserInformation.fulfilled, (state, action) => {
        state.isLoading = false;

        // add user data to client localStorage
        localStorage.setItem("c_user", JSON.stringify(action.payload.data));
      })
      //send forgot password request
      .addCase(sendForgotPasswordRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendForgotPasswordRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(sendForgotPasswordRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      //send forgot password request accept
      .addCase(sendForgotPasswordRequestAccept.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendForgotPasswordRequestAccept.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(sendForgotPasswordRequestAccept.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      // update users_meta
      .addCase(updateUserMeta.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserMeta.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserMeta.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload.status;
        state.message = action.payload.message;

        // update user state
        state.user = action.payload.data;

        // update localstorage
        localStorage.setItem("c_user", JSON.stringify(action.payload.data));
      })
      // update user password from profile
      .addCase(updateUserPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      // ADD NEW ADDRESS
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload.status;
        state.message = action.payload.message;
        // add new address to addresses array
        state.user.meta.addresses.unshift(action.payload.data);
      })
  },
});

// export selector
export const authSelect = (state) => state.auth;

// export actions
export const { setStateEmpty } = authSlice.actions;

// export auth reducer
export default authSlice.reducer;
