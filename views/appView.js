function AppView() {
  // Instanciates two constructors inside a parrent constructor
  var matrixView = new MatrixView();
  var summaryView = new SummaryView();
  // render method gets root element
  this.render = function (selector) {
    // gets access to it
    var element = document.getElementById(selector);
    // shows scores
    summaryView.show(element);

    //shows elements
    matrixView.show(element);
  };
}

var appView = new AppView();
appView.render("root");
