'use strict';

var repository = require('../repositories/elastic');
var metric = "domInteractive";
var statistics = require('../utils/statistics');

function getDefaultTimeRange() {
  var left, right, current = new Date();
  left = new Date(current.getTime() - (current.getTime() % (24 * 3600000))).getTime();
  right = left + (24 * 3600000 - 1);

  return {
    left: left,
    right: right
  };
}
function extract(data) {
  return data.hits.hits.map(function (hit) {
    return hit._source.metrics[metric];
  });
}

function getMetrics(data) {
  var timings = extract(data);
  return Promise.resolve({
    metrics: {
      median: statistics.median(timings),
      p95: statistics.p95(timings),
      stddev: statistics.stddev(timings).toFixed(0)
    }
  });
}

module.exports.get = function (index) {
  return repository
    .get(index, getDefaultTimeRange())
    .then(getMetrics);
};
