'use strict';

var DAY_IN_MILLIS = 24 * 3600000;

module.exports.last = function (numOfDays) {
  var left, right, current = new Date();
  left = new Date(current.getTime() - (current.getTime() % (DAY_IN_MILLIS))).getTime();

  right = left + (DAY_IN_MILLIS - 1);
  return {
    left: left - (numOfDays - 1) * DAY_IN_MILLIS,
    right: right
  }
};

module.exports.today = function () {
  return this.last(1);
};

module.exports.dayBefore = function (day) {
  return {
    left: day.left - DAY_IN_MILLIS,
    right: day.right - DAY_IN_MILLIS
  };
};

