var assert = require('assert');
var sinon = require('sinon');
var rewire = require('rewire');
var repository = rewire('../../lib/repositories/elastic');

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
      body: {
        size: 10000,
        query: {
          range: {
            timestamp: {
              gte: 1,
              lte: 2
            }
          }
        }
      }
    }));
  });
});
