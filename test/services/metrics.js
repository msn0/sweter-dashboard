var assert = require('assert');
var sinon = require('sinon');
var rewire = require('rewire');
var service = rewire('../../services/metrics');
var tk = require('timekeeper');

describe("Metrics service", function () {
  beforeEach(function () {
    this.repository = {
      get: function () {}
    };
    this.service = service;
    this.service.__set__("repository", this.repository);
  });

  it("should get metrics from expected repository index", function () {
    var spy = sinon.spy(this.repository, 'get');
    this.service.get("index");
    assert(spy.calledWith("index"));
  });

  it("should get metrics from expected time range", function () {
    var spy = sinon.spy(this.repository, 'get');
    tk.freeze(new Date(1444888000000)); // Thu, 15 Oct 2015 07:46:40 GMT+2
    this.service.get("index");
    assert(spy.calledWith("index", {
      left: 1444860000000, // Thu, 15 Oct 2015 00:00:00 GMT+2
      right: 1444946399999 // Thu, 15 Oct 2015 23:59:59 GMT+2
    }));
  });
});
