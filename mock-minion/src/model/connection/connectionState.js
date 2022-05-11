import { CommonState } from "../common/commonState.js";
import { ButtonEnums } from "../enums/buttonEnums.js";

function ConnectionState(name, sourceObject, x, y) {
  CommonState.call(this, name, ButtonEnums.Connection, x, y);
  this.sourceObject = sourceObject;
  this.targetObject = null;
}

export { ConnectionState };
