;(function() {

  'use strict';

  /**
   * ::Point (<Number:x>, <Number:y>)
   *
   * Returns instance of Point in 2-dimension space (x, y)
   *
   * Sample Usage:
   *   new Point(0, 0) => // Point
   *   new Point(1, 1) => // Point
   *
   * @param {Number}  x  X coordinate
   * @param {Number}  y  Y coordinate
   */
  function Point (x, y) {
    if (! [x, y].every(function (input) { return typeof input === 'number'; })) {
      throw new Error('Point(x, y) X and Y must be of Number type');
    }

    this.x = x;
    this.y = y;
  }

  /* Set class property @name */
  Point.name = 'Point';


  module.exports = Point;

}(module));
