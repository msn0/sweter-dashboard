var assert = require('assert');
var time = require('../../lib/utils/time');
var tk = require('timekeeper');

describe("Time range", function () {

  beforeEach(function () {
    tk.freeze(new Date(100));
  });

  afterEach(function () {
    tk.reset();
  });

  it("today should return expected range for particular day", function () {
    assert.deepEqual(time.today(), {left: 0, right: 86399999});
  });
});
