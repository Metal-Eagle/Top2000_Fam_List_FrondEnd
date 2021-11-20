<template>
  <!-- Button -->
  <button
    type="button"
    class="btn btn-spotify"
    data-bs-toggle="modal"
    data-bs-target="#addSpotifyItem"
    id="addSpotifyItem_loader"
  >
    Add to Spotify
  </button>

  <!-- Modal -->
  <div class="modal fade" id="addSpotifyItem">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addSpotifyItemLabel">
            Add the complete list to Spotify
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body">
          <!-- Modal Body -->

          <div class="form-floating mb-3">
            <input type="text" class="form-control" v-model="playList.name" />
            <label for="floatingInput">Spotify playlist Name</label>
          </div>

          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              v-model="playList.description"
            />
            <label for="floatingInput">Spotify playlist Description</label>
          </div>

          <div class="form-check mb-3">
            <input
              class="form-check-input"
              type="checkbox"
              v-model="playList.public"
            />
            <label class="form-check-label">Public playlist </label>
          </div>

          <!-- TODO: Make working -->
          <!-- <div class="form-floating">
            <select
              class="form-select form-select-sm mb-2"
              v-model="playList.selectedVotter"
            >
              <option selected>All</option>
              <option v-for="votter in getVottersFormSongs" :key="votter">
                {{ getUserById(votter).fullName }}
              </option>
            </select>
            <label for="floatingSelect">Select Voter</label>
          </div>

          <div class="form-floating">
            <select
              class="form-select form-select-sm mb-2"
              v-model="playList.selectedYear"
            >
              <option selected>All</option>
              <option v-for="year in getYearsFormSongs" :key="year">
                {{ year }}
              </option>
            </select>
            <label for="floatingSelect">Select Year</label>
          </div> -->

          <div class="alert alert-info" role="alert">
            <strong>Note!</strong> it can take some time for the playlist to be
            created
          </div>

          <!-- Modal Body -->
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-main"
            id="build_btn"
            @click="sendData"
            data-bs-dismiss="modal"
          >
            Build
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import { addSpotifyList } from "../service/uploadData.js";

export default {
  data() {
    return {
      playList: {
        name: null,
        description: null,
        public: false,
        selectedYear: "All",
        selectedVotter: "All",
      },
    };
  },
  mounted() {
    let name = `${this.getMainName} top2000 Playlist`;
    this.playList.name = name;
  },
  computed: {
    ...mapGetters([
      "getYearsFormSongs",
      "getVottersFormSongs",
      "getUserById",
      "getMainName",
      "getAllSongs",
      "getSpotifyAccessToken",
      "getSpotifyUser",
      "getMainId",
    ]),
  },
  methods: {
    async sendData() {
      const spotifyList = {
        familyId: this.getMainId,
        id: this.getSpotifyUser.id,
        token: this.getSpotifyAccessToken,
        playList: this.playList,
      };

      const originalText = document.getElementById(
        "addSpotifyItem_loader"
      ).innerHTML;
      document.getElementById(
        "addSpotifyItem_loader"
      ).innerHTML = `<div class="spinner-border"/>`;

      addSpotifyList(spotifyList, (r) => {
        if (r.name === "Error") {
          console.error(r.message);
          this.$store.dispatch("show_error_msg", {
            msg: r.message,
          });
        }

        document.getElementById("addSpotifyItem_loader").innerHTML =
          originalText;
      });
    },
  },
};
</script>
