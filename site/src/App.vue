<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">CODING CHALLENGE</div>
      <v-spacer></v-spacer>
      <v-btn to="/" text>
        <span class="mr-2">Home</span>
      </v-btn>
      <v-btn to="/challenges" text>
        <span class="mr-2">Challenges</span>
      </v-btn>
      <v-btn text to="/leaderboard">
        <span class="mr-2">Leaderboards</span>
      </v-btn>
      <v-btn text to="/login" v-if="!isAuthenticated">
        <span class="mr-2">Login</span>
      </v-btn>
      <v-btn text @click="logout" v-if="isAuthenticated">
        <span class="mr-2">Logout</span>
      </v-btn>
    </v-app-bar>
    <v-content>
      <vue-page-transition name="fade">
        <router-view></router-view>
      </vue-page-transition>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import * as firebase from 'firebase';

import AdminMenuButton from './components/AdminMenuButton.vue';

@Component({
  components: {
    AdminMenuButton,
  },
})
export default class App extends Vue {
  public logout() {
    firebase.auth().signOut();
    this.$store.direct.commit.user.SET_USER(null);
    window.location.reload(true);
  }

  get isAuthenticated(): boolean {
    return this.$store.direct.getters.user.isAuthenticated;
  }

  get isAdmin(): boolean {
    return this.$store.direct.getters.user.isAdmin;
  }
}
</script>

<style lang="scss">
h1 {
  font-weight: 300;
}
</style>
