const CustomDate = require('../customdate');

describe('Custom date test', () => {
  test('should fill the fields for non repeatable events', () => {
    const customDate = new CustomDate('10-22-2010');

    expect(customDate.d).toEqual('22');
    expect(customDate.m).toEqual('10');
    expect(customDate.y).toEqual('2010');
    expect(customDate.isRepeatable).toEqual(false);
    expect(customDate.rawStr).toEqual('10-22-2010');
    expect(customDate.rawDate.getTime()).toBe(new Date('10-22-2010').getTime());
  });

  test('should fill the fields for repeatable events', () => {
    const customDate = new CustomDate('10-22-XXXX');

    expect(customDate.d).toEqual('22');
    expect(customDate.m).toEqual('10');
    expect(customDate.y).toEqual('XXXX');
    expect(customDate.isRepeatable).toEqual(true);
    expect(customDate.rawStr).toEqual('10-22-XXXX');
    expect(customDate.rawDate).toEqual(null);
  });
});


