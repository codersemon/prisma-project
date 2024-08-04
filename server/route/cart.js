// dependencies
import express from "express";
import tokenVerifyMiddleware from "../middlewares/tokenVerifyMiddleware.js";
import { addNewCartItem, deleteCartItem, getAllCartItems, updateCartItem } from "../controllers/cartController.js";

// create router
const router = express.Router();

/**
 * @description ADD NEW CART ITEM
 * @mthod POST
 * @route /api/v1/cart
 * @access private
 */
router.post("/cart",tokenVerifyMiddleware, addNewCartItem);

/**
 * @description GET ALL CART ITEMs
 * @mthod GET
 * @route /api/v1/cart
 * @access private
 */
router.get("/cart",tokenVerifyMiddleware, getAllCartItems);

/**
 * @description DELETE CART ITEM BY ITEM ID & USERID
 * @mthod DELETE
 * @route /api/v1/cart/:id
 * @access private
 */
router.delete("/cart/:id",tokenVerifyMiddleware, deleteCartItem);

/**
 * @description UPDATE CART ITEM BY ITEM ID & USERID
 * @mthod PATCH
 * @route /api/v1/cart/:id
 * @access private
 */
router.patch("/cart/:id",tokenVerifyMiddleware, updateCartItem);

// export router 
export default router;