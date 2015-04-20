var Stats = require('fast-stats').Stats;

module.exports.median = function (data) {
  return new Stats().push(data).median();
};

module.exports.p95 = function (data) {
  return new Stats().push(data).percentile(95);
};