// dependencies
import { createSlice } from "@reduxjs/toolkit";
import {
  createUserAccount,
  deleteSingleUserAccount,
  getAllUsers,
  getSingleUserAccount,
  updateSingleUserAccount,
} from "./userAPISlice";

// initial state
const initialState = {
  users: [],
  singleUser: null,
  isLoading: false,
  error: null,
  message: null,
  status: null,
};

// create slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsersStateMessageEmpty: (state) => {
      state.error = null;
      state.message = null;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET ALL USERS LIST
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data;
      })
      // CREATE USER ACCOUNT
      .addCase(createUserAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUserAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createUserAccount.fulfilled, (state, action) => {
        const { message, status, data } = action.payload;
        state.isLoading = false;
        state.message = message;
        state.status = status;
        state.users.unshift(data);
      })
      // DELETE SINGLE USER ACCOUNT
      .addCase(deleteSingleUserAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSingleUserAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteSingleUserAccount.fulfilled, (state, action) => {
        const { message, status, data } = action.payload;
        state.isLoading = false;
        state.message = message;
        state.status = status;
        state.users = state.users.filter((user) => user.id !== data.id);
      })
      // UPDATE SINGLE USER ACCOUNT
      .addCase(updateSingleUserAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSingleUserAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateSingleUserAccount.fulfilled, (state, action) => {
        const { message, status, data } = action.payload;
        state.isLoading = false;
        state.message = message;
        state.status = status;
        state.users = state.users.map((user) =>
          user.id === data.id ? data : user
        );
      })
      // GET SINGLE USER ACCOUNT
      .addCase(getSingleUserAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleUserAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getSingleUserAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleUser = action.payload.data;
      });
  },
});

// export selector
export const usersSelect = (state) => state.users;

// export actions
export const { setUsersStateMessageEmpty } = usersSlice.actions;

// export users reducer
export default usersSlice.reducer;
