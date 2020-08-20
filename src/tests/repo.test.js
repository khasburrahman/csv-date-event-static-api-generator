const mockfs = require('mock-fs');
const CSVRepo = require('../repository/csv');
const {ANY_YEAR} = require('../config');

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
    csvRepo = new CSVRepo('./test');
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
        date: '1-2-2010',
        category: 'IDN',
        is_repeatable: false,
        repeatable_year_period: [],
        event: ['Hari libur'],
      },
      {
        date: '20-9-2020',
        category: 'PHL',
        is_repeatable: false,
        repeatable_year_period: [],
        event: ['Holiday'],
      },
      {
        date: '21-9-2020',
        category: 'PHL',
        is_repeatable: true,
        repeatable_year_period: [
          {from: ANY_YEAR, to: ANY_YEAR},
        ],
        event: ['Holiday1'],
      },
      {
        date: '24-9-2020',
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
        date: '29-9-2020',
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

