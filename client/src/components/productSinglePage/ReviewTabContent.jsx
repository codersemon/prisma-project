// dependencies
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import defaultUserPhoto from "../../assets/img/default-profile.png";
import { authSelect } from "../../features/authSlice";
import { orderSelect } from "../../features/orderSlice";
import { addProductReview } from "../../features/productReviewAPISlice";
import {
  productReviewsSelect,
  setProductReviewsStateMessageErrorStatusEmpty,
} from "../../features/productReviewSlice";
import { addReviewToSingleProductReduxState } from "../../features/productSlice";
import {
  getDateFromTimestamps,
  getTimeFromTimestamps,
} from "../../helpers/helpers";
import { Toast } from "../../utils/Toast";
import RatingFiveStar from "../common/RatingStar";
import RatingStarEditable from "../common/RatingStarEditable";

const ReviewTabContent = ({ productId, reviews, reviewAverageScore }) => {
  /**
   * react-redux dispatch hook
   */
  const dispatch = useDispatch();

  /**
   * auth context
   */
  const { user } = useSelector(authSelect);

  /**
   * order context
   */
  const { orders } = useSelector(orderSelect);

  /**
   * product reviews context
   */
  const { status, error, message, lastGivenReview } =
    useSelector(productReviewsSelect);

  /**
   * add review star rating state
   */
  const [givingReviewRate, setGivingReviewRate] = useState(0);

  /**
   * review comment state
   */
  const [reviewComment, setReviewComment] = useState("");

  /**
   * handle review form submission
   */
  const handleReviewFormSubmission = (e) => {
    // remove default event
    e.preventDefault();

    // invoke addReview action
    dispatch(
      addProductReview({
        rating: givingReviewRate,
        comment: reviewComment,
        productId: productId,
      })
    );
  };

  /**
   * check current user have purchased product and how many
   */
  const currentUserOrderCount = useMemo(() => {
    let orderCount = 0;

    orders?.map((order) =>
      order?.items?.map((item) =>
        item?.productId == productId ? (orderCount += 1) : orderCount
      )
    );
    return orderCount;
  }, [orders, productId]);

  /**
   * check current user review count for the current product
   */
  const currentUserReviewCount = useMemo(() => {
    let reviewCount = 0;
    reviews?.map((review) =>
      review?.userId == user?.id ? (reviewCount += 1) : reviewCount
    );
    return reviewCount;
  }, [reviews, user?.id]);

  /**
   * calculate review rating variation
   */
  let rating5 = 0;
  let rating4 = 0;
  let rating3 = 0;
  let rating2 = 0;
  let rating1 = 0;

  // loop to get rating
  for (let i = 0; i < reviews?.length; i++) {
    let review = reviews[i].rating;
    switch (review) {
      case 1:
        rating1 += 1;
        break;
      case 2:
        rating2 += 1;
        break;
      case 3:
        rating3 += 1;
        break;
      case 4:
        rating4 += 1;
        break;
      case 5:
        rating5 += 1;
        break;
    }
  }

  /**
   * SHOW MESSAGE BASED ON API RESPONSE RESULT USING REDUX
   */
  useEffect(() => {
    if (message) {
      // show successful toaster message
      Toast.fire({ title: message, icon: "success" });

      // if status success, push the review to the singleProduct reviews
      if (status == "success") {
        dispatch(addReviewToSingleProductReduxState(lastGivenReview));
      }

      // clear auth state message
      dispatch(setProductReviewsStateMessageErrorStatusEmpty());
    }

    if (error) {
      // show erorr toaster message
      Toast.fire({ title: error, icon: "error" });

      // clear auth state message
      dispatch(setProductReviewsStateMessageErrorStatusEmpty());
    }
  }, [status, message, error, dispatch, lastGivenReview]);

  return (
    <div
      className="tab-pane fade show active"
      id="review"
      role="tabpanel"
      aria-labelledby="review-tab"
    >
      <div className="review-box">
        <div className="row g-4">
          <div className="col-xl-6">
            <div className="review-title">
              <h4 className="fw-500">Customer reviews</h4>
            </div>
            <div className="d-flex">
              <div className="product-rating">
                <ul className="rating">
                  <RatingFiveStar
                    fillStarCount={reviewAverageScore.toFixed(0)}
                  />
                </ul>
              </div>
              <h6 className="ms-3">{reviewAverageScore.toFixed(2)} Out Of 5</h6>
            </div>
            <div className="rating-box">
              <ul>
                <li>
                  <div className="rating-list">
                    <h5>5 Star</h5>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${((100 * rating5) / reviews?.length).toFixed(
                            2
                          )}%`,
                        }}
                        aria-valuenow={100}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></div>
                    </div>
                    <span className="ratingScore">
                      {isNaN((100 * rating5) / reviews?.length)
                        ? 0
                        : ((100 * rating5) / reviews?.length).toFixed(2)}
                      %
                    </span>
                  </div>
                </li>
                <li>
                  <div className="rating-list">
                    <h5>4 Star</h5>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${((100 * rating4) / reviews?.length).toFixed(
                            2
                          )}%`,
                        }}
                        aria-valuenow={100}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></div>
                    </div>
                    <span className="ratingScore">
                      {isNaN((100 * rating4) / reviews?.length)
                        ? 0
                        : ((100 * rating4) / reviews?.length).toFixed(2)}
                      %
                    </span>
                  </div>
                </li>
                <li>
                  <div className="rating-list">
                    <h5>3 Star</h5>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${((100 * rating3) / reviews?.length).toFixed(
                            2
                          )}%`,
                        }}
                        aria-valuenow={100}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></div>
                    </div>
                    <span className="ratingScore">
                      {isNaN((100 * rating3) / reviews?.length)
                        ? 0
                        : ((100 * rating3) / reviews?.length).toFixed(2)}
                      %
                    </span>
                  </div>
                </li>
                <li>
                  <div className="rating-list">
                    <h5>2 Star</h5>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${((100 * rating2) / reviews?.length).toFixed(
                            2
                          )}%`,
                        }}
                        aria-valuenow={100}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></div>
                    </div>
                    <span className="ratingScore">
                      {isNaN((100 * rating2) / reviews?.length)
                        ? 0
                        : ((100 * rating2) / reviews?.length).toFixed(2)}
                      %
                    </span>
                  </div>
                </li>
                <li>
                  <div className="rating-list">
                    <h5>1 Star</h5>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${((100 * rating1) / reviews?.length).toFixed(
                            2
                          )}%`,
                        }}
                        aria-valuenow={100}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></div>
                    </div>
                    <span className="ratingScore">
                      {isNaN((100 * rating1) / reviews?.length)
                        ? 0
                        : ((100 * rating1) / reviews?.length).toFixed(2)}
                      %
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="review-title">
              <h4 className="fw-500">Write a review</h4>
            </div>
            {!currentUserOrderCount && (
              <div className="review-title">
                <h4 className="fw-500 text-danger">
                  Only who have purchased, are able to write a review.
                </h4>
              </div>
            )}

            {/* if reviw & order count become equal, then show this message */}
            {currentUserReviewCount === currentUserOrderCount && (
              <div className="review-title">
                <h4 className="fw-500 theme-color">
                  You have purchased this product {currentUserOrderCount} time
                  {currentUserOrderCount > 1 && "s "}
                  and have given review {currentUserReviewCount} time
                  {currentUserOrderCount > 1 && "s"}. You are able to write one
                  review for each purchase.
                </h4>
              </div>
            )}

            {currentUserReviewCount < currentUserOrderCount && (
              <form onSubmit={handleReviewFormSubmission}>
                <div className="row g-2">
                  <div className="col-12 mb-1">
                    <div className="product-rating">
                      <h6 className="me-2">Rating</h6>
                      <ul className="rating">
                        <RatingStarEditable
                          fillStarCount={givingReviewRate}
                          setFillStarCount={setGivingReviewRate}
                        />
                      </ul>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating theme-form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Leave a comment here"
                        id="floatingTextarea2"
                        style={{ height: 130 }}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                      />
                      <label htmlFor="floatingTextarea2">
                        Write Your Comment
                      </label>
                    </div>
                  </div>

                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-sm theme-bg-color text-white"
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
          <div className="col-12">
            <div className="review-title mt-4">
              {reviews?.length > 0 ? (
                <h4 className="fw-500">
                  Customer reviews{" "}
                  <span className="theme-color">
                    (Total: {reviews?.length})
                  </span>
                </h4>
              ) : (
                <h4 className="fw-500">
                  No review found. To write review please purchase the product.
                </h4>
              )}
            </div>
            <div className="review-people">
              <ul className="review-list">
                {reviews?.length > 0 &&
                  reviews?.map((review) => (
                    <li key={review?.key}>
                      <div className="people-box">
                        <div>
                          <div className="people-image">
                            <img
                              src={review?.user?.photo ?? defaultUserPhoto}
                              className="img-fluid blur-up lazyload rounded-circle"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="people-comment">
                          <p className="name mb-1 theme-color">
                            {review?.user?.name}
                          </p>
                          <div className="date-time">
                            <h6 className="text-content">
                              {getDateFromTimestamps(review?.createdAt)} at{" "}
                              {getTimeFromTimestamps(review?.createdAt)}
                            </h6>
                            <div className="product-rating">
                              <ul className="rating">
                                {
                                  <RatingFiveStar
                                    fillStarCount={review?.rating}
                                  />
                                }
                              </ul>
                            </div>
                          </div>
                          <div className="reply">
                            <p>{review?.comment}</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewTabContent;
