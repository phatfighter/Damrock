import { fabric } from "fabric";
import store from "../store";

var modifyImg = document.createElement("img");
modifyImg.src = require("../assets/buttons/pen-to-square-solid.svg");

var deleteImg = document.createElement("img");
deleteImg.src = require("../assets/buttons/trash-solid.svg");

function renderModifyIcon(ctx, left, top) {
  var size = this.cornerSize;
  ctx.save();
  ctx.translate(left, top);
  ctx.drawImage(modifyImg, -size / 2, -size / 2, size, size);
  ctx.restore();
}

function renderTrashIcon(ctx, left, top) {
  var size = this.cornerSize;
  ctx.save();
  ctx.translate(left, top);
  ctx.drawImage(deleteImg, -size / 2, -size / 2, size, size);
  ctx.restore();
}

function modifyObject(eventData, transform) {
  var target = transform.target;
  store.dispatch("modals/setVisible", true);
  store.dispatch("modals/setCanvasObject", target);
}

function deleteObject(eventData, transform) {
  var target = transform.target;
  var canvas = target.canvas;
  canvas.remove(target);
  canvas.requestRenderAll();
}

var modifyDrawer = {
  create() {
    fabric.Object.prototype.controls.modifyControl = new fabric.Control({
      x: +0.25,
      y: -0.75,
      offsetX: 4,
      offsetY: 8,
      cursorStyle: "pointer",
      mouseUpHandler: modifyObject,
      render: renderModifyIcon,
      cornerSize: 20,
    });

    fabric.Object.prototype.controls.deleteControl = new fabric.Control({
      x: +0.5,
      y: -0.75,
      offsetY: 8,
      cursorStyle: "pointer",
      mouseUpHandler: deleteObject,
      render: renderTrashIcon,
      cornerSize: 20,
    });
  },
};

export default modifyDrawer;
