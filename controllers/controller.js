function Controller() {
    this.matrixModel = new MatrixModel();
}

Controller.prototype.onKeyPress = function () {

}

Controller.prototype.onClickNewGame = function () {
    this.matrixModel.startNewGame();
}

