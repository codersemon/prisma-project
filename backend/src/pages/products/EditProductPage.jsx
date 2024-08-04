// dependencies
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { setDataInUploadedFilesState } from "../../feature/mediaSlice";
import {
  getSingleProduct,
  updateSingleProduct,
} from "../../feature/productAPISlice";
import {
  productSelect,
  setProductsStateMessageEmpty,
} from "../../feature/productSlice";
import useForm from "../../hooks/useForm";
import useMediaUploader from "../../hooks/useMediaUploader";
import { Toast } from "../../utils/sweetAlert";

const EditProductPage = () => {
  /**
   * Media uploader hook init
   */
  const { MediaUploader, uploadedFiles, uploaderIsLoading } =
    useMediaUploader();

  // product context
  const { status, categories, singleProduct, message, error } =
    useSelector(productSelect);

  /**
   * react-redux dispatch hook init
   */
  const dispatch = useDispatch();

  /**
   * react-router-dom navigate hook init
   */
  const navigate = useNavigate();

  /**
   * Get Editable product
   */
  const { slug } = useParams();

  // fetch singleProduct when slug is changed
  useEffect(() => {
    dispatch(getSingleProduct(slug));
  }, [dispatch, slug]);

  // create categories option to select
  const categoriesOption = categories?.map((item) => {
    return { value: item.id, label: item.name };
  });

  // form state
  const { input, handleInputChange, setInput } = useForm({});
  const [selectedCategories, setSelectedCategories] = useState([]);

  /**
   * Side effect handler for puplating input fields with editableProduct
   */
  useEffect(() => {
    setInput((prev) => ({
      ...prev,
      id: singleProduct?.id,
      slug: singleProduct?.slug,
      name: singleProduct?.name,
      status: singleProduct?.status,
      description: singleProduct?.description,
      short_description: singleProduct?.short_description,
      weight: singleProduct?.weight,
      width: singleProduct?.width,
      height: singleProduct?.height,
      length: singleProduct?.length,
      regular_price: singleProduct?.regular_price,
      sale_price: singleProduct?.sale_price,
      sku: singleProduct?.sku,
      stock_status: singleProduct?.stock_status,
      stock_quantity: singleProduct?.stock_quantity,
      thumbnailId: singleProduct?.thumbnailId,
    }));

    // get categories form single product and create array of object
    const categoriesOnProduct = singleProduct?.categories?.map((item) => ({
      value: item.categoryId,
      label: item.category.name,
    }));

    // set selected categories form product categories
    setSelectedCategories(categoriesOnProduct);

    // create object from product galleries to match data in redux state
    const galleryObjectFromProductDB = singleProduct?.galleries?.map(
      (item) => ({ id: item.media.id, url: item.media.url })
    );
    // set product Galleries to gallery uploader state
    dispatch(
      setDataInUploadedFilesState({
        uploaderId: "edit_gallery",
        data: galleryObjectFromProductDB,
      })
    );
  }, [singleProduct, setInput, dispatch]);

  // handle form submission
  const handleProductUpdateFormSubmission = (e) => {
    e.preventDefault();

    /**
     * if new thumbnail uploaded then use new thumbnailId, otherwise send original thumbnailId from product db
     * when check newly uploaded thumbnail, take last item to get last uploaded file
     */
    const lastUploadedThumbnailId =
      uploadedFiles?.edit_thumbnail?.length > 0
        ? uploadedFiles.edit_thumbnail[uploadedFiles.edit_thumbnail.length - 1]
            ?.id
        : input.thumbnailId;

    // gallery items ids
    const galleryItemIds = uploadedFiles?.edit_gallery?.map((item) => item.id);

    dispatch(
      updateSingleProduct({
        ...input,
        thumbnailId: lastUploadedThumbnailId,
        galleryItemIds,
        categories: selectedCategories,
      })
    );
  };

  useEffect(() => {
    if (status == "success") {
      if (message) {
        // show success message
        Toast.fire({ title: message, icon: "success" });

        // set state error, message, status empty
        dispatch(setProductsStateMessageEmpty());
      }

      // send to products list page
      navigate("/products");
    }

    if (error) {
      // show error message
      Toast.fire({ title: error, icon: "error" });

      // set state error, message, status empty
      dispatch(setProductsStateMessageEmpty());
    }
  }, [status, navigate, dispatch, message, error]);

  return (
    <>
      <Helmet>
        <title>Edit Product</title>
      </Helmet>
      <div className="page-body">
        {/* New Product Add Start */}
        <form
          className="theme-form theme-form-2 mega-form"
          onSubmit={handleProductUpdateFormSubmission}
          encType="multipart/form-data"
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-sm-8 m-auto">
                    <div className="text-end">
                      <Link
                        to={`http://localhost:3000/product/${singleProduct?.slug}`}
                        className="btn btn-animation justify-content-center mb-4 d-inline-block"
                        target="_blank"
                      >
                        View Product
                      </Link>
                    </div>

                    <div className="card">
                      <div className="card-body">
                        <div className="card-header-2">
                          <h5>Product Information</h5>
                        </div>

                        <div className="mb-4 row align-items-center">
                          <label className="form-label-title col-sm-3 mb-0">
                            Product Name
                          </label>
                          <div className="col-sm-9">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Product Name"
                              name="name"
                              value={input.name}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="mb-4 row align-items-center">
                          <label className="col-sm-3 col-form-label form-label-title">
                            Category
                          </label>
                          <div className="col-sm-9 select-wrap">
                            <Select
                              value={selectedCategories}
                              onChange={setSelectedCategories}
                              options={categoriesOption}
                              closeMenuOnSelect={false}
                              isMulti={true}
                            />
                          </div>
                        </div>

                        <div className="mb-4 row align-items-center">
                          <label className="col-sm-3 col-form-label form-label-title">
                            Product Status
                          </label>
                          <div className="col-sm-9">
                            <select
                              name="status"
                              value={input.status}
                              onChange={handleInputChange}
                              className="form-select"
                            >
                              <option>-- Select --</option>
                              <option value="publish">Publish</option>
                              <option value="draft">Draft</option>
                              <option value="pending">Pending</option>
                              <option value="trash">Trash</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card">
                      <div className="card-body">
                        <div className="card-header-2">
                          <h5>Product Description</h5>
                        </div>

                        <div className="row mb-4">
                          <div className="col-12">
                            <div className="row">
                              <label className="form-label-title col-sm-3 mb-0">
                                Description
                              </label>
                              <div className="col-sm-9">
                                <textarea
                                  className="form-control"
                                  placeholder="Write description in details"
                                  name="description"
                                  value={input.description}
                                  onChange={handleInputChange}
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-4">
                          <div className="col-12">
                            <div className="row">
                              <label className="form-label-title col-sm-3 mb-0">
                                Short Description
                              </label>
                              <div className="col-sm-9">
                                <textarea
                                  className="form-control"
                                  placeholder="Short description"
                                  name="short_description"
                                  value={input.short_description}
                                  onChange={handleInputChange}
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card">
                      <div className="card-body">
                        <div className="card-header-2">
                          <h5>Product Images</h5>
                        </div>
                        <div className="row mb-4 align-items-center">
                          <label className="col-sm-3 col-form-label form-label-title">
                            Thumbnail Image
                          </label>
                          <div className="col-sm-9">
                            {input.thumbnailId && (
                              <div className="file-prev-wrapper">
                                <div className="file-preview">
                                  <img src={singleProduct?.thumbnail?.url} />
                                  <span
                                    className="remove-img-btn"
                                    onClick={() =>
                                      setInput((prev) => ({
                                        ...prev,
                                        thumbnailId: null,
                                      }))
                                    }
                                  >
                                    x
                                  </span>
                                </div>
                              </div>
                            )}
                            {!input.thumbnailId && (
                              <MediaUploader uploaderId="edit_thumbnail" />
                            )}
                          </div>
                        </div>
                        <div className="row mb-4 align-items-center">
                          <label className="col-sm-3 col-form-label form-label-title">
                            Gallery
                          </label>
                          <div className="col-sm-9">
                            <MediaUploader
                              fileCount={10}
                              uploaderId="edit_gallery"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card">
                      <div className="card-body">
                        <div className="card-header-2">
                          <h5>Shipping</h5>
                        </div>
                        <div className="mb-4 row align-items-center">
                          <label className="form-label-title col-sm-3 mb-0">
                            Weight (kg)
                          </label>
                          <div className="col-sm-9">
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Weight"
                              name="weight"
                              value={input.weight}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="mb-4 row align-items-center">
                          <label className="col-sm-3 form-label-title">
                            Dimensions (cm)
                          </label>
                          <div className="col-sm-3">
                            <input
                              className="form-control"
                              type="text"
                              placeholder={0}
                              name="width"
                              value={input.width}
                              onChange={handleInputChange}
                            />
                            <span>Width</span>
                          </div>
                          <div className="col-sm-3">
                            <input
                              className="form-control"
                              type="text"
                              placeholder={0}
                              name="height"
                              value={input.height}
                              onChange={handleInputChange}
                            />
                            <span>Height</span>
                          </div>
                          <div className="col-sm-3">
                            <input
                              className="form-control"
                              type="text"
                              placeholder={0}
                              name="length"
                              value={input.length}
                              onChange={handleInputChange}
                            />
                            <span>Length</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card">
                      <div className="card-body">
                        <div className="card-header-2">
                          <h5>Product Price</h5>
                        </div>
                        <div className="mb-4 row align-items-center">
                          <label className="col-sm-3 form-label-title">
                            Regular Price
                          </label>
                          <div className="col-sm-9">
                            <input
                              className="form-control"
                              type="text"
                              placeholder={0}
                              name="regular_price"
                              value={input.regular_price}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="mb-4 row align-items-center">
                          <label className="col-sm-3 form-label-title">
                            Discounted Price
                          </label>
                          <div className="col-sm-9">
                            <input
                              className={`form-control ${
                                input.sale_price &&
                                input.sale_price >= input.regular_price
                                  ? "border-danger"
                                  : ""
                              }`}
                              type="text"
                              placeholder={0}
                              name="sale_price"
                              value={input.sale_price}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card">
                      <div className="card-body">
                        <div className="card-header-2">
                          <h5>Product Inventory</h5>
                        </div>
                        <div className="mb-4 row align-items-center">
                          <label className="form-label-title col-sm-3 mb-0">
                            SKU
                          </label>
                          <div className="col-sm-9">
                            <input
                              className="form-control"
                              type="text"
                              name="sku"
                              value={input.sku}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="mb-4 row align-items-center">
                          <label className="col-sm-3 col-form-label form-label-title">
                            Stock Status
                          </label>
                          <div className="col-sm-9">
                            <select
                              className="form-select"
                              name="stock_status"
                              value={input.stock_status}
                              onChange={handleInputChange}
                            >
                              <option>-- Select --</option>
                              <option value="in_stock">In Stock</option>
                              <option value="out_of_stock">Out Of Stock</option>
                              <option value="on_waitlist_order">
                                On Waitlist Order
                              </option>
                            </select>
                          </div>
                        </div>
                        {input.stock_status === "in_stock" && (
                          <div className="mb-4 row align-items-center">
                            <label className="form-label-title col-sm-3 mb-0">
                              Stock Quantity
                            </label>
                            <div className="col-sm-9">
                              <input
                                className="form-control"
                                type="number"
                                name="stock_quantity"
                                value={input.stock_quantity}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-animation justify-content-center mb-4"
                        type="submit"
                        disabled={
                          uploaderIsLoading?.edit_thumbnail ||
                          uploaderIsLoading?.edit_gallery ||
                          (input.sale_price &&
                            input.sale_price >= input.regular_price)
                        }
                      >
                        Update Product
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        {/* New Product Add End */}
      </div>
    </>
  );
};

export default EditProductPage;
