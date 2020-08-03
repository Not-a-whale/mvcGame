function BaseView() {
  this.rootElement = document.createElement("div");
}

BaseView.prototype.show = function (element) {
  this.beforeRender();
  this.rootElement.innerHTML = this.render();
  this.rootElement.classList.add(this.className);
  element.appendChild(this.rootElement);
  this.afterRender();
};
BaseView.prototype.render = function () {
  throw new Error("Your component should have a render message");
};

BaseView.prototype.beforeRender = function () {};
BaseView.prototype.afterRender = function () {};
BaseView.prototype.reRender = function () {
  this.beforeUpdate();
  this.rootElement.innerHtml = this.render();
  this.afterUpdate();
};

BaseView.prototype.beforeUpdate = function () {};
BaseView.prototype.afterUpdate = function () {};
