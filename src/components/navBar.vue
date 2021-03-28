<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li
            v-for="route in $router.options.routes"
            class="nav-item"
            :key="route.name"
          >
            <router-link
              v-if="route.showInNav"
              class="nav-link"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              :title="route.meta.description"
              :to="navUrl(route.path)"
              >{{ route.name }}</router-link
            >
          </li>
        </ul>
      </div>
      <spotifyItems />
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import spotifyItems from "@/components/spotifyItems";

export default {
  name: "NavBar",
  components: {
    spotifyItems,
  },
  computed: {
    ...mapGetters(["getMainId"]),
  },
  methods: {
    navUrl(path) {
      let newPath = path.replace(":id", this.getMainId);
      return newPath;
    },
  },
};
</script>

<style>
</style>