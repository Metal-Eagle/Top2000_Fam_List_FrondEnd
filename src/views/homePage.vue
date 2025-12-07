<template>
  <div class="row">
    <div class="col-md-12 text-center mb-3">
      <div class="h2">Welcome</div>
    </div>

    <div class="col-md-9">
      <input
        type="text"
        class="form-control mb-4"
        placeholder="Search"
        ref="searchInput"
        v-on:keyup.enter="searchId"
        v-model="searchInput"
        required
      />
    </div>
    <div class="col">
      <button
        class="btn btn-outline-main form-control"
        type="submit"
        @click="searchId"
      >
        Search
      </button>
    </div>
    <div class="col">
      <button
        class="btn btn-outline-main form-control"
        type="submit"
        @click="gotoAddFamily"
      >
        Add
      </button>
    </div>
  </div>
  <div class="row">
    <div
      v-if="error.show"
      class="alert alert-warning mt-5 col-md-6 offset-md-3"
      role="alert"
    >
      {{ error.msg }}
    </div>

    <div class="col-md-12">
      <p class="h2 text-center">Explanation</p>
      <p>
        This app allows you to combine multiple Top 2000 voting lists into a
        single overview. You can view the results, export the combined playlist
        to your preferred music app, and share it with friends and family.
      </p>
    </div>
  </div>
</template>

<script>
import { getSongByName } from "@/service/getData";

export default {
  data() {
    return {
      searchInput: null,
      error: {
        show: false,
        msg: null,
      },
    };
  },
  mounted() {
    this.focusInput();
  },
  methods: {
    searchId() {
      getSongByName(this.searchInput, (resp) => {
        if (!resp.error) {
          this.$router.push(`/dashboard/${resp.id}`);
        } else {
          this.error.msg = resp.error;
          this.error.show = true;
        }
      });
    },
    gotoAddFamily() {
      this.$router.push(`/addFamily`);
    },
    focusInput() {
      this.$refs.searchInput.focus();
    },
  },
};
</script>
