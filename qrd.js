var QR = require('./lib/qrd');

var points = [
  new QR.Point(0,0),
  new QR.Point(2,2),
  new QR.Point(3,1),
  new QR.Point(5,-1),
  new QR.Point(1,-1),
  new QR.Point(4,-3)
];


var relations = [
  new QR.Relation(points[0], points[1]),
  new QR.Relation(points[0], points[2]),
  new QR.Relation(points[2], points[3]),
  new QR.Relation(points[2], points[4]),
  new QR.Relation(points[3], points[5]),
  new QR.Relation(points[4], points[5])
];

var matrix = new QR.Matrix();

matrix.addPoints(points);
matrix.addRelations(relations);

console.log('::Matrix', matrix);

//////////////////////////////////////////////////////////////////


// matrix.findShortestPath(matrix.points[0], matrix.points[5]);
//   // => [ (4,3), (3,2), (...), (0,0) ]

// var toVisit = matrix.points[0].relations;
// var newToVisit = [];

// while (toVisit.length) {
//   toVisit.forEach(function (relation) {
//     var fullCost = relation.source.cost + relation.cost;
//     if (fullCost < relation.target.cost) {
//       relation.target.cost = fullCost;
//       relation.target.from = relation.source;
//     }
//     relation.source.active = false
//     newToVisit = newToVisit.concat(relation.target.relations);
//   });
//   toVisit = newToVisit;
//   newToVisit = [];
// }


// var point = matrix.points.slice(-1)[0];
// console.log('::Route End Point', '(' + point.x + ',' + point.y + ')');
// while (point.from) {
//   point = point.from;
//   console.log('::Route Via', '(' + point.x + ',' + point.y + ')');
// }
