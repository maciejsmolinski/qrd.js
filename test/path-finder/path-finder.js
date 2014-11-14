var expect = require('chai').expect;
var subject = require('../../lib/path-finder/path-finder');

describe('PathFinder', function () {

  describe('::class', function () {

    it('should have property @name defined as "PathFinder"', function () {
      expect(subject.name).to.equal('PathFinder');
    });

  });

  describe('::constructor', function () {

    var matrixInstance = Object.create({ constructor: function Matrix(){} });
    var testInstance   = Object.create({ constructor: function Test(){} });

    it('should be provided with matrix instance', function () {
      expect(function () { return new subject(); } ).to.throw(Error);
      expect(function () { return new subject(testInstance); }).to.throw(Error);
      expect(function () { return new subject(matrixInstance); }).not.to.throw(Error);
    });

  });

  describe('::instance', function () {
    // to be implemented
  });

  describe('::methods', function () {
    // to be implemented
  });

});
