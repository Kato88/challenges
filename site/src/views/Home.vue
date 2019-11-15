<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Welcome</v-card-title>
          <v-card-text>
            This websites provides you coding challenges. Choose a challenge you want to take, 
            generate your very own input to work with and validate your result. 
            Get instant feedback and optionally upload your solution to share with others.
            Earn points by completing challenges based on your time needed and the difficulty level.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-card>
          <v-card-text>
            This site is still in progress! Some loading animations do not work. 
            If you validate a solution or submitting your solution it takes a couple of seconds.
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
