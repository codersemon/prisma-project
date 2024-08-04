// dependencies
import bcrypt from "bcrypt";
import expressAsyncHandler from "express-async-handler";
import { isEmail } from "../helpers/helpers.js";
import prisma from "../prisma/prismaClient.js";

/**
 * @description - CREATE USER ACCOUNT BY ADMIN
 * @methods - POST
 * @route /api/v1/users
 * @access private
 */
export const createUserAccount = expressAsyncHandler(async (req, res) => {
  // get form submission data
  const { email, password, ...data } = req.body;

  // empty validation
  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Email & password fields are required!",
    });
  }

  // role empty validation
  if (!data.role) {
    return res.status(400).json({
      status: "error",
      message: "User role is required!",
    });
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

  // create user
  let user;
  try {
    user = await prisma.users.create({
      data: {
        email: email.trim(),
        password: hashPassword,
        meta: {
          create: {
            ...data,
          },
        },
      },
      include: {
        meta: true,
      },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ status: "error", message: "Something wrong! try again" });
  }

  // destructure password and other information
  const { password: pass, ...createdAccountInfo } = user;

  // send response
  res.status(201).json({
    status: "success",
    message: "User account created successfully",
    data: createdAccountInfo,
  });
});

/**
 * @description GET ALL REGISTERED USERS
 * @mthod GET
 * @route /api/v1/users
 * @access private
 */
export const getAllUsers = expressAsyncHandler(async (req, res) => {
  // get all users
  const users = await prisma.users.findMany({
    include: { meta: true },
  });

  // send response
  res
    .status(200)
    .json({ status: "success", message: "All users", data: users });
});

/**
 * @description DELETE SINGLE USER
 * @mthod DELETE
 * @route /api/v1/user/:id
 * @access private
 */
export const deleteSingleUser = expressAsyncHandler(async (req, res) => {
  // get deleteable user id from params
  const id = parseInt(req.params.id);

  // check deleteable user existence
  const deleteableUser = await prisma.users.findUnique({ where: { id } });

  // if deleteable user not found, return error
  if (!deleteableUser) {
    return res.status(400).json({ status: "error", message: "User not found" });
  }

  // delete user meta by userId
  try {
    await prisma.users_meta.delete({
      where: {
        userId: deleteableUser.id,
      },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ status: "error", message: "Something wrong! try again" });
  }

  // delete user
  try {
    await prisma.users.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ status: "error", message: "Something wrong! try again" });
  }

  // send response
  res.status(200).json({
    status: "ok",
    message: "User deleted successfully",
    data: deleteableUser,
  });
});

/**
 * @description UPDATE SINGLE USER
 * @mthod PATCH
 * @route /api/v1/user/:id
 * @access private
 */
export const updateSingleUser = expressAsyncHandler(async (req, res) => {
  // get updateable user id
  const id = parseInt(req.params.id);

  // updateable data
  const { email, ...userMetaData } = req.body;

  // check updateable user existence
  const updateableUser = await prisma.users.findUnique({ where: { id } });

  // if user not found, return error
  if (!updateableUser) {
    return res
      .status(400)
      .json({ status: "error", message: "User not found!" });
  }

  // update user
  try {
    await prisma.users.update({
      where: {
        id,
      },
      data: {
        email,
        meta: {
          update: {
            data: {
              ...userMetaData,
            },
          },
        },
      },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ status: "error", message: "Something wrong, try again" });
  }

  // get updated user data
  const { password, ...updatedUserData } = await prisma.users.findUnique({
    where: { id },
  });

  // send response
  res.status(200).json({
    status: "success",
    message: "User updated successfully",
    data: updatedUserData,
  });
});

/**
 * @description GET SINGLE USER
 * @mthod GET
 * @route /api/v1/user/:id
 * @access private
 */
export const getSingleUser = expressAsyncHandler(async (req, res) => {
  // get deleteable user id from params
  const id = parseInt(req.params.id);

  // check deleteable user existence
  const singleUser = await prisma.users.findUnique({
    where: { id },
    include: {
      meta: true,
    },
  });

  // if deleteable user not found, return error
  if (!singleUser) {
    return res.status(400).json({ status: "error", message: "User not found" });
  }

  // send response
  res.status(200).json({
    status: "success",
    message: "Single user data",
    data: singleUser,
  });
});
