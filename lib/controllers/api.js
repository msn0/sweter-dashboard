'use strict';

var express = require('express');
var router = express.Router();
var metricsService = require('../services/metrics');
var indicesService = require('../services/indices');

router.get('/metrics/:index', function (req, res) {
  metricsService.get(req.params.index, req.query.last).then(function (data) {
    res.json(data);
  });
});

router.get('/indices', function (req, res) {
  indicesService.get().then(function (data) {
    res.json(data);
  });
});

module.exports = router;
