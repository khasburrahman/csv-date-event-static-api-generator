const fs = require('fs');
const {promisify} = require('util');

const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);

/**
 * JSONRepo
 * This class is used for reading / writing JSON files
 */
class JSONRepo {
  /**
   * read data from target JSON file
   * @param {String} target path
   */
  static async read(target) {
    const jsonFile = await readFileAsync(target);
    return JSON.parse(jsonFile);
  }

  /**
  * write data to JSON file
  * @param {Object} data
  * @param {String} target path
  */
  static async write(data, target) {
    const jsonString = JSON.stringify(data);
    return writeFileAsync(target, jsonString);
  }
}

module.exports = JSONRepo;

