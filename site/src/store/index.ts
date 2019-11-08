import Vue from 'vue';
import Vuex from 'vuex';
import { createDirectStore } from 'direct-vuex';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';

import users from './users/index';
import challenges from './challenges/index';

Vue.use(Vuex);

const app = firebase.initializeApp({
  apiKey: 'AIzaSyAgdDQv5fFk79-SZ5hB6PNBLduq8-eFUVk',
  authDomain: 'challenge-83ceb.firebaseapp.com',
  databaseURL: 'https://challenge-83ceb.firebaseio.com',
  projectId: 'challenge-83ceb',
  storageBucket: 'challenge-83ceb.appspot.com',
  messagingSenderId: '501055186606',
  appId: '1:501055186606:web:660fcbdf53fd0c95feaf3f',
  measurementId: 'G-806HJ9V62E',
});

const db = app.firestore();
const ui = new firebaseui.auth.AuthUI(app.auth());



const { store } = createDirectStore({
  modules: {
    users,
    challenges,
  },
  state: {
    db,
    app,
    ui,
  },
} as const);

export default store;

app.auth().onAuthStateChanged((user) => {
  store.dispatch.users.setUser(user);
});

// export {rootActionContext, moduleActionContext};

export interface RootState {
  db: firebase.firestore.Firestore;
  app: firebase.app.App;
  ui: firebaseui.auth.AuthUI;
}

export type AppStore = typeof store;
declare module 'vuex' {
  interface Store<S> {
    direct: AppStore;
  }
}
