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
            Earn points by completing challenges based on the difficulty level.
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
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            Rules
          </v-card-title>
          <v-card-text>
            <p>
            You might ask yourself how everything works. First pick a challenge you want to take, read the description text carefully! Take an extra look on highlighted information! Some challenges also show example input and example results.
            <p>
            All challenges require you to click the "Start Challenge" button. This will mark your participation on this challenge and will generate a unique input text file. You need this file to solve your challenge.
            </p>
            Whenever it is not differently stated, you are required to provide your result in lines. For example if you have to calculate same values and your input gives you 400 lines of input, you are required to provide 400 lines as a result, with the correct value on every line. So the result at line 234 is the result of the line 234.
            <p>
            For some challenges however you are tasked with providing a result in a specific format, like summing all result lines up to one result value. Read carefully on how you have to provide your result!
            </p>
            You get a different amount of points based on the number of stars. Those stars also indicate how hard a challenge is.
            <ol>
              <li>One star scores 100 points</li>
              <li>Two stars scores 400 points</li>
              <li>Three stars scores 1000 points</li>
            </ol>
            <br/>
            <p>
            As you can see higher star challenges provide more points, but are also way harder to solve.
            </p>
            <p>
              In case you want to share you solution, you are rewarded with 25% extra points! Also you get access to my solution, as well as every other shared solution!
            </p>
            <h3>How to get disqualified</h3>
            <p>
              Do you want to get disqualified? This is how you get disqualified
            </p>
            <ul>
              <li>You are <b>not allowed</b> to search for a solution online!</li>
              <li>You are <b>not allowed</b> to share your solution with others that have not solved this challenge!</li>
              <li>You are <b>not allowed</b> to use code that you created before this challenge</li>
              <li>You are <b>not allowed</b> to discuss a challenge with others ('brainstormin')</li>
            </ul>
            <br/>
            <p>
              However, there are things that are allowed, like searching online for language specific questions, like "how to sort an array in javascript" for example, but not "How to implement a roman literals in C#".
            </p>
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
