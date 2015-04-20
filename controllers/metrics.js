'use strict';

var express = require('express');
var router = express.Router();
var metricsService = require('../services/metrics');

router.get('/', function (req, res) {
  metricsService.get("sweter").then(function (data) {
    res.json(data);
  });
});

module.exports = router;
