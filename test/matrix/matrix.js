var expect = require('chai').expect;
var subject = require('../../lib/matrix/matrix');

describe('Matrix', function () {

  describe('::class', function () {

    it('should have property @name defined as "Matrix"', function () {
      expect(subject.name).to.equal('Matrix');
    });

  });

  describe('::constructor', function () {

    it('should take at most 1 parameter', function () {
      expect(subject.length).to.equal(1);
    });

  });

  describe('::instance', function () {

    it('should have @relations property defined as an array', function () {
      expect((new subject()).relations).to.be.an('array');
    });

    it('should have @points property defined as an array', function () {
      expect((new subject()).points).to.be.an('array');
    });

  });

  describe('::methods', function () {

    var instance = new subject();
    var point    = Object.create({ constructor: function Point () {} });
    var relation = Object.create({ constructor: function Relation () {} });


    it('::addPoint should add point to the @points property', function () {
      expect(instance.points.length).to.equal(0);
      instance.addPoint(point);
      expect(instance.points.length).to.equal(1);
    });

    it('::addPoints should call ::addPoint for each element', function () {
      // to implement
    });

    it('::addRelation should add relation to the @relations property', function () {
      expect(instance.relations.length).to.equal(0);
      instance.addRelation(relation);
      expect(instance.relations.length).to.equal(1);
    });

    it('::addRelations should call ::addRelation for each element', function () {
      // to implement
    });

  });

});
