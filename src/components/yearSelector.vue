<template>
  <select
    class="form-select mb-1"
    :value="selectedYear"
    @input="$emit('update:year', $event.target.value)"
  >
    >
    <option v-for="year in years" :key="year">{{ year }}</option>
  </select>
</template>

<script>
export default {
  emits: ["update:year"],
  data() {
    return {
      selectedYear: null,
      years: [],
    };
  },
  mounted() {
    let startYear = 2000;
    for (let year = 0; year < 100; year++) {
      startYear += 1;
      this.years.push(startYear);
    }

    const today = new Date();
    this.selectedYear = today.getFullYear();
  },
};
</script>

<style>
</style>