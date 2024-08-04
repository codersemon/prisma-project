// dependencies
import expressAsyncHandler from "express-async-handler";
import prisma from "../prisma/prismaClient.js";

/**
 * @description CREATE NEW ORDER
 * @mthod POST
 * @route /api/v1/orders
 * @access private
 */
export const createNewOrder = expressAsyncHandler(async (req, res) => {
  // get all data from payload
  const { cartIDs, ...orderData } = req.body;
  const userId = req.me.id;

  if (!orderData.shipping_address_id) {
    orderData.shipping_address_id = orderData.billing_address_id;
  }

  // Billing address validity
  if (!orderData.billing_address_id) {
    return res
      .status(400)
      .json({ status: "error", message: "Please select a billing address!" });
  }
  // Payment method validation
  if (!orderData.payment_method) {
    return res
      .status(400)
      .json({ status: "error", message: "Please select a payment method!" });
  }

  // order data validaton
  if (!orderData.sub_total || !orderData.order_total) {
    return res
      .status(400)
      .json({ status: "error", message: "Some required data is missing" });
  }

  // create order
  const createdOrder = await prisma.orders.create({
    data: {
      ...orderData,
      userId: userId,
    },
  });

  // get cart items
  const items = await prisma.productCarts.findMany({
    where: {
      id: {
        in: cartIDs,
      },
    },
    include: {
      product: true,
    },
  });

  // cart items validity. if have no item, return errors
  if (items.length < 1) {
    return res
      .status(400)
      .json({ status: "error", message: "No product found in cart!" });
  }

  // create orderItems Object array from cart items
  const orderItemsData = items?.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
    price: item.product.price,
    orderId: createdOrder.id,
  }));

  // create order items
  await prisma.orderItems.createMany({
    data: orderItemsData,
  });

  // delete cart items
  await prisma.productCarts.deleteMany({
    where: {
      id: {
        in: items?.map((item) => item.id),
      },
    },
  });

  // get order to send in response
  const createdOrderData = await prisma.orders.findUnique({
    where: { id: createdOrder.id },
    include: {
      billing_address: true,
      shipping_address: true,
      user: {
        include: {
          user: true,
        },
      },
      items: {
        include: {
          product: {
            include: {
              thumbnail: true,
            },
          },
        },
      },
    },
  });

  // send response
  res.status(201).json({
    status: "success",
    message: "Order placed successfully",
    data: createdOrderData,
  });
});

/**
 * @description GET ALL ORDERs
 * @mthod GET
 * @route /api/v1/orders
 * @access private
 */
export const getAllOrders = expressAsyncHandler(async (req, res) => {
  // get all orders
  const orders = await prisma.orders.findMany({
    include: {
      billing_address: true,
      shipping_address: true,
      user: {
        include: {
          user: true,
        },
      },
      items: {
        include: {
          product: {
            include: {
              thumbnail: true,
            },
          },
        },
      },
    },
  });

  // send response
  res
    .status(200)
    .json({ status: "success", message: "All orders", data: orders });
});

/**
 * @description GET ALL ORDERs by USER ID
 * @mthod GET
 * @route /api/v1/orders-by-user/:id
 * @access private
 */
export const getAllOrdersByUserId = expressAsyncHandler(async (req, res) => {
  // get user id from params
  const id = parseInt(req.params.id);

  // get all orders by user id
  const orders = await prisma.orders.findMany({
    where: {
      userId: id,
    },
    include: {
      billing_address: true,
      shipping_address: true,
      user: {
        include: {
          user: true,
        },
      },
      items: {
        include: {
          product: {
            include: {
              thumbnail: true,
            },
          },
        },
      },
    },
  });

  // send response
  res.status(200).json({
    status: "success",
    message: "All orders placed by current user",
    data: orders,
  });
});

/**
 * @description GET SINGLE ORDER by ORDER ID
 * @mthod GET
 * @route /api/v1/order/:id
 * @access private
 */
export const getSingleOrderById = expressAsyncHandler(async (req, res) => {
  // get user id from middleware
  const userId = req.me.id;
  // get order id from params
  const id = parseInt(req.params.id);

  // get all orders by user id
  const orders = await prisma.orders.findUnique({
    where: {
      userId,
      id,
    },
    include: {
      billing_address: true,
      shipping_address: true,
      user: {
        include: {
          user: true,
        },
      },
      items: {
        include: {
          product: {
            include: {
              thumbnail: true,
            },
          },
        },
      },
    },
  });

  // send response
  res.status(200).json({
    status: "success",
    message: "All orders placed by current user",
    data: orders,
  });
});

/**
 * @description EDIT SINGLE ORDER by ORDER ID
 * @mthod PATCH
 * @route /api/v1/order/:id
 * @access private
 */
export const editSingleOrder = expressAsyncHandler(async (req, res) => {
  // get editable order id
  const id = parseInt(req.params.id);
  // get data from payload
  const data = req.body;

  // update order
  await prisma.orders.update({
    where: {
      id,
    },
    data: { ...data },
  });

  // get updated order data from db
  const updatedOrder = await prisma.orders.findUnique({
    where: {
      id,
    },
    include: {
      billing_address: true,
      shipping_address: true,
      user: {
        include: {
          user: true,
        },
      },
      items: {
        include: {
          product: {
            include: {
              thumbnail: true,
            },
          },
        },
      },
    },
  });

  // send response
  res.status(200).json({
    status: "success",
    message: "Order updated successfully",
    data: updatedOrder,
  });
});

/**
 * @description DELETE SINGLE ORDER by ORDER ID
 * @mthod DELETE
 * @route /api/v1/order/:id
 * @access private
 */
export const deleteSingleOrder = expressAsyncHandler(async (req, res) => {
  // get deleteable order id
  const id = parseInt(req.params.id);

  // get deleteable order
  const deleteableOrder = await prisma.orders.findUnique({ where: { id } });

  // delete items by order id
  try {
    await prisma.orderItems.deleteMany({ where: { orderId: id } });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Something wrong, please try again",
    });
  }

  // delete order
  try {
    await prisma.orders.delete({ where: { id } });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Something wrong, please try again",
    });
  }

  // send response
  res.status(200).json({
    status: "success",
    message: "Order deleted successfully",
    data: deleteableOrder,
  });
});
