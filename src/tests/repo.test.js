const mockfs = require('mock-fs');
const DateInputRepo = require('../repository/csvdateinput');
const {ANY_YEAR} = require('../config');
const CustomDate = require('../customdate');

describe('csv repo test', () => {
  /** @type {CSVRepo} */
  let csvRepo;
  const defaultMockFsConfig = {
    './test': {
      'thisiscsv.csv': '',
      'thisisnotcsv.png': '',
    },
  };

  beforeAll(() => {
    csvRepo = new DateInputRepo('./test');
  });

  afterEach(() => {
    mockfs.restore();
  });

  test('should list only csv file', () => {
    mockfs(defaultMockFsConfig);
    const listOfDir = csvRepo.list();
    expect(listOfDir).toStrictEqual([
      'thisiscsv.csv',
    ]);
  });

  test('should list csv file when overriding directory', () => {
    mockfs({
      ...defaultMockFsConfig,
      './anotherFolder': {
        'anotherfile.csv': '',
      },
    });

    const listOfDir = csvRepo.list('./anotherFolder');
    expect(listOfDir).toStrictEqual([
      'anotherfile.csv',
    ]);
  });

  test('should read csv file', async () => {
    const csvData = await csvRepo.read('./src/tests/sample/testsample-ok.csv');
    expect(csvData).toStrictEqual([
      {
        date: new CustomDate('2-1-2010'),
        category: 'IDN',
        is_repeatable: false,
        repeatable_year_period: [],
        event: ['Hari libur'],
      },
      {
        date: new CustomDate('9-20-2020'),
        category: 'PHL',
        is_repeatable: false,
        repeatable_year_period: [],
        event: ['Holiday'],
      },
      {
        date: new CustomDate('9-21-2020'),
        category: 'PHL',
        is_repeatable: true,
        repeatable_year_period: [
          {from: ANY_YEAR, to: ANY_YEAR},
        ],
        event: ['Holiday1'],
      },
      {
        date: new CustomDate('9-24-2020'),
        category: 'PHL',
        is_repeatable: true,
        repeatable_year_period: [
          {from: ANY_YEAR, to: '2003'},
          {from: '2005', to: ANY_YEAR},
        ],
        event: [
          'Holiday2',
          'Holiday3',
        ],
      },
      {
        date: new CustomDate('9-29-2020'),
        category: 'PHL',
        is_repeatable: true,
        repeatable_year_period: [
          {from: '2003', to: '2006'},
        ],
        event: ['Holiday4'],
      },
    ]);
  });
});

