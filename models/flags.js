const uuid = require("uuid");

const flagData = [];

class Flag {
  constructor(car, reason, description) {
    this.id = this.generateId();
    this.car_id = car;
    this.created_on = new Date();
    this.reason = reason;
    this.description = description;
  }

  static saveFlag(flag) {
    flagData.push(flag);

    return flagData[flagData.length - 1];
  }

  static getFlags() {
    return flagData;
  }

  generateId() {
    return uuid.v1();
  }
}

module.exports = Flag;
