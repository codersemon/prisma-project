/**
 * Checks if the provided string is a valid email address.
 *
 * This function uses a regular expression to validate the format of an email address.
 * It checks for a general structure that matches the common email format:
 * [local part]@[domain].[TLD]
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns true if the email is valid, otherwise false.
 *
 */
export const isEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};


/**
 * Phone Validate
 */
export const isPhone = (phone) => {
  return /^(01|8801|\+8801)[0-9]{9}$/.test(phone);
};

/**
 * String Validate
 */
export const isString = (data) => {
  return /^[a-z@\.]{1,}$/.test(data);
};

/**
 * Number Validate
 */
export const isNumber = (number) => {
  return /^[0-9\+]{1,}$/.test(number);
};

/**
 * Create a random number
 */
export const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * Random String
 */
export const randStr = (length = 12) => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
};

/**
 * jwt token encoder
 */
export const tokenEncode = (inputString) => {
  // Use the replace method with a regular expression to replace dots with 'emon'
  const modifiedString = inputString.replace(/\./g, "emon");
  return modifiedString;
};

/**
 * jwt token decoder
 */
export const tokenDecode = (inputString) => {
  // Use the replace method with a regular expression to replace 'emon' with dots
  const modifiedDot = inputString.replace(/emon/g, ".");
  return modifiedDot;
};

/**
 * Find Public ID
 */
export const findPublicId = (url) => {
  return url.split("/")[url.split("/").length - 1].split(".")[0];
};

/**
 * Create Slug
 */
export const createSlug = (title) => {
  // Remove non-alphanumeric characters and convert to lowercase
  const cleanedTitle = title.replace(/[^\w\s]/gi, "").toLowerCase().trim();

  // Replace spaces with hyphens
  const slug = cleanedTitle.replace(/\s+/g, "-");

  return slug;
};

/**
 * Generat Random Password
 */
export const generateRandomPassword = (length = 10) => {
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const specialChars = "!@#$%^&*()-_=+[]{}|;:,.<>?";

  const allChars = uppercaseChars + lowercaseChars + numberChars + specialChars;
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }

  return password;
};

/**
 * Time Ago
 */
export const timeAgo = (date) => {
  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const WEEK = 7 * DAY;
  const MONTH = 30 * DAY;
  const YEAR = 365 * DAY;

  const timeElapsed = Date.now() - new Date(date).getTime();

  if (timeElapsed < MINUTE) {
    return `${Math.floor(timeElapsed / SECOND)} seconds ago`;
  } else if (timeElapsed < HOUR) {
    return `${Math.floor(timeElapsed / MINUTE)} minutes ago`;
  } else if (timeElapsed < DAY) {
    return `${Math.floor(timeElapsed / HOUR)} hours ago`;
  } else if (timeElapsed < WEEK) {
    return `${Math.floor(timeElapsed / DAY)} days ago`;
  } else if (timeElapsed < MONTH) {
    return `${Math.floor(timeElapsed / WEEK)} weeks ago`;
  } else if (timeElapsed < YEAR) {
    return `${Math.floor(timeElapsed / MONTH)} months ago`;
  } else {
    return `${Math.floor(timeElapsed / YEAR)} years ago`;
  }
};

/**
 * OTP
 */
export const createOTP = (length = 5) => {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10); // Append a random digit (0-9)
  }

  return otp;
};

/**
 * Masks a string by replacing all middle characters with '*' while preserving the first 4 and last 4 characters.
 * For email addresses, the local part before '@' is masked while preserving the domain part.
 * If the string is 8 characters or less, it returns the original string.
 *
 * @param {string} str - The string to be masked.
 * @returns {string} The masked string.
 */
export const maskString = (str) => {
  // Check if the string is an email address
  const isEmailAddress =
    /^[^\.-/][a-z0-9-_\.]{1,}@[a-z0-9-]{1,}\.[a-z\.]{2,}$/.test(str);
  if (isEmailAddress) {
    // Apply masking for email addresses
    const atIndex = str.indexOf("@");
    const firstPart = str.substring(0, atIndex);
    const lastPart = str.substring(atIndex);
    const maskedFirstPart =
      firstPart.length > 3
        ? firstPart.substring(0, 3) + "*".repeat(firstPart.length - 3)
        : firstPart;
    return maskedFirstPart + lastPart;
  } else {
    // For other strings, show the first 3 characters, mask the middle characters, and show the last 3 characters
    const firstThree = str.substring(0, 3);
    const lastThree = str.substring(str.length - 3);
    const middleMasked = "*".repeat(Math.max(0, str.length - 6)); // Mask all characters between first three and last three
    return firstThree + middleMasked + lastThree;
  }
};

