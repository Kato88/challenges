<template>
  <v-container>
    <v-row>
      <v-col cols="9">
        <v-card>
          <v-card-text>
            <h1>{{challenge.title}}</h1>
          </v-card-text>
          <v-card-text>
            <p>{{challenge.teaser}}</p>
          </v-card-text>
          <v-card-text v-html="challenge.description"></v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card v-if="isAdmin" class="admin-panel">
          <v-card-title>
            Admin
          </v-card-title>
          <v-card-text>
            <v-btn @click="edit" color="primary" block>Edit</v-btn>
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-title>Actions</v-card-title>
          <v-card-text v-if="!participation">
                <v-btn color="primary" :loading="saving" block @click="start">Start challenge!</v-btn>
          </v-card-text>
          <v-card-text v-if="participation && !participation.result">
                <v-btn color="primary" @click="downloadInput" block>Download your Input</v-btn>
          </v-card-text>
          <v-card-text>
                <v-textarea v-model="resultInput" label="Provide your result value"></v-textarea>
                <v-btn
                  color="primary"
                  @click="validateInput"
                  block
                  :disabled="resultInput.length > 0"
                >Validate Result</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Challenge } from "@/store/challenges/types";
import { Participation } from "../../../shared/types";

@Component({
  components: {}
})
export default class ChallengeView extends Vue {
  public resultInput = "";

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

  get participation(): Participation {
    const participation = this.$store.direct.state.user.participations.find(
      (p: Participation) => p.challengeId === this.challengeId
    ) as Participation;

    console.log("participation:", participation);

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
}
</script>

<style lang="scss" scoped>
.admin-panel {
  margin-bottom: 15px;
}
</style>