function MatrixModel() {
  BaseModel.call(this);
  this.grid = [
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
  ];
  var instance = this;
  MatrixModel = function () {
    return instance;
  };

  this.initFn();
}

MatrixModel.prototype = Object.create(BaseModel.prototype);
MatrixModel.prototype.constructor = MatrixModel;

MatrixModel.prototype.findRandomCell = function () {
  return Math.floor(Math.random() * 4);
};

MatrixModel.prototype.findRandomNumber = function () {
  return Math.random() < 0.8 ? 2 : 4;
};

MatrixModel.prototype.findRandomRowExist = function () {
  var randomRow = this.findRandomCell();
  if (this.grid[randomRow].includes("")) {
    return randomRow;
  } else {
    return this.findRandomRowExist();
  }
};

MatrixModel.prototype.findRandomCellExist = function (row) {
  var newArr = [],
    i,
    randomRow = this.grid[row],
    size = randomRow.length;
  for (i = 0; i < size; i += 1) {
    if (randomRow[i] === "") {
      newArr.push(i);
    }
  }
  return newArr[Math.floor(Math.random() * newArr.length)];
};

MatrixModel.prototype.findRandomCellWithoutDuplicates = function () {
  var randomRow = this.findRandomRowExist();
  this.grid[randomRow][
    this.findRandomCellExist(randomRow)
  ] = this.findRandomNumber();
};

// Action appears on app init
MatrixModel.prototype.initFn = function () {
  this.grid[this.findRandomCell()][
    this.findRandomCell()
  ] = this.findRandomNumber();
  this.findRandomCellWithoutDuplicates();
};

// Action depends on user key event
MatrixModel.prototype.displayActionResults = function (key) {
  console.log("keyboard", key);
};

// Action depends on user click New Game event
MatrixModel.prototype.startNewGame = function () {
  this.publish("changeState");
};

MatrixModel.prototype.slide = function (row, key) {
  var arr = row.filter((el) => el);
  var missing = 4 - arr.length;
  var zeros = Array(missing).fill("");
  if (key === "left") {
    arr = arr.concat(zeros);
  }
  if (key === "right") {
    arr = zeros.concat(arr);
  }
  if (key === "up") {
    this.grid = this.rotateGrid(this.grid);
  }

  return arr;
};

MatrixModel.prototype.move = function (key) {
  var oldGrid = this.copyGrid(this.grid),
    gridLength = this.grid.length,
    i = 0,
    gridChanged = false;
  for (; i < gridLength; i++) {
    this.grid[i] = this.slide(this.grid[i], key);
    this.combine(this.grid[i]);
    this.grid[i] = this.slide(this.grid[i], key);
  }
  gridChanged = this.compare(oldGrid, this.grid);
  if (gridChanged) {
    this.findRandomCellWithoutDuplicates();
  }

  this.publish("itemMoved");
};

MatrixModel.prototype.combine = function (row) {
  for (var i = 3; i >= 1; i--) {
    var a = row[i];
    parseInt(a, 10);
    var b = row[i - 1];
    parseInt(b, 10);
    if (a === b) {
      row[i] = a + b;
      row[i - 1] = "";
    }
  }
  return row;
};

MatrixModel.prototype.returnEmpty = function (grid) {
  var empty = [
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
  ];
  return empty;
};

MatrixModel.prototype.copyGrid = function (grid) {
  var newGrid = this.returnEmpty();
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      newGrid[i][j] = grid[i][j];
    }
  }
  return newGrid;
};

MatrixModel.prototype.compare = function (grid1, grid2) {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (grid1[i][j] != grid2[i][j]) {
        return true;
      }
    }
  }
  return false;
};

MatrixModel.prototype.rotateGrid = function (grid) {
  var newGrid = this.returnEmpty();
  console.log(newGrid);
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      newGrid[i][j] = grid[j][i];
    }
  }
  console.log(newGrid);
  return newGrid;
};
