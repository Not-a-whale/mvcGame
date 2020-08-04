function SummaryModel() {
  BaseModel.call(this);
  this.attributes = {
    totalScore: 0,
    bestScore: 0,
  };
  var instance = this;
  SummaryModel = function () {
    return instance;
  };
}

SummaryModel.prototype = Object.create(BaseModel.prototype);
SummaryModel.prototype.constructor = SummaryModel;

SummaryModel.prototype.reset = function () {};

SummaryModel.prototype.add = function () {
  for (var i in this.attributes) {
    i = this.attributes[i]++;
  }
  console.log(this.attributes);
  this.publish("attrIncrease");
};

SummaryModel.prototype.decrease = function () {
  for (var i in this.attributes) {
    i = this.attributes[i]--;
  }
  console.log(this.attributes);
  this.publish("attrDecrease");
};
