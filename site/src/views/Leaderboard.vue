<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-data-table :headers="headers" :items="sortedEntries">
          <template v-slot:item="{ item, index} ">
            <tr>
              <td>
                <span v-if="index === 0">1st</span>
                <span v-else-if="index === 1">2nd</span>
                <span v-else-if="index === 2">3rd</span>
                <span v-else>{{index}}th</span>
              </td>
              <td>
                {{item.userName}}
              </td>
              <td>
                {{item.points}}
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { LeaderboardEntry } from '../../../shared/types';

@Component({
  components: {},
})
export default class Leaderboard extends Vue {
  public headers = [
    {
      text: 'Pos.',
      align: 'left',
      width: '50px',
    },
    {
      text: 'Name',
      align: 'left',
      sortable: true,
      value: 'userName',
    },
    {
      text: 'Points',
      align: 'right',
      sortable: true,
      value: 'points',
      width: '100px',
    },
  ];

  get entries(): LeaderboardEntry[] {
    return this.$store.direct.state.leaderboard.entries;
  }

  get sortedEntries(): LeaderboardEntry[] {
    return this.entries.sort((a: LeaderboardEntry, b: LeaderboardEntry) => {
      return b.points - a.points;
    });
  }

  public created() {
    this.$store.direct.dispatch.leaderboard.listen();
  }

  public destroyed() {
    this.$store.direct.dispatch.leaderboard.unlisten();
  }
}
</script>

<style lang="scss" scoped>
.first {
  font-size: 72px;
}

.second {
  font-size: 56px;
}

.third {
  font-size: 48px;
}
</style>