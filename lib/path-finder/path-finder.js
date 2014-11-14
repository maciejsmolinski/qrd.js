;(function() {

  'use strict';

  /**
   * ::PathFinder (<Matrix:matrix>)
   *
   * Returns instance of PathFinder so that calculations on matrix' points and relations can be performed
   *
   * Sample Usage:
   *   new PathFinder(matrix) => // PathFinder
   *
   * @param {Matrix}  matrix  Matrix instance
   */
  function PathFinder (matrix) {
    if (! [matrix].every(function (input) { return input.constructor.name === 'Matrix'; })) {
      throw new Error('PathFinder(matrix) Matrix must be of Matrix type');
    }
  }

  /* Set class property @name if it's not supported out of the box */
  PathFinder.name = PathFinder.name || 'PathFinder';


  module.exports = PathFinder;

}(module));
