import CanvasManager from "../../../drawing/canvasManager.js";

const state = {
  visible: false,
  canvas: null,
  canvasObject: null,
};

const getters = {
  isVisible: (state) => state.visible,
  getCanvas: (state) => state.canvas,
  getCanvasObject: (state) => state.canvasObject,
};

const actions = {
  setVisible({ commit }, visible) {
    commit("setVisible", visible);
  },
  refresh({ commit }) {
    commit("refresh");
  },
  setCanvas({ commit }, canvas) {
    commit("setCanvas", canvas);
  },
  setCanvasObject({ commit }, canvasObject) {
    commit("setCanvasObject", canvasObject);
  },
};

const mutations = {
  setVisible(state, visible) {
    state.visible = visible;
  },
  refresh(state) {
    CanvasManager.refreshObject(state.canvas, state.canvasObject);
  },
  setCanvas(state, canvas) {
    state.canvas = canvas;
  },
  setCanvasObject(state, canvasObject) {
    state.canvasObject = canvasObject;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
