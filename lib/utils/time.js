'use strict';

module.exports.today = function () {
  var left, right, current = new Date();
  left = new Date(current.getTime() - (current.getTime() % (24 * 3600000))).getTime();
  right = left + (24 * 3600000 - 1);

  return {
    left: left,
    right: right
  };
};