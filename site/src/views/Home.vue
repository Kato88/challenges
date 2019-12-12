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
            Keep in mind that a correct result is the most important thing! Make sure this is your number one priority! Care less about the most efficient or cleanest solution.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card>
          <v-card-text>
            <b>Best of luck to everyone!</b> Don't forget to have fun and don't take it to serious! Solving those kind of challenges does not make you a good programmer, but a good problem solver. It takes other traits to become a truly fine programmer.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card>
          <v-card-text>
            There will be extra points to earn! How? I don't tell :P
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
