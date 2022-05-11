<template>
  <Teleport to="body">
    <ModalWrapper
      :show="this.isModalVisible"
      :name="this.getModalType"
      :canvasObject="this.selectedObject"
    />
  </Teleport>
  <div id="canvas-wrapper">
    <canvas id="canvas"> </canvas>
  </div>
</template>

<script>
import { ButtonEnums } from "@/model/enums/buttonEnums.js";
import { mapGetters, mapActions } from "vuex";
import modifyDrawer from "../drawing/modifyDrawer";
import { fabric } from "fabric";
import ModalWrapper from "./Modals/ModalWrapper.vue";
import CanvasManager from "../drawing/canvasManager.js";

export default {
  name: "Workspace",
  components: { ModalWrapper },
  data() {
    return {
      canvas: null,
      down: false,
      selectedObject: null,
      lineObject: null,
    };
  },
  computed: {
    ...mapGetters({
      getSelectedToolbarButton:
        "buttons/toolbarButtons/getSelectedToolbarButton",
    }),
    ...mapGetters({
      isModalVisible: "modals/isVisible",
    }),
    getCanvas() {
      return this.fcanvas;
    },
    getModalType() {
      if (this.selectedObject == null) {
        return "none";
      }
      return this.selectedObject.mmState.type;
    },
  },
  mounted() {
    this.canvas = document.getElementById("canvas");
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    this.canvaswrapper = document.getElementById("canvas-wrapper");
    this.canvaswrapper.style.width = "100%";
    this.canvaswrapper.style.height = "100%";
    window.addEventListener("resize", this.resizeCanvas, false);

    this.fcanvas = new fabric.Canvas("canvas");
    this.resizeCanvas();

    this.fcanvas.on("mouse:down", this.mousedown);
    this.fcanvas.on("mouse:move", this.mousemove);

    modifyDrawer.create();
    this.setFabricCanvas(this.fcanvas);
  },
  methods: {
    ...mapActions({ setCanvasObject: "modals/setCanvasObject" }),
    ...mapActions({ setModalVisible: "modals/setVisible" }),
    ...mapActions({ setFabricCanvas: "modals/setCanvas" }),

    resizeCanvas() {
      var rect = this.canvaswrapper.getBoundingClientRect();
      this.canvas.width = rect.width;
      this.canvas.height = rect.height;
      this.fcanvas.setDimensions({ width: rect.width, height: rect.height });
    },
    mousedown(options) {
      this.down = true;
      this.selectedObject = null;
      var target = options.target;
      var p = this.fcanvas.getPointer(options.e);
      if (target == null) {
        if (this.lineObject != null) {
          CanvasManager.deleteObject(this.lineObject);
          this.lineObject = null;
        } else if (this.getSelectedToolbarButton !== "none") {
          this.setModalVisible(true);
          this.selectedObject = CanvasManager.createObject(
            this.fcanvas,
            p.x,
            p.y,
            this.getSelectedToolbarButton,
            null
          );
          this.setCanvasObject(this.selectedObject);
        }
      } else {
        if (this.lineObject != null) {
          this.lineObject.mmState.targetObject = target.mmState;
          this.fcanvas.discardActiveObject();
          CanvasManager.refreshObject(this.fcanvas, this.lineObject);
          this.fcanvas.renderAll();
          this.selectedObject = this.lineObject;
          this.setCanvasObject(this.selectedObject);
          this.setModalVisible(true);
          this.lineObject = null;
        } else {
          this.selectedObject = target;
          if (this.getSelectedToolbarButton == ButtonEnums.Connection) {
            if (this.lineObject == null) {
              this.lineObject = CanvasManager.createObject(
                this.fcanvas,
                p.x,
                p.y,
                this.getSelectedToolbarButton,
                this.selectedObject.mmState
              );
            }
          }
        }
      }
    },

    mousemove(options) {
      if (this.selectedObject == null) {
        return;
      }
      if (this.lineObject != null) {
        var p = this.fcanvas.getPointer(options.e);
        this.lineObject.mmState.x = p.x;
        this.lineObject.mmState.y = p.y;

        this.lineObject = CanvasManager.refreshObject(
          this.fcanvas,
          this.lineObject
        );
        this.lineObject.selectable = false;
      }
    },

    mouseup() {
      this.down = false;
    },
  },
};
</script>

<style scoped></style>
