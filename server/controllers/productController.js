// dependencies
import expressAsyncHandler from "express-async-handler";
import { createSlug, findPublicId } from "../helpers/helpers.js";
import { generateProductUniqeSlug } from "../helpers/uniquSlugGenerators.js";
import prisma from "../prisma/prismaClient.js";
import {
  deleteFileFromCloudinary,
  deleteMultipleFilesFromCloudinary,
} from "../utils/cloudinary.js";

/**
 * @description GET ALL PRODUCTS
 * @mthod GET
 * @route /api/v1/products
 * @access public
 */
// export const getAllProducts = expressAsyncHandler(async (req, res) => {
//   // get search query and set default value
//   const {
//     sortby = "createdAt",
//     order = "desc",
//     status = "publish",
//     page = 1,
//     per_page = 10,
//   } = req.query;

//   // validate query parameter
//   const validSortFields = [
//     "createdAt",
//     "updatedAt",
//     "name",
//     "price",
//     "sale_price",
//   ];
//   const validSortOrder = ["asc", "desc"];

//   // if sortby value is not in list, return error
//   if (!validSortFields.includes(sortby)) {
//     return res
//       .status(400)
//       .json({ status: "error", message: "'sortby' query value is not valid" });
//   }

//   // if order value is not in list, return error
//   if (!validSortOrder.includes(order)) {
//     return res
//       .status(400)
//       .json({ status: "error", message: "'order' query value is not valid" });
//   }

//   // convert page & per_page to  number
//   const pageNumber = Number(page);
//   const perPageNumber = Number(per_page);

//   // if page number is NaN or less than 1, return error
//   if (isNaN(pageNumber) || pageNumber < 1) {
//     return res
//       .status(400)
//       .json({ status: "error", message: "Invalid 'page' number" });
//   }

//   // if per_page number is NaN or less than 1, return error
//   if (isNaN(perPageNumber) || perPageNumber < 1) {
//     return res
//       .status(400)
//       .json({ status: "error", message: "Invalid 'per_page' value" });
//   }

//   // get total product count
//   const totalProducts = await prisma.products.count({
//     where: {
//       status: status,
//     },
//   });

//   // calcuate total pages
//   const totalPages = Math.ceil(totalProducts / perPageNumber);

//   // get products
//   const products = await prisma.products.findMany({
//     where: {
//       status: status,
//     },
//     orderBy: {
//       [sortby]: order,
//     },
//     take: perPageNumber,
//     skip: perPageNumber * (pageNumber - 1),
//     include: {
//       categories: {
//         include: {
//           category: true,
//         },
//       },
//       thumbnail: true,
//     },
//   });

//   // send response
//   res.status(200).json({
//     status: "success",
//     message: "All products",
//     data: {
//       total_page: totalPages,
//       current_page: pageNumber,
//       total_product: products.length,
//       products: products,
//     },
//   });
// });

export const getAllProducts = expressAsyncHandler(async (req, res) => {
  // get products
  const products = await prisma.products.findMany({
    include: {
      thumbnail: true,
      categories: {
        include: {
          category: true,
        },
      },
      galleries: {
        include: {
          media: true,
        },
      },
    },
  });

  // send response
  res.status(200).json({
    status: "success",
    message: "All products",
    data: products,
  });
});

/**
 * @description GET SINGLE PRODUCTS
 * @mthod GET
 * @route /api/v1/products/:slug
 * @access public
 */
export const getSingleProduct = expressAsyncHandler(async (req, res) => {
  // get product id from params
  const { slug } = req.params;

  // select product from db
  const product = await prisma.products.findUnique({
    where: {
      slug,
    },
    include: {
      thumbnail: true,
      categories: {
        include: {
          category: true,
        },
      },
      galleries: {
        include: {
          media: true,
        },
      },
      reviews: {
        include: {
          user: true
        }
      }
    },
  });

  // send response
  res.status(200).json({
    status: "success",
    message: "Single product fetched",
    data: product,
  });
});

/**
 * @description CREATE PRODUCT
 * @mthod POST
 * @route /api/v1/products/:slug
 * @access private
 */
export const updateSingleProduct = expressAsyncHandler(async (req, res) => {
  // get editable product
  const { slug } = req.params;

  // get form submission data
  const { categories, galleryItemIds, ...productInfo } = req.body;

  // get editable product
  const editableProduct = await prisma.products.findUnique({
    where: {
      slug,
    },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
      galleries: {
        include: {
          media: true,
        },
      },
    },
  });

  // Create categoryIds from payload
  const categoryIds = categories.map((item) => item.value);

  // Existing categoryIds in editableProduct.categories
  const existingCategoryIds = editableProduct.categories.map(
    (item) => item.categoryId
  );

  // find deleted categoryIds not present in categoryIds
  const deletedCategoryIds = existingCategoryIds.filter(
    (categoryId) => !categoryIds.includes(categoryId)
  );

  // find new categoryId not present in existingCategoryIds
  const newCategoryIds = categoryIds.filter(
    (categoryId) => !existingCategoryIds.includes(categoryId)
  );

  // Existing mediaIds in editableProduct.galleries
  const existingMediaIds = editableProduct.galleries.map(
    (item) => item.mediaId
  );

  // Find deleted mediaIds not present in galleryItemIds
  const deletedMediaIds = existingMediaIds.filter(
    (mediaId) => !galleryItemIds.includes(mediaId)
  );

  // Find new mediaIds not present in existingMediaIds
  const newMediaIds = galleryItemIds.filter(
    (mediaId) => !existingMediaIds.includes(mediaId)
  );

  // generate slug
  const newSlug = await generateProductUniqeSlug(productInfo.name);

  // update product
  const updatedProduct = await prisma.products.update({
    where: {
      slug,
    },
    data: {
      ...productInfo,
      price: productInfo?.sale_price
        ? parseFloat(productInfo.sale_price)
        : parseFloat(productInfo.regular_price),
      regular_price: parseFloat(productInfo.regular_price),
      sale_price: parseFloat(productInfo.sale_price),
      weight: parseFloat(productInfo.weight),
      width: parseFloat(productInfo.width),
      height: parseFloat(productInfo.height),
      length: parseFloat(productInfo["length"]),
      stock_quantity: Number(productInfo.stock_quantity),
      thumbnailId: parseInt(productInfo.thumbnailId),
      slug: newSlug,
    },
  });

  // Disconnect deleted category from product
  await prisma.categoriesOnProducts.deleteMany({
    where: {
      productId: updatedProduct.id,
      categoryId: {
        in: deletedCategoryIds,
      },
    },
  });

  // Connect new category to product
  await prisma.categoriesOnProducts.createMany({
    data: newCategoryIds.map((categoryId) => ({
      productId: updatedProduct.id,
      categoryId: parseInt(categoryId),
    })),
  });

  // Disconnect deleted Product Gallery item
  await prisma.productGalleries.deleteMany({
    where: {
      productId: updatedProduct.id,
      mediaId: {
        in: deletedMediaIds,
      },
    },
  });

  // Connect new Product Gallery item
  await prisma.productGalleries.createMany({
    data: newMediaIds.map((mediaId) => ({
      productId: updatedProduct.id,
      mediaId: parseInt(mediaId),
    })),
  });

  // get finalUpdated product
  const finalUpdatedProduct = await prisma.products.findUnique({
    where: {
      id: updatedProduct.id,
    },
    include: {
      thumbnail: true,
      categories: {
        include: {
          category: true,
        },
      },
      galleries: {
        include: {
          media: true,
        },
      },
    },
  });

  res.status(200).json({
    status: "success",
    message: "Product updated successfully",
    data: finalUpdatedProduct,
  });
});

/**
 * @description CREATE PRODUCT
 * @mthod POST
 * @route /api/v1/products
 * @access private
 */
export const createProduct = expressAsyncHandler(async (req, res) => {
  // form submission
  const { categories, galleryItemIds, ...productInfo } = req.body;

  // empty validation
  if (
    !productInfo.name ||
    !productInfo.regular_price ||
    !productInfo.status ||
    !productInfo.stock_status
  ) {
    return res
      .status(400)
      .json({
        status: "error",
        message: "Name, Price, Status, Stock Status is required",
      });
  }

  // create category name:value pair array
  const categoryData = categories?.map((category) => ({
    category: { connect: { name: category.value } },
  }));

  /**
   * create connection object to connect with "media" key on "productGallery" model
   */
  const galleryData = galleryItemIds?.map((mediaId) => ({
    media: { connect: { id: parseInt(mediaId) } },
  }));

  // generate slug
  const slug = await generateProductUniqeSlug(productInfo.name);

  // create product
  const product = await prisma.products.create({
    data: {
      ...productInfo,
      authorId: req.me.id,
      price: productInfo?.sale_price
        ? parseFloat(productInfo.sale_price)
        : parseFloat(productInfo.regular_price),
      regular_price: parseFloat(productInfo.regular_price),
      sale_price: parseFloat(productInfo.sale_price),
      weight: parseFloat(productInfo.weight),
      width: parseFloat(productInfo.width),
      height: parseFloat(productInfo.height),
      length: parseFloat(productInfo["length"]),
      stock_quantity: Number(productInfo.stock_quantity),
      thumbnailId: parseInt(productInfo.thumbnailId),
      slug,
      categories: {
        create: categoryData,
      },
      galleries: {
        create: galleryData,
      },
    },
    include: {
      thumbnail: true,
      categories: {
        include: {
          category: true,
        },
      },
      galleries: {
        include: {
          media: true,
        },
      },
    },
  });

  // send response
  res
    .status(200)
    .json({ status: "success", message: "Product created", data: product });
});

/**
 * @description DELETE PRODUCT
 * @mthod DELETE
 * @route /api/v1/products/:id
 * @access private
 */
export const deleteProduct = expressAsyncHandler(async (req, res) => {
  // deleteable product id
  const deleteableProductId = parseInt(req.params.id);

  // get deleteable product from db
  const deleteableProduct = await prisma.products.findUnique({
    where: {
      id: deleteableProductId,
    },
    include: {
      thumbnail: true,
      galleries: {
        include: {
          media: true,
        },
      },
    },
  });
  // if deleteable product not exist, return error
  if (!deleteableProduct) {
    return res
      .status(404)
      .json({ status: "error", message: "Deleteable product not exisit!" });
  }

  // get current user
  const currentUser = await prisma.users.findUnique({
    where: {
      id: req?.me?.id,
    },
    include: {
      meta: true,
    },
  });

  // if not admin, return error
  if (currentUser.meta.role !== "administrator") {
    return res.status(400).json({ status: "error", message: "Unauthorized!" });
  }

  // delete record from categoriesOnProduct table
  await prisma.categoriesOnProducts.deleteMany({
    where: {
      productId: deleteableProductId,
    },
  });

  // get productGalleries item
  const productGalleries = await prisma.productGalleries.findMany({
    where: {
      productId: deleteableProductId,
    },
    include: {
      media: true,
    },
  });

  /**
   * create cloudinary image url array from gallery items
   * add thumbnail url to gallery url array
   *
   * START
   */
  let deleteableMediasURL = [];
  let deleteableMediasID = [];
  // if have gallery item
  if (productGalleries.length > 0) {
    // URL Array
    deleteableMediasURL = productGalleries.map((item) => item.media.url);
    // ID Array
    deleteableMediasID = productGalleries.map((item) => item.mediaId);
  }
  // if have thubmnail
  if (deleteableProduct.thumbnail) {
    // URL Array
    deleteableMediasURL = [
      ...deleteableMediasURL,
      deleteableProduct.thumbnail.url,
    ];
    // ID Array
    deleteableMediasID = [
      ...deleteableMediasID,
      deleteableProduct.thumbnail.id,
    ];
  }

  /**
   * create cloudinary image url array from gallery items
   * add thumbnail url to gallery url array
   *
   * END
   */

  // if have deleteableMediasURL, then delete from cloudinary and db
  if (deleteableMediasURL.length > 0) {
    // delete all files (thumbnail & gallery image) from cloudinary
    await deleteMultipleFilesFromCloudinary(
      deleteableMediasURL,
      "prismaormcommerce/media"
    );

    // delete gallery item from productGalleries
    await prisma.productGalleries.deleteMany({
      where: {
        productId: deleteableProduct.id,
      },
    });

    // delete record from media table on db
    await prisma.media.deleteMany({
      where: {
        id: {
          in: deleteableMediasID,
        },
      },
    });
  }

  // get cart item
  const cartItemWithDeleteableProduct = await prisma.productCarts.findMany({
    where: { productId: deleteableProductId },
  });

  // if any product found on cart, then enter in this block
  if (cartItemWithDeleteableProduct) {
    await prisma.productCarts.deleteMany({
      where: { productId: deleteableProductId },
    });
  }

  // delete product from product table
  await prisma.products.delete({
    where: {
      id: deleteableProductId,
    },
  });

  // check is product deleted
  const deletedProduct = await prisma.products.findUnique({
    where: {
      id: deleteableProductId,
    },
  });

  // send response whether product is deleted or not
  if (!deletedProduct) {
    res.status(200).json({
      status: "ok",
      message: "Product deleted",
      data: deleteableProduct,
    });
  } else {
    res
      .status(400)
      .json({ status: "error", message: "Product is not deleted" });
  }
});

/**
 * @description CREATE PRODUCT CATEGORY
 * @mthod POST
 * @route /api/v1/product-categories
 * @access private
 */
export const createProductCategory = expressAsyncHandler(async (req, res) => {
  // get product category name from payload
  const { name, mediaId } = req.body;

  // empty validation
  if (!name) {
    return res
      .status(400)
      .json({ status: "error", message: "Category name is required!" });
  }

  // check category name duplication
  const isCategoryNameAlreadyExist = await prisma.productCategories.findUnique({
    where: {
      name: name.trim(),
    },
  });

  // if category name already exist, return error
  if (isCategoryNameAlreadyExist) {
    return res
      .status(400)
      .json({ status: "error", message: "Category already exist!" });
  }

  // create slug
  const slug = await createSlug(name);

  // try to create category
  let createdCategory = null;
  try {
    // create category
    createdCategory = await prisma.productCategories.create({
      data: {
        name: name.trim(),
        slug,
        photoId: parseInt(mediaId),
      },
      select: {
        // select id, name and (_count from products)
        id: true,
        name: true,
        slug: true,
        photo: true,
        _count: {
          select: {
            products: true,
          },
        },
      },
    });
  } catch (error) {
    // return error response
    return res.status(400).json({
      status: "error",
      message: "Something wrong!",
    });
  }

  // response
  res.status(201).json({
    status: "success",
    message: "Category added!",
    data: createdCategory,
  });
});

/**
 * @description GET ALL PRODUCT CATEGORY
 * @mthod GET
 * @route /api/v1/product-categories
 * @access public
 */
export const getAllProductCategory = expressAsyncHandler(async (req, res) => {
  // get all product category from db
  const allProductCategory = await prisma.productCategories.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      photo: true,
      _count: {
        select: {
          products: true,
        },
      },
    },
  });

  // response
  res.status(201).json({
    status: "success",
    message: "All category",
    data: allProductCategory,
  });
});

/**
 * @description GET SINGLE PRODUCT CATEGORY
 * @mthod GET
 * @route /api/v1/product-categories/:slug
 * @access public
 */
export const getSingleProductCategory = expressAsyncHandler(
  async (req, res) => {
    // get category id from params
    const slug = req.params.slug;

    // get all product category from db
    const productCategory = await prisma.productCategories.findUnique({
      where: {
        slug: slug,
      },
      select: {
        id: true,
        name: true,
        photoId: true,
        photo: true,
        slug: true,
        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    // response
    res.status(201).json({
      status: "success",
      message: "Product category retrieved successfully.",
      data: productCategory,
    });
  }
);

/**
 * @description DELETE SINGLE PRODUCT CATEGORY
 * @mthod DELETE
 * @route /api/v1/product-categories/:id
 * @access private
 */
export const deleteSingleProductCategory = expressAsyncHandler(
  async (req, res) => {
    // get category id from params
    const id = parseInt(req.params.id);

    // get deleteable product category
    const deleteableCategory = await prisma.productCategories.findUnique({
      where: {
        id: id,
      },
    });

    // delete all relationship data from "categoriesOnProducts" table
    await prisma.categoriesOnProducts.deleteMany({
      where: {
        categoryId: id,
      },
    });

    // delete category from "productCategories" table
    await prisma.productCategories.delete({
      where: {
        id: id,
      },
    });

    // delete media
    const deleteableMedia = await prisma.media.findUnique({
      where: { id: deleteableCategory.photoId },
    });

    // if deleteable media found, then remove from db & cloudinary
    if (deleteableMedia) {
      // delete media
      await prisma.media.delete({
        where: { id: deleteableMedia.id },
      });

      // delete file from cloudinary
      await deleteFileFromCloudinary(
        findPublicId(deleteableMedia.url),
        "prismaormcommerce/media"
      );
    }

    // response
    res.status(201).json({
      status: "success",
      message: "Product category deleted successfully.",
      data: deleteableCategory,
    });
  }
);

/**
 * @description UPDATE SINGLE PRODUCT CATEGORY
 * @mthod PATCH
 * @route /api/v1/product-categories/:slug
 * @access private
 */
export const updateSingleProductCategory = expressAsyncHandler(
  async (req, res) => {
    // get category id from params
    const slug = req.params.slug;

    // get category name
    const name = req.body.name.trim();
    const photoId = parseInt(req.body.photoId);
    const id = parseInt(req.body.id);

    // empty validation
    if (!name) {
      return res
        .status(400)
        .json({ status: "error", message: "Category name is required!" });
    }

    // check category name duplication
    // const isCategoryNameAlreadyExist =
    //   await prisma.productCategories.findUnique({
    //     where: {
    //       name: name,
    //     },
    //   });

    // // if category name already exist, return error
    // if (isCategoryNameAlreadyExist) {
    //   return res
    //     .status(400)
    //     .json({ status: "error", message: "Category already exist!" });
    // }

    // create slug
    const newSlug = await createSlug(name);

    // update category from "productCategories" table
    await prisma.productCategories.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        photoId: parseInt(photoId),
        slug: newSlug,
      },
    });

    // get updated product category
    const updatedCategory = await prisma.productCategories.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        photoId: true,
        photo: true,
        slug: true,
        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    // response
    res.status(201).json({
      status: "success",
      message: "Product category updated successfully.",
      data: updatedCategory,
    });
  }
);
