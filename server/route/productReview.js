// dependencies
import express from "express";
import {
  addProdcutReview,
  deleteSingleProdcutReview,
  editSingleProdcutReview,
  getAllProdcutReviews,
  getSingleProdcutReview,
} from "../controllers/productReviewController.js";
import tokenVerifyMiddleware from "../middlewares/tokenVerifyMiddleware.js";

// create router
const router = express.Router();

/**
 * @description ADD PRODUCT REVIEW
 * @mthod POST
 * @route /api/v1/product-reviews
 * @access private
 */
router.post("/product-reviews", tokenVerifyMiddleware, addProdcutReview);

/**
 * @description GET ALL PRODUCT REVIEWS
 * @mthod GET
 * @route /api/v1/product-reviews
 * @access private
 */
router.get("/product-reviews", tokenVerifyMiddleware, getAllProdcutReviews);

/**
 * @description DELETE SINGLE PRODUCT REVIEW
 * @mthod DELETE
 * @route /api/v1/product-review/:id
 * @access private
 */
router.delete(
  "/product-review/:id",
  tokenVerifyMiddleware,
  deleteSingleProdcutReview
);

/**
 * @description EDIT SINGLE PRODUCT REVIEW
 * @mthod PATCH
 * @route /api/v1/product-review/:id
 * @access private
 */
router.patch(
  "/product-review/:id",
  tokenVerifyMiddleware,
  editSingleProdcutReview
);

/**
 * @description GET SINGLE PRODUCT REVIEW
 * @mthod GET
 * @route /api/v1/product-review/:id
 * @access private
 */
router.get(
  "/product-review/:id",
  tokenVerifyMiddleware,
  getSingleProdcutReview
);

// export router
export default router;
