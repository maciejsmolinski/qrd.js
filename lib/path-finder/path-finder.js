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
    if (! [matrix].every(function (input) { return input && input.constructor.name === 'Matrix'; })) {
      throw new Error('PathFinder(matrix) Matrix must be of Matrix type');
    }

    this.matrix     = matrix;
    this.points     = matrix.points;
    this.startPoint = undefined;
    this.endPoint   = undefined;
  }

  PathFinder.prototype.setStartPoint = function (option) {
    this.startPoint = this.__findPoint(option);
  };

  PathFinder.prototype.setEndPoint = function (option) {
    this.endPoint = this.__findPoint(option);
  };

  PathFinder.prototype.__markGraphCostsAndRoutes = function () {
    var relationsToVisit     = this.startPoint.relations;
    var nextRelationsToVisit = [];

    while (relationsToVisit && relationsToVisit.length) {
      relationsToVisit.forEach(function (relation) {
        var fullCost = relation.source.cost + relation.cost;
        if (fullCost < relation.target.cost) {
          relation.target.cost = fullCost;
          relation.target.from = relation.source;
        }
        relation.source.active = false;
        nextRelationsToVisit = nextRelationsToVisit.concat(relation.target.relations);
      });
      relationsToVisit = nextRelationsToVisit;
      nextRelationsToVisit = [];
    }
  };

  PathFinder.prototype.__getShortestPath = function () {
    var currentPoint = this.endPoint;
    var path         = [ this.endPoint ];

    while (currentPoint && currentPoint.from) {
      currentPoint = currentPoint.from;
      path.push(currentPoint);
    }
    return path.reverse();
  };

  PathFinder.prototype.findShortestPath = function (startPoint, endPoint) {
    this.setStartPoint(startPoint);
    this.setEndPoint(endPoint);
    this.__markGraphCostsAndRoutes();
    return this.__getShortestPath();
  };

  /**
   * ::PathFinder::__findPoint(option)
   *
   *  Helps to find a point in `this.points` points collection by defined option.
   *
   *  Sample Usage:
   *    pathFinder.__findPoint('first')         // => returns first point
   *    pathFinder.__findPoint('last')          // => returns last
   *    pathFinder.__findPoint(this.points[0])  // => returns first point
   *    pathFinder.__findPoint(this.points[1])  // => returns second point
   *    pathFinder.__findPoint(0)               // => returns first point
   *    pathFinder.__findPoint(1)               // => returns second point
   *
   * @param   {String|Point|Number}  option  Option defining point to find in `this.points` collection
   * @return  {Point}
   */
  PathFinder.prototype.__findPoint = function (option) {
    if (option === 'first') { return this.points[0]; }
    else if (option === 'last')  { return this.points[this.points.length-1]; }
    else if (typeof option === 'number') { return this.points[option]; }
    else if (option.constructor.name === 'Point') { return option; }
    else {
      throw new Error('PathFinder::__findPoint(option) Unknown type of option provided: ' + option);
    }
  };

  /* Set class property @name if it's not supported out of the box */
  PathFinder.name = PathFinder.name || 'PathFinder';


  module.exports = PathFinder;

}(module));
