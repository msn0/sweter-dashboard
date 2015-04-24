var median = require('stats-median');
var percentile = require('stats-percentile');

module.exports.median = function (data) {
  return median.calc(data);
};

module.exports.p95 = function (data) {
  return percentile.calc(data, 95);
};