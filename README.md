# Quickroad.js

## Purpose

* Allows you to define Points and Relations between points and put them in the matrix
* Allows you to find the shortest path between points


## Todos

* Use browserify to provide browser-friendly version of the library
* Automate workflow with grunt/gulp
* Provide easy to use API for finding shortest path
* Bump versions whenever applicable

## Installation

HTML:

``` html
  <script src="quickroad.js"></script>
```

NodeJS:

``` javascript
  var QRD = require('quickroad');
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

``` javascript
  // @todo
```

## Contributing
Feel free to contribute or contact me at contact@maciejsmolinski.com with any questions

