// dependencies
import bcrypt from "bcrypt";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { sendAccountActivationEmail } from "../emails/accountActivationEmail.js";
import { sendEmailUpdateTokenEmail } from "../emails/emailUpdateEmail.js";
import { sendForgotPasswordEmail } from "../emails/sendForgotPasswordEmail.js";
import { createOTP, isEmail } from "../helpers/helpers.js";
import prisma from "../prisma/prismaClient.js";

/**
 * @description CREATE NEW USER ACCOUNT BY EMAIL & PASSWORD
 * @mthod POST
 * @route /api/v1/auth/users
 * @access public
 */
export const registerUser = expressAsyncHandler(async (req, res) => {
  // get form submission data
  const { email, password, consent } = req.body;

  // empty validation
  if (!email || !password || !consent) {
    return res
      .status(400)
      .json({ status: "error", message: "All fields are required!" });
  }

  // if email is not valid, return error
  if (!isEmail(email)) {
    return res
      .status(400)
      .json({ status: "error", message: "Email is not valid!" });
  }

  // if password length less than 8 character, return error
  if (password.length < 8) {
    return res.status(400).json({
      status: "error",
      message: "Password should be at least 8 characters",
    });
  }

  // match email in db, if found then return error
  const isEmailRegistered = await prisma.users.findUnique({
    where: {
      email: email,
    },
  });

  // if email registered, return error
  if (isEmailRegistered) {
    return res
      .status(400)
      .json({ status: "error", message: "Email already registered" });
  }

  // hash password
  const hashPassword = await bcrypt.hash(password, 10);

  // generate OTP
  const OTP = createOTP();

  // create user
  const user = await prisma.users.create({
    data: {
      email: email.trim(),
      password: hashPassword,
      meta: { create: { access_token: OTP } },
    },
    select: { id: true, email: true },
  });

  if (user) {
    // generate activationToken
    const activationToken = await jwt.sign(
      { email },
      process.env.USER_ACTIVATION_JWT_STRING,
      {
        expiresIn: "1d",
      }
    );

    // set activationToken in cookie
    res.cookie("activationToken", activationToken);

    // set c_user id in cookie (c_user = current user)
    res.cookie("c_user", user.id);

    // generate link to verify account by url
    const verificationURL = `${process.env.CLIENT_URL}/url-verification/${activationToken}/${OTP}`;

    // send email
    await sendAccountActivationEmail(email, OTP, verificationURL);

    // send response
    res.status(201).json({
      status: "success",
      message: "Registration successful",
      data: user,
    });
  }
});

/**
 * @description LOGIN USER BY EMAIL & PASSWORD
 * @mthod POST
 * @route /api/v1/auth/login
 * @access public
 */
export const loginUser = expressAsyncHandler(async (req, res) => {
  // getting form submission data
  const { email, password } = req.body;

  // empty validation
  if (!email || !password) {
    return res
      .status(400)
      .json({ status: "error", message: "Email & password required" });
  }

  // if not email, return error
  if (!isEmail(email)) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid email address" });
  }

  // get login user
  let user = await prisma.users.findUnique({
    where: { email },
    include: { meta: true },
  });

  // if account not found, return error
  if (!user) {
    return res
      .status(400)
      .json({ status: "error", message: `${email} is not registered` });
  }

  // if account not verified, return error
  if (user?.meta?.isVerified !== true) {
    return res
      .status(400)
      .json({ status: "error", message: "Please verify before login" });
  }

  // match password
  const isPasswordMatched = await bcrypt.compare(password, user.password);

  // if password not match, return error
  if (!isPasswordMatched) {
    return res
      .status(400)
      .json({ status: "error", message: "Password is wrong" });
  }

  // generate accessToken
  const accessToken = jwt.sign({ email }, process.env.USER_LOGIN_JWT_STRING, {
    expiresIn: "365d",
  });

  // set accessToken in cookies
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.APP_ENV_MODE == "DEVELOPMENT" ? false : true,
    sameSite: "strict",
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  // set c_user id in cookie (c_user = current user)
  res.cookie("c_user", user.id);

  // prepare loginUser object to send in response
  const loginUser = await prisma.users.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      meta: {
        select: {
          isVerified: true,
          name: true,
          photo: true,
          phone: true,
          role: true,
        },
      },
    },
  });

  // send response
  return res
    .status(200)
    .json({ status: "success", message: "Login successful", data: loginUser });
});

/**
 * @description VERIFY USER ACCOUNT BY URL, WHICH IS SENT TO EMAIL
 * @mthod POST
 * @route /api/v1/auth/verify-account-by-url
 * @access public
 */
export const verifyAccountByURL = expressAsyncHandler(async (req, res) => {
  // getting OTP & token
  const { otp, token } = req.body;

  // otp empty validation
  if (!otp || !token) {
    return res.status(400).json({ status: "error", message: "Unauthorized!" });
  }

  // verify token
  const verifiedToken = jwt.verify(
    token,
    process.env.USER_ACTIVATION_JWT_STRING
  );

  // if token is invalid, return error
  if (!verifiedToken) {
    return res.status(400).json({ status: "error", message: "Invalid token" });
  }

  // activating user
  let activatingUser;

  // finding user from db
  if (isEmail(verifiedToken.email)) {
    activatingUser = await prisma.users.findUnique({
      where: { email: verifiedToken.email },
      include: { meta: true },
    });
  } else {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid access token" });
  }

  // verify otp code
  if (otp !== activatingUser.meta.access_token) {
    return res
      .status(400)
      .json({ status: "error", message: "OTP is not matched" });
  }

  // verify user
  const updatedUser = await prisma.users_meta.update({
    where: { userId: activatingUser.id },
    data: { isVerified: true, access_token: null },
  });

  // clear activationToken cookie
  res.clearCookie("activationToken");

  return res.status(200).json({
    status: "success",
    message: "Account activation successful",
    data: updatedUser,
  });
});

/**
 * @description VERIFY USER ACCOUNT BY OTP, WHICH IS SENT TO EMAIL
 * @mthod POST
 * @route /api/v1/auth/verify-account-by-otp
 * @access public
 */
export const verifyAccountByOTP = expressAsyncHandler(async (req, res) => {
  // getting OTP
  const { otp } = req.body;

  // if otp length is not 5 digit, return error
  if (otp.length !== 5) {
    return res.status(400).json({
      status: "error",
      message: "OTP should be 5 digit",
    });
  }

  // getting activationToken  from cookies
  const activationToken = req.cookies.activationToken;

  // verify token
  const verifiedToken = jwt.verify(
    activationToken,
    process.env.USER_ACTIVATION_JWT_STRING
  );

  // if token is invalid, return error
  if (!verifiedToken) {
    return res.status(400).json({ status: "error", message: "Invalid token" });
  }

  // activating user
  let activatingUser;

  // finding user from db
  if (isEmail(verifiedToken.email)) {
    activatingUser = await prisma.users.findUnique({
      where: { email: verifiedToken.email },
      include: { meta: true },
    });
  } else {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid access token" });
  }

  // verify otp code
  if (otp !== activatingUser.meta.access_token) {
    return res
      .status(400)
      .json({ status: "error", message: "OTP is not matched" });
  }

  // verify user
  const updatedUser = await prisma.users_meta.update({
    where: { userId: activatingUser.id },
    data: { isVerified: true, access_token: null },
  });

  // clear activationToken cookie
  res.clearCookie("activationToken");

  return res.status(200).json({
    status: "success",
    message: "Account activation successful",
    data: updatedUser,
  });
});

/**
 * @description RESEND OTP
 * @mthod POST
 * @route /api/v1/auth/resend-otp
 * @access public
 */
export const resendOTP = expressAsyncHandler(async (req, res) => {
  // getting current user id
  const currendUserID = parseInt(req.cookies.c_user);

  // otp empty validation
  if (!currendUserID) {
    return res.status(400).json({ status: "error", message: "Unauthorized!" });
  }

  // get user from db
  const updatingUser = await prisma.users.findUnique({
    where: { id: currendUserID },
    include: { meta: true },
  });

  // if no user found, return error
  if (!updatingUser) {
    return res.status(400).json({ status: "error", message: "Unauthorized!" });
  }

  // if already verified, return error
  if (updatingUser.meta.isVerified === true) {
    return res
      .status(200)
      .json({ status: "success", message: "Already activated, login now" });
  }

  // generate new OTP
  const OTP = createOTP();

  // save new otp to user account
  await prisma.users_meta.update({
    where: { userId: updatingUser.meta.userId },
    data: {
      access_token: OTP,
    },
  });

  // generate activationToken
  const activationToken = jwt.sign(
    { email: updatingUser.email },
    process.env.USER_ACTIVATION_JWT_STRING,
    { expiresIn: "1d" }
  );

  // send activationToken to cookie
  res.cookie("activationToken", activationToken);

  // generate link to verify account by url
  const verificationURL = `${process.env.CLIENT_URL}/url-verification/${activationToken}/${OTP}`;

  // send email
  await sendAccountActivationEmail(updatingUser.email, OTP, verificationURL);

  // return response
  return res.status(200).json({
    status: "ok",
    message: "OTP resent, check your email",
  });
});

/**
 * @description LOGOUT USER
 * @mthod POST
 * @route /api/v1/auth/logout
 * @access private
 */
export const logoutUser = expressAsyncHandler(async (req, res) => {
  // get accessToken from cookie
  const accessToken = req.cookies.accessToken;

  // verify accessToken
  const verifiedToken = jwt.verify(
    accessToken,
    process.env.USER_LOGIN_JWT_STRING
  );

  // if token invalid, return error
  if (!verifiedToken) {
    return res.status(400).json({ status: "error", message: "Unauthorized" });
  }

  // remove all token from cookie
  res.clearCookie("accessToken");
  res.clearCookie("c_user");

  // send response
  res.status(200).json({ status: "success", message: "Logout success" });
});

/**
 * @description LOGOUT USER
 * @mthod POST
 * @route /api/v1/auth/me
 * @access private
 */
export const getLoggedInUser = expressAsyncHandler(async (req, res) => {
  // validing user logged in or not. If not then return
  if (!req.me) {
    return res
      .status(400)
      .json({ status: "error", message: "You are not logged in!" });
  }

  // prepare loginUser object to send in response
  const loginUser = await prisma.users.findUnique({
    where: { id: req.me.id },
    select: {
      id: true,
      email: true,
      meta: {
        select: {
          isVerified: true,
          name: true,
          photo: true,
          phone: true,
          role: true,
          addresses: true,
          orders: true,
        },
      },
    },
  });

  // logged in user response
  res.status(200).json({
    status: "success",
    message: "You are logged in!",
    data: loginUser,
  });
});

/**
 * @description FORGOT PASSWORD REQUEST
 * @mthod POST
 * @route /api/v1/auth/forgot-password-request
 * @access public
 */
export const forgotPasswordRequest = expressAsyncHandler(async (req, res) => {
  // get user email
  const { email } = req.body;

  // empty validation
  if (!email) {
    return res
      .status(400)
      .json({ status: "error", message: "Email is required" });
  }

  // if invalid email
  if (!isEmail(email)) {
    return res
      .status(400)
      .json({ status: "error", message: "Please use valid email" });
  }

  // find user using email address
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
    include: {
      meta: true,
    },
  });

  // if no user found in db, return error
  if (!user) {
    return res
      .status(400)
      .json({ status: "error", message: "Email is not registered" });
  }

  // create otp
  const OTP = createOTP();

  // save OTP to user_meta in db
  await prisma.users_meta.update({
    where: { userId: user.id },
    data: {
      access_token: OTP,
    },
  });

  // generate activationToken
  const activationToken = jwt.sign(
    { email },
    process.env.USER_ACTIVATION_JWT_STRING,
    { expiresIn: "1d" }
  );

  // send forgot password email
  await sendForgotPasswordEmail(email, OTP);

  // set activationToken to cookies
  res.cookie("activationToken", activationToken);
  res.cookie("c_user", user.id);

  // logged in user response
  res
    .status(200)
    .json({ status: "success", message: "OTP sent to your email" });
});

/**
 * @description FORGOT PASSWORD REQUEST ACCEPT
 * @mthod PATCH
 * @route /api/v1/auth/forgot-password-request-accept
 * @access public
 */
export const forgotPasswordRequestAccept = expressAsyncHandler(
  async (req, res) => {
    // get user email
    const { password, confirmPassword, otp } = req.body;

    // empty validation
    if (!password || !confirmPassword || !otp) {
      return res
        .status(400)
        .json({ status: "error", message: "All fields are required" });
    }

    // if password & confirmPassword not matched, return error
    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "error",
        message: "Confirm password not matched with new password",
      });
    }

    // if password length less than 8 character, return error
    if (password.length < 8) {
      return res.status(400).json({
        status: "error",
        message: "Password should be at least 8 characters",
      });
    }

    // if otp length is not 5 digit, return error
    if (otp.length !== 5) {
      return res.status(400).json({
        status: "error",
        message: "OTP should be 5 digit",
      });
    }

    // getting activationToken cookie
    const activationToken = req.cookies.activationToken;

    // if activationToken not found, return error
    if (!activationToken) {
      return res.status(400).json({ status: "error", message: "Unauthorized" });
    }

    // verify activation token
    const verifiedToken = jwt.verify(
      activationToken,
      process.env.USER_ACTIVATION_JWT_STRING
    );

    // if token is invalid, return error
    if (!verifiedToken) {
      return res.status(400).json({ status: "error", message: "Unauthorized" });
    }

    // find user using email address
    const user = await prisma.users.findUnique({
      where: {
        email: verifiedToken.email,
      },
      include: {
        meta: true,
      },
    });

    // if no user found in db, return error
    if (!user) {
      return res
        .status(400)
        .json({ status: "error", message: "Email is not found" });
    }

    // encrypt password
    const hashPassword = await bcrypt.hash(password, 10);

    // save OTP to user_meta in db
    await prisma.users.update({
      where: { id: user.id },
      data: {
        password: hashPassword,
        meta: {
          update: {
            access_token: null,
          },
        },
      },
    });

    // clear cookies
    res.clearCookie("activationToken");
    res.clearCookie("c_user");

    // logged in user response
    res
      .status(200)
      .json({ status: "ok", message: "Password reset success. Login now" });
  }
);

/**
 * @description UPDATE USER META
 * @mthod PATCH
 * @route /api/v1/auth/update-user-meta
 * @access private
 */
export const updateUserMeta = expressAsyncHandler(async (req, res) => {
  // get updateable data object
  const updateableData = req.body;

  // update data
  const updatedMeta = await prisma.users_meta.update({
    where: {
      userId: req.me.id,
    },
    data: {
      ...updateableData,
    },
  });

  // Check if update was successful
  if (!updatedMeta) {
    return res.status(500).json({
      status: "error",
      message: "Failed to update information. please try again",
    });
  }

  // get user to send in response
  const updatedUser = await prisma.users.findUnique({
    where: { id: req.me.id },
    select: {
      id: true,
      email: true,
      meta: {
        select: {
          isVerified: true,
          name: true,
          photo: true,
          phone: true,
        },
      },
    },
  });

  // logged in user response
  res.status(200).json({
    status: "success",
    message: "Profile update successful",
    data: updatedUser,
  });
});

/**
 * @description UPDATE PASSWORD FROM MY ACCOUNT
 * @mthod PATCH
 * @route /api/v1/auth/update-password
 * @access private
 */
export const updatePassword = expressAsyncHandler(async (req, res) => {
  // get updateable data object
  const { oldPassword, newPassword, confirmPassword } = req.body;

  // empty field validation
  if (!oldPassword || !newPassword || !confirmPassword) {
    return res
      .status(400)
      .json({ status: "error", message: "All fields are required!" });
  }

  // get current user
  const currentUser = await prisma.users.findUnique({
    where: { id: req.me.id },
  });

  // match oldPassword with db
  const matchOldPassword = await bcrypt.compare(
    oldPassword,
    currentUser?.password
  );
  // if old password not match, return error
  if (!matchOldPassword) {
    return res
      .status(400)
      .json({ status: "error", message: "Old password is not matched" });
  }

  // validate newPassword length
  if (newPassword.length < 8) {
    return res.status(400).json({
      status: "error",
      message: "New password should be at least 8 characters",
    });
  }

  // match newPassword & confirmPassword
  if (newPassword !== confirmPassword) {
    return res
      .status(400)
      .json({ status: "error", message: "Confirm password is not matched" });
  }

  // encrypt password
  const hashPassword = await bcrypt.hash(newPassword, 10);

  // update data
  const updatePassword = await prisma.users.update({
    where: { id: currentUser.id },
    data: {
      password: hashPassword,
    },
  });

  // Check if update was successful
  if (!updatePassword) {
    return res.status(500).json({
      status: "error",
      message: "Failed to update information. please try again",
    });
  }

  // get user to send in response
  const updatedUser = await prisma.users.findUnique({
    where: { id: req.me.id },
    select: {
      id: true,
      email: true,
      meta: {
        select: {
          isVerified: true,
          name: true,
          photo: true,
          phone: true,
        },
      },
    },
  });

  // logged in user response
  res.status(200).json({
    status: "success",
    message: "Password update successful",
    data: updatedUser,
  });
});

/**
 * @description EMAIL UPDATE REQUEST
 * @mthod POST
 * @route /api/v1/auth/update-email-request
 * @access private
 */
export const updateEmailRequest = expressAsyncHandler(async (req, res) => {
  // get email from payload
  const { email } = req.body;

  // empty validation
  if (!email) {
    return res
      .status(400)
      .json({ status: "error", message: "Email is required!" });
  }

  // if email not valid, return error
  if (!isEmail(email)) {
    return res
      .status(400)
      .json({ status: "error", message: "Email is not valid" });
  }

  // if email already used, return error
  const isUniqueEmail = await prisma.users.findUnique({
    where: {
      email: email,
    },
  });

  if (isUniqueEmail) {
    return res
      .status(400)
      .json({ status: "error", message: "Email already used" });
  }

  // generate otp
  const OTP = createOTP();

  // generate emailChangeToken
  const ect = jwt.sign(
    { newEmail: email },
    process.env.USER_EMAIL_UPDATE_JWT_STRING,
    {
      expiresIn: "1d",
    }
  );

  // update user meta to save OTP
  const userMetaUpdate = await prisma.users_meta.update({
    where: {
      userId: req.me.id,
    },
    data: {
      access_token: OTP,
    },
  });

  // if update failed, return error
  if (!userMetaUpdate) {
    return res
      .status(400)
      .json({ status: "error", message: "Something wrong! Try again" });
  }

  // set emailChangeToken in cookie
  res.cookie("ect", ect);

  // send email
  await sendEmailUpdateTokenEmail(req.me.email, OTP, email);

  // response
  res.status(200).json({ staus: "ok", message: "OTP sent to email!" });
});

/**
 * @description EMAIL UPDATE REQUEST VALIDATION & APPROVE
 * @mthod POST
 * @route /api/v1/auth/update-email-request-validation
 * @access private
 */
export const updateEmailRequestValidationAndApprove = expressAsyncHandler(
  async (req, res) => {
    // get otp from the payload
    const { otp } = req.body;

    // otp length validation
    if (otp.length !== 5) {
      return res
        .status(400)
        .json({ status: "error", message: "OTP should be 5 digit" });
    }

    // get emailChangeToken from cooke
    const ect = req.cookies.ect;

    // verify emailChangeToken
    const verifiedEmailChangeToken = jwt.verify(
      ect,
      process.env.USER_EMAIL_UPDATE_JWT_STRING
    );

    // if token is not valid, return error
    if (!verifiedEmailChangeToken) {
      return res
        .status(400)
        .json({ status: "error", message: "Unauthorized!" });
    }

    // if otp is not matched with db, return error
    if (req.me.meta.access_token !== otp) {
      return res
        .status(400)
        .json({ status: "error", message: "OTP is not  matched" });
    }

    // update user email and remove access_token
    const updatedUser = await prisma.users.update({
      where: {
        id: req.me.id,
      },
      data: {
        email: verifiedEmailChangeToken.newEmail,
        meta: {
          update: {
            data: {
              access_token: null,
            },
          },
        },
      },
      include: {
        meta: true,
      },
    });

    // if update failed, return error
    if (!updatedUser) {
      return res.status(400).json({
        status: "error",
        message: "Something wrong, please try again",
      });
    }

    // remove emailChangeToken from cookie
    res.clearCookie("ect");

    // send response
    res.status(200).json({
      status: "success",
      message: "Email updated successfully",
      data: updatedUser,
    });
  }
);

/**
 * @description  ADD NEW ADDRESS TO USER PROFILE
 * @mthod POST
 * @route /api/v1/auth/addresses
 * @access private
 */
export const addNewAddress = expressAsyncHandler(async (req, res) => {
  // get data from request body
  const { zip_code, ...addressDetails } = req.body;
  const userId = req.me.id;

  // empty validation
  if (
    !addressDetails.full_name ||
    !addressDetails.email ||
    !addressDetails.phone ||
    !addressDetails.street_address ||
    !addressDetails.district ||
    !addressDetails.country ||
    !zip_code ||
    !userId
  ) {
    return res
      .status(400)
      .json({ status: "error", message: "All fields are required!" });
  }

  // add new data on addresses table
  const createdAddress = await prisma.addresses.create({
    data: {
      ...addressDetails,
      zip_code: parseInt(zip_code),
      userId: parseInt(userId),
    },
  });

  // send response
  res.status(201).json({
    status: "success",
    message: "New address added successfully",
    data: createdAddress,
  });
});

/**
 * @description  DELETE SINGLE ADDRESS FROM USER PROFILE
 * @mthod POST
 * @route /api/v1/auth/addresses/:id
 * @access private
 */
export const deleteSingleAddress = expressAsyncHandler(async (req, res) => {
  // get deleteable address id from params
  const id = parseInt(req.params.id);

  // empty validation
  if (!id) {
    return res
      .status(400)
      .json({ status: "error", message: "Address ID cannot be empty" });
  }

  // get deleteable address
  const deleteableAddress = await prisma.addresses.findUnique({
    where: { id },
  });

  // if deleteableAddress not found, return error
  if (!deleteableAddress) {
    return res
      .status(400)
      .json({ status: "error", message: "Address not found" });
  }

  // delete address
  try {
    await prisma.addresses.delete({ where: { id } });
  } catch (error) {
    return res
      .status(400)
      .json({ status: "error", message: "Something wrong, try again" });
  }

  // send response
  res.status(200).json({
    status: "success",
    message: "Address deleted successfully",
    data: deleteableAddress,
  });
});
