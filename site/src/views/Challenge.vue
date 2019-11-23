<template>
  <v-container>
    <v-row>
      <v-col cols="9">
        <v-card>
          <v-tabs v-model="tab">
            <v-btn text icon @click="goToChallenges" color="primary" style="top: 5px; left: 5px;">
              <v-icon color="primary">mdi-arrow-left</v-icon>
            </v-btn>
            <v-tab href="#tab-challenge">{{challenge.title}} Challenge</v-tab>
            <v-tab href="#tab-other-solutions">Other solutions</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item value="tab-challenge">
              <v-card-text>
                <p>{{challenge.teaser}}</p>
              </v-card-text>
              <v-card-text v-html="challenge.description"></v-card-text>
            </v-tab-item>
            <v-tab-item value="tab-other-solutions">
              <v-card-text v-if="!showOtherSolutions">
                To see solutions that were submitted by other contestans you need to share your
                solution aswell. Also by sharing your solution you can earn some extra points!
              </v-card-text>
              <v-card-text v-if="showOtherSolutions" class>
                <v-progress-circular v-if="loadingSolutions" indeterminate color="primary"></v-progress-circular>
                <v-tabs vertical v-model="solutionTab">
                  <v-tab
                    v-for="(solution, index) in challenge.otherSolutions"
                    :key="'tab-' +solution.participationId"
                    :href="'#tab' + solution.participationId"
                  >{{solution.userName ? solution.userName : (index + 1)}}</v-tab>

                  <v-tab-item
                    v-for="solution in challenge.otherSolutions"
                    :key="'item' + solution.participationId"
                    :value="'tab' + solution.participationId"
                    style="height: 500px;"
                  >
                    <iframe
                      v-if="isPastebinUrl(solution.solutionUrl)"
                      :src="toEmbedUrl(solution.solutionUrl)"
                      style="height: 100%; width: 100%;"
                    ></iframe>
                    <a v-else :href="solution.solutionUrl">{{solution.solutionUrl}}</a>
                  </v-tab-item>
                </v-tabs>
                <v-tabs-items v-model="solutionTab"></v-tabs-items>
              </v-card-text>
            </v-tab-item>
          </v-tabs-items>
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
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Participation, Challenge } from '../../../shared/types';

@Component({
  components: {},
})
export default class ChallengeView extends Vue {

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
      (c: Challenge) => c.id === this.challengeId,
    ) as Challenge;

    if (!challenge) {
      this.$store.direct.dispatch.challenges.load();
    }

    return challenge || ({} as Challenge);
  }

  get participation(): Participation {
    const participation = this.$store.direct.state.user.participations.find(
      (p: Participation) => p.challengeId === this.challengeId,
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

  get showOtherSolutions(): boolean {
    if (!this.participation || !this.participation.solutionUrl) {
      return false;
    }

    return this.participation.solutionUrl.length > 0;
  }

  get loadingSolutions(): boolean {
    return this.$store.direct.state.challenges.loadingSolutions;
  }

  public resultInput = '';
  public solutionUrl = '';
  public tab = null;
  public solutionTab = null;
  private otherSolutionsLoaded = false;

  @Watch('tab')
  public onTabChanged(currentTab: string) {
    if (this.otherSolutionsLoaded || currentTab !== 'tab-other-solutions') {
      return;
    }

    this.loadOtherSoltuions();
  }

  public created() {
    this.$store.direct.commit.challenges.SET_VALIDATION_FAILED(false);
  }

  public edit() {
    this.$router.push({
      name: 'editChallenge',
      params: { id: this.challengeId },
    });
  }

  public start() {
    this.$store.direct.dispatch.challenges.startChallenge(this.challengeId);
  }

  public downloadInput() {
    window.open(this.participation.inputUrl, '_blank');
  }

  public validateInput() {
    if (this.resultInput) {
      this.$store.direct.dispatch.challenges.validate({
        participation: this.participation,
        result: this.resultInput,
      });
    }
  }

  public submitSolution() {
    if (!this.solutionUrl || !this.participation) {
      return;
    }

    this.$store.direct.dispatch.challenges.submitSolution({
      solutionUrl: this.solutionUrl,
      participationId: this.participation.id,
    });
  }

  public async loadOtherSoltuions() {
    this.$store.direct.dispatch.challenges.loadChallengeSolutions(
      this.challengeId,
    );
    this.otherSolutionsLoaded = true;
  }

  public isPastebinUrl(url: string) {
    if (!url) {
      return false;
    }

    return url.indexOf('https://pastebin.com') > -1;
  }

  public toEmbedUrl(url: string) {
    // from: https://pastebin.com/MegNxtrv
    // to: https://pastebin.com/embed_iframe/MegNxtrv

    const lastIndex = url.lastIndexOf('/');
    const id = url.substring(lastIndex);
    return `https://pastebin.com/embed_iframe${id}`;
  }

  public goToChallenges() {
    this.$router.push({ name: 'challenges' });
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

.otherSolutions {
  min-height: 800px;
}
</style>