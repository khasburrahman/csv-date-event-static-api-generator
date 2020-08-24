/**
 * @typedef {import('../../customdate') CustomDate}
 */

/**
 * @typedef {Object} DateInput
 * @property {CustomDate} date - Date
 * @property {String} category - Category
 * @property {boolean} is_repeatable_year - Category
 * @property {Array.<YearPeriod>} repeatable_year_period - Category
 * @property {Array.<String>} event - Event
 */

/**
 * @typedef {Object} YearPeriod
 * @property {String} from - String
 * @property {String} to - String
 */
