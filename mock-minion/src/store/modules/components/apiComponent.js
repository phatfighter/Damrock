const state = {
  name: "My New API",
  schema: null,
};

const getters = {
  getName: (state) => state.name,
  getSchema: (state) => state.schema,
};

const actions = {
  setName({ commit }, name) {
    commit("setName", name);
  },
  setSchema({ commit }, schema) {
    commit("setSchema", schema);
  },
};

const mutations = {
  setName(state, name) {
    state.name = name;
  },
  setSchema(state, schema) {
    state.schema = schema;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
