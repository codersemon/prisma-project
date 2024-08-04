/**
 * Get discount percentage by providing original & sale price
 * @param {*} originalPrice
 * @param {*} salePrice
 * @returns - discount percentage
 */
export const getDiscountPercentage = (originalPrice, salePrice) => {
  return ((1 - salePrice / originalPrice) * 100).toFixed(0);
};

/**
 * GET TIMESTAMP to DATE
 */
export const getDateFromTimestamps = (timestamps, separator = ", ") => {
  const timestamp = new Date(timestamps);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = timestamp.getDate();
  const month = monthNames[timestamp.getMonth()];
  const year = timestamp.getFullYear();

  return `${date.toString().padStart(2, 0)} ${month}${separator}${year}`;
};

/**
 * GET TIME FROM TIMESTAPMS
 */
export const getTimeFromTimestamps = (timestamps, separator = ":") => {
  // create date object from timestamps
  const timestamp = new Date(timestamps);

  // getting hour and minutes
  const rawHour = timestamp.getHours();
  const minutes = timestamp.getMinutes();

  // AM or PM based on hour
  const ampm = rawHour > 11 ? "PM" : "AM";

  // converting raw hour to AM/PM supported hour
  let hour = rawHour > 12 ? rawHour - 12 : rawHour == 0 ? 12 : rawHour;

  // return hour,minutes & AM/PM
  return `${hour.toString().padStart(2, 0)}${separator}${minutes.toString().padStart(2, 0)} ${ampm}`;
};
