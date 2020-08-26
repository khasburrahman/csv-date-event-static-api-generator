/**
 * @typedef {import('../types')}
 */

const EventMap = require('../service/date-event/event-map');

/**
 * factory method to generate date input object
 * @param {*} cat
 * @param {*} d
 * @param {*} m
 * @param {*} y
 * @param {*} e
 * @return {DateInput}
 */
const eventMapFactory = (cat, d, m, y, e) => ({
  category: cat,
  d, m, y,
  event: e,
});

describe('event map test', () => {
  test('should populate correct event map', () => {
    const nrMap = new EventMap();

    nrMap.addEvents([
      eventMapFactory('IDN', 1, 1, 1999, 'Hari Test 1'),
      eventMapFactory('IDN', 1, 1, 2000, 'Hari Test 2'),
      eventMapFactory('PHL', 1, 1, 2001, 'Holiday 3'),
      eventMapFactory('PHL', 1, 2, 2001, 'Holiday 4'),
      eventMapFactory('PHL', 2, 2, 2001, 'Event 5'),
    ]);

    let categoryKey; let expectedCategoryKey;

    // assert category
    categoryKey = Array.from(nrMap.map.keys()).sort();
    expectedCategoryKey = ['IDN', 'PHL'].sort();
    expect(categoryKey).toStrictEqual(expectedCategoryKey);

    // Year
    // assert year category IDN
    categoryKey = Array.from(nrMap.map.get('IDN').keys()).sort();
    expectedCategoryKey = [1999, 2000].sort();
    expect(categoryKey).toStrictEqual(expectedCategoryKey);

    // assert year category PHL
    categoryKey = Array.from(nrMap.map.get('PHL').keys());
    expectedCategoryKey = [2001];
    expect(categoryKey).toStrictEqual(expectedCategoryKey);

    // Month
    // assert year category IDN - 1999
    categoryKey = Array.from(nrMap.map.get('IDN').get(1999).keys());
    expectedCategoryKey = [1];
    expect(categoryKey).toStrictEqual(expectedCategoryKey);

    // assert year category IDN - 2000
    categoryKey = Array.from(nrMap.map.get('IDN').get(2000).keys());
    expectedCategoryKey = [1];
    expect(categoryKey).toStrictEqual(expectedCategoryKey);

    // assert year category PHL - 2001
    categoryKey = Array.from(nrMap.map.get('PHL').get(2001).keys()).sort();
    expectedCategoryKey = [1, 2].sort();
    expect(categoryKey).toStrictEqual(expectedCategoryKey);
  });
});


