<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Welcome</v-card-title>
          <v-card-text>
            What is this all about
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';

const authProvider = firebase.auth.GoogleAuthProvider.PROVIDER_ID;

@Component({
  components: {},

})
export default class Home extends Vue {
}
</script>
