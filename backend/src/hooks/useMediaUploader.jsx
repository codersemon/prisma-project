// dependencies
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import MediaUploader from "../pages/media/MediaUploader";
import { uploadMediaFiles } from "../feature/mediaApiSlice";
import {
  mediaSelect,
  removeUploadedFileFromState,
} from "../feature/mediaSlice";

const useMediaUploader = (fileCount, uploaderId) => {
  /**
   * media Context
   */
  const { uploadedFiles, uploaderIsLoading } = useSelector(mediaSelect);

  /**
   * react-redux useDispatch hook init
   */
  const dispatch = useDispatch();

  /**
   * CATEGORY PHOTO STATE
   * UPLOAD & REMOVE HANDLER
   *
   * START
   */

  /**
   * This function will execute when file selected or dropped
   * Send file to rest api to upload in cloud
   * @param {*} acceptedFiles - this param will get selected or dropped files
   */
  const onDrop = (acceptedFiles) => {
    const formData = new FormData();

    // Append each accepted file to the FormData object
    acceptedFiles.forEach((file) => {
      formData.append("media_files", file);
    });

    dispatch(uploadMediaFiles({ uploaderId, formData }));
  };

  // File uploader hook initialize
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: fileCount > 1,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg", ".jpeg"],
    },
    maxFiles: fileCount,
  });

  // remove file handler
  const handleFileRemoval = async (id) => {
    // remove file from state
    dispatch(removeUploadedFileFromState({ uploaderId: uploaderId, id: id }));
  };

  // generate uploaded fileids object
  // const uploadedFileIDs = uploadedFiles?.map(file => ({id: file.id}));
  /**
   * CATEGORY PHOTO STATE
   * UPLOAD & REMOVE HANDLER
   *
   * END
   */

  return {
    MediaUploader,
    uploadedFiles,
    handleFileRemoval,
    getRootProps,
    getInputProps,
    mediaUploaderIsLoading: uploaderIsLoading[uploaderId],
    uploaderIsLoading
  };
};

export default useMediaUploader;
