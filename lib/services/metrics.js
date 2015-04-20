'use strict';

var repository = require('../repositories/elastic');
var Stats = require('fast-stats').Stats;
var metric = "domInteractive";

function getDefaultTimeRange() {
  var left, right, current = new Date();
  left = new Date(current.getTime() - (current.getTime() % (24 * 3600000))).getTime();
  right = left + (24 * 3600000 - 1);

  return {
    left: left,
    right: right
  };
}
function getRawMetrics(data) {
  return data.hits.hits.map(function (hit) {
    return hit._source.metrics;
  });
}

function median(data) {
  var metricData = getRawMetrics(data).map(function (sample) {
    return sample[metric];
  });
  return new Stats().push(metricData).median();
}

function p95(data){
  var metricData = getRawMetrics(data).map(function (sample) {
    return sample[metric];
  });
  return new Stats().push(metricData).percentile(95);
}

function getMetrics(data) {
  return Promise.resolve({
    metrics: {
      median: median(data),
      p95: p95(data)
    }
  });
}

module.exports.get = function (index) {
  return repository
    .get(index, getDefaultTimeRange())
    .then(getMetrics);
};
