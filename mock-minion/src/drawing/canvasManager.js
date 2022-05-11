import ApiDrawer from "./apiDrawer.js";
import DatabaseDrawer from "./databaseDrawer.js";
import LineDrawer from "./lineDrawer.js";
import TopicDrawer from "./topicDrawer.js";
import { ButtonEnums } from "../model/enums/buttonEnums.js";
import { DatabaseEnums } from "../model/enums/databaseEnums.js";
import { ApiState } from "../model/api/apiState";
import { DatabaseState } from "../model/database/databaseState.js";
import { ConnectionState } from "../model/connection/connectionState.js";
import { TopicState } from "../model/topic/topicState.js";

const CanvasManager = {
  createObject(canvas, x, y, type, sourceState) {
    if (type === ButtonEnums.Api) {
      return ApiDrawer.draw(canvas, new ApiState("New API", x, y, ""));
    }
    if (type === ButtonEnums.Database) {
      return DatabaseDrawer.draw(
        canvas,
        new DatabaseState("New Database", x, y, DatabaseEnums.Rdbms)
      );
    }
    if (type === ButtonEnums.Topic) {
      return TopicDrawer.draw(canvas, new TopicState("New Topic", x, y));
    }
    if (type === ButtonEnums.Connection) {
      return LineDrawer.draw(
        canvas,
        new ConnectionState("Line", sourceState, x, y)
      );
    }
  },
  deleteObject(canvasObject) {
    var canvas = canvasObject.canvas;
    canvas.remove(canvasObject);
    canvas.requestRenderAll();
  },
  refreshObject(canvas, canvasObject) {
    var state = canvasObject.mmState;
    var returnObject = canvasObject;
    if (state.type === ButtonEnums.Api) {
      canvasObject._objects[1].text = state.name;
      canvasObject.dirty = true;
    } else if (state.type == ButtonEnums.Database) {
      canvasObject._objects[4].text = state.name;
      canvasObject.dirty = true;
    } else if (state.type == ButtonEnums.Topic) {
      canvasObject._objects[4].text = state.name;
      canvasObject.dirty = true;
    } else if (state.type == ButtonEnums.Connection) {
      this.deleteObject(canvasObject);
      returnObject = LineDrawer.draw(canvas, state);
    }
    canvas.requestRenderAll();
    return returnObject;
  },
};

export default CanvasManager;
