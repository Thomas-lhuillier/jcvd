
/**
 * Represents a logger system using a json file.
 * @TODO remove last update.
 */
const fs = require('fs');
const jsonfile = require('jsonfile');
const schedule = require('node-schedule');

module.exports = class JsonLogger {
  /**
   * @param {string} logFilePath: Path to our file './path/to/myFile.json'
   * @param {int} maxDays: numbers of days an entry will live in data.
   */
  constructor(logFilePath = null, maxDays = false) {
    if (!logFilePath) {
      return;
    }
    this.logFilePath = logFilePath;
    this.maxDays = maxDays;

    // Create file if it doesn't exist.
    try {
      console.log('Read from existing log file.');
      jsonfile.readFileSync(this.logFilePath);
    } catch (e) {
      console.log('Creating new log file.');
      let value = {
        'lastUpdateDate': null,
        'data': {},
      };
      // @TODO try using jsonfilewriteFileSync
      fs.writeFile(logFilePath, JSON.stringify(value), (err) => {
        if (err) {
          throw err;
        }

        this.jsonfile = require(logFilePath);
      });
    }

    if (maxDays) {
      this.startCleanerJob();
    }
  }

  /**
   * Clean logs everyday at midnight.
   */
  startCleanerJob() {
    schedule.scheduleJob('0 0 * * *', () => {
      this.clean(this.maxDays);
    });
  }

  /**
   * Append data to the log file.
   * @param {object} data
   */
  setData(data) {
    jsonfile.writeFileSync(this.logFilePath, data, {spaces: 2}, (err) => {
      console.error(err);
    });
  }

  /**
   * Add a record of twits.
   * @param {userId} userId: user ID we responded to
   * @param {date} date: response date
   */
  addRecord(userId, date) {
    let log = this.getData();
    log.data[userId] = date;
    this.setData(log);
    this.setUpdateTime();
  }

  /**
   * Get data from the log file.
   * @return {object}
   */
  getData() {
    return jsonfile.readFileSync(this.logFilePath);
  }

  /**
   * Clean old entries in logger data.
   * @param {int} maxDays
   */
  clean(maxDays) {
    let log = JSON.parse(getData());
    for (let key of log.data) {
      let diff = (Date.now() - log.data[key]) / (1000 * 60 * 60 * 24); // Get date diff in days.
      if (diff > maxDays) {
        delete log.data[key];
      }
    }

    this.setData(JSON.stringify(log));
  }

  /**
   * Log in json file last update time.
   */
  setUpdateTime() {
    let log = this.getData();
    log.lastUpdateDate = Date.now();
    this.setData(log);
  }

  /**
   * Get last update time.
   * @return {int} time in ms since last update
   */
  getTimeSinceLastEntry() {
    let time = this.getData().lastUpdateDate;
    if (time === null) {
      return null;
    }
    let diff = Date.now() - time;
    return diff;
  }
};
