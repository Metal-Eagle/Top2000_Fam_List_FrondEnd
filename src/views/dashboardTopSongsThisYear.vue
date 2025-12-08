<template>
  <alert />
  <navBar />
  <loading :loading="!getTopSongsByYearWithTieBreaker" />
  <div class="row" v-if="getMainName">
    <div class="h1 col text-center">Top 10 Songs of {{ getLastVoteYear }}</div>
  </div>
  <songsTable
    :songs="getTopSongsByYearWithTieBreaker"
    :columns="customColumns"
  ></songsTable>
</template>

<script>
import { mapGetters } from "vuex";
import songsTable from "@/components/songsTable";
import loading from "@/components/loading";
import navBar from "@/components/navBar";
import alert from "@/components/alert";

export default {
  components: {
    loading,
    navBar,
    alert,
    songsTable,
  },
  computed: {
    ...mapGetters([
      "getMainName",
      "getTopSongsByYearWithTieBreaker",
      "getLastVoteYear",
    ]),
  },
  data() {
    return {
      customColumns: [
        { key: "rank", label: "Rank" },
        { key: "artist", label: "Artist" },
        { key: "title", label: "Title" },
        { key: "voters", label: "Voters" },
        { key: "", label: "" },
        { key: "Total", label: "Total" },
      ],
    };
  },
};
</script>
