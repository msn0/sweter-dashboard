var assert = require('assert');
var sinon = require('sinon');
var rewire = require('rewire');
var service = rewire('../../lib/services/metrics');

describe("Metrics service", function () {
  beforeEach(function () {
    this.repository = {
      get: function () {
        return Promise.resolve();
      }
    };
    this.timeRange = {
      today: function () {}
    };
    this.service = service;
    this.service.__set__("repository", this.repository);
    this.service.__set__("timeRange", this.timeRange);
  });

  it("should get metrics from expected repository index", function () {
    var spy = sinon.spy(this.repository, 'get');
    this.service.get("index");
    assert(spy.calledWith("index"));
  });

  it("should get metrics for todays time range", function () {
    var spy = sinon.spy(this.repository, 'get');
    var range = {left: 1, right: 2};
    sinon.stub(this.timeRange, 'today').returns(range);

    this.service.get("index");

    assert(spy.calledWith("index", range));
  });
});
