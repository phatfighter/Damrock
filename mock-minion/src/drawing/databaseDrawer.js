import { fabric } from "fabric";

const DatabaseDrawer = {
  draw(canvas, state, size = 48, color = "#888888") {
    var ellipse = new fabric.Ellipse({
      top: -size,
      left: 0,
      originX: "center",
      originY: "center",
      rx: size,
      ry: size / 4,
      fill: color,
      strokeWidth: 1,
      stroke: "black",
      scaleX: 1,
      scaleY: 1,
      objectCaching: false,
      transparentCorners: false,
    });

    var bottomLine = new fabric.Path(
      `M ${-size} 0 q ${size},${size / 2}, ${size * 2}, 0`,
      {
        top: size,
        left: 0,
        originX: "center",
        originY: "center",
        fill: "",
        stroke: "black",
        objectCaching: false,
        transparentCorners: false,
      }
    );

    var lline = new fabric.Line([-size, -size, -size, size - 8], {
      originX: "center",
      originY: "center",
      fill: color,
      stroke: color,
      strokeWidth: 1,
      objectCaching: false,
      transparentCorners: false,
    });

    var rline = new fabric.Line([size, -size, size, size - 8], {
      originX: "center",
      originY: "center",
      fill: color,
      stroke: color,
      strokeWidth: 1,
      objectCaching: false,
      transparentCorners: false,
    });

    var text = new fabric.Text(state.name, {
      fontFamily: "'Karla', sans-serif",
      fontSize: 12,
      stroke: "#000000",
      originX: "center",
      originY: "center",
    });

    var group = new fabric.Group([ellipse, bottomLine, lline, rline, text], {
      left: state.x - size,
      top: state.y - size,
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

export default DatabaseDrawer;
