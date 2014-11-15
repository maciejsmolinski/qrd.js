var sinon   = require('sinon');
var expect  = require('chai').expect;
var subject = require('../../lib/path-finder/path-finder');

describe('PathFinder', function () {

  describe('::class', function () {

    it('should have property @name defined as "PathFinder"', function () {
      expect(subject.name).to.equal('PathFinder');
    });

  });

  describe('::constructor', function () {

    var matrixInstance;
    var testInstance;

    beforeEach(function () {
      matrixInstance = Object.create({ constructor: function Matrix(){} });
      testInstance   = Object.create({ constructor: function Test(){} });
    });

    it('should be provided with Matrix instance', function () {
      expect(function () { return new subject(); } ).to.throw(Error);
      expect(function () { return new subject(testInstance); }).to.throw(Error);
      expect(function () { return new subject(matrixInstance); }).not.to.throw(Error);
    });

  });

  describe('::instance', function () {

    var matrixInstance;
    var testInstance;

    beforeEach(function () {
      matrixInstance = Object.create({ constructor: function Matrix(){} });
      instance       = new subject(matrixInstance);
    });

    it('should hold matrix instance so that calculations can be performed on it', function () {
      expect(instance.matrix).to.be.an('object');
    });

  });

  describe('::properties', function () {

    var matrixInstance;
    var instance;

    beforeEach(function () {
      matrixInstance = Object.create({ constructor: function Matrix(){}, points: [] });
      instance       = new subject(matrixInstance);
    });

    describe('@points', function () {

      it('should return points from the matrix', function () {
        expect(instance.points).to.equal(instance.matrix.points);
      });

    });

  });

  describe('::methods', function () {

    var pointInstance1;
    var pointInstance2;
    var matrixInstance;
    var instance;

    beforeEach(function () {
      pointInstance1 = Object.create({ constructor: function Point(){} });
      pointInstance2 = Object.create({ constructor: function Point(){} });
      matrixInstance = Object.create({ constructor: function Matrix(){}, points: [pointInstance1, pointInstance2] });
      instance       = new subject(matrixInstance);
    });

    describe('::findShortestPath', function () {

      it('should mark start and end points corresponding to params provided', function () {
        ['setStartPoint', 'setEndPoint', '__markGraphCostsAndRoutes', '__getShortestPath'].forEach(function (property) {
          instance[property] = sinon.spy();
        });

        instance.findShortestPath('first', 'last');

        expect(instance.setStartPoint.calledWith('first')).to.equal(true);
        expect(instance.setEndPoint.calledWith('last')).to.equal(true);
      });

      it('should return a collection of Points that create the shortest route between marked start and end points', function () {
        var results = instance.findShortestPath('first', 'last');

        expect(results).to.be.an('array');
        expect(results.every(function(result) { return result.constructor.name === 'Point'; })).to.equal(true);
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

    describe('::__findPoint', function () {

      it('should allow only "first", "last", element index and Point instance as an option', function () {
        [ 'first', 'last', 0, 1, instance.points[0] ].forEach(function (knownOption) {
          expect(function () { instance.__findPoint(knownOption); }).not.to.throw(Error);
        });
      });

      it('should throw an error if unknown option is used', function () {
        [ {}. undefined, null, [] ].forEach(function (unknownOption) {
          expect(function () { instance.__findPoint(unknownOption); }).to.throw(Error);
        });
      });

      it('should return corresponding point if found', function () {
        expect(instance.__findPoint(0)).to.equal(instance.points[0]);
        expect(instance.__findPoint(1)).to.equal(instance.points[1]);
        expect(instance.__findPoint('first')).to.equal(instance.points[0]);
        expect(instance.__findPoint('last')).to.equal(instance.points[1]);
        expect(instance.__findPoint(instance.points[0])).to.equal(instance.points[0]);
        expect(instance.__findPoint(instance.points[1])).to.equal(instance.points[1]);
      });

    });

  });

});
