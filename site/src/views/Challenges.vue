<template>
  <v-container>
    <v-data-table :items="challenges" :headers="headers">
      <template v-slot:item.difficulty="{ item }">
        <v-chip style="min-width: 80px" :color="getDifficultyColor(item.difficulty)" dark>
            <span>{{ getDifficultyName(item.difficulty) }}</span>
        </v-chip>
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { ChallengeDifficulties } from "../store/challenges/state";

@Component({
  components: {}
})
export default class Challenges extends Vue {
  public headers = [
    {
      text: "Difficulty",
      align: "left",
      sortable: true,
      value: "difficulty",
      width: "100px"
    },
    {
      text: "Title",
      align: "left",
      sortable: true,
      value: "title",
      width: "200px"
    },
    {
      text: "Teaser",
      align: "left",
      sortable: false,
      value: "teaser"
    }
  ];

  get challenges() {
    return this.$store.direct.state.challenges.challenges;
  }

  getDifficultyColor(difficulty: ChallengeDifficulties): string {
    switch (difficulty) {
      case ChallengeDifficulties.easy:
        return "green";
      case ChallengeDifficulties.medium:
        return "orange";
      case ChallengeDifficulties.hard:
        return "red";
    }
  }

  getDifficultyName(difficulty: ChallengeDifficulties) {
      switch (difficulty) {
      case ChallengeDifficulties.easy:
        return "easy";
      case ChallengeDifficulties.medium:
        return "medium";
      case ChallengeDifficulties.hard:
        return "hard";
    }
  }
}
</script>
