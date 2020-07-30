const fs = require('fs');
const mockfs = require('mock-fs');
const CSVRepo = require('../repository/csv');

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
        event: 'Hari libur',
      },
      {
        date: '20-9-2020',
        category: 'PHL',
        event: 'Holiday',
      },
    ]);
  });
});


