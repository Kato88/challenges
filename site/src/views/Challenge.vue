<template>
  <v-container>
    <v-card>
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <v-card-text>
            <h1>{{challenge.title}}</h1>
          </v-card-text>
          <v-card-text>
            <p>{{challenge.teaser}}</p>
          </v-card-text>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <v-card-text v-html="description">
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Challenge } from '@/store/challenges/state';
import * as marked from 'marked';

@Component({
  components: {}
})
export default class ChallengeView extends Vue {
  get challengeId(): string {
    return this.$route.params.id;
  }

  get description() {
    return marked(this.challenge.description);
  }

  get challenge(): Challenge {
    return this.$store.direct.state.challenges.challenges.find(
      (c: Challenge) => c.id === this.challengeId
    ) as Challenge;
  }
}
</script>
