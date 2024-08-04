// dependencies
import { createSlice } from "@reduxjs/toolkit";
import {
  deleteSingleMediaFile,
  getAllMediaFiles,
  uploadMediaFiles,
} from "./mediaApiSlice";

const initialState = {
  mediaFiles: [],
  uploadedFiles: {},
  isLoading: [],
  deletingMediaId : null,
  uploaderIsLoading: {},
  error: null,
  message: null,
  status: null,
};

// create slice
const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    setMediaStateMessageEmpty: (state) => {
      state.error = null;
      state.message = null;
      state.status = null;
    },
    removeUploadedFileFromState: (state, action) => {
      const { uploaderId, id } = action.payload;

      // if key exist in uploadedFiles State
      if (state.uploadedFiles[uploaderId]) {
        state.uploadedFiles[uploaderId] = state.uploadedFiles[
          uploaderId
        ].filter((item) => item.id !== id);
      }
    },
    setUploadedFileStateEmpty: (state, action) => {
      // expect uploaderId as payload 
      state.uploadedFiles[action.payload] = [];
    },
    setDataInUploadedFilesState: (state, action) => {
      const {uploaderId, data} = action.payload;
      state.uploadedFiles = {...state.uploadedFiles, [uploaderId]: data }
    }
  },
  extraReducers: (builder) => {
    builder
      // GET ALL MEDIA FILES
      .addCase(getAllMediaFiles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMediaFiles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getAllMediaFiles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.status = action.payload.status;
        state.mediaFiles = action.payload.data.sort((a, b) => b.id - a.id);
      })
      // UPLOAD MEDIA FILES
      .addCase(uploadMediaFiles.pending, (state, action) => {
        const {uploaderId} = action.meta.arg;
        state.uploaderIsLoading[uploaderId] = true;
      })
      .addCase(uploadMediaFiles.rejected, (state, action) => {
        const { uploaderId } = action.meta.arg;
        state.uploaderIsLoading[uploaderId] = false;
        state.error = action.error.message;
      })
      .addCase(uploadMediaFiles.fulfilled, (state, action) => {
        const { data, message, status, uploaderId } = action.payload;
        state.uploaderIsLoading[uploaderId] = false;
        state.message = message;
        state.status = status;

        // add uploaded files to mediaFiles state
        data.map((item) => state.mediaFiles.unshift(item));

        // initialize the array if it doesn't exist
        if (!state.uploadedFiles[uploaderId]) {
          state.uploadedFiles[uploaderId] = [];
        }
        // push data to the created array or if already have, then just push
        data.map((item) => state.uploadedFiles[uploaderId].push(item));
      })
      // DELETE SINGLE MEDIA FILE
      .addCase(deleteSingleMediaFile.pending, (state, action) => {
        state.isLoading = true;
        state.deletingMediaId = action.meta.arg
      })
      .addCase(deleteSingleMediaFile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.deletingMediaId = null;
      })
      .addCase(deleteSingleMediaFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.status = action.payload.status;
        // remove deleted file from mediaFile state
        state.mediaFiles = state.mediaFiles.filter(
          (item) => item.id !== action.payload.data.id
        );

        state.deletingMediaId = null;
        // state.uploadedFiles = state.uploadedFiles.filter(
        //   (item) => item.id !== action.payload.data.id
        // ); // remove deleted file from uploadedFiles state
      });
  },
});

// export selector
export const mediaSelect = (state) => state.media;

// export actions
export const {
  setAuthStateMessageEmpty,
  removeUploadedFileFromState,
  setUploadedFileStateEmpty,
  setDataInUploadedFilesState
} = mediaSlice.actions;

// export auth reducer
export default mediaSlice.reducer;
