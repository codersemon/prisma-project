// dependencies
import express from "express";
import {
  addNewAddress,
  deleteSingleAddress,
  forgotPasswordRequest,
  forgotPasswordRequestAccept,
  getLoggedInUser,
  loginUser,
  logoutUser,
  registerUser,
  resendOTP,
  updateEmailRequest,
  updateEmailRequestValidationAndApprove,
  updatePassword,
  updateUserMeta,
  verifyAccountByOTP,
  verifyAccountByURL,
} from "../controllers/authController.js";
import tokenVerifyMiddleware from "../middlewares/tokenVerifyMiddleware.js";

// create express router
const router = express.Router();

/**
 * @description - register user account
 * @methods - POST
 * @route /api/v1/auth/users
 * @access public
 */
router.post("/users", registerUser);

/**
 * @description - user account verification by otp
 * @methods - POST
 * @route /api/v1/auth/verify-account-by-otp
 * @access public
 */
router.post("/verify-account-by-otp", verifyAccountByOTP);

/**
 * @description - user account verification by url
 * @methods - POST
 * @route /api/v1/auth/verify-account-by-url
 * @access public
 */
router.post("/verify-account-by-url", verifyAccountByURL);

/**
 * @description - user account login by email and password
 * @methods - POST
 * @route /api/v1/auth/login
 * @access public
 */
router.post("/login", loginUser);

/**
 * @description LOGOUT USER
 * @mthod POST
 * @route /api/v1/auth/logout
 * @access private
 */
router.post("/logout", tokenVerifyMiddleware, logoutUser);

/**
 * @description RESEND OTP
 * @mthod POST
 * @route /api/v1/auth/resend-otp
 * @access public
 */
router.post("/resend-otp", resendOTP);

/**
 * @description GET LOGGED IN USER INFORMATION
 * @mthod POST
 * @route /api/v1/auth/me
 * @access private
 */
router.post("/me", tokenVerifyMiddleware, getLoggedInUser);

/**
 * @description FORGET PASSWORD REQUEST
 * @mthod POST
 * @route /api/v1/auth/forgot-password-request
 * @access public
 */
router.post("/forgot-password-request", forgotPasswordRequest);

/**
 * @description FORGET PASSWORD REQUEST ACCEPTING ROUTE
 * @mthod PATCH
 * @route /api/v1/auth/forgot-password-request-accept
 * @access public
 */
router.patch("/forgot-password-request-accept", forgotPasswordRequestAccept);

/**
 * @description UPDATE USER META
 * @mthod PATCH
 * @route /api/v1/auth/update-user-meta
 * @access private
 */
router.patch("/update-user-meta", tokenVerifyMiddleware, updateUserMeta);

/**
 * @description UPDATE PASSWORD FROM MY ACCOUNT
 * @mthod PATCH
 * @route /api/v1/auth/update-password
 * @access private
 */
router.patch("/update-password", tokenVerifyMiddleware, updatePassword);

/**
 * @description  EMAIL UPDATE REQUEST
 * @mthod POST
 * @route /api/v1/auth/update-email-request
 * @access private
 */
router.post("/update-email-request", tokenVerifyMiddleware, updateEmailRequest);

/**
 * @description  EMAIL UPDATE REQUEST VALIDATION & APPROVE
 * @mthod POST
 * @route /api/v1/auth/update-email-request-validation
 * @access private
 */
router.post(
  "/update-email-request-validation",
  tokenVerifyMiddleware,
  updateEmailRequestValidationAndApprove
);

/**
 * @description  ADD NEW ADDRESS TO USER PROFILE
 * @mthod POST
 * @route /api/v1/auth/addresses
 * @access private
 */
router.post("/addresses", tokenVerifyMiddleware, addNewAddress);

/**
 * @description  DELETE SINGLE ADDRESS FROM USER PROFILE
 * @mthod POST
 * @route /api/v1/auth/addresses/:id
 * @access private
 */
router.delete("/addresses/:id", deleteSingleAddress);

// export router
export default router;
