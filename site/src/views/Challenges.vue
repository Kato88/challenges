<template>
  <v-container>
    <v-card>
      <v-card-title>
        Challenges
        <v-spacer v-if="isAdmin">
        </v-spacer>
        <v-btn @click="createNew" v-if="isAdmin" text icon><v-icon>mdi-plus</v-icon></v-btn>
        </v-card-title>
      <v-card-text>
        <v-data-table :items="challenges" :headers="headers">
          <template v-slot:item="{ item }">
            <v-hover v-slot:default="{ hover }">
              <tr
                @click="goTo(item)"
                class="pointer transition-swing"
                :class="`elevation-${hover ? 12 : 0}`"
              >
                <td>{{item.title}}</td>
                <td>
                  <v-chip style="min-width: 80px" :color="getDifficultyColor(item.difficulty)" dark>
                    <span>{{ getDifficultyName(item.difficulty) }}</span>
                  </v-chip>
                </td>
                <td>{{item.teaser}}</td>
              </tr>
            </v-hover>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { ChallengeDifficulties } from "../store/challenges/types";
import { Challenge } from "../../../shared/types";

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
      width: "200px",
    },
    {
      text: "Teaser",
      align: "left",
      sortable: false,
      value: "teaser",
    }
  ];

  get challenges() {
    return this.$store.direct.state.challenges.challenges;
  }

  get isAdmin(): boolean {
    return this.$store.direct.getters.user.isAdmin;
  }

  public created() {
    if (!this.challenges || this.challenges.length === 0) {
      this.$store.direct.dispatch.challenges.load();
    }
  }

  public getDifficultyColor(difficulty: ChallengeDifficulties): string {
    switch (difficulty) {
      case ChallengeDifficulties.easy:
        return "green";
      case ChallengeDifficulties.medium:
        return "orange";
      case ChallengeDifficulties.hard:
        return "red";
    }
  }

  public getDifficultyName(difficulty: ChallengeDifficulties) {
    switch (difficulty) {
      case ChallengeDifficulties.easy:
        return "easy";
      case ChallengeDifficulties.medium:
        return "medium";
      case ChallengeDifficulties.hard:
        return "hard";
    }
  }

  public goTo(challenge: Challenge) {
    this.$router.push({
      name: "challenge",
      params: { id: challenge.id }
    });
  }

  public createNew() {
    this.$router.push({
      name: 'editChallenge'
    });
  }
}
</script>

<style lang="scss" scoped>
.pointer {
  cursor: pointer;
}
</style>
