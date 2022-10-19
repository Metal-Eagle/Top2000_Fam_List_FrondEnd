<template>
  <!-- Modal -->
  <div class="modal fade" id="songDetailsModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5
            class="modal-title"
            id="songDetailsModalLabel"
            v-if="selectedSong"
          >
            Details of {{ selectedSong.title }} - {{ selectedSong.artist }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body" v-if="selectedSong">
          <!-- TODO: check if img is there  -->
          <img
            v-if="selectedSong.imageBig"
            :src="selectedSong.imageBig"
            alt="cover"
            class="img-fluid"
          />

          <div v-if="selectedSong.audio" class="mt-3 text-center">
            <button
              @click="playSong(selectedSong.audio, selectedSong.id)"
              class="btn btn-outline-main"
            >
              <Play
                v-if="
                  !playingSong.isPlaying || selectedSong.id !== playingSong.id
                "
              />
              <Pause
                v-if="
                  playingSong.isPlaying && selectedSong.id === playingSong.id
                "
              />
            </button>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Play, Pause } from "mdue";
export default {
  props: {
    selectedSong: Object,
  },
  components: {
    Play,
    Pause,
  },
  methods: {
    playSong(audio, id) {
      let song = {
        id: id,
        isPlaying: true,
        isFirstSongPlaying: false,
        Audio: new Audio(audio),
      };

      if (this.playingSong.isPlaying) {
        this.playingSong.Audio.pause();
        song.isPlaying = false;
        if (this.playingSong.id !== id) {
          song.isPlaying = true;
          song.Audio.play();
        }
      } else {
        song.Audio.play();
      }

      this.$store.dispatch("change_playing_song", song);
    },
  },
  computed: {
    ...mapGetters(["playingSong"]),
  },
};
</script>
