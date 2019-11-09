<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="11">
                <h1>{{challenge.title}}</h1>
                <p></p>
                <p>{{challenge.teaser}}</p>
              </v-col>
              <v-col cols="1">
                <v-btn v-if="isAdmin" text icon @click="edit">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text v-html="challenge.description"></v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn color="primary" @click="start">Start this challenge!</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Challenge } from "@/store/challenges/types";

@Component({
  components: {}
})
export default class ChallengeView extends Vue {
  get challengeId(): string {
    return this.$route.params.id;
  }

  get isAdmin(): boolean {
    return this.$store.direct.getters.user.isAdmin;
  }

  get challenge(): Challenge {
    const challenge = this.$store.direct.state.challenges.challenges.find(
      (c: Challenge) => c.id === this.challengeId
    ) as Challenge;

    if (!challenge) {
      this.$store.direct.dispatch.challenges.load();
    }

    return challenge || ({} as Challenge);
  }

  public edit() {
    this.$router.push({
      name: "editChallenge",
      params: { id: this.challengeId }
    });
  }

  public start() {
    
  }
}
</script>
