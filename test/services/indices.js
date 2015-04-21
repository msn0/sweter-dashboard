var assert = require('assert');
var sinon = require('sinon');
var rewire = require('rewire');
var service = rewire('../../lib/services/indices');

describe("Indices service", function () {
  beforeEach(function () {
    this.repository = {
      indices: function () {}
    };
    this.service = service;
    this.service.__set__("repository", this.repository);
  });

  it("should get indices from repository", function () {
    sinon.stub(this.repository, 'indices').returns("indices");
    assert.equal(this.service.get(), "indices");
  });
});
