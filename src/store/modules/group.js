const state = {
  activeGroup: undefined,
};

const mutations = {
  CHANGE_ACTIVE_GROUP: (state, value) => {
    state.activeGroup = value;
  },
};

const actions = {
  changeActiveGroup({ commit }, value) {
    commit('CHANGE_ACTIVE_GROUP', value);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
