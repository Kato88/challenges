<template>
  <v-container>
    <v-card>
      <v-card-title>
        <h1>Login</h1>
      </v-card-title>
      <v-card-text id="container"></v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';



@Component({
  components: {},
  created() {
    const authProvider = firebase.auth.GoogleAuthProvider.PROVIDER_ID;
    this.$store.state.ui.reset();
    this.$store.state.ui.start('#container', {
      signInOptions: [authProvider],
    });
  },
})
export default class Login extends Vue {
  get nickname() {
    return this.$store.direct.state.users.nickname;
  }
}
</script>
