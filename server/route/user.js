// dependencies
import express from "express";
import {
  createUserAccount,
  deleteSingleUser,
  getAllUsers,
  getSingleUser,
} from "../controllers/userController.js";
import tokenVerifyMiddleware from "../middlewares/tokenVerifyMiddleware.js";

// create express router
const router = express.Router();

/**
 * @description - CREATE USER ACCOUNT BY ADMIN
 * @methods - POST
 * @route /api/v1/users
 * @access private
 */
router.post("/users", tokenVerifyMiddleware, createUserAccount);

/**
 * @description GET ALL REGISTERED USERS
 * @mthod GET
 * @route /api/v1/users
 * @access private
 */
router.get("/users", tokenVerifyMiddleware, getAllUsers);

/**
 * @description DELETE SINGLE USER
 * @mthod DELETE
 * @route /api/v1/user/:id
 * @access private
 */
router.delete("/user/:id", tokenVerifyMiddleware, deleteSingleUser);

/**
 * @description UPDATE SINGLE USER
 * @mthod PATCH
 * @route /api/v1/user/:id
 * @access private
 */
router.patch("/user/:id", tokenVerifyMiddleware, deleteSingleUser);

/**
 * @description GET SINGLE USER
 * @mthod GET
 * @route /api/v1/user/:id
 * @access private
 */
router.get("/user/:id", tokenVerifyMiddleware, getSingleUser);

// export router
export default router;
