<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col cols="8">
            <v-text-field label="Title" v-model="challenge.title"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field label="Difficulty" type="number" v-model="challenge.difficulty"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field label="teaser" v-model="challenge.teaser"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <quill-editor :content="challenge.description" @change="onEditorChange($event)"></quill-editor>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="save">
          <span v-if="!saving">Save</span>
          <v-progress-circular v-if="saving" :size="50" color="primary" indeterminate></v-progress-circular>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
// require styles
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import { quillEditor } from 'vue-quill-editor';
import { Challenge } from '../../../../shared/types';

@Component({
  components: {
    quillEditor,
  },
})
export default class EditChallenge extends Vue {
  public challenge!: Challenge;

  get challengeId(): string {
    return this.$route.params.id;
  }

  get saving(): boolean {
      return this.$store.direct.state.challenges.saving;
  }

  public created() {
    const challenge = this.$store.direct.state.challenges.challenges.find(
      (c: Challenge) => c.id === this.challengeId,
    ) as Challenge;

    if (!challenge) {
      this.challenge = {
        id: '',
        title: '',
        teaser: '',
        description: '',
        difficulty: 0,
      };
    } else {
      this.challenge = {
        id: challenge.id,
        title: challenge.title,
        teaser: challenge.teaser,
        description: challenge.description,
        difficulty: challenge.difficulty,
      };
    }

  }

  public onEditorChange({ html }: any) {
    this.challenge.description = html;
  }

  public save() {
    this.challenge.difficulty = Number(this.challenge.difficulty);
    this.$store.direct.dispatch.challenges.save(this.challenge);
  }
}
</script>