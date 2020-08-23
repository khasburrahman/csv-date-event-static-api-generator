
const {ANY_YEAR} = require('../../config');

/**
 * this function will generate key map for csvdata
 * @param {*} csvdata
 * @return {String}
 */
function generateMapKey(csvdata) {
  return csvdata.date + csvdata.category;
}

/**
 * format year to any year if XXXX
 * @param {String} e - year string
 * @return {String} year string, also alter XXXX to any year
 */
function formatYear(e) {
  return (e === 'XXXX') ? ANY_YEAR : e;
}

module.exports = {
  formatYear,
  generateMapKey,
};
