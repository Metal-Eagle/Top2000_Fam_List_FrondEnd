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
        <div class="d-flex align-items-center ms-auto">
          <button
            class="btn btn-outline-main"
            @click="toggleDarkMode"
            :aria-pressed="isDarkMode"
          >
            <span v-if="isDarkMode">☀️ Light Mode</span>
            <span v-else>🌙 Dark Mode</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "NavBar",
  components: {},
  computed: {
    ...mapGetters(["getMainId"]),
    isDarkMode() {
      return document.body.getAttribute("data-theme") === "dark";
    },
  },
  methods: {
    navUrl(path) {
      let newPath = path.replace(":id", this.getMainId);
      return newPath;
    },
    toggleDarkMode() {
      const isDark = document.body.getAttribute("data-theme") === "dark";
      if (isDark) {
        document.body.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      } else {
        document.body.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      }
    },
  },
  mounted() {
    // Set theme on load
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.body.setAttribute("data-theme", savedTheme);
    } else {
      // Use browser's preferred color scheme
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const theme = prefersDark ? "dark" : "light";
      document.body.setAttribute("data-theme", theme);
    }
  },
};
</script>

<style></style>
