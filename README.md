# Quickroad.js

## Purpose

* Allows you to define Points and Relations between points and put them in the matrix
* Allows you to find the shortest path between points


## Todos

* Make sure the code is extendable so that points can be put in 3-D space
* Make sure matrix could use custom-made printers so that users can do whatever they want with computed data (e.g. print the matrix, print the shortest path etc.)

## Installation

``` html
<script src="quickroad.js"></script>
```

## Usage

### Setup

#### 1. First, set up points

``` javascript
  var points = [
    new Point(0,0),
    new Point(2,2),
    new Point(3,1),
    new Point(5,-1),
    new Point(1,-1),
    new Point(4,-3)
  ];
```

#### 2. Second, set up relations between points

``` javascript
  var relations = [
    new Relation(points[0], points[1]),
    new Relation(points[0], points[2]),
    new Relation(points[2], points[3]),
    new Relation(points[2], points[4]),
    new Relation(points[3], points[5]),
    new Relation(points[4], points[5])
  ];
```

#### 3. Third, create an empty matrix

``` javascript
  var matrix = new Matrix();
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

