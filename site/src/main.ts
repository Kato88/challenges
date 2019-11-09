import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import firebaseConfig from './firebase.config';

// require styles
import 'firebaseui/dist/firebaseui.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store: store.original,
  vuetify,
  render: (h) => h(App),
  created() {
    firebase.initializeApp(firebaseConfig);
    this.$store.direct.commit.SET_APP(firebase.app());
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // this.$router.push('/home');
        this.$store.direct.commit.user.SET_USER(user);
        this.$store.direct.dispatch.user.loadProfile(user);
      } else {
        this.$router.push('/login');
      }
     });
    },
}).$mount('#app');
