// dependencies
import express from "express";
import {
  createNewOrder,
  getAllOrders,
  getAllOrdersByUserId,
  getSingleOrderById,
  editSingleOrder,
  deleteSingleOrder
} from "../controllers/orderController.js";
import tokenVerifyMiddleware from "../middlewares/tokenVerifyMiddleware.js";

// create router
const router = express.Router();

/**
 * @description CREATE NEW ORDER
 * @mthod POST
 * @route /api/v1/orders
 * @access private
 */
router.post("/orders", tokenVerifyMiddleware, createNewOrder);

/**
 * @description GET ALL ORDERs
 * @mthod GET
 * @route /api/v1/orders
 * @access private
 */
router.get("/orders", tokenVerifyMiddleware, getAllOrders);

/**
 * @description GET ALL ORDERs by USER ID
 * @mthod GET
 * @route /api/v1/orders-by-user/:id
 * @access private
 */
router.get("/orders-by-user/:id", tokenVerifyMiddleware, getAllOrdersByUserId);

/**
 * @description GET SINGLE ORDER by ORDER ID
 * @mthod GET
 * @route /api/v1/order/:id
 * @access private
 */
router.get("/order/:id", tokenVerifyMiddleware, getSingleOrderById);

/**
 * @description EDIT SINGLE ORDER by ORDER ID
 * @mthod PATCH
 * @route /api/v1/order/:id
 * @access private
 */
router.patch("/order/:id", tokenVerifyMiddleware, editSingleOrder);

/**
 * @description DELETE SINGLE ORDER by ORDER ID
 * @mthod DELETE
 * @route /api/v1/order/:id
 * @access private
 */
router.delete("/order/:id", tokenVerifyMiddleware, deleteSingleOrder);

// export
export default router;
