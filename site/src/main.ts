import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import * as firebase from 'firebase';
import firebaseConfig from './firebase.config';
import VuePageTransition from 'vue-page-transition';

// require styles
import 'firebaseui/dist/firebaseui.css';

Vue.config.productionTip = false;
Vue.use(VuePageTransition);

new Vue({
  router,
  store: store.original,
  vuetify,
  render: (h) => h(App),
  created() {
    const app = firebase.initializeApp(firebaseConfig);
    // @ts-ignore
    this.$store.direct.commit.SET_APP(app);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.direct.commit.user.SET_USER(user);
        this.$store.direct.dispatch.user.loadProfile(user);
        this.$store.direct.dispatch.user.loadParticipations(user);
      }
     });
    },
}).$mount('#app');
