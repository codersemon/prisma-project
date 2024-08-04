// dependencies
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSingleProductCategory,
  updateSingleProductCategory,
} from "../../feature/productAPISlice";
import {
  productSelect,
  setProductsStateMessageEmpty,
} from "../../feature/productSlice";
import useForm from "../../hooks/useForm";
import useMediaUploader from "../../hooks/useMediaUploader";
import { Toast } from "../../utils/sweetAlert";

const EditCategory = () => {
  /**
   * Get params from url
   */
  const { slug } = useParams();

  /**
   * Get current editable category
   */
  const { singleProductCategory, message, error, status } =
    useSelector(productSelect);

  /**
   * react-router-dom useNavigate hook init
   */
  const navigate = useNavigate();

  /**
   * Media uploader hook init
   */
  const { MediaUploader, uploadedFiles, mediaUploaderIsLoading } =
    useMediaUploader();

  /**
   * react-redux useDispatch hook init
   */
  const dispatch = useDispatch();

  // Sideeffect handler for getting editableProduct in redux state
  useEffect(() => {
    dispatch(getSingleProductCategory(slug));
  }, [dispatch, slug]);

  // category form state
  const { input, handleInputChange, setInput } = useForm({});

  // sideEffect handler to populate fields
  useEffect(() => {
    setInput((prev) => ({
      ...prev,
      id: singleProductCategory?.id,
      slug: singleProductCategory?.slug,
      name: singleProductCategory?.name,
      photoId: singleProductCategory?.photoId,
    }));
  }, [singleProductCategory, setInput]);

  /**
   * Handle catgory photo remover
   */
  const handleCategoryPhotoRemover = () => {
    setInput((prev) => ({ ...prev, photoId: null }));
  };

  /**
   * handle category form submission
   */
  const handleUpdateCategoryFormSubmission = (e) => {
    e.preventDefault();

    // Check if uploadedFiles and edit_cat_img array are defined and not empty
    const lastUploadedCatImgId =
      uploadedFiles?.edit_cat_img?.length > 0
        ? uploadedFiles.edit_cat_img[uploadedFiles.edit_cat_img.length - 1]?.id
        : input.photoId;

    // send data to category creation reducer if lastUploadedCatImgId is available
    if (lastUploadedCatImgId !== null) {
      dispatch(
        updateSingleProductCategory({ ...input, photoId: lastUploadedCatImgId })
      );
    } else {
      dispatch(updateSingleProductCategory({ ...input }));
    }
  };

  /**
   * Effect Handler For Showing Message
   */
  useEffect(() => {
    if (status === "success") {
      if (message) {
        // show success message
        Toast.fire({ title: message, icon: "success" });
        // set state error, message, status empty
        dispatch(setProductsStateMessageEmpty());

        // redirec to category list
        navigate("/categories");
      }
    }

    if (error) {
      // show error message
      Toast.fire({ title: error, icon: "error" });

      // set state error, message, status empty
      dispatch(setProductsStateMessageEmpty());
    }
  }, [dispatch, status, error, message, navigate]);

  return (
    <>
      <div className="page-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <form
                className="theme-form theme-form-2 mega-form"
                onSubmit={handleUpdateCategoryFormSubmission}
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
                            {input?.photoId && (
                              <div className="file-prev-wrapper">
                                <div className="file-preview">
                                  <img
                                    src={singleProductCategory?.photo?.url}
                                  />
                                  <span
                                    className="remove-img-btn"
                                    onClick={handleCategoryPhotoRemover}
                                  >
                                    x
                                  </span>
                                </div>
                              </div>
                            )}
                            {!input?.photoId && (
                              <MediaUploader
                                fileCount={1}
                                uploaderId="edit_cat_img"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-animation justify-content-center mb-4"
                        type="submit"
                      >
                        Update Category
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCategory;
