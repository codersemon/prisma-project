// dependencies
import express from "express";
import {
  createWishlistItem,
  getAllWishlistItemByUserId,
  deleteWishlistItem
} from "../controllers/wishlistController.js";
import tokenVerifyMiddleware from "../middlewares/tokenVerifyMiddleware.js";

// create router
const router = express.Router();

/**
 * @description CREATE WISHLIST ITEM
 * @mthod POST
 * @route /api/v1/wishlist
 * @access private
 */
router.post("/wishlist", tokenVerifyMiddleware, createWishlistItem);

/**
 * @description DELETE WISHLIST ITEM
 * @mthod DELETE
 * @route /api/v1/wishlist/:id
 * @access private
 */
router.delete("/wishlist/:id", tokenVerifyMiddleware, deleteWishlistItem);

/**
 * @description GET ALL WISHLIST ITEMs BY USER ID
 * @mthod GET
 * @route /api/v1/wishlist-by-user-id/:id
 * @access private
 */
router.get(
  "/wishlist-by-user-id/:id",
  tokenVerifyMiddleware,
  getAllWishlistItemByUserId
);

// export router
export default router;
