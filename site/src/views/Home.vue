<template>
  <div class="home">
    {{nickname}}
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Home extends Vue {
  get nickname() {
    return this.$store.direct.state.users.nickname;
  }
}
</script>
