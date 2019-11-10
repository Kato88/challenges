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
    <v-row v-if="!participation">
      <v-col cols="12">
        <v-btn color="primary" :loading="saving" @click="start">Start this challenge!</v-btn>
      </v-col>
    </v-row>
    <v-card>
      <v-card-text>
        <v-row v-if="participation && !participation.result">
          <v-col cols="3">
            <v-btn color="primary" @click="downloadInput">Download your Input</v-btn>
          </v-col>
          <v-col cols="9">
            <v-textarea v-model="resultInput" label="Provide your result value"></v-textarea>
            <v-btn
              color="primary"
              @click="validateInput"
              :disabled="resultInput.length > 0"
            >Validate Result</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
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
