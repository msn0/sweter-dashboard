var assert = require('assert');
var sinon = require('sinon');
var rewire = require('rewire');
var repository = rewire('../../repositories/elastic');

describe("Elastic repository", function () {
  beforeEach(function () {
    this.client = {
      search: function () {}
    };
    this.repository = repository;
    this.repository.__set__("client", this.client);
  });

  it("get should run search with expected params", function () {
    var spy = sinon.spy(this.client, 'search');
    this.repository.get("index", { left: 1, right: 2});
    assert(spy.calledWith({
      index: "index",
      q: "timestamp:[1+TO+2]"
    }));
  });
});
