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
      <v-btn text>
        <span class="mr-2">Leaderboards</span>
      </v-btn>
      <v-btn text to="/login">
        <span class="mr-2">Login</span>
      </v-btn>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import HelloWorld from "./components/HelloWorld.vue";

export default Vue.extend({
  name: "App",

  components: {},

  data: () => ({
    //
  })
});
</script>

<style lang="scss">
h1 {
  font-weight: 300;
}
</style>
