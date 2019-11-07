import Vue from 'vue';
import Vuex from 'vuex';
import { createDirectStore } from 'direct-vuex';

import users from './users/index';

Vue.use(Vuex);

const { store } = createDirectStore({
  modules: {
    users,
  },
} as const);

export default store;

export type AppStore = typeof store;
declare module 'vuex' {
  interface Store<S> {
    direct: AppStore;
  }
}
