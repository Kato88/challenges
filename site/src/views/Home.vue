<template>
  <div id="container" class="home">
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';

const authProvider = firebase.auth.GoogleAuthProvider.PROVIDER_ID;

@Component({
  components: {},
  
})
export default class Home extends Vue {
  get nickname() {
    return this.$store.direct.state.users.nickname;
  }
}
</script>
