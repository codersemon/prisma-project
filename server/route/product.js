// dependencies
import express from "express";
import {
  createProduct,
  createProductCategory,
  deleteProduct,
  deleteSingleProductCategory,
  getAllProductCategory,
  getAllProducts,
  getSingleProduct,
  getSingleProductCategory,
  updateSingleProduct,
  updateSingleProductCategory,
} from "../controllers/productController.js";
import tokenVerifyMiddleware from "../middlewares/tokenVerifyMiddleware.js";

// create router
const router = express.Router();

/**
 * @description GET ALL PRODUCTS
 * @mthod GET
 * @route /api/v1/products
 * @access public
 */
router.get("/products", getAllProducts);

/**
 * @description CREATE PRODUCT
 * @mthod POST
 * @route /api/v1/products
 * @access private
 */
router.post("/products", tokenVerifyMiddleware, createProduct);

/**
 * @description GET SINGLE PRODUCT
 * @mthod GET
 * @route /api/v1/products/:slug
 * @access public
 */
router.get("/products/:slug", getSingleProduct);

/**
 * @description UPDATE SINGLE PRODUCT
 * @mthod PATCH
 * @route /api/v1/products/:slug
 * @access public
 */
router.patch("/products/:slug", updateSingleProduct);

/**
 * @description DELETE PRODUCT
 * @mthod DELETE
 * @route /api/v1/products/:id
 * @access private
 */
router.delete("/products/:id", tokenVerifyMiddleware, deleteProduct);

/**
 * @description CREATE PRODUCT CATEGORY
 * @mthod POST
 * @route /api/v1/product-categories
 * @access private
 */
router.post(
  "/product-categories",
  tokenVerifyMiddleware,
  createProductCategory
);

/**
 * @description GET ALL PRODUCT CATEGORY
 * @mthod GET
 * @route /api/v1/product-categories
 * @access public
 */
router.get("/product-categories", getAllProductCategory);

/**
 * @description GET SINGLE PRODUCT CATEGORY
 * @mthod GET
 * @route /api/v1/product-categories/:slug
 * @access public
 */
router.get("/product-categories/:slug", getSingleProductCategory);

/**
 * @description DELETE SINGLE PRODUCT CATEGORY
 * @mthod DELETE
 * @route /api/v1/product-categories/:id
 * @access private
 */
router.delete(
  "/product-categories/:id",
  tokenVerifyMiddleware,
  deleteSingleProductCategory
);

/**
 * @description UPDATE SINGLE PRODUCT CATEGORY
 * @mthod PATCH
 * @route /api/v1/product-categories/:slug
 * @access private
 */
router.patch(
  "/product-categories/:slug",
  tokenVerifyMiddleware,
  updateSingleProductCategory
);

// export router
export default router;
