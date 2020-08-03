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
  return Math.random() < 0.8 ? "2" : "4";
};

MatrixModel.prototype.findRandomRowExist = function () {
  var randomRow = this.findRandomCell();
  if (this.grid[randomRow].includes("")) {
    console.log(this);
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
