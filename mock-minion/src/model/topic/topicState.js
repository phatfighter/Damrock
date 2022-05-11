import { CommonState } from "../common/commonState.js";
import { ButtonEnums } from "../enums/buttonEnums.js";

function TopicState(name, x, y) {
  CommonState.call(this, name, ButtonEnums.Topic, x, y);
}

export { TopicState };
