/**
 * inverses a given string
 */
export const inverse = (inputString) => {
  if (inputString.length === 0) {
    throw new Error("No input given");
  }

  return inputString.split("").reverse().join("");
};

/**
 * returns a shorter substring version of a given string //   return inputString.substr(0, length);
 */
export const subStr = (inputString, length) => {
  // return inputString.split("").splice(0, length).join("");
  return inputString.substr(0, length);
};
