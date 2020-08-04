const EventMap = require('../service/date-event/non_recurring_event_map');

const eventMapFactory = (cat, d, m, y, e) => ({
  category: cat,
  d, m, y,
  event: e,
});

describe('Non recurring event map test', () => {
  test('should populate correct event map', () => {
    const nrMap = new EventMap();

    nrMap.addEvents([
      eventMapFactory('C1', 1, 1, 1999, 'E0'),
      eventMapFactory('C1', 1, 1, 2000, 'E1'),
      eventMapFactory('C2', 1, 1, 2001, 'E2'),
      eventMapFactory('C2', 1, 2, 2001, 'E3'),
      eventMapFactory('C2', 2, 2, 2001, 'E4'),
    ]);

    let categoryKey; let expectedCategoryKey;

    // assert category
    categoryKey = Array.from(nrMap.map.keys()).sort();
    expectedCategoryKey = ['C1', 'C2'].sort();
    expect(categoryKey).toStrictEqual(expectedCategoryKey);

    // assert year category C1
    categoryKey = Array.from(nrMap.map.get('C1').keys()).sort();
    expectedCategoryKey = [1999, 2000].sort();
    expect(categoryKey).toStrictEqual(expectedCategoryKey);

    // TODO: continue assert
  });
});


