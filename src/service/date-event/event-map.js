/**
 * @typedef {import('../../types')}
 */

/**
 * Class to handle non recurring date event mapping
 */
class EventMap {
  /**
   * initialize event map obejcts
   *
   */
  constructor() {
    /**
     * {Map.<String, Map<String, Map<String, Map<String, DateInput>>>>}
     *
     * EventMap Structure
     * {
     *   [category]: {
     *     [year]: {
     *       [month]: {
     *         [date]: CustomDate
     *       }
     *     }
     *   }
     * }
     */
    this.map = new Map();
  }

  /**
   * add events to event map object
   * @param {Array.<DateInput>} dateEvents
   */
  addEvents(dateEvents) {
    dateEvents.forEach((e) => {
      const {
        category,
        y,
        m,
        d,
      } = e;

      pushToEventMap([category, y, m, d], this.map, dateEvents);
    });
  }

  /**
   * TODO:
   * - getCategoryList
   * - getYearList (cat)
   * - getMonthList (cat, year)
   * - getDateList (cat, year, month)
   */
}

/**
 * check if key is in map
 * @param {Array.<String>} keys
 * @param {Map} map
 * @param {DateEvent} dateEvent
 * @return {bool}
 */
function pushToEventMap(keys, map, dateEvent) {
  if (keys.length === 1) {
    map.set(keys[0], dateEvent);
    return;
  }

  const key = keys.shift();
  let nextMap;

  if (!map.has(key)) {
    nextMap = new Map();
    map.set(key, nextMap);
  } else {
    nextMap = map.get(key);
  }

  return pushToEventMap(keys, nextMap, dateEvent);
}

module.exports = EventMap;
