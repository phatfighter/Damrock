import { ApiState } from "../../../src/model/api/apiState.js";

test("Test new Api State", () => {
  var apiState = new ApiState("Api1", 10, 20, "schema");
  expect(apiState.name).toBe("Api1");
  expect(apiState.x).toBe(10);
  expect(apiState.y).toBe(20);
  expect(apiState.schema).toBe("schema");
});
