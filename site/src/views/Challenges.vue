<template>
  <v-container>
    <v-card>
      <v-card-title>
        Challenges
        <v-spacer v-if="isAdmin"></v-spacer>
        <v-btn @click="createNew" v-if="isAdmin" text icon>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table :loading="loading" :items="challenges" :headers="headers">
          <template v-slot:item="{ item }">
            <v-hover v-slot:default="{ hover }">
              <tr @click="goTo(item)" class="pointer transition-swing">
                <td>{{item.title}}</td>
                <td>
                  <v-icon v-for="index in (item.difficulty + 1)" :key="index" color="yellow">mdi-star</v-icon>
                </td>
                <td>{{item.teaser}}</td>
                <td v-if="isAdmin">{{item.public ? 'Yes' : 'No'}}</td>
              </tr>
            </v-hover>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Challenge, ChallengeDifficulties } from '../../../shared/types';

@Component({
  components: {},
})
export default class Challenges extends Vue {
  public headers = [
    {
      text: 'Title',
      align: 'left',
      sortable: true,
      value: 'title',
      width: '200px',
    },
    {
      text: 'Difficulty',
      align: 'left',
      sortable: true,
      value: 'difficulty',
      width: '100px',
    },
    {
      text: 'Teaser',
      align: 'left',
      sortable: false,
      value: 'teaser',
    },
  ];

  get challenges() {
    if (this.isAdmin) {
      return this.$store.direct.state.challenges.challenges;
    } else {
      return this.$store.direct.state.challenges.challenges.filter(
        (x) => x.public === true,
      );
    }
  }

  get isAdmin(): boolean {
    return this.$store.direct.getters.user.isAdmin;
  }

  get loading(): boolean {
    return this.$store.direct.state.challenges.loading;
  }

  public created() {
    if (!this.challenges || this.challenges.length === 0) {
      this.$store.direct.dispatch.challenges.load();
    }

    if (this.isAdmin) {
      this.headers.push({
        text: 'public',
        align: 'left',
        sortable: false,
        width: '30px',
        value: 'public',
      });
    }
  }

  public getDifficultyColor(difficulty: ChallengeDifficulties): string {
    switch (difficulty) {
      case ChallengeDifficulties.easy:
        return 'green';
      case ChallengeDifficulties.medium:
        return 'orange';
      case ChallengeDifficulties.hard:
        return 'red';
    }
  }

  public getDifficultyName(difficulty: ChallengeDifficulties) {
    switch (difficulty) {
      case ChallengeDifficulties.easy:
        return 'easy';
      case ChallengeDifficulties.medium:
        return 'medium';
      case ChallengeDifficulties.hard:
        return 'hard';
    }
  }

  public goTo(challenge: Challenge) {
    this.$router.push({
      name: 'challenge',
      params: { id: challenge.id },
    });
  }

  public createNew() {
    this.$router.push({
      name: 'editChallenge',
    });
  }
}
</script>

<style lang="scss" scoped>
.pointer {
  cursor: pointer;
}
</style>
