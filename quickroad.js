
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
  if (! [source, target].every(function (input) { return Point.prototype.isPrototypeOf(input); })) {
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
})

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
  if (! Point.prototype.isPrototypeOf(point)) { throw new Error('Matrix::addPoint Tried to add object of wrong type. Point instance should be used instead.'); }

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
  if (!Array.isArray(points)) { points = [ points ]; }

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
  if (! Relation.prototype.isPrototypeOf(relation)) { throw new Error('Matrix::addRelation Tried to add object of wrong type. Relation instance should be used instead.'); }

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


//////////////////////////////////////////////////////////////////

var points = [
  new Point(0,0),
  new Point(2,2),
  new Point(3,1),
  new Point(5,-1),
  new Point(1,-1),
  new Point(4,-3)
];


var relations = [
  new Relation(points[0], points[1]),
  new Relation(points[0], points[2]),
  new Relation(points[2], points[3]),
  new Relation(points[2], points[4]),
  new Relation(points[3], points[5]),
  new Relation(points[4], points[5])
];

var matrix = new Matrix();

matrix.addPoints(points);
matrix.addRelations(relations);

// console.log('::Matrix', matrix);

//////////////////////////////////////////////////////////////////

function PathFinder (matrix) {
  this.visited         = [];
  this.matrix          = matrix;
  this.relationService = function (point, relations) {};
}

PathFinder.prototype.setRelationService = function (relationService) {
  this.relationService = relationService;
}

PathFinder.prototype.lookupPath = function (point) {
  this.visited.push(point);
  var relations = new this.relationService(point, this.matrix.relations).call()
  var pointsToVisit = this.lookupPoints(relations);

  // console.log('>> visiting', point);
  // console.log('>> relations', relations);
  // console.log('>> toVisit',  pointsToVisit);
  // console.log('>> visited',  this.visited);

  return pointsToVisit;
}

PathFinder.prototype.lookupPoints = function (relations) {
  var pointsToVisit = [];

  relations.forEach(function (relation) {
    if (this.visited.indexOf(relation.source) < 0) { pointsToVisit.push(relation.source); }
    if (this.visited.indexOf(relation.target) < 0) { pointsToVisit.push(relation.target); }
  }.bind(this));

  return pointsToVisit;
}

// var pf = new PathFinder(matrix);
// pf.setRelationService(RelationService);
// var toVisit = pf.lookupPath(pf.matrix.points[0]);
// toVisit.forEach(pf.lookupPath.bind(pf))

//////////////////////////////////////////////////////////////////


