require('./types');

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

  createMapKey(csvdata) {
    return csvdata.date+csvdata.category;
  }

  /**
   * read CSV file
   * @param {String} target (optional) csv file returns array of object
   * @return {Promise.<CSVData>}
   */
  async read(target) {
    const raw = await csvReader.fromFile(target || this.target);
    const mapcsv = new Map();

    return raw.map(e => {
      let tempData;
      const key = this.createMapKey(e);

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

      const splityearperiod = e.repeatable_year_period.split('-');
      const isany = (e) => (e === 'XXXX') ? -1 : e;
      const yearperiod = {from: isany(splityearperiod[0]), to: isany(splityearperiod[1])};

      const isrepeat = e.is_repeatable;
      tempData.is_repeatable = (isrepeat === 'T') ? true : false;
      tempData.repeatable_year_period.push(yearperiod);
      tempData.event.push(e.event);
      return tempData;
    });
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
