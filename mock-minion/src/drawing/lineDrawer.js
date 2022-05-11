import { fabric } from "fabric";

const LineDrawer = {
  drawLine(x1, y1, x2, y2) {
    var hline = new fabric.Line([x1, y1, x2, y1], {
      fill: "blue",
      stroke: "blue",
      strokeWidth: 2,
      objectCaching: false,
      transparentCorners: false,
      scaleX: 1,
      scaleY: 1,
    });
    var vline = new fabric.Line([x2, y1, x2, y2], {
      fill: "blue",
      stroke: "blue",
      strokeWidth: 2,
      objectCaching: false,
      transparentCorners: false,
      scaleX: 1,
      scaleY: 1,
    });

    var group = new fabric.Group([hline, vline]);
    group.set({
      borderColor: "blue",
      cornerColor: "blue",
      cornerSize: 6,
      transparentCorners: false,
      objectCaching: false,
    });
    group.bringToFront();
    group.setControlsVisibility({
      bl: false,
      br: false,
      mb: false,
      ml: false,
      mr: false,
      mt: false,
      tl: false,
      tr: false,
      mtr: false,
    });
    return group;
  },
  draw(canvas, state) {
    if (state.targetObject != null) {
      console.log(state.targetObject.name);
    }
    var group = this.drawLine(
      state.sourceObject.x,
      state.sourceObject.y,
      state.targetObject == null ? state.x : state.targetObject.x,
      state.targetObject == null ? state.y : state.targetObject.y
    );
    group.set({ mmState: state });
    canvas.add(group);
    if (state.targetObject == null) {
      group.sendToBack();
    }
    return group;
  },
};

export default LineDrawer;
