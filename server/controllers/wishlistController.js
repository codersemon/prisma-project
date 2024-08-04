// dependencies
import expressAsyncHandler from "express-async-handler";
import prisma from "../prisma/prismaClient.js";

/**
 * @description CREATE WISHLIST ITEM
 * @mthod POST
 * @route /api/v1/wishlist
 * @access private
 */
export const createWishlistItem = expressAsyncHandler(async (req, res) => {
  // get product id from payload
  const productId = parseInt(req.body.id);
  // get user id from verify middleware
  const userId = req.me.id;

  // id empty validation
  if (!productId) {
    return res
      .status(400)
      .json({ status: "error", message: "Product id is required!" });
  }

  // find product by id
  const product = await prisma.products.findUnique({
    where: { id: productId },
  });

  // if product not found by id, return error
  if (!product) {
    return res
      .status(400)
      .json({ status: "error", message: "Product is not found!" });
  }

  // check product in wishlist
  const productExistInWishlist = await prisma.wishlists.findMany({
    where: {
      productId,
      userId,
    },
  });

  // if product already exist in wishlist, return error
  if (productExistInWishlist.length > 0) {
    return res
      .status(400)
      .json({ status: "error", message: "Product already exist in wishlist" });
  }

  // create wishlist item
  const createdWishlistItem = await prisma.wishlists.create({
    data: {
      productId,
      userId,
    },
    include: {
      product: {
        include: {
          thumbnail: true,
          categories: {
            include: {
              category: true,
            },
          },
        },
      },
    },
  });

  // send response
  res.status(201).json({
    status: "success",
    message: "Product added in wishlist",
    data: createdWishlistItem,
  });
});

/**
 * @description GET ALL WISHLIST ITEMs BY USER ID
 * @mthod GET
 * @route /api/v1/wishlist-by-user-id/:id
 * @access private
 */
export const getAllWishlistItemByUserId = expressAsyncHandler(
  async (req, res) => {
    // get user id from params
    const userId = parseInt(req.params.id);

    // userId empty validation
    if (!userId) {
      return res
        .status(400)
        .json({ status: "error", message: "User not found!" });
    }

    // get all wishlist items
    const wishlistItems = await prisma.wishlists.findMany({
      where: { userId },
      include: {
        product: {
          include: {
            thumbnail: true,
            categories: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });

    // send response
    res.status(200).json({
      status: "success",
      message: "All wishlist items by user id",
      data: wishlistItems,
    });
  }
);

/**
 * @description DELETE WISHLIST ITEM
 * @mthod DELETE
 * @route /api/v1/wishlist/:id
 * @access private
 */
export const deleteWishlistItem = expressAsyncHandler(async (req, res) => {
  // get deleteable wishlist id from params
  const id = parseInt(req.params.id);

  // check wishlist item existence in db
  const deleteableItem = await prisma.wishlists.findUnique({ where: { id } });

  // if item not exist, return error
  if (!deleteableItem) {
    return res
      .status(400)
      .json({ status: "error", message: "Product not found in wishlist" });
  }

  // delete wishlist item
  try {
    await prisma.wishlists.delete({ where: { id } });
  } catch (error) {
    // if failed to delete return error
    return res
      .status(400)
      .json({ status: "error", message: "Something wrong, please try again." });
  }

  // send response
  res.status(200).json({
    status: "success",
    message: "Product removed from wishlist",
    data: deleteableItem,
  });
});
