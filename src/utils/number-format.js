/**
 * returns comma separated number
 * @param x {number}
 * @returns {string}
 */
export const numberFormat = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
