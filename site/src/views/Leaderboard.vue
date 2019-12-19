<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-data-table :items="sortedEntries">
          <template v-slot:header="{props: {headers}}">
            <thead class="v-data-table-header">
              <tr>
                <th
                  role="columnheader"
                  scope="col"
                  aria-label="Pos.: Nicht sortiert. Aktivieren um aufsteigend zu sortieren."
                  aria-sort="none"
                  class="text-left sortable"
                  style="width: 75px; min-width: 75px;"
                >
                  <span>Pos.</span>
                  <i
                    aria-hidden="true"
                    class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-up theme--light"
                    style="font-size: 18px;"
                  ></i>
                </th>
                <th
                  role="columnheader"
                  scope="col"
                  aria-label="Name: Nicht sortiert. Aktivieren um aufsteigend zu sortieren."
                  aria-sort="none"
                  class="text-left sortable"
                >
                  <span>Name</span>
                  <i
                    aria-hidden="true"
                    class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-up theme--light"
                    style="font-size: 18px;"
                  ></i>
                </th>
                <th role="columnheader" scope="col" class="text-center" style="width: 150px">
                  <span>
                    <v-icon color="yellow">mdi-star</v-icon>
                  </span>
                </th>
                <th role="columnheader" scope="col" class="text-center" style="width: 150px">
                  <span>
                    <v-icon color="yellow">mdi-star</v-icon>
                    <v-icon color="yellow">mdi-star</v-icon>
                  </span>
                </th>
                <th role="columnheader" scope="col" class="text-center" style="width: 150px">
                  <span>
                    <v-icon color="yellow">mdi-star</v-icon>
                    <v-icon color="yellow">mdi-star</v-icon>
                    <v-icon color="yellow">mdi-star</v-icon>
                  </span>
                </th>
                <th
                  role="columnheader"
                  scope="col"
                  aria-label="Points: Nicht sortiert. Aktivieren um aufsteigend zu sortieren."
                  aria-sort="none"
                  class="text-left sortable"
                  style="width: 100px; min-width: 100px;"
                >
                  <span>Points</span>
                  <i
                    aria-hidden="true"
                    class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-up theme--light"
                    style="font-size: 18px;"
                  ></i>
                </th>
              </tr>
            </thead>
          </template>
          <template v-slot:item="{ item, index} ">
            <tr>
              <td>
                <span v-if="index === 0">1st</span>
                <span v-else-if="index === 1">2nd</span>
                <span v-else-if="index === 2">3rd</span>
                <span v-else>{{index}}th</span>
              </td>
              <td>{{item.userName}}</td>
              <td><span style="padding: 0px 40px;">{{item.one}}</span></td>
              <td><span style="padding: 0px 50px;">{{item.two}}</span></td>
              <td><span style="padding: 0px 50px;">{{item.three}}</span></td>
              <td>{{item.points}}</td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { LeaderboardEntry } from "../../../shared/types";

@Component({
  components: {}
})
export default class Leaderboard extends Vue {
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