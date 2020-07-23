const initialState = {
  visible: false,
  message: '',
  type: 'message',
  onSubmit: null,
  title: '提示',
  value: null,
};

const state = {
  data: JSON.parse(JSON.stringify(initialState)),
};

const mutations = {
  TOGGLE_DIALOG_VISIBLE: (
    state,
    {
      title = initialState.title,
      message,
      visible,
      value = null,
      type = initialState.type,
      onSubmit,
    },
  ) => {
    state.data = {
      visible,
      title,
      message,
      type,
      value,
      onSubmit,
    };
  },
};

const actions = {
  toggleDialogVisible({ commit }, value) {
    commit('TOGGLE_DIALOG_VISIBLE', value);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
