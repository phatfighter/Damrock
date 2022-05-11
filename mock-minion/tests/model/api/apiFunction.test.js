import {
  ApiFunction,
  Get,
  Put,
  Post,
  Delete,
} from "../../../src/model/api/apiFunction.js";

test("Test new Api Function with GET", () => {
  var apiFunction = new ApiFunction(1, Get, "/user", null);
  expect(apiFunction.type).toBe(Get);
  expect(apiFunction.path).toBe("/user");
  expect(apiFunction.schema).toBe(null);
});

test("Test new Api Function with Put", () => {
  var apiFunction = new ApiFunction(1, Put, "/user", null);
  expect(apiFunction.type).toBe(Put);
  expect(apiFunction.path).toBe("/user");
  expect(apiFunction.schema).toBe(null);
});

test("Test new Api Function with POST", () => {
  var apiFunction = new ApiFunction(1, Post, "/user", null);
  expect(apiFunction.type).toBe(Post);
  expect(apiFunction.path).toBe("/user");
  expect(apiFunction.schema).toBe(null);
});

test("Test new Api Function with DELETE", () => {
  var apiFunction = new ApiFunction(1, Delete, "/user", null);
  expect(apiFunction.type).toBe(Delete);
  expect(apiFunction.path).toBe("/user");
  expect(apiFunction.schema).toBe(null);
});
