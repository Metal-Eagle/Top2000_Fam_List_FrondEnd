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
export default {
  props: {
    selectedSong: Object,
  },
};
</script>
