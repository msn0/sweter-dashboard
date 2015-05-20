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

function prepareMetric(day, index, data) {
  var timings = extract(data);
  var median = statistics.median(timings) / 1000;
  var p95 = statistics.p95(timings) / 1000;
  var stddev = statistics.stddev(timings);
  var metrics = {
    median: median.toFixed(1),
    p95: p95.toFixed(1),
    stddev: Math.round(stddev).toFixed(0)
  };

  return Promise.resolve({
    meta: {
      date: new Date(day.left).toLocaleDateString(),
      index: index,
      metric: metric
    },
    metrics: metrics
  });
}

module.exports.get = function (index, last) {
  var promises = [];
  var day = timeRange.today();
  last = last || 1;

  for (var i = 0; i < last; i++) {
    day = timeRange.dayBefore(day);
    promises.push(repository
      .get(index, day)
      .then(prepareMetric.bind(this, day, index)));
  }
  return Promise.all(promises);
};
