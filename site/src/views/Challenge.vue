<template>
  <v-container>
    <v-row>
      <v-col cols="9">
        <v-card>
          <v-card-title>{{challenge.title}}</v-card-title>
          <v-card-text>
            <p>{{challenge.teaser}}</p>
          </v-card-text>
          <v-card-text v-html="challenge.description"></v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card v-if="isAdmin" class="admin-panel">
          <v-card-title>Admin</v-card-title>
          <v-card-text>
            <v-btn @click="edit" color="primary" block>Edit</v-btn>
          </v-card-text>
        </v-card>
        <v-card v-if="!isFinished">
          <v-card-title>Actions</v-card-title>
          <v-card-text v-if="!participation">
            <v-btn color="primary" :loading="saving" block @click="start">Start challenge!</v-btn>
          </v-card-text>
          <v-card-text v-if="participation && !participation.result">
            <v-btn color="primary" @click="downloadInput" block>Download your Input</v-btn>
          </v-card-text>
          <v-card-text v-if="participation && participation.inputUrl && !participation.end">
            <v-textarea v-model="resultInput" label="Provide your result"></v-textarea>
            <v-btn
              color="primary"
              @click="validateInput"
              block
              :disabled="resultInput.length === 0"
            >Validate Result</v-btn>
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-title>You've done it!</v-card-title>
          <v-card-text v-if="!participation.solutionUrl">
            Congratulations you have mastered this challenge and earned
            <b>{{participation.points}}</b>!
            You can earn
            <b>one</b> additional points by sharing your solution! You can do this by uploading your code
            to
            <a href="https://pastebin.com/">pastebin.com</a> (or something similar) and share your URL.
          </v-card-text>
          <v-card-text v-if="!participation.solutionUrl">
            <v-text-field label="Url to your solution" v-model="solutionUrl"></v-text-field>
            <v-btn @click="submitSolution" :disabled="solutionUrl.length === 0">Submit solution</v-btn>
          </v-card-text>
          <v-card-text v-if="participation.solutionUrl">
            Congratulations you have mastered this challenge and earned
            <b>{{participation.points}}</b> and one additional point by sharing your solution!
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Challenge } from "../store/challenges/types";
import { Participation } from "../../../shared/types";

@Component({
  components: {}
})
export default class ChallengeView extends Vue {
  public resultInput = "";
  public solutionUrl = "";

  get challengeId(): string {
    return this.$route.params.id;
  }

  get isAdmin(): boolean {
    return this.$store.direct.getters.user.isAdmin;
  }

  get isFinished(): boolean {
    return this.participation && this.participation.end != null;
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

  get participation(): Participation {
    const participation = this.$store.direct.state.user.participations.find(
      (p: Participation) => p.challengeId === this.challengeId
    ) as Participation;

    return participation;
  }

  get saving(): boolean {
    return this.$store.direct.state.challenges.saving;
  }

  public edit() {
    this.$router.push({
      name: "editChallenge",
      params: { id: this.challengeId }
    });
  }

  public start() {
    this.$store.direct.dispatch.challenges.startChallenge(this.challengeId);
  }

  public downloadInput() {
    window.open(this.participation.inputUrl, "_blank");
  }

  public validateInput() {}

  public submitSolution() {
    if (!this.solutionUrl || !this.participation) {
      return;
    }

    this.$store.direct.dispatch.challenges.submitSolution({
      solutionUrl: this.solutionUrl,
      participationId: this.participation.id
    });
  }
}
</script>

<style lang="scss" scoped>
.admin-panel {
  margin-bottom: 15px;
}
</style>