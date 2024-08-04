// dependencies
import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { RiUpload2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductThumbnail,
  uploadProductThumbnail,
} from "../../feature/productAPISlice";
import { productSelect } from "../../feature/productSlice";

const ThumbnailUploader = ({ thumbnailURL, setThumbnailURL }) => {
  // product context
  const { productThumbnail, isLoading } = useSelector(productSelect);
  const dispatch = useDispatch();

  // execute after file selection
  const onDrop = (acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];

    // request server to upload thumbnail
    if (uploadedFile) {
      const formData = new FormData();
      formData.append("thumbnail", uploadedFile);
      dispatch(uploadProductThumbnail(formData));
    }
  };

  // hook initilaizer
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg", ".jpeg"],
    },
  });

  // remove file handler
  const handleFileRemoval = async () => {
    // Dispatch the action
    await dispatch(deleteProductThumbnail(productThumbnail));
  };

  useEffect(() => {
    setThumbnailURL(productThumbnail);
  }, [setThumbnailURL, productThumbnail]);

  return (
    <section className="container">
      {isLoading ? <div className="loader upload"></div> : ""}

      {thumbnailURL ? (
        <div className="file-preview">
          <img src={thumbnailURL} alt="" width="300" />
          <span onClick={handleFileRemoval} className="remove-img-btn">
            x
          </span>
        </div>
      ) : (
        <div
          {...getRootProps({
            className: `file-uploader ${isLoading ? "d-none" : ""}`,
          })}
        >
          <input {...getInputProps()} />
          <div className="text-center">
            <RiUpload2Line size={30} />
            <p>Drag & drop a image here, or click to select a image</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ThumbnailUploader;
