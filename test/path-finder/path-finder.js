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

  describe('::properties', function () {

    var matrixInstance = Object.create({ constructor: function Matrix(){}, points: [] });
    var instance       = new subject(matrixInstance);

    describe('@points', function () {

      it('should return points from the matrix', function () {
        expect(instance.points).to.equal(instance.matrix.points);
      });

    });

  });

  describe('::methods', function () {

    var matrixInstance = Object.create({ constructor: function Matrix(){}, points: [] });
    var instance       = new subject(matrixInstance);

    describe('::findShortestPath', function () {

      it('should accept "first" and "last" arguments', function () {
        // @todo spy to see if first and last elements have been accessed
        expect(instance.findShortestPath('first', 'last')).to.be.an('array');
      });

      it('should accept points as params', function () {
        // @todo spy to see if first and second elements have been accessed
        expect(instance.findShortestPath(instance.points[0], instance.points[1])).to.be.an('array');
      });

      it('should accept element indexes', function () {
        // @todo spy to see if first and second elements have been accessed
        expect(instance.findShortestPath(0, 1)).to.be.an('array');
      });

      it('should return an array of points that form shortest path together', function () {
        expect(instance.findShortestPath(0, 1)).to.be.an('array');
      });

    });

    describe('::setStartPoint', function () {

      it('should mark selected point as start point', function () {
        expect(instance.startPoint).to.equal(undefined);
        instance.setStartPoint(0);
        expect(instance.startPoint).not.to.equal(undefined);
      });

    });

    describe('::setEndPoint', function () {

      it('should mark selected point as end point', function () {
        expect(instance.endPoint).to.equal(undefined);
        instance.setEndPoint(0);
        expect(instance.endPoint).not.to.equal(undefined);
      });

    });

  });

});
