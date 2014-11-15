# QRD.js (Quickroad.js)

## Purpose

* Allows you to define Points and Relations between points and put them in the matrix
* Allows you to find the shortest path between points


## Todos

* Use browserify to provide browser-friendly version of the library
* Automate workflow with grunt/gulp
* Make sure relation.cost returns a float number
* Add code documentation wherever applicable

## Installation

HTML:

``` html
  <script src="qrd.js"></script>
```

NodeJS (install package):

``` bash
  npm install qrd
```

NodeJS (include in your code):

``` javascript
  var QRD = require('qrd');
```

## Usage

### Setup

#### 1. First, set up points

``` javascript
  var points = [
    new QRD.Point(0,0),
    new QRD.Point(2,2),
    new QRD.Point(3,1),
    new QRD.Point(5,-1),
    new QRD.Point(1,-1),
    new QRD.Point(4,-3)
  ];
```

#### 2. Second, set up relations between points

``` javascript
  var relations = [
    new QRD.Relation(points[0], points[1]),
    new QRD.Relation(points[0], points[2]),
    new QRD.Relation(points[2], points[3]),
    new QRD.Relation(points[2], points[4]),
    new QRD.Relation(points[3], points[5]),
    new QRD.Relation(points[4], points[5])
  ];
```

#### 3. Third, create an empty matrix

``` javascript
  var matrix = new QRD.Matrix();
```

#### 4. Fourth, load points onto the matrix

``` javascript
  matrix.addPoints(points);
```

#### 5. Fifth, load relations onto the matrix

``` javascript
  matrix.addRelations(relations);
```

Now, the matrix contains both points and relations. You can imagine this as dots on a matrix connected with straight lines (source -> target)

### Perform calculations

#### 1. Create an instance of PathFinder

``` javascript
  var pathFinder = new QRD.PathFinder(matrix);
```

#### 2. Find the shortest path

You can reference points array directly

``` javascript
  pathFinder.findShortestPath(pathFinder.points[0], pathFinder.points[4]);
  // => [ point, point, point ]
```

Or you can use shortcut method if you know exact element indexes 

``` javascript
  pathFinder.findShortestPath(0, 4);
  // => [ point, point, point ]
```

For simplicity purposes you can use 'first' and 'last' words to reference first and last point from the array

``` javascript
  pathFinder.findShortestPath('first', 'last');
  // => [ point, point, point ]
```

You're done! You've received the collection of points that form the shortest path between start and end points

### Final form

``` javascript
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

  var pathFinder = new QRD.PathFinder(matrix);

  pathFinder.findShortestPath('first', 'last');
  // => [ point, point, ..., point ]
```

### Where and how can you use the library?

* You can easily use this library to calculate the closest element to focus when navigating your website with keyboard/arrows (point <-- relation.cost --> point)
* You can easily calculate the shortest route to take (e.g. on a map)
* You can also extend the library to support elements in 3D space if needed

## Contributing
Feel free to contribute or contact me at contact@maciejsmolinski.com with any questions

