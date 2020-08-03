function Controller() {
  this.matrixModel = new MatrixModel();
  this.summaryModel = new SummaryModel();
}

Controller.prototype.onKeyDownHandler = function (event) {
  var key;

  switch (event.keyCode) {
    case 38:
      key = "up";
      break;
    case 40:
      key = "down";
      break;
    case 37:
      key = "left";
      break;
    case 39:
      key = "right";
      break;
    default:
      return;
  }

  if (key === "up") {
    this.summaryModel.add();
  }

  if (key === "down") {
    this.summaryModel.decrease();
  }

  this.matrixModel.displayActionResults(key);
};

Controller.prototype.onClickHandler = function () {
  this.matrixModel.startNewGame();
};
