<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-icon color="primary" class="first">mdi-trophy-award</v-icon> User 1
      </v-card-text>
      <v-card-text>
        <v-icon color="primary" class="second">mdi-trophy</v-icon> User 2
      </v-card-text>
      <v-card-text>
        <v-icon color="primary" class="third">mdi-trophy-variant</v-icon> User 3
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Leaderboard extends Vue {}
</script>

<style lang="scss" scoped>
.first {
    font-size: 72px;
}

.second {
    font-size: 56px;
}

.third {
    font-size: 48px;
}
</style>