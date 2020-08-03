function MatrixView() {
  // instantiates controller and a model
  this.matrixModel = new MatrixModel();
  this.controller = new Controller();
  this.className = "table";
  this.template = document.getElementById("matrixTemplate").innerHTML;
  // creates a root element
  BaseView.call(this);
}

// inherits
MatrixView.prototype = Object.create(BaseView.prototype);
MatrixView.prototype.constructor = MatrixView;

MatrixView.prototype.beforeRender = function () {
  this.matrixModel.subscribe("changeState", this.changeColor, this);
};

MatrixView.prototype.render = function () {
  var i,
    j,
    grid = this.matrixModel.grid,
    str = "";
  for (i = 0; i < grid.length; i += 1) {
    str += '<div class="row">';
    for (j = 0; j < grid[i].length; j += 1) {
      str +=
        '<div class="cell appear-' + grid[i][j] + ' ">' + grid[i][j] + "</div>";
    }
    str += "</div>";
  }
  return this.template.replace("{{matrix}}", str);
};

MatrixView.prototype.afterRender = function () {
  var newGameBtn = document.getElementById("newGameBtn");
  newGameBtn.onclick = this.controller.onClickHandler.bind(this.controller);
  window.addEventListener(
    "keydown",
    this.controller.onKeyDownHandler.bind(this.controller)
  );
};

MatrixView.prototype.changeColor = function () {
  document.getElementsByClassName("row")[0].style.backgroundColor = "black";
};
