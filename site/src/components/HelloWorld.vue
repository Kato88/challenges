<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
    {{ nickname }}
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class AutoCompleteMainControl extends Vue {
  get nickname(): string {
    return this.$store.direct.state.users.nickname;
  }
}
</script>
