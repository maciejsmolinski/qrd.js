;(function() {

  'use strict';

  /**
   * ::Relation (<Point:source>, <Point:target>)
   *
   * Returns instance of Relation that defines relation between two Points
   *
   * Sample Usage:
   *   new Relation(point, point) => // Relation
   *
   * @param {Point}  source  Source Point
   * @param {Point}  target  Destination Point
   */
  function Relation (source, target) {
    if (! [source, target].every(function (input) { return input.constructor.name === 'Point'; })) {
      throw new Error('Relation(source, target) Source and Target must be of Point type');
    }

    this.source = source;
    this.target = target;
  }

  /**
   * ::Relation::cost
   *
   * Calculates cost of relation (distance between two points).
   *
   * Sample Usage:
   *   relation1.cost() // => 3
   *   relation2.cost() // => 2
   *
   * @return  {Number}  Cost of the relation (distance between two points)
   */
  Object.defineProperty(Relation.prototype, 'cost', {
    get: function () {
      return Math.sqrt( Math.pow((this.source.x - this.target.x), 2), Math.pow((this.source.y - this.target.y), 2) );
    }
  });


  /* Set class property @name if it's not supported out of the box */
  Relation.name = Relation.name || 'Relation';


  module.exports = Relation;

}(module));
