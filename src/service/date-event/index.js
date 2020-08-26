/**
 * @typedef {import('../../repository/csvdateinput/types')}
 */
require('./types');

const config = require('../../config');
const EventMap = require('./event-map');
const plimit = require('p-limit');
const limit = plimit(config.readAsyncLimit);

/**
 * DateEventService will provide date and event related transaction
 */
class DateEventService {
  /**
   * @param {Repo} csvRepo instance
   */
  constructor(csvRepo) {
    this.repo = csvRepo;
  }

  /**
   * returns mapped DateEvent instance
   * @return {Map.<String, Map<String, Map<String, Map<String, DateInput>>>>}
   */
  async getDateEventsMap() {
    const eventMap = new EventMap();

    const fileList = this.repo.list(targetDirectory);
    const readTask = (e) => limit(() => this.repo.read(targetDirectory + e));
    const readPromises = fileList.map((e) => readTask(e));

    try {
      const csvInput = await Promise.all(readPromises);
      return csvInput.forEach((e) => {
        eventMap.addEvents(e);
      });
    } catch (err) {
      console.error(err);
    }

    return eventMap.map;
  }
}

module.exports = DateEventService;
