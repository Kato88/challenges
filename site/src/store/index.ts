import Vue from 'vue';
import Vuex, { ActionContext } from 'vuex';
import { createDirectStore } from 'direct-vuex';


import user from './user/index';
import challenges from './challenges/index';

Vue.use(Vuex);





const { store, rootActionContext, moduleActionContext } = createDirectStore({
 modules: {
    user,
    challenges,
  },
  state: {
    db: {},
    app: {},
  } as RootState,
  actions: {
  },
  mutations: {
    SET_APP(state: RootState, app: firebase.app.App) {
      state.app = app;
      state.db = app.firestore();
    },
  },
} as const);

export default store;

export { rootActionContext, moduleActionContext };

export interface RootState {
  db: firebase.firestore.Firestore;
  app: firebase.app.App;
}

export type AppStore = typeof store;
declare module 'vuex' {
  interface Store<S> {
    direct: AppStore;
  }
}
