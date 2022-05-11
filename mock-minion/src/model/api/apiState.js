import { CommonState } from "../common/commonState.js";
import { ButtonEnums } from "../enums/buttonEnums.js";

function ApiState(name, x, y, schema) {
  CommonState.call(this, name, ButtonEnums.Api, x, y);
  this.schema = schema;
}

export { ApiState };
