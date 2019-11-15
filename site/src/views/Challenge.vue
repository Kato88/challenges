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
              :loading="validating"
              :disabled="resultInput.length === 0"
            >Validate Result</v-btn>
            <span class="validationFailed" v-if="validationFailed">Your result is wrong :(</span>
          </v-card-text>
        </v-card>
        <v-card v-if="participation && participation.end">
          <v-card-title>You've done it!</v-card-title>
          <v-card-text v-if="!participation.solutionUrl">
            Congratulations you have mastered this challenge and earned
            <b>{{participation.points}}</b> points!
            You can earn
            <b>one</b> additional points by sharing your solution! You can do this by uploading your code
            to
            <a
              href="https://pastebin.com/"
            >pastebin.com</a> (or something similar) and share your URL.
          </v-card-text>
          <v-card-text v-if="!participation.solutionUrl">
            <v-text-field label="Url to your solution" v-model="solutionUrl"></v-text-field>
            <v-btn
              @click="submitSolution"
              color="primary"
              :loading="submitting"
              :disabled="solutionUrl.length === 0"
            >Submit solution</v-btn>
          </v-card-text>
          <v-card-text v-if="participation.solutionUrl">
            Congratulations you have mastered this challenge and earned
            <b>{{participation.points}}</b>. Thank you very much for sharing your solution!
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Participation, Challenge } from "../../../shared/types";

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

  get validating(): boolean {
    return this.$store.direct.state.challenges.validating;
  }

  get submitting(): boolean {
    return this.$store.direct.state.challenges.submittingSolution;
  }

  get validationFailed(): boolean {
    return this.$store.direct.state.challenges.validationFailed;
  }

  created() {
    this.$store.direct.commit.challenges.SET_VALIDATION_FAILED(false);
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

  public validateInput() {
    if (this.resultInput) {
      this.$store.direct.dispatch.challenges.validate({
        participation: this.participation,
        result: this.resultInput
      });
    }
  }

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

.validationFailed {
  color: red;
  font-weight: bold;
  font-size: larger;
}
</style>