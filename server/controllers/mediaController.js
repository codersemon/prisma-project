// dependencies
import expressAsyncHandler from "express-async-handler";
import { findPublicId } from "../helpers/helpers.js";
import prisma from "../prisma/prismaClient.js";
import {
  deleteFileFromCloudinary,
  uploadMultipleFilesToCloudinary,
} from "../utils/cloudinary.js";

/**
 * @description ADD MEDIA ITEMS
 * @mthod POST
 * @route /api/v1/media
 * @access private
 */
export const addMediaContoller = expressAsyncHandler(async (req, res) => {
  // get all files
  const files = req.files;

  // empty validation
  if (files.length < 1) {
    return res
      .status(400)
      .json({ status: "error", message: "File cannot be empty" });
  }

  // generate fiels path array
  const filesPathArray = files.map((file) => file.path);

  // upload files to cloudinary
  const allUPloadedFiles = await uploadMultipleFilesToCloudinary(
    filesPathArray,
    "prismaormcommerce/media"
  );

  // uploaded files secure_url array
  const uploadedSecureURLArray = allUPloadedFiles.map((file) => {
    return { url: file.secure_url, userId: parseInt(req.me.id) };
  });

  // Create many records
  const createManyResult = await prisma.media.createMany({
    data: uploadedSecureURLArray,
    skipDuplicates: true,
  });

  // if record create failed, return error
  if (!createManyResult) {
    return res
      .status(400)
      .json({ status: "error", message: "Media is not created" });
  }

  // Retrieve the created records
  const createdMedia = await prisma.media.findMany({
    where: {
      // match url to find creatd media data
      url: {
        in: uploadedSecureURLArray.map((media) => media.url),
      },
    },
  });

  // send response
  res.status(201).json({
    status: "success",
    message: "Files uploaded successfully",
    data: createdMedia,
  });
});

/**
 * @description GET ALL MEDIA ITEMS
 * @mthod GET
 * @route /api/v1/media
 * @access public
 */
export const getAllMediaContoller = expressAsyncHandler(async (req, res) => {
  const allMediaFiles = await prisma.media.findMany();

  // return response
  res.status(200).json({
    status: "success",
    message: "All media files",
    data: allMediaFiles,
  });
});

/**
 * @description DELETE SINGLE MEDIA ITEM
 * @mthod DELETE
 * @route /api/v1/media/:id
 * @access private
 */
export const deleteSingleMediaController = expressAsyncHandler(
  async (req, res) => {
    // get deletable media id
    const id = parseInt(req.params.id);

    // get deleteable item
    const deleteableItem = await prisma.media.findUnique({ where: { id: id } });

    // if deleteable item not found, return error
    if (!deleteableItem) {
      return res
        .status(400)
        .json({ status: "error", message: "Deleteable item not found in db" });
    }

    // delete image from cloudinary
    const fileDeleteFromCloudinary = await deleteFileFromCloudinary(
      findPublicId(deleteableItem.url),
      "prismaormcommerce/media"
    );

    // delete item
    try {
      await prisma.media.delete({ where: { id: id } });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: "Something wrong while deleting from db",
      });
    }

    // return response
    res.status(200).json({
      status: "success",
      message: "File deleted successfully",
      data: deleteableItem,
    });
  }
);
