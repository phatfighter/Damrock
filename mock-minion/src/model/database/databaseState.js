import { CommonState } from "../common/commonState.js";
import { ButtonEnums } from "../enums/buttonEnums.js";

function DatabaseState(name, x, y, dbType) {
  CommonState.call(this, name, ButtonEnums.Database, x, y);
  this.dbType = dbType;
}

export { DatabaseState };
