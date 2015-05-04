var median = require('stats-median');
var percentile = require('stats-percentile');
var variance = require('stats-variance');

module.exports.median = function (data) {
  return median.calc(data);
};

module.exports.p95 = function (data) {
  return percentile.calc(data, 95);
};

module.exports.stddev = function (data) {
  return Math.sqrt(variance.calc(data));
};