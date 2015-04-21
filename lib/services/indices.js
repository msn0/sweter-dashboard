'use strict';

var repository = require('../repositories/elastic');

module.exports.get = function () {
  return repository.indices();
};
