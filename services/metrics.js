'use strict';

var repository = require('../repositories/elastic');

module.exports = {
  get: function (index) {
    return repository.get(index);
  }
};
