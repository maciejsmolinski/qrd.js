var expect  = require('chai').expect;
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

    it('should be provided with Matrix instance', function () {
      expect(function () { return new subject(); } ).to.throw(Error);
      expect(function () { return new subject(testInstance); }).to.throw(Error);
      expect(function () { return new subject(matrixInstance); }).not.to.throw(Error);
    });

  });

  describe('::instance', function () {

    var matrixInstance = Object.create({ constructor: function Matrix(){} });
    var instance       = new subject(matrixInstance);

    it('should hold matrix instance so that calculations can be performed on it', function () {
      expect(instance.matrix).to.be.an('object');
    });

  });

  describe('::methods', function () {
    // to be implemented
  });

});
