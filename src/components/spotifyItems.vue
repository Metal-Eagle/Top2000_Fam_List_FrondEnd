<template>
  <div class="me-3">
    <a
      class="btn"
      v-if="getSpotifyAccessToken === null"
      @click="doSpotifyLogin"
    >
      <button type="button" class="btn btn-spotify">Connect to Spotify</button>
    </a>

    <div v-if="getSpotifyAccessToken !== null">
      <addSpotifyItem />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import addSpotifyItem from "@/components/addSpotifyItem";
import { doSpotifyLogin } from "@/service/spotifyService";

export default {
  setup() {
    return {
      doSpotifyLogin,
    };
  },
  computed: {
    ...mapGetters(["getSpotifyAccessToken"]),
  },
  methods: {},
  components: {
    addSpotifyItem,
  },
};
</script>
