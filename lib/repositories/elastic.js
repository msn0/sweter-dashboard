'use strict';

var client = require('elasticsearch').Client({
  host: 'localhost:9200'
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
  }
};
