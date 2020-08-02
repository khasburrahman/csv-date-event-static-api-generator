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

  /**
   * read CSV file
   * @param {String} target (optional) csv file returns array of object
   * @return {Promise.<CSVData>}
   */
  async read(target) {
    return csvReader.fromFile(target || this.target);
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
