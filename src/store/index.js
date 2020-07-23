import Vue from 'vue';
import Vuex from 'vuex';
import XEUtils from 'xe-utils';
import VXETable from 'vxe-table';
import 'vxe-table/lib/index.css';

import globalDialog from './modules/globalDialog';
import group from './modules/group';
import history from './modules/history';
import getters from './getters';

Vue.use(Vuex);

Vue.use(VXETable);

Vue.prototype.$utils = XEUtils;

export default new Vuex.Store({
  modules: { globalDialog, group, history },
  getters,
});
