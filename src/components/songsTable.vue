<template>
  <div class="table-wrapper" v-if="songs">
    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col" v-for="column in columns" :key="column.key">
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="songClick"
            @click="openExtraDetails(item)"
            data-bs-toggle="modal"
            data-bs-target="#songDetailsModal"
            v-for="item in songs"
            :key="item.id"
          >
            <Song :item="item" />
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Add modal for details -->
    <songDetails :selectedSong="selectedItem" />
  </div>
</template>

<script>
import Song from "@/components/song";
import songDetails from "@/components/songDetails.vue";

export default {
  components: {
    Song,
    songDetails,
  },
  props: {
    songs: Object,
    columns: {
      type: Array,
      default: () => [
        { key: "artist", label: "Artist" },
        { key: "title", label: "Title" },
        { key: "voters", label: "Voters" },
        { key: "year", label: "Year" },
      ],
    },
  },
  methods: {
    openExtraDetails(item) {
      this.selectedItem = item;
    },
  },
  data() {
    return {
      selectedItem: null,
    };
  },
};
</script>
