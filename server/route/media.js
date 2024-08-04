// dependencies
import express from "express";
import { addMediaContoller, getAllMediaContoller, deleteSingleMediaController } from "../controllers/mediaController.js";
import tokenVerifyMiddleware from "../middlewares/tokenVerifyMiddleware.js";
import { mediaMulterMiddleWare } from "../utils/multer.js";

// create router
const router = express.Router();

/**
 * @description ADD MEDIA ITEMS
 * @mthod POST
 * @route /api/v1/media
 * @access private
 */
router.post(
  "/media",
  mediaMulterMiddleWare,
  tokenVerifyMiddleware,
  addMediaContoller
);

/**
 * @description GET ALL MEDIA ITEMS
 * @mthod GET
 * @route /api/v1/media
 * @access public
 */
router.get("/media", getAllMediaContoller);

/**
 * @description DELETE SINGLE MEDIA ITEM
 * @mthod DELETE
 * @route /api/v1/media/:id
 * @access private
 */
router.delete("/media/:id", tokenVerifyMiddleware, deleteSingleMediaController);

// export router
export default router;
