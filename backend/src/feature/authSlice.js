// dependencies
import { createSlice } from "@reduxjs/toolkit";
import {
  getLoggedInUserInformation,
  logOutUser,
  loginUser,
} from "./authAPISlice";

const initialState = {
  c_user: localStorage.getItem("c_user")
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
    setAuthStateMessageEmpty: (state) => {
      state.error = null;
      state.message = null;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN USER
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
        state.c_user = action.payload.data;

        // add data to client localStorage
        localStorage.setItem("c_user", JSON.stringify(action.payload.data));
      })
      // LOGOUT USER
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
        state.c_user = null; // remove user informaton from state

        // remove data from client localStorage
        localStorage.removeItem("c_user");
      })
      // GET LOGGED IN USER INFORMATION
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
  },
});

// export selector
export const authSelect = (state) => state.auth;

// export actions
export const { setAuthStateMessageEmpty } = authSlice.actions;

// export auth reducer
export default authSlice.reducer;
