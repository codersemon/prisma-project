/**
 * This component is using with "useMediaUploader" custom hook
 */

// dependencies
import { RiUpload2Line } from "react-icons/ri";
import useMediaUploader from "../../hooks/useMediaUploader";

const MediaUploader = ({ fileCount, uploaderId }) => {
  const {
    getRootProps,
    getInputProps,
    mediaUploaderIsLoading,
    handleFileRemoval,
    uploadedFiles,
  } = useMediaUploader(fileCount, uploaderId);

  const uploadedFileCount = uploadedFiles[uploaderId]?.length || 0;

  // Conditional render only when certain conditions are met
  const showUploader =
    uploadedFileCount === 0 || (fileCount > 1 && uploadedFileCount < fileCount);

  return (
    <section>
      {mediaUploaderIsLoading ? <div className="loader upload"></div> : ""}

      {uploadedFiles[uploaderId]?.length > 0 && (
        <div className="file-prev-wrapper">
          {uploadedFiles[uploaderId]?.map((file) => (
            <div key={file?.id} className="file-preview">
              <img src={file?.url} />
              <span
                onClick={() => handleFileRemoval(file.id)}
                className="remove-img-btn"
              >
                x
              </span>
            </div>
          ))}
        </div>
      )}

      {showUploader && (
        <div
          {...getRootProps({
            className: `file-uploader ${
              mediaUploaderIsLoading ? "d-none" : ""
            }`,
          })}
        >
          <input {...getInputProps()} />
          <div className="text-center">
            <RiUpload2Line size={30} />
            {fileCount > 1 ? (
              <p>
                Drag & drop images here, or click to select images.{" "}
                <span className="theme-color d-block">
                  Max allowed images: {fileCount}
                </span>
              </p>
            ) : (
              <p>Drag & drop an image here, or click to select an image.</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default MediaUploader;
