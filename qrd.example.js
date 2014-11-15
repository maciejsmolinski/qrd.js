var QRD = require('./lib/qrd');

var points = [
  new QRD.Point(0,0),
  new QRD.Point(2,2),
  new QRD.Point(3,1),
  new QRD.Point(5,-1),
  new QRD.Point(1,-1),
  new QRD.Point(4,-3)
];


var relations = [
  new QRD.Relation(points[0], points[1]),
  new QRD.Relation(points[0], points[2]),
  new QRD.Relation(points[2], points[3]),
  new QRD.Relation(points[2], points[4]),
  new QRD.Relation(points[3], points[5]),
  new QRD.Relation(points[4], points[5])
];

var matrix = new QRD.Matrix();

matrix.addPoints(points);
matrix.addRelations(relations);

console.log('::Matrix', matrix);

var pathFinder = new QRD.PathFinder(matrix);

console.log('::PathFinder', pathFinder.findShortestPath('first', 'last'));
