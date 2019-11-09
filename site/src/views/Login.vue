<template>
  <v-container>
    <v-card>
      <v-card-title>
        <h1>Login</h1>
      </v-card-title>
      <v-card-text id="firebaseui-auth-container"></v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';

@Component({
  components: {},
  mounted() {
    const uiConfig = {
      signInSuccessUrl: '/#/home',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
    };

    // @ts-ignore
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    ui.start('#firebaseui-auth-container', uiConfig);
  },
})
export default class Login extends Vue {}
</script>
