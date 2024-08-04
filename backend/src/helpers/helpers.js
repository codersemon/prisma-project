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

  return `${date} ${month}${separator}${year}`;
};
