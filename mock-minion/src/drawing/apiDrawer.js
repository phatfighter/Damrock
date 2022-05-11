import { fabric } from "fabric";

const ApiDrawer = {
  draw(canvas, state, size = 48, color = "#888888") {
    var points = [];
    var height = size * Math.sin((2 * Math.PI) / 6);
    points.push({ x: size * Math.cos(0), y: size * Math.sin(0) });
    for (var side = 0; side < 7; side++) {
      points.push({
        x: size * Math.cos((side * 2 * Math.PI) / 6),
        y: size * Math.sin((side * 2 * Math.PI) / 6),
      });
    }

    var polygon = new fabric.Polygon(points, {
      fill: color,
      strokeWidth: 1,
      stroke: color,
      scaleX: 1,
      scaleY: 1,
      objectCaching: false,
      transparentCorners: false,
      cornerColor: "blue",
    });

    var text = new fabric.Text(state.name, {
      fontFamily: "'Karla', sans-serif",
      fontSize: 12,
      stroke: "#000000",
      originX: "center",
      originY: "center",
    });

    /*var circle = new fabric.Circle({
      radius: 20,
      fill: "green",
      left: -height / 2,
      top: -height / 2,
    });*/

    var group = new fabric.Group([polygon, text], {
      left: state.x - size,
      top: state.y - height,
    });
    group.set({
      borderColor: "blue",
      cornerColor: "blue",
      cornerSize: 6,
      transparentCorners: false,
      mmState: state,
    });
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
    canvas.add(group);
    return group;
  },
};

export default ApiDrawer;
