export const UNITS = {
  IMPERIAL: "IMPERIAL",
  METRIC: "METRIC",
};

export const GENDERS = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  OTHERS: "OTHERS",
};

const AVERAGE_STEP_CALORIES = 0.57;

const EstimateStrideLength = {
  FEMALE: 0.413, // in centimeter
  MALE: 0.415, // in centimeter
  OTHERS: 0.413, // in centimeter
};

/**
 * @typedef {'MALE'|'FEMALE'|'OTHER'} GENDER
 **/

/**
 * Function to calculate average stride of a person.
 *
 * @param height {number}
 * @param gender {GENDER}
 * @returns {number}
 */
const getAverageStrideLength = (height, gender = "MALE") => {
  if (gender in EstimateStrideLength) {
    const estimateStrideLength = EstimateStrideLength[gender];
    return estimateStrideLength * Number(height);
  } else {
    throw new Error("Invalid gender, Allowed value are 1. FEMALE, 2. MALE");
  }
};

/**
 * Function to calculate distance travelled from number of steps.
 *
 * @param height {number} height in centimeter
 * @param steps {number} steps taken
 * @param gender {GENDER} gender
 * @returns {number} distance in miles
 */
export const stepsToDistance = (height, steps, gender) => {
  const averageStride = getAverageStrideLength(height, gender);
  const distanceInCM = averageStride * steps;
  return Number((distanceInCM * 0.00001).toFixed(6));
};

/**
 * @typedef {'SLOW'|'AVERAGE'|'FAST'} SPEED
 **/

/**
 * Function to calculate calories burned from number of steps.
 *
 * @param weight {number}
 * @param height {number}
 * @param gender {GENDER}
 * @param steps {number}
 * @returns {number}
 */
export const stepsToCalories = (weight, height, gender, steps) => {
  const distanceInMiles = kilometerToMiles(
    stepsToDistance(height, steps, gender)
  );
  const weightInPounds = kgToPounds(weight);
  const caloriesBurnedInAMile = AVERAGE_STEP_CALORIES * weightInPounds;
  return Number((caloriesBurnedInAMile * distanceInMiles).toFixed(3));
};

/**
 * Covert kilometer to miles.
 * @param distance {number}
 * @returns {number}
 */
export const kilometerToMiles = (distance) => {
  return distance / 1.609;
};

/**
 * convert kg to pounds
 * @param weight {number}
 * @returns {number}
 */
export const kgToPounds = (weight) => {
  return weight * 2.205;
};

/**
 * convert pounds to kg
 * @param weight
 * @returns {number}
 */
export const poundsTokg = (weight) => {
  return weight / 2.205;
};

export const cmToFeet = (length) => {
  return length / 30.48;
};

export const feetToCm = (length) => {
  return length * 30.48;
};
