import { InstanceStack } from "./instanceStack";

function InstanceManager() {
  this.stacks = [];
  this.id = 0;

  this.push = methods.push;
  this.decrementInstance = methods.decrementInstance;
  this.incrementInstance = methods.incrementInstance;
}

var methods = {};

methods.push = function (instance) {
  var stack;
  if (instance.id === -1) {
    stack = new InstanceStack();
    this.stacks.push(stack);
    instance.id = this.id;
    this.id++;
  } else {
    stack = this.stacks.at(instance.id);
  }
  stack.push(instance);
};

methods.decrementInstance = function (id) {
  if (id >= 0 && id < this.id) {
    var stack = this.stacks.at(id);
    stack.decrement();
  }
};

methods.incrementInstance = function (id) {
  if (id >= 0 && id < this.id) {
    var stack = this.stacks.at(id);
    stack.increment();
  }
};

export { InstanceManager };
