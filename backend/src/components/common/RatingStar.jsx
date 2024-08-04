// dependencies

const RatingFiveStar = ({ fillStarCount }) => {
  /**
   * rating array (rating system out of 5)
   */
  const ratingArray = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <>
      {ratingArray?.map((rate) => (
        <li key={rate}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={fillStarCount >= rate ? "#ffb321" : "#c3c3c3"}
            stroke={fillStarCount >= rate ? "#ffb321" : "#c3c3c3"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-star "
          >
            <g>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </g>
          </svg>
        </li>
      ))}
    </>
  );
};

export default RatingFiveStar;
