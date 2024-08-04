// dependencies
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axios";

/**
 * @description - GET ALL MEDIA FILES
 */
export const getAllMediaFiles = createAsyncThunk(
  "auth/getAllMediaFiles",
  async () => {
    try {
      const response = await API.get("/api/v1/media");

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

/**
 * @description - UPLOAD MEDIA FILES
 */
export const uploadMediaFiles = createAsyncThunk(
  "auth/uploadMediaFiles",
  async ({uploaderId, formData}) => {
    try {
      const response = await API.post("/api/v1/media", formData);

      return {uploaderId, ...response.data};
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

/**
 * @description - DELETE SINGLE MEDIA FILE
 */
export const deleteSingleMediaFile = createAsyncThunk(
  "auth/deleteSingleMediaFile",
  async (id) => {
    try {
      const response = await API.delete(`/api/v1/media/${id}`);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
