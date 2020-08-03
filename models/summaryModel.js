function SummaryModel() {
  BaseModel.call(this);
  this.attributes = {
    totalScore: 0,
    bestScore: 0,
  };
}

SummaryModel.prototype = Object.create(BaseModel.prototype);
SummaryModel.prototype.constructor = SummaryModel;

SummaryModel.prototype.reset = function () {};

SummaryModel.prototype.add = function () {
  this.bestScore++;

  this.publish("attrIncrease");
  console.log(this.subscribers);
};
