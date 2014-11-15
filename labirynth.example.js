var QRD = require('./lib/qrd');

/**
 * Let's draw a labirynth
 *
 * S - Stands for Start Point
 * F - Stands for Finish / End Point
 * P - Stands for Paths
 * X - Stands for Non-Accessible Area
 *
 *   XSXPPF
 *   XPXPXX
 *   XPPPXX
 *   XPXPXX
 *   XPPPXX
 *
 * @type {Array}
 */
var labirynth = [
  ['X', 'S', 'X', 'P', 'P', 'F'],
  ['X', 'P', 'X', 'P', 'X', 'X'],
  ['X', 'P', 'P', 'P', 'X', 'X'],
  ['X', 'P', 'X', 'P', 'X', 'X'],
  ['X', 'P', 'P', 'P', 'X', 'X']
];


/**
 * Let's find out coordinates of Start and End Points
 *
 * Start Point: (0,1)
 * End Point: (0,5)
 *
 */
var startEndPointCoordinates = findStartEndPointsCoords(labirynth);


/**
 * Let's prepare data for QRD library so that we can provide it with QRD.Points and QRD.Relations
 */
var points    = convertLabirynthToPoints(labirynth);
var relations = findRelations(points);


/**
 * Let's find out indexes of start and end points based on their coordinates found earlier
 *
 * Start Point Index: 0
 * End Point Index: 3
 *
 */
var startEndPointIndexes = findStartEndPointIndexes(points, startEndPointCoordinates);


/**
 * Let's play around with QRD library
 *
 * 1. Prepare an empty Matrix
 * 2. Add points and Relations to the matrix
 *
 */
var matrix = new QRD.Matrix();
matrix.addPoints(points).addRelations(relations);


/**
 * Let's find the shortest path from Start to End Point
 *
 */
var pathFinder   = new QRD.PathFinder(matrix);
var shortestPath = pathFinder.findShortestPath(startEndPointIndexes.startPointIndex , startEndPointIndexes.endPointIndex);


/**
 * Let's see the output in the console, should be a collection of points (start, middle, ..., middle, end)
 */
console.log(shortestPath);








/**
 * Helper Function: Compact Array (remove empty values such as undefined, null etc.)
 *
 * Sample Usage:
 *   arrayCompact([ 1, undefined, {}, null ]);
 *   // => [ 1, {} ]
 *
 * @param  {Array}  array  Input array that potentially contains empty values
 * @return {Array}         Array without empty values
 */
function arrayCompact (array) {
  return array.filter(function (item) {
    return !! item;
  });
}

/**
 * Helper Function: Flattens Array (array of arrays becomes single array of all items combined)
 *
 * Sample Usage:
 *   arrayFlatten([ [1,2], [3,4], [5,6] ]);
 *   // => [ 1, 2, 3, 4, 5, 6 ]
 *
 * @param  {Array}  arrayOfArrays  Array of arrays to be flattened
 * @return {Array}                 Flattened array
 */
function arrayFlatten(arrayOfArrays) {
  return arrayOfArrays.reduce(function (cumulative, currentArray) {
    return cumulative.concat(currentArray);
  }, []);
}

/**
 * Helper Function: Finds all relations between points in an array of points
 *
 * @param  {Array}  arrayOfPoints  Array containing QRD Points
 * @return {Array}                 Array containing QRD Relations
 */
function findRelations (arrayOfPoints) {
  var arrayRelations = [];

  arrayOfPoints.forEach(function (point) {
    // Find Neighbours
    var relatedPoints = arrayOfPoints.filter(function (potentialConnection) {
      return (
        (potentialConnection.x == point.x + 1 && potentialConnection.y == point.y) ||
        (potentialConnection.x == point.x - 1 && potentialConnection.y == point.y) ||
        (potentialConnection.y == point.y + 1 && potentialConnection.x == point.x) ||
        (potentialConnection.y == point.y - 1 && potentialConnection.x == point.x)
        );
    });
    // Add relations to arrayRelations array
    arrayRelations = arrayRelations.concat(relatedPoints.map(function (relatedPoint) {
      return new QRD.Relation(point, relatedPoint);
    }));
  });

  return arrayRelations;
}

/**
 * Helper Function: Converts Non-Flat Labirynth Array to flat array of points
 *
 * X-values in the labirynth get skipped
 * All values different than X get converted to points
 *
 * Sample Usage:
 *   var labirynth = [
 *     ['X','S','P','P','F'],
 *     ['X','P','X','P','X'],
 *     ['X','P','P','P','X'],
 *   ];
 *   var points = convertLabirynthToPoints(labirynth);
 *   // [ point, point, point, point, point, point, point, point, point ]
 *
 * @param  {[type]} labirynthArray [description]
 * @return {[type]}                [description]
 */
function convertLabirynthToPoints (labirynthArray) {
  return arrayFlatten(labirynthArray.map(function (row, rowIndex) {
    return arrayCompact(row.map(function (column, columnIndex) {
      if (column !== 'X') {
        return new QRD.Point(columnIndex, rowIndex);
      }
    }));
  }));
}

/**
 * Helper Function: Finds (x,y) coordinates of Start and End Points in array
 *
 *
 * @param  {Array}   labirynthArray  Labirynth array
 * @return {Object}                  Object containing @startPointCoordinates(x,y) and @endPointCoordinates(x,y) properties
 */
function findStartEndPointsCoords (labirynthArray) {
  var result = {
    startPointCoordinates: { x: 0, y: 0 },
    endPointCoordinates: { x: 0, y: 0 },
  };

  labirynthArray.forEach(function (row, rowIndex) {
    return row.forEach(function (column, columnIndex) {
      if (column === 'S') {
        result.startPointCoordinates = { x: columnIndex, y: rowIndex};
      }
      if (column === 'F') {
        result.endPointCoordinates = { x: columnIndex, y: rowIndex};
      }
    });
  });
  return result;
}

/**
 * Helper function: Based on coordinates (@startPointCoordinates, @endPointCoordinates),
 * finds indexes of Start and End Points in the array of QRD Points
 *
 * @param  {Array}   arrayOfPoints  An Array containing QRD Points
 * @param  {Object}  coordinates    Object containing @startPointCoordinates(Number,Number) and @endPointCoordinates(x,y) properties
 * @return {object}                 Object containing @startPointIndex(Number) and @endPointIndex(Number) properties
 *
 */
function findStartEndPointIndexes (arrayOfPoints, coordinates) {
  var result = {
    startPointIndex: 0,
    endPointIndex: 0
  };

  arrayOfPoints.forEach(function (point, pointIndex) {
    if (point.x === coordinates.startPointCoordinates.x && point.y === coordinates.startPointCoordinates.y) {
      result.startPointIndex = pointIndex;
    }
    if (point.x === coordinates.endPointCoordinates.x && point.y === coordinates.endPointCoordinates.y) {
      result.endPointIndex = pointIndex;
    }
  });

  return result;
}
