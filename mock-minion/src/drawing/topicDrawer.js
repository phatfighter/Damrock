import { fabric } from "fabric";

const TopicDrawer = {
  draw(canvas, state, size = 48, color = "#888888") {
    var ellipse = new fabric.Ellipse({
      top: 0,
      left: size,
      originX: "center",
      originY: "center",
      rx: size / 8,
      ry: size / 2,
      fill: color,
      strokeWidth: 1,
      stroke: "black",
      scaleX: 1,
      scaleY: 1,
      objectCaching: false,
      transparentCorners: false,
    });

    var leftLine = new fabric.Path(
      `M0 ${-size / 2} Q${-size / 4}, 0, 0, ${size / 2}`,
      {
        top: 0,
        left: -size,
        originX: "center",
        originY: "center",
        fill: "",
        stroke: "black",
        objectCaching: false,
        transparentCorners: false,
      }
    );

    var tline = new fabric.Line([-size + 4, -size / 2, size, -size / 2], {
      originX: "center",
      originY: "center",
      fill: color,
      stroke: color,
      strokeWidth: 1,
      objectCaching: false,
      transparentCorners: false,
    });

    var bline = new fabric.Line([-size + 4, size / 2, size, size / 2], {
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

    var group = new fabric.Group([ellipse, leftLine, tline, bline, text], {
      left: state.x - size,
      top: state.y - size / 2,
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

export default TopicDrawer;
