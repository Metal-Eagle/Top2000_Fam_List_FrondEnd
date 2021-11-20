<template>
  <alert />
  <navBar />
  <loading :loading="!getSongs" />
  <div class="row" v-if="getMainName">
    <div class="h1 col-6 text-end">
      {{ getMainName }}
    </div>
    <div class="h6 col">
      <span class="main-badge bg-main rounded-pill" style="width: 6rem">{{
        getSongsCount
      }}</span>
    </div>

    <div class="col-md-auto mb-1">
      <div class="btn-group">
        <showModelForAddingYears />
        <addNewUser />
      </div>
    </div>
  </div>

  <div v-if="getMainName">
    <div class="input-group mb-3">
      <input
        v-model="searchNumberInput"
        type="text"
        class="form-control"
        placeholder="Search for number"
      />
      <select class="form-select" v-model="selectedOption">
        <option
          v-for="option in selectorOptions"
          :key="option.name"
          :value="option.value"
          :selected="option.selected"
        >
          {{ option.name }}
        </option>
      </select>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-hover" v-if="getSongs">
        <thead>
          <tr>
            <th scope="col">Artist</th>
            <th scope="col">Title</th>
            <th scope="col">Voter</th>
            <th scope="col">Year</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in getSongs" :key="item.id">
            <Song :item="item" />
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Song from "@/components/song";
import loading from "@/components/loading";
import navBar from "@/components/navBar";
import alert from "@/components/alert";
import showModelForAddingYears from "@/components/showModelForAddingYears.vue";
import addNewUser from "@/components/addNewUser.vue";

export default {
  components: {
    Song,
    loading,
    navBar,
    alert,
    showModelForAddingYears,
    addNewUser,
  },
  computed: {
    ...mapGetters(["getMainName", "getSongsCount", "getAllSongs"]),
    getSongs() {
      if (this.searchNumberInput !== null) {
        let data;
        switch (this.selectedOption) {
          case "title":
            data = this.getAllSongs.filter((r) =>
              r.title
                .toLowerCase()
                .includes(this.searchNumberInput.toLowerCase())
            );
            break;
          case "artist":
            data = this.getAllSongs.filter((r) =>
              r.artist
                .toLowerCase()
                .includes(this.searchNumberInput.toLowerCase())
            );
            break;
        }

        return data;
      } else {
        return this.getAllSongs;
      }
    },
  },
  data() {
    return {
      selectorOptions: [
        {
          name: "Title",
          value: "title",
          selected: true,
        },
        {
          name: "Artist",
          value: "artist",
          selected: false,
        },
      ],
      selectedOption: "title",
      searchNumberInput: null,
    };
  },
};
</script>
