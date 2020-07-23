import { clearHistoryData, getApiHistory } from '../../api/test';
const state = {
  historyList: [],
  currentHistoryData: undefined,
};

const mutations = {
  GET_HISTORY_LIST: state => {
    getApiHistory().then(res => {
      state.historyList = res;
    });
  },
  SHOW_HISTORY_DATA: (state, value) => {
    state.currentHistoryData = value;
  },
  CLEAR_HISTORY_DATA: state => {
    clearHistoryData().then(() => {
      mutations.GET_HISTORY_LIST(state);
    });
  },
};

const actions = {
  getHistoryList({ commit }) {
    commit('GET_HISTORY_LIST');
  },
  showHistoryData({ commit }, value) {
    commit('SHOW_HISTORY_DATA', value);
  },
  clearHistoryData({ commit }) {
    commit('CLEAR_HISTORY_DATA');
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
