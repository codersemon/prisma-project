// dependencies
import { v2 as cloudinary } from "cloudinary";
import pLimit from "p-limit";
import { findPublicId } from "../helpers/helpers.js";

// promise limit init, pLimit 10 becasue cloudinary free tier limit is 10 promise at a time
const limit = pLimit(10);

//configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// export cloudinary uploader function
export const uploadToCloudinary = async (path, folderName) => {
  let uploadedFile;

  // if have folder name then upload with folder, otherwise upload in root foolder
  folderName
    ? (uploadedFile = await cloudinary.uploader.upload(path, {
        folder: folderName,
      }))
    : (uploadedFile = await cloudinary.uploader.upload(path));

  return uploadedFile;
};

// export cloudinary deleter function
export const deleteFileFromCloudinary = async (publicId, folderName) => {
  folderName
    ? await cloudinary.uploader.destroy(`${folderName}/${publicId}`)
    : await cloudinary.uploader.destroy(publicId);
};

// export cloudinary multiple files uploader function
export const uploadMultipleFilesToCloudinary = async (
  filesPathArray,
  folderName
) => {
  const filesToUpload = filesPathArray.map((path) => {
    return limit(async () => {
      let uploadedFile;

      // if have folder name then upload with folder, otherwise upload in root foolder
      folderName
        ? (uploadedFile = await cloudinary.uploader.upload(path, {
            folder: folderName,
          }))
        : (uploadedFile = await cloudinary.uploader.upload(path));

      return uploadedFile;
    });
  });

  let uploadedFiles = await Promise.all(filesToUpload);

  return uploadedFiles;
};

// export cloudinary multiple files uploader function
export const deleteMultipleFilesFromCloudinary = async (
  filesPathArray,
  folderName
) => {
  const filesToDelete = filesPathArray.map((path) => {
    let publicId = findPublicId(path);
    return limit(async () => {
      // if have folder name then delete with folder, otherwise delete in root foolder
      folderName
        ? await cloudinary.uploader.destroy(`${folderName}/${publicId}`)
        : await cloudinary.uploader.destroy(publicId);
    });
  });

  await Promise.all(filesToDelete);
};
