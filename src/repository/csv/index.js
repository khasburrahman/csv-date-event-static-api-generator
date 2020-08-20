require('./types');
const {ANY_YEAR} = require('../../config');

const csvtojson = require('csvtojson');
const csvReader = csvtojson();
const fs = require('fs');

/**
 * Class that handle CSV input
 */
class CSVRepo {
  /**
   * initialize class
   * @param {String} target directory path string
   */
  constructor(target) {
    this.target = target;
  }

  /**
   * read CSV file
   * @param {String} target (optional) csv file returns array of object
   * @return {Promise.<CSVData>}
   */
  async read(target) {
    const raw = await csvReader.fromFile(target || this.target);
    const mapcsv = new Map();

    raw.forEach((e) => {
      let tempData;
      const key = generateMapKey(e);

      if (mapcsv.has(key)) {
        tempData = mapcsv.get(key);
      } else {
        tempData = {
          ...e,
          repeatable_year_period: [],
          event: [],
        };
        mapcsv.set(key, tempData);
      }

      const spltyear = e.repeatable_year_period.split('-');
      const yearperiod = {
        from: formatYear(spltyear[0]),
        to: formatYear(spltyear[1]),
      };

      const isrepeat = e.is_repeatable;
      tempData.is_repeatable = (isrepeat === 'T') ? true : false;

      if (tempData.is_repeatable) {
        tempData.repeatable_year_period.push(yearperiod);
      }

      tempData.event.push(e.event);
    });

    return Array.from(mapcsv.values());
  }

  /**
   * list all the csv file in the target directory
   * @param {String} target target directory path string
   * @return {Array.<String>}
   */
  list(target) {
    const listOfDirectory = fs.readdirSync(target || this.target);
    const validFilename = listOfDirectory
        .filter((e) => e.split('.').pop() === 'csv');
    return validFilename;
  }
};

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
};

module.exports = CSVRepo;
