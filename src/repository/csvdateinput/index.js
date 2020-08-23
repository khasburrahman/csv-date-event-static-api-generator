require('./types');

const csvtojson = require('csvtojson');
const csvReader = csvtojson();
const fs = require('fs');
const {formatYear, generateMapKey} = require('./util');
const CustomDate = require('../../customdate');

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
   * @return {Promise.<DateInput>}
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
          date: new CustomDate(e.date),
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

module.exports = CSVRepo;
