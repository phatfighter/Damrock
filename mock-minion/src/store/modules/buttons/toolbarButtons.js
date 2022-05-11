import { ButtonEnums } from "../../../model/enums/buttonEnums.js";

const state = {
  buttons: [
    {
      name: ButtonEnums.User,
      selected: false,
    },
    {
      name: ButtonEnums.Api,
      selected: false,
    },
    {
      name: ButtonEnums.Service,
      selected: false,
    },
    {
      name: ButtonEnums.Database,
      selected: false,
    },
    {
      name: ButtonEnums.Topic,
      selected: false,
    },
    {
      name: ButtonEnums.Connection,
      selected: false,
    },
  ],
};

const getters = {
  getToolbarButtons: (state) => state.buttons,
  isToolbarButtonSelected: (state) => (name) =>
    state.buttons.find((button) => {
      return button.name === name;
    }).selected,
  getSelectedToolbarButton: (state) => {
    const button = state.buttons.find((button) => {
      return button.selected;
    });
    if (typeof button === "undefined") {
      return "none";
    }
    return button.name;
  },
};

const actions = {
  toggleSelectedToolbarButton({ commit }, name) {
    const button = state.buttons.find((button) => {
      return button.name === name;
    });
    const updatedButton = {
      ...button,
      selected: !button.selected,
    };
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
