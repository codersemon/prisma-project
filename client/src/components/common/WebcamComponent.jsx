// dependencies
import { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Webcam from "react-webcam";
import { uploadMediaFiles } from "../../features/mediaApiSlice";

const WebcamComponent = () => {
const dispatch = useDispatch();

  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const videoConstraints = {
    width: 500,
    height: 500,
    facingMode: "user"
  };

  // create a capture function
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const handleProfilePhotoUPloader = () => {
    const formData = new FormData();
    formData.append("media_files", {path: imgSrc});


    dispatch(uploadMediaFiles({uploaderId: "profile_photo", formData}))
  }

  return (
    <>
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" className="mb-1" />
      ) : (
        <Webcam height={300} width={300} ref={webcamRef} videoConstraints={videoConstraints} />
      )}
      <div className="btn-container">
        {imgSrc? <button onClick={handleProfilePhotoUPloader}>Upload</button> : <button onClick={capture}>Capture</button>}
        {imgSrc && <button onClick={() => setImgSrc(null)}>Recapture</button>}
      </div>
    </>
  );
};

export default WebcamComponent;
