// dependencies
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { setUploadedFileStateEmpty } from "../../feature/mediaSlice";
import { createNewProduct } from "../../feature/productAPISlice";
import {
  productSelect,
  setProductsStateMessageEmpty,
} from "../../feature/productSlice";
import useForm from "../../hooks/useForm";
import useMediaUploader from "../../hooks/useMediaUploader";
import { Helmet } from "react-helmet";

const AddNewProduct = () => {
  /**
   * Media uploader hook init
   */
  const { MediaUploader, uploadedFiles, uploaderIsLoading } =
    useMediaUploader();

  // product context
  const { status, categories } = useSelector(productSelect);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // create categories option to select
  const categoriesOption = categories?.map((item) => {
    return { value: item.name, label: item.name };
  });

  // form state
  const { input, handleInputChange } = useForm({
    name: "",
    status: "",
    description: "",
    short_description: "",
    weight: "",
    width: "",
    height: "",
    length: "",
    regular_price: "",
    sale_price: "",
    sku: "",
    stock_status: "",
    stock_quantity: "",
  });
  const [selectedCategories, setSelectedCategories] = useState(null);

  // handle form submission
  const handleProductUploadFormSubmission = (e) => {
    e.preventDefault();

    // Check if uploadedFiles and cat_img array are defined and not empty
    const lastUploadedThumbnailId =
      uploadedFiles?.thumbnail?.length > 0
        ? uploadedFiles.thumbnail[uploadedFiles.thumbnail.length - 1]?.id
        : null;

    // gallery items ids
    const galleryItemIds = uploadedFiles?.gallery?.map((item) => item.id);

    dispatch(
      createNewProduct({
        ...input,
        thumbnailId: lastUploadedThumbnailId,
        categories: selectedCategories,
        galleryItemIds,
      })
    );
  };

  useEffect(() => {
    if (status == "success") {
      // send user to products list page
      navigate("/products");

      // set product state message, error, status empty
      dispatch(setProductsStateMessageEmpty());
      // set thumbnail uploader state empty
      dispatch(setUploadedFileStateEmpty("thumbnail"));
      // set gallery uploader state empty
      dispatch(setUploadedFileStateEmpty("gallery"));
    }
  }, [status, navigate, dispatch]);

  return (
   <>
   <Helmet>
    <title>Add New Product</title>
   </Helmet>
   <div className="page-body">
      {/* New Product Add Start */}
      <form
        className="theme-form theme-form-2 mega-form"
        onSubmit={handleProductUploadFormSubmission}
        encType="multipart/form-data"
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-sm-8 m-auto">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-header-2">
                        <h5>Product Information</h5>
                        <p className="text-danger">
                          <span className="text-warning">⚠</span> All red boxes
                          are required. After writing in all red boxes, you are
                          able to upload product
                        </p>
                      </div>

                      <div className="mb-4 row align-items-center">
                        <label className="form-label-title col-sm-3 mb-0">
                          Product Name
                        </label>
                        <div className="col-sm-9">
                          <input
                            className={`form-control ${
                              input.name === "" ? "border-danger" : ""
                            }`}
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
                            className={`form-select ${
                              input.status === "" ? "border-danger" : ""
                            }`}
                          >
                            <option value="">-- Select --</option>
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
                          <MediaUploader uploaderId="thumbnail" />
                        </div>
                      </div>
                      <div className="row mb-4 align-items-center">
                        <label className="col-sm-3 col-form-label form-label-title">
                          Gallery
                        </label>
                        <div className="col-sm-9">
                          <MediaUploader fileCount={10} uploaderId="gallery" />
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
                            className={`form-control ${
                              input.regular_price === "" ? "border-danger" : ""
                            }`}
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
                              parseFloat(input.sale_price) >=
                                parseFloat(input.regular_price)
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
                            className={`form-select ${
                              input.stock_status === "" ? "border-danger" : ""
                            }`}
                            name="stock_status"
                            value={input.stock_status}
                            onChange={handleInputChange}
                          >
                            <option value="">-- Select --</option>
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
                        uploaderIsLoading?.thumbnail ||
                        uploaderIsLoading?.gallery ||
                        (input.sale_price &&
                          parseFloat(input.sale_price) >=
                            parseFloat(input.regular_price)) ||
                        input.name === "" ||
                        input.status === "" ||
                        input.stock_status === "" ||
                        input.regular_price === ""
                      }
                    >
                      Upload Product
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

export default AddNewProduct;
