// dependencies
import useMediaUploader from "../../hooks/useMediaUploader";

const FileUploaderModalContent = () => {
  const { MediaUploader } = useMediaUploader();
  return <MediaUploader fileCount={10} uploaderId="modal_media" />;
};

export default FileUploaderModalContent;
