const config = require('./config');

/**
 * handle date related operation, basically wrap js date
 * and add custom field for use in this project
 *
 * member:
 * d: date,
 * m: month,
 * y: year,
 * isRepeatable: boolean,
 * rawDate: date js,
 * rawStr: passed string
 */
class CustomDate {
  /**
   * construct CustomDate from MM-DD-YYYY strings
   * @param {String} strDate
   */
  constructor(strDate) {
    [this.m, this.d, this.y] = strDate.split('-');
    this.isRepeatable = this.y === config.CSV_ANY_YEAR;

    if (this.isRepeatable) {
      this.rawDate = null;
    } else {
      this.rawDate = new Date(strDate);
    }

    this.rawStr = strDate;
  }

  /**
   * @return {String} the passed string for this custom date
   */
  toString() {
    return this.rawStr;
  }

  /**
   * returns if object is equal
   * @param {CustomDate} comp
   * @return {boolean}
   */
  isEqual(comp) {
    return (
      comp.isRepeatable === this.isRepeatable &&
      comp.rawDate === this.rawDate &&
      comp.rawStr === this.rawStr &&
      comp.d === this.d &&
      comp.m === this.m &&
      comp.y === this.y
    );
  }
}

module.exports = CustomDate;
