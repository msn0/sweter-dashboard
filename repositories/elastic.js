'use strict';

var client = require('elasticsearch').Client({
  host: 'localhost:9200'
});

module.exports = {
  get: function (index) {
    return new Promise(function () {});
  }
};
