'use strict';

var client = require('elasticsearch').Client({
  host: 'localhost:9200'
});

module.exports = {
  get: function (index, range) {
    return client.search({
      index: index,
      q: 'timestamp:['+range.left+'+TO+'+range.right+']'
    });
  }
};
