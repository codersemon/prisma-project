// dependencies
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  productSelect,
  setProductsStateMessageEmpty,
} from "../../feature/productSlice";
import useForm from "../../hooks/useForm";
import useMediaUploader from "../../hooks/useMediaUploader";
import { Toast } from "../../utils/sweetAlert";
import { createProductCategory } from "../../feature/productAPISlice";
import { setUploadedFileStateEmpty } from "../../feature/mediaSlice";
import { Helmet } from "react-helmet";

const AddNewCategory = () => {
  /**
   * Media uploader hook init
   */
  const { MediaUploader, uploadedFiles, uploaderIsLoading } =
    useMediaUploader();

  /**
   * react-redux useDispatch hook init
   */
  const dispatch = useDispatch();

  /**
   * PRODUCT CONTEXT
   * REACT-REDUX useDispatch HOOK INIT
   * useNavigate HOOK INIT
   */
  const { isLoading, status, error, message } = useSelector(productSelect);
  const navigate = useNavigate();

  // category form state
  const { input, handleInputChange } = useForm({
    name: "",
  });

  // handle category form submission
  const handleCreateCategoryFormSubmission = (e) => {
    e.preventDefault();

    // Check if uploadedFiles and cat_img array are defined and not empty
    const lastUploadedCatImgId =
      uploadedFiles?.cat_img?.length > 0
        ? uploadedFiles.cat_img[uploadedFiles.cat_img.length - 1]?.id
        : null;

    // send data to category creation reducer if lastUploadedCatImgId is available
    if (lastUploadedCatImgId !== null) {
      dispatch(
        createProductCategory({ ...input, mediaId: lastUploadedCatImgId })
      );
    } else {
      dispatch(createProductCategory({ ...input }));
    }
  };

  // show message & redirect
  useEffect(() => {
    if (status === "success") {
      if (message) {
        // show success message
        Toast.fire({ title: message, icon: "success" });
        // set state error, message, status empty
        dispatch(setProductsStateMessageEmpty());
        // set uploaded file state empty
        dispatch(setUploadedFileStateEmpty("cat_img"));

        // redirect to category list page
        navigate("/categories");
      }
    }

    if (error) {
      // show error message
      Toast.fire({ title: error, icon: "error" });

      // set state error, message, status empty
      dispatch(setProductsStateMessageEmpty());
    }
  }, [status, navigate, dispatch, error, message]);

  return (
    <>
    <Helmet>
      <title>Add New Category</title>
    </Helmet>

    <div className="page-body">
      {/* New Product Add Start */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <form
              className="theme-form theme-form-2 mega-form"
              onSubmit={handleCreateCategoryFormSubmission}
            >
              <div className="row">
                <div className="col-sm-8 m-auto">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-header-2">
                        <h5>Category Information</h5>
                      </div>
                      <div className="mb-4 row align-items-center">
                        <label className="form-label-title col-sm-3 mb-0">
                          Category Name
                        </label>
                        <div className="col-sm-9">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Category Name"
                            name="name"
                            value={input.name}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="mb-4 row align-items-center">
                        <label className="form-label-title col-sm-3 mb-0">
                          Category Photo
                        </label>
                        <div className="col-sm-9">
                          <MediaUploader fileCount={1} uploaderId="cat_img" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-animation justify-content-center mb-4"
                      type="submit"
                      disabled={uploaderIsLoading?.cat_img}
                    >
                      {isLoading ? "uploading..." : "Create Category"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* New Product Add End */}
    </div>
    </>
  );
};

export default AddNewCategory;
