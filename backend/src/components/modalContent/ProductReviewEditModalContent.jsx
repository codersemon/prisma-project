// dependencies
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editSingleProductReview } from "../../feature/productReviewAPISlice";
import { productReviewsSelect } from "../../feature/productReviewSlice";
import useForm from "../../hooks/useForm";
import RatingStarEditable from "../common/RatingStarEditable";

const ProductReviewEditModalContent = ({ editableReviewId }) => {
  /**
   * react-redux dispatch hook
   */
  const dispatch = useDispatch();

  /**
   * product reviews context
   */
  const { reviews } = useSelector(productReviewsSelect);

  // get editable review
  const editableReview = reviews?.filter(
    (review) => review.id === editableReviewId
  );

  /**
   * rating star state
   */
  const [rating, setRating] = useState(editableReview[0].rating);

  /**
   * review form state
   */
  const { input, handleInputChange } = useForm({
    comment: editableReview[0].comment,
    status: editableReview[0].status,
  });

  /**
   * handle review edit form submission
   */
  const handleReviewEditFormSubmission = (e) => {
    // remove default event
    e.preventDefault();

    // send data to review edit action
    dispatch(editSingleProductReview({ id: editableReviewId, rating: rating, ...input }));
  };

  return (
    <div className="row">
      <div className="col-xl-12">
        <form onSubmit={handleReviewEditFormSubmission}>
          <div className="row g-2">
            <div className="col-12 mb-1">
              <div className="product-rating">
                <h6 className="me-2">Rating</h6>
                <ul className="rating">
                  <RatingStarEditable
                    fillStarCount={rating}
                    setFillStarCount={setRating}
                  />
                </ul>
              </div>
            </div>
            <div className="col-12 mb-1">
              <div className="product-rating">
                <h6 className="me-2">Status</h6>
                <select
                  name="status"
                  className="form-select"
                  onChange={handleInputChange}
                  value={input?.status}
                >
                  <option value="published">Published</option>
                  <option value="pending">Pending</option>
                  <option value="trash">Trash</option>
                </select>
              </div>
            </div>
            <div className="col-12">
              <div className="form-floating theme-form-floating">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style={{ height: 100 }}
                  name="comment"
                  value={input.comment}
                  onChange={handleInputChange}
                />
                <label htmlFor="floatingTextarea2">Write Your Comment</label>
              </div>
            </div>

            <div className="col-12">
              <button type="submit" className="btn theme-bg-color text-white">
                Update Review
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductReviewEditModalContent;
