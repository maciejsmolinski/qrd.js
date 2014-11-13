;(function() {

  'use strict';

  /**
   * ::Matrix (<Array:points>)
   *
   * Returns Matrix instance, might be loaded with predefined points.
   * Matrix contains of points and relations if needed.
   *
   * Sample Usage:
   *   new Matrix(points) // => Matrix
   *
   * @param {Array}  points  An array of Point objects
   */
  function Matrix (points) {
    this.points = points || [];
    this.relations = [];
  }

  /**
   * ::Matrix::addPoint (<Point:point>)
   *
   * Adds Point to the matrix
   *
   * Sample Usage:
   *   matrix.addPoint(new Point(...)) // => Matrix
   *   matrix
   *     .addPoint(new Point(...))
   *     .addPoint(new Point(...))
   *     // => Matrix
   *
   * @param  {Point}   point   An array of Point objects to be added to the matrix
   * @return {Matrix}          Returns matrix object
   */
  Matrix.prototype.addPoint = function (point) {
    if (point.constructor.name !== 'Point') { throw new Error('Matrix::addPoint Tried to add object of wrong type. Point instance should be used instead.'); }

    // Define ::matrix property in the Point object on the fly
    Object.defineProperty(point, 'matrix', {
      value: this
    });

    // Define ::relations property in the Point object on the fly
    Object.defineProperty(point, 'relations', {
      get: function () {
        return this.matrix.relations.filter(function (relation) {
          return (relation.target.active && relation.source == this) || (relation.source.active && relation.target == this);
        }.bind(this));
      }
    });

    // Define ::active and ::cost properties on the fly
    point.active = true;
    point.cost   = this.points.length ? Infinity : 0;

    this.points.push(point);
    return this;
  };


  /**
   * ::Matrix::addPoints (<Array:points|Point>)
   *
   * Triggers Matrix::addPoint with each element of points array.
   * Works with one Point object as well.
   *
   * Sample Usage:
   *   matrix.addPoints( point )
   *   matrix.addPoints( [ point, point, point ] )
   *
   * @param  {Array|Point}  points  Points to be added to the matrix
   * @return {Matrix}               Returns matrix object
   */
  Matrix.prototype.addPoints = function (points) {
    if (! Array.isArray(points)) { points = [ points ]; }

    points.forEach(this.addPoint.bind(this));
    return this;
  };

  /**
   * ::Matrix::addRelation (<Relation:relation>)
   *
   * Adds Relation to the matrix
   *
   * Sample Usage:
   *   matrix.addRelation(new Relation(...)) // => Matrix
   *   matrix
   *     .addRelation(new Relation(...))
   *     .addRelation(new Relation(...))
   *     // => Matrix
   *
   * @param  {Relation}  relation  An array of Relation objects to be added to the matrix
   * @return {Matrix}              Returns matrix object
   */
  Matrix.prototype.addRelation = function (relation) {
    if (relation.constructor.name !== 'Relation') { throw new Error('Matrix::addRelation Tried to add object of wrong type. Relation instance should be used instead.'); }

    this.relations.push(relation);
    return this;
  };

  /**
   * ::Matrix::addRelations (<Array:relations|Relation>)
   *
   * Triggers Matrix::addRelation with each element of relations array.
   * Works with one Relation object as well.
   *
   * Sample Usage:
   *   matrix.addRelations( relation )
   *   matrix.addRelations( [ relation, relation, relation ] )
   *
   * @param  {Array|Relation}  relations  Relations to be added to the matrix
   * @return {Matrix}                     Returns matrix object
   */
  Matrix.prototype.addRelations = function (relations) {
    if (! Array.isArray(relations)) { relations = [ relations ]; }

    relations.forEach(this.addRelation.bind(this));
    return this;
  };

  /* Set class property @name if it's not supported out of the box */
  Matrix.name = Matrix.name || 'Matrix';


  module.exports = Matrix;

}(module));
