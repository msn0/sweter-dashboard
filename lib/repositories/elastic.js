'use strict';

var config = require('../config.json');
var client = require('elasticsearch').Client({
  host: config.elasticsearch.host + ':' + config.elasticsearch.port
});

module.exports = {
  get: function (index, range) {
    return client.search({
      index: index,
      body: {
        size: 10000,
        query: {
          range: {
            timestamp: {
              gte: range.left,
              lte: range.right
            }
          }
        }
      }
    });
  },
  indices: function () {
    return client.indices.status();
  }
};
