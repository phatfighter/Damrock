import { InstanceManager } from "../../src/commands/instanceManager.js";

test("Test new manager has nothing", () => {
  var manager = new InstanceManager();
  expect(manager.id).toBe(0);
  expect(manager.stacks.length).toBe(0);
});

test("Test add an instance", () => {
  var manager = new InstanceManager();
  var obj = {
    name: "Api",
    id: -1,
  };
  manager.push(obj);
  expect(manager.id).toBe(1);
  expect(manager.stacks.length).toBe(1);
  expect(manager.stacks.at(0).instances.length).toBe(1);
  expect(manager.stacks.at(0).getCurrentInstance()).toStrictEqual(obj);
  expect(manager.stacks.at(0).getCurrentInstance().id).toBe(0);
});

test("Test add two instances", () => {
  var manager = new InstanceManager();
  var obj1 = {
    name: "Api",
    id: -1,
  };
  manager.push(obj1);
  var obj2 = {
    name: "Api_modified",
  };
  obj2.id = obj1.id;
  manager.push(obj2);
  expect(manager.id).toBe(1);
  expect(manager.stacks.length).toBe(1);
  expect(manager.stacks.at(0).instances.length).toBe(2);
  expect(manager.stacks.at(0).getCurrentInstance()).toStrictEqual(obj2);
  expect(manager.stacks.at(0).getCurrentInstance().id).toBe(0);
});

test("Test add two components", () => {
  var manager = new InstanceManager();
  var obj1 = {
    name: "Api",
    id: -1,
  };
  manager.push(obj1);
  var obj2 = {
    name: "Database",
    id: -1,
  };
  manager.push(obj2);
  expect(manager.id).toBe(2);
  expect(manager.stacks.length).toBe(2);

  expect(manager.stacks.at(0).instances.length).toBe(1);
  expect(manager.stacks.at(0).getCurrentInstance()).toStrictEqual(obj1);
  expect(manager.stacks.at(0).getCurrentInstance().id).toBe(0);

  expect(manager.stacks.at(1).instances.length).toBe(1);
  expect(manager.stacks.at(1).getCurrentInstance()).toStrictEqual(obj2);
  expect(manager.stacks.at(1).getCurrentInstance().id).toBe(1);
});

test("Test add decrement and increment", () => {
  var manager = new InstanceManager();
  var obj1 = {
    name: "Api",
    id: -1,
  };
  manager.push(obj1);
  var obj2 = {
    name: "Api_modified",
  };
  obj2.id = obj1.id;
  manager.push(obj2);
  expect(manager.id).toBe(1);
  expect(manager.stacks.length).toBe(1);
  expect(manager.stacks.at(0).instances.length).toBe(2);
  expect(manager.stacks.at(0).getCurrentInstance()).toStrictEqual(obj2);
  expect(manager.stacks.at(0).getCurrentInstance().id).toBe(0);

  manager.decrementInstance(0);
  expect(manager.stacks.at(0).getCurrentInstance()).toStrictEqual(obj1);

  manager.incrementInstance(0);
  expect(manager.stacks.at(0).getCurrentInstance()).toStrictEqual(obj2);
});

test("Test decrement and increment out of bounds", () => {
  var manager = new InstanceManager();
  manager.decrementInstance(0);
  manager.incrementInstance(0);
});
