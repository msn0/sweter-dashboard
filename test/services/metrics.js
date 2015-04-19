var assert = require('assert');
var sinon = require('sinon');
var rewire = require('rewire');
var service = rewire('../../services/metrics');

describe("Metrics service", function () {
  beforeEach(function () {
    this.repository = {
      get: function () {}
    };
    this.service = service;
    this.service.__set__("repository", this.repository);
  });

  it("get should retrieve metrics from metrics repository", function () {
    var spy = sinon.spy(this.repository, 'get');
    this.service.get("index");
    assert(spy.calledWith("index"));
  });
});
