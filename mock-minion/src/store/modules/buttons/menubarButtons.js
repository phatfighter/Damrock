import { ButtonEnums } from "../../../model/enums/buttonEnums.js";

const state = {
  buttons: [
    {
      name: ButtonEnums.Zoomin,
      selected: false,
    },
    {
      name: ButtonEnums.Zoomout,
      selected: false,
    },
    {
      name: ButtonEnums.Undo,
      selected: false,
    },
    {
      name: ButtonEnums.Redo,
      selected: false,
    },
    {
      name: ButtonEnums.Play,
      selected: false,
    },
    {
      name: ButtonEnums.Stop,
      selected: false,
    },
  ],
};

const getters = {
  getMenubarButtons: (state) => state.buttons,
  /*getSelected: (state) => (name) =>
    state.buttons.find((button) => {
      return button.name === name;
    }).selected,
  getSelectedButton: (state) => {
    const button = state.buttons.find((button) => {
      return button.selected;
    });
    if (typeof button === "undefined") {
      return "none";
    }
    return button.name;
  },*/
};

const actions = {
  clickButton({ commit }, name) {
    const button = state.buttons.find((button) => {
      return button.name === name;
    });
    const updatedButton = {
      ...button,
      selected: !button.selected,
    };
    console.log(name + "clicked");
    commit("updateButton", updatedButton);
  },
};

const mutations = {
  updateButton(state, updatedButton) {
    state.buttons = state.buttons.map((button) =>
      button.name === updatedButton.name
        ? { ...button, selected: updatedButton.selected }
        : { ...button, selected: false }
    );
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
