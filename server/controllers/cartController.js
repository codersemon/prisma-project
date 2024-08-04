// dependencies
import expressAsyncHandler from "express-async-handler";
import prisma from "../prisma/prismaClient.js";

/**
 * @description ADD NEW CART ITEM
 * @mthod POST
 * @route /api/v1/cart
 * @access private
 */
export const addNewCartItem = expressAsyncHandler(async (req, res) => {
  //payload from the submission
  const quantity = parseInt(req.body.quantity);
  const productId = parseInt(req.body.productId);
  const userId = parseInt(req?.me?.id);

  // if userId not found, return error
  if (!userId) {
    return res.status(401).json({ status: "error", message: "Unauthorized!" });
  }

  // quantity empty validation
  if (!quantity || !productId) {
    return res
      .status(400)
      .json({ status: "error", message: "All fields are required!" });
  }

  // check same product is exist with same user id
  const isItemInCart = await prisma.productCarts.findMany({
    where: {
      productId: productId,
      userId: userId,
    },
  });

  // item
  let item;
  if (isItemInCart.length > 0) {
    // update item, if already eist in db
    item = await prisma.productCarts.update({
      where: {
        id: isItemInCart[0].id,
      },
      data: {
        quantity: isItemInCart[0].quantity + quantity,
      },
      include: {
        product: {
          include: {
            thumbnail: true,
          },
        },
      },
    });
  } else {
    // create cart item in db if not exist in db
    item = await prisma.productCarts.create({
      data: {
        quantity,
        userId: userId,
        productId: productId,
      },
      include: {
        product: {
          include: {
            thumbnail: true,
          },
        },
      },
    });
  }

  // check product existence in wishlist by userId
  const productExistInWishlist = await prisma.wishlists.findMany({
    where: {
      userId,
      productId,
    },
  });

  // if product exist in wishlist, remove from wishlist
  if (productExistInWishlist.length > 0) {
    await prisma.wishlists.deleteMany({
      where: {
        userId,
        productId,
      },
    });
  }

  // send response
  res.status(201).json({
    status: "success",
    message: "Product added to cart",
    data: item,
  });
});

/**
 * @description GET ALL CART ITEMs
 * @mthod GET
 * @route /api/v1/cart
 * @access private
 */
export const getAllCartItems = expressAsyncHandler(async (req, res) => {
  //payload from the submission
  const userId = parseInt(req?.me?.id);

  // if userId not found, return error
  if (!userId) {
    return res.status(401).json({ status: "error", message: "Unauthorized!" });
  }

  // get cart items
  const cartItems = await prisma.productCarts.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      quantity: true,
      productId: true,
      product: {
        select: {
          name: true,
          price: true,
          sale_price: true,
          regular_price: true,
          weight: true,
          thumbnail: true,
          slug: true,
          stock_status: true,
          stock_quantity: true,
        },
      },
    },
  });

  // send response
  res.status(200).json({
    status: "ok",
    message: "All cart items fetched",
    data: cartItems,
  });
});

/**
 * @description DELETE CART ITEM BY ITEM ID & USERID
 * @mthod delete
 * @route /api/v1/cart/:id
 * @access private
 */
export const deleteCartItem = expressAsyncHandler(async (req, res) => {
  //payload from the submission
  const itemId = parseInt(req.params.id);
  const userId = parseInt(req?.me?.id);

  // if userId not found, return error
  if (!userId) {
    return res.status(401).json({ status: "error", message: "Unauthorized!" });
  }

  // check item available on db
  const itemExistOnDB = await prisma.productCarts.findUnique({
    where: {
      id: itemId,
      userId: userId,
    },
  });

  // if item not exist in db, return error
  if (!itemExistOnDB) {
    return res
      .status(400)
      .json({ status: "error", message: "Item is not exist in cart" });
  }

  // delete item from db
  const deletedItem = await prisma.productCarts.delete({
    where: {
      id: itemId,
      userId: userId,
    },
  });

  // send response
  res.status(200).json({
    status: "success",
    message: "Item removed from cart",
    data: deletedItem,
  });
});

/**
 * @description ADD NEW CART ITEM
 * @mthod PATCH
 * @route /api/v1/cart/:id
 * @access private
 */
export const updateCartItem = expressAsyncHandler(async (req, res) => {
  //payload from the submission
  const quantity = parseInt(req.body.quantity);
  const productId = parseInt(req.params.id);
  const userId = parseInt(req?.me?.id);

  // if userId not found, return error
  if (!userId) {
    return res.status(401).json({ status: "error", message: "Unauthorized!" });
  }

  // quantity empty validation
  if (!quantity || !productId) {
    return res
      .status(400)
      .json({ status: "error", message: "All fields are required!" });
  }

  // check same product is exist with same user id
  const isItemInCart = await prisma.productCarts.findMany({
    where: {
      productId: productId,
      userId: userId,
    },
  });

  // item
  let item;
  if (isItemInCart.length > 0) {
    // update item, if already eist in db
    item = await prisma.productCarts.update({
      where: {
        id: isItemInCart[0].id,
      },
      data: {
        quantity: quantity,
      },
      include: {
        product: {
          include: {
            thumbnail: true,
          },
        },
      },
    });
  }

  // send response
  res.status(201).json({
    status: "success",
    message: "Cart updated",
    data: item,
  });
});
