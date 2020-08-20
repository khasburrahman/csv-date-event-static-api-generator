

module.exports = {
  staticAPITargetDirectory: process.env.API_TARGET_DIR || './api',
  dateEventDirectory: process.env.INPUT_TARGET_DIR || './input',
  ANY_YEAR: 'anyyear',
  readConcurencyLimit: parseInt(process.env.READ_CONCURENCY_LIMIT, 10) || 16,
};
