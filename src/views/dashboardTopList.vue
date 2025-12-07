<template>
  <alert />
  <navBar />
  <loading :loading="!getTopSongs" />
  <div class="row" v-if="getMainName">
    <div class="h1 col text-center">
      {{ getMainName }}
    </div>
  </div>

  <songsTable :songs="getTopSongs" :columns="customColumns"></songsTable>
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
    ...mapGetters(["getMainName", "getTopSongs"]),
  },
  data() {
    return {
      customColumns: [
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
