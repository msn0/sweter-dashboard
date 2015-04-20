'use strict';

var repository = require('../repositories/elastic');

function getTimeRange() {
  var right, left = new Date();
  left.setHours(0);
  left.setMinutes(0);
  left.setSeconds(0);
  left.setMilliseconds(0);
  right = left.getTime() + (24 * 3600000 - 1);

  return {
    left: left.getTime(),
    right: right
  }
}

module.exports = {
  get: function (index) {
    return repository.get(index, getTimeRange());
  }
};
