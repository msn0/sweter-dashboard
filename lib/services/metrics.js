'use strict';

var repository = require('../repositories/elastic');
var metric = "domInteractive";
var statistics = require('../utils/statistics');
var timeRange = require('../utils/time');

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
    .get(index, timeRange.today())
    .then(getMetrics);
};
