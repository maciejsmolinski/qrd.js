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

function Point (x, y) {
  if (! [x, y].every(function (input) { return typeof input === 'number' })) {
    throw new Error('Point(x, y) X and Y must be of Number type');
  }
  this.x = x;
  this.y = y;
}

function Relation (source, target) {
  if (! [source, target].every(function (input) { return input instanceof Point; })) {
    throw new Error('Relation(source, target) Source and Target must be of Point type');
  }
  this.source = source;
  this.target = target;
}

function Matrix (points) {
  this.points = points || [];
  this.relations = [];
}

Matrix.prototype.addPoint = function (point) {
  if (! point instanceof Point) { throw new Error('Matrix::addPoint Tried to add object of wrong type. Point instance should be used instead.'); }
  this.points.push(point);
};


/**
 * Matrix::addPoints (<Array:Points|Point>)
 *
 * Triggers Matrix::addPoint with each element of points array.
 * Works with one Point object as well.
 *
 * Sample Usage:
 *   matrix.addPoints( point )
 *   matrix.addPoints( [ point, point, point ] )
 *
 * @param {Array|Point}  points  Points to be added to the matrix
 */
Matrix.prototype.addPoints = function (points) {
  if (!Array.isArray(points)) { points = [ points ]; }
  points.forEach(this.addPoint.bind(this));
};

Matrix.prototype.addRelation = function (relation) {
  if (! relation instanceof Relation) { throw new Error('Matrix::addRelation Tried to add object of wrong type. Relation instance should be used instead.'); }
  this.relations.push(relation);
};

/**
 * Matrix::addRelations (<Array:rRelations|Relation>)
 *
 * Triggers Matrix::addRelation with each element of relations array.
 * Works with one Relation object as well.
 *
 * Sample Usage:
 *   matrix.addRelations( relation )
 *   matrix.addRelations( [ relation, relation, relation ] )
 *
 * @param {Array|Relation}  relations  Relations to be added to the matrix
 */
Matrix.prototype.addRelations = function (relations) {
  if (!Array.isArray(relations)) { relations = [ relations ]; }
  relations.forEach(this.addRelation.bind(this));
};

//////////////////////////////////////////////////////////////////

var matrix = new Matrix();

matrix.addPoints(points);
matrix.addRelations(relations);

console.log(matrix);

