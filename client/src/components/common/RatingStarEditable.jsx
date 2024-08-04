// dependencies
import FeatherIcon from "feather-icons-react";

const RatingStarEditable = ({ fillStarCount, setFillStarCount }) => {
  /**
   * rating array (rating system out of 5)
   */
  const ratingArray = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <>
      {ratingArray?.map((rate) => (
        <li key={rate} onMouseEnter={() => setFillStarCount(rate)}>
          <FeatherIcon
            icon="star"
            style={{
              fill: fillStarCount >= rate ? "#ffb321" : "#c3c3c3",
              stroke: fillStarCount >= rate ? "#ffb321" : "#c3c3c3",
            }}
          />
        </li>
      ))}
    </>
  );
};

export default RatingStarEditable;
