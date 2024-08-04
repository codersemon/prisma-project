// dependencies
import expressAsyncHandler from "express-async-handler";
import prisma from "../prisma/prismaClient.js";

/**
 * @description ADD PRODUCT REVIEW
 * @mthod POST
 * @route /api/v1/product-reviews
 * @access private
 */
export const addProdcutReview = expressAsyncHandler(async (req, res) => {
  // get review data from payload
  const rating = parseInt(req.body.rating);
  const productId = parseInt(req.body.productId);
  const comment = req.body.comment;

  // get userId from middleware
  const userId = req.me.id;

  // rating empty validation
  if (!rating) {
    return res
      .status(400)
      .json({ status: "error", message: "Rating is required!" });
  }

  // get all order id by user id
  const orderIdsObject = await prisma.orders.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
    },
  });

  // create order id array from orderIdsObject
  const orderIDs = orderIdsObject.map((item) => item.id);

  // check user has purchased the product
  const checkPurchase = await prisma.orderItems.findMany({
    where: {
      productId,
      orderId: {
        in: orderIDs,
      },
    },
  });

  // if user have not purchased the product, return error
  if (!checkPurchase.length > 0) {
    return res.status(400).json({
      status: "error",
      message: "User has not purchased the product yet.",
    });
  }

  // add review to db
  let review;
  try {
    review = await prisma.productReviews.create({
      data: {
        rating,
        comment,
        userId,
        productId,
      },
      select: {
        rating: true,
        comment: true,
        userId: true,
        productId: true,
        createdAt: true,
        user: {
          select: {
            name: true,
            photo: true,
          },
        },
      },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ status: "error", message: "Something wrong! please try again" });
  }

  // send response
  res.status(201).json({
    status: "success",
    message: "Review added. Will be publish after checking by authority",
    data: review,
  });
});

/**
 * @description GET ALL PRODUCT REVIEWS
 * @mthod GET
 * @route /api/v1/product-reviews
 * @access private
 */
export const getAllProdcutReviews = expressAsyncHandler(async (req, res) => {
  // get all product reviews
  const allProductReviews = await prisma.productReviews.findMany({
    select: {
      id: true,
      comment: true,
      rating: true,
      userId: true,
      productId: true,
      createdAt: true,
      status: true,
      product: {
        select: {
          name: true,
        },
      },
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  // send response
  res.status(200).json({
    status: "success",
    message: "All product reviews",
    data: allProductReviews,
  });
});

/**
 * @description DELETE SINGLE PRODUCT REVIEW
 * @mthod DELETE
 * @route /api/v1/product-review/:id
 * @access private
 */
export const deleteSingleProdcutReview = expressAsyncHandler(
  async (req, res) => {
    // get deleteable product review id from params
    const id = parseInt(req.params.id);

    // check review existence
    const deleteableReview = await prisma.productReviews.findUnique({
      where: { id },
    });

    // if review not found, return error
    if (!deleteableReview) {
      return res
        .status(400)
        .json({ status: "error", message: "Review not found!" });
    }

    // delete review
    try {
      await prisma.productReviews.delete({ where: { id } });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: "Something wrong! please try again",
      });
    }

    // send response
    res.status(200).json({
      status: "ok",
      message: "Review deleted successfully",
      data: deleteableReview,
    });
  }
);

/**
 * @description EDIT SINGLE PRODUCT REVIEW
 * @mthod PATCH
 * @route /api/v1/product-review/:id
 * @access private
 */
export const editSingleProdcutReview = expressAsyncHandler(async (req, res) => {
  // get editable product review id from params
  const id = parseInt(req.params.id);

  // get review data
  const { rating, ...data } = req.body;

  // check review existence
  const editableReview = await prisma.productReviews.findUnique({
    where: { id },
  });

  // if review not found, return error
  if (!editableReview) {
    return res
      .status(400)
      .json({ status: "error", message: "Review not found!" });
  }

  // update review
  try {
    await prisma.productReviews.update({
      where: { id },
      data: {
        ...data,
        rating: parseInt(rating),
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Something wrong! please try again",
    });
  }

  // get updated review to send with response
  const updatedReview = await prisma.productReviews.findUnique({
    where: { id },
    select: {
      id: true,
      comment: true,
      rating: true,
      userId: true,
      productId: true,
      createdAt: true,
      status: true,
      product: {
        select: {
          name: true,
        },
      },
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  // send response
  res.status(200).json({
    status: "success",
    message: "Review updated successfully",
    data: updatedReview,
  });
});

/**
 * @description GET SINGLE PRODUCT REVIEW
 * @mthod GET
 * @route /api/v1/product-review/:id
 * @access private
 */
export const getSingleProdcutReview = expressAsyncHandler(async (req, res) => {
  // get review id from params
  const id = parseInt(req.params.id);

  // get all product reviews
  const singleReview = await prisma.productReviews.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      comment: true,
      rating: true,
      userId: true,
      productId: true,
      createdAt: true,
      status: true,
      product: {
        select: {
          name: true,
        },
      },
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  // if review not found, return error
  if (!singleReview) {
    return res
      .status(400)
      .json({ status: "error", message: "Review not found" });
  }

  // send response
  res.status(200).json({
    status: "success",
    message: "All product reviews",
    data: singleReview,
  });
});
