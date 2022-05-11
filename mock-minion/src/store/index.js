import { createStore } from "vuex";
import toolbarButtons from "./modules/buttons/toolbarButtons";
import menubarButtons from "./modules/buttons/menubarButtons";
import modals from "./modules/modals/modals.js";
import api from "./modules/components/apiComponent";

export default createStore({
  modules: {
    modals,
    buttons: {
      namespaced: true,
      modules: {
        toolbarButtons,
        menubarButtons,
      },
    },
    components: {
      namespaced: true,
      modules: {
        api,
      },
    },
  },
});
