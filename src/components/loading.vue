<template>
  <div v-if="loading">
    <div class="d-flex justify-content-center">
      <div
        class="spinner-border"
        style="width: 3rem; height: 3rem"
        role="status"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: Boolean,
  },
};
</script>

<style>
</style>