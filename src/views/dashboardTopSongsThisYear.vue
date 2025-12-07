<template>
  <alert />
  <navBar />
  <loading :loading="!getTopSongsByYearWithTieBreaker" />
  <div class="row" v-if="getMainName">
    <div class="h1 col text-center">Top 10 Songs of {{ getLastVoteYear }}</div>
  </div>

  <div v-if="getMainName" class="table-responsive">
    <table
      class="table table-striped table-hover"
      v-if="getTopSongsByYearWithTieBreaker"
    >
      <thead>
        <tr>
          <th scope="col">Artist</th>
          <th scope="col">Title</th>
          <th scope="col">Voters</th>
          <th scope="col"></th>
          <th scope="col">Total votes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in getTopSongsByYearWithTieBreaker" :key="item.id">
          <Song :item="item" />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Song from "@/components/song";
import loading from "@/components/loading";
import navBar from "@/components/navBar";
import alert from "@/components/alert";

export default {
  components: {
    Song,
    loading,
    navBar,
    alert,
  },
  computed: {
    ...mapGetters([
      "getMainName",
      "getTopSongsByYearWithTieBreaker",
      "getLastVoteYear",
    ]),
  },
};
</script>
