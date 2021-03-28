<template>
  <div class="container text-center">Spotify Connected closing window</div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  mounted() {
    const urlQueryString = new URL(document.URL).hash.replace("#", "");
    const spotifyParams = this.parseQueryString(urlQueryString);
    this.$store
      .dispatch("add_spotify_access_token", spotifyParams)
      .then(async () => {
        if (this.getSpotifyAccessToken != null) {
          //Set userData
          await this.setUserData();
          window.close();
        }
      });
  },
  computed: {
    ...mapGetters(["getSpotifyAccessToken"]),
  },
  methods: {
    parseQueryString(url) {
      // parse query string into key/value pairs and return as object
      var query = {};
      url
        .replace(/^.*\?/, "")
        .replace(/([^=]+)=([^&]*)&?/g, (match, key, value) => {
          query[key] = decodeURIComponent(value);
          return "";
        });
      return query;
    },
    async setUserData() {
      let { data: userData } = await axios.get(
        "https://api.spotify.com/v1/me",
        {
          headers: {
            Authorization: "Bearer " + this.getSpotifyAccessToken,
          },
        }
      );
      this.$store.dispatch("add_spotify_user", userData);
    },
  },
};
</script>
